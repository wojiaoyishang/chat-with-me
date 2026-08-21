#!/usr/bin/env node
/** Validate that every JavaScript/TypeScript function-like AST node is documented. */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptFile), '..', '..');
const sourceRoot = path.join(projectRoot, 'src');
const apiRoot = path.join(projectRoot, 'docs', 'source', 'api', 'javascript');

async function loadTypeScript() {
  const candidates = [];
  if (process.env.CWM_TYPESCRIPT_PATH) candidates.push(process.env.CWM_TYPESCRIPT_PATH);
  candidates.push(path.join(projectRoot, 'node_modules', 'typescript', 'lib', 'typescript.js'));
  try {
    const globalRoot = execFileSync('npm', ['root', '-g'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (globalRoot) candidates.push(path.join(globalRoot, 'typescript', 'lib', 'typescript.js'));
  } catch {
    // A frontend checkout may run in a minimal container without npm on PATH.
  }
  for (const candidate of candidates) {
    if (!candidate || !fs.existsSync(candidate)) continue;
    const loaded = await import(pathToFileURL(candidate).href);
    return loaded.default ?? loaded;
  }
  try {
    const loaded = await import('typescript');
    return loaded.default ?? loaded;
  } catch {
    throw new Error(
      'TypeScript compiler not found. Run npm install or set CWM_TYPESCRIPT_PATH '
      + 'to typescript/lib/typescript.js.',
    );
  }
}

let ts;
try {
  ts = await loadTypeScript();
} catch (error) {
  if (process.argv.includes('--optional')) {
    console.warn('TypeScript compiler not found; skipping AST freshness validation and using bundled API pages.');
    process.exit(0);
  }
  throw error;
}
const ignoredDirectories = new Set(['.git', '.idea', '.vite', 'coverage', 'dist', 'node_modules', 'build']);

function walk(directory, predicate, result = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target, predicate, result);
    else if (predicate(target)) result.push(target);
  }
  return result.sort();
}

function scriptKind(file) {
  if (file.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (file.endsWith('.ts')) return ts.ScriptKind.TS;
  if (file.endsWith('.jsx')) return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}

function marker(file, node) {
  const sourceKey = path.relative(projectRoot, file).replaceAll(path.sep, '/');
  return `${sourceKey}:${node.pos}:${node.end}:FUNCTION`;
}

const expected = new Set();
const sourceFiles = walk(sourceRoot, (file) => /\.(?:js|jsx|ts|tsx)$/.test(file));
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind(file),
  );
  function visit(node) {
    if (ts.isFunctionLike(node) && !ts.isSourceFile(node)) expected.add(marker(file, node));
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  const output = path.join(
    apiRoot,
    path.relative(sourceRoot, file).replace(/\.(?:js|jsx|ts|tsx)$/, '.rst'),
  );
  if (!fs.existsSync(output)) {
    console.error(`Missing generated API page: ${path.relative(projectRoot, output)}`);
    process.exitCode = 1;
  }
}

const actualList = [];
const markerPattern = /^\s*\.\. CWM-AST-FUNCTION (.+)$/gm;
for (const file of walk(apiRoot, (target) => target.endsWith('.rst'))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(markerPattern)) actualList.push(match[1]);
}
const actual = new Set(actualList);
const missing = [...expected].filter((item) => !actual.has(item)).sort();
const extra = [...actual].filter((item) => !expected.has(item)).sort();
const duplicateCount = actualList.length - actual.size;

if (missing.length) {
  console.error(`JavaScript API is missing ${missing.length} function-like nodes.`);
  console.error(missing.slice(0, 10).join('\n'));
  process.exitCode = 1;
}
if (extra.length) {
  console.error(`JavaScript API contains ${extra.length} stale function markers.`);
  console.error(extra.slice(0, 10).join('\n'));
  process.exitCode = 1;
}
if (duplicateCount) {
  console.error(`JavaScript API contains ${duplicateCount} duplicate function markers.`);
  process.exitCode = 1;
}

console.log(
  `JavaScript AST coverage | modules=${sourceFiles.length} | `
  + `function_nodes=${expected.size} | missing=${missing.length} | `
  + `extra=${extra.length} | duplicates=${duplicateCount}`,
);
if (!process.exitCode) console.log('CWM JavaScript API coverage validation passed.');
