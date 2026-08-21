#!/usr/bin/env node
/**
 * Generate a complete JavaScript/TypeScript API reference with the TypeScript AST.
 *
 * The script documents named functions, React components, hooks, class methods,
 * local helpers and anonymous callbacks.  It does not execute application code.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';

const scriptFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptFile), '..', '..');
const sourceRoot = path.join(projectRoot, 'src');
const outputRoot = path.join(projectRoot, 'docs', 'source', 'api', 'javascript');

async function loadTypeScript() {
  const candidates = [];
  if (process.env.CWM_TYPESCRIPT_PATH) candidates.push(process.env.CWM_TYPESCRIPT_PATH);
  candidates.push(path.join(projectRoot, 'node_modules', 'typescript', 'lib', 'typescript.js'));
  try {
    const globalRoot = execFileSync('npm', ['root', '-g'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (globalRoot) candidates.push(path.join(globalRoot, 'typescript', 'lib', 'typescript.js'));
  } catch {
    // npm may not be available in minimal documentation containers.
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
      'TypeScript compiler not found. Install it with "npm install --save-dev typescript" '
      + 'or set CWM_TYPESCRIPT_PATH to typescript/lib/typescript.js.',
    );
  }
}

let ts;
try {
  ts = await loadTypeScript();
} catch (error) {
  if (process.argv.includes('--optional')) {
    console.warn('TypeScript compiler not found; keeping the bundled generated JavaScript API pages.');
    process.exit(0);
  }
  throw error;
}

const excludedDirectories = new Set([
  '.git', '.idea', '.vite', 'coverage', 'dist', 'node_modules', 'build',
]);

const parameterDescriptions = new Map([
  ['conversationId', 'Conversation 的公共 UUID。'],
  ['documentId', 'Document 的公共 UUID。'],
  ['messageId', 'Message 的公共 UUID。'],
  ['turnId', '当前 Human ↔ Agent 轮次 UUID。'],
  ['runId', '当前 Agent/Worker 执行 UUID。'],
  ['streamId', '当前媒体流 UUID。'],
  ['eventId', '当前语义事件 UUID。'],
  ['traceId', '跨前后端组件传播的链路追踪 UUID。'],
  ['connectionId', '当前 WebSocket 物理连接 UUID。'],
  ['event', '语义事件名或 EventEnvelope。'],
  ['payload', '事件或业务操作的结构化载荷。'],
  ['body', '媒体帧原始二进制 Body。'],
  ['input', '待解析、校验或转换的输入。'],
  ['value', '待读取、转换或校验的值。'],
  ['options', '调用方传入的可选配置对象。'],
  ['props', 'React 组件属性。'],
  ['children', 'React 子节点。'],
  ['callback', '状态变化、事件到达或操作完成时执行的回调。'],
  ['signal', 'AbortSignal，用于取消异步操作。'],
  ['timeoutMs', '操作超时时间，单位为毫秒。'],
  ['url', '目标 HTTP、WebSocket 或虚拟资源地址。'],
  ['text', '待展示、发送、解析或朗读的文本。'],
  ['content', '消息、文档或模型输出内容。'],
  ['items', '待渲染、筛选或合并的数据项数组。'],
  ['prev', '状态更新函数接收到的前一状态。'],
]);

const verbDescriptions = new Map([
  ['add', '新增'], ['append', '追加'], ['apply', '应用'], ['build', '构造'],
  ['cancel', '取消'], ['check', '检查'], ['clear', '清空'], ['close', '关闭'],
  ['connect', '建立连接'], ['convert', '转换'], ['create', '创建'], ['decode', '解码'],
  ['delete', '删除'], ['disconnect', '断开连接'], ['dispatch', '分派'], ['emit', '发送事件'],
  ['encode', '编码'], ['ensure', '确保'], ['execute', '执行'], ['extract', '提取'],
  ['fetch', '请求并获取'], ['filter', '筛选'], ['find', '查找'], ['format', '格式化'],
  ['get', '读取'], ['handle', '处理'], ['init', '初始化'], ['is', '判断'],
  ['load', '加载'], ['map', '映射'], ['merge', '合并'], ['normalize', '规范化'],
  ['open', '打开'], ['parse', '解析'], ['play', '播放'], ['prepare', '准备'],
  ['process', '处理'], ['register', '注册'], ['remove', '移除'], ['render', '渲染'],
  ['replace', '替换'], ['reset', '重置'], ['resolve', '解析并确定'], ['resume', '继续'],
  ['save', '保存'], ['search', '搜索'], ['send', '发送'], ['set', '设置'],
  ['start', '启动'], ['stop', '停止'], ['subscribe', '订阅'], ['toggle', '切换'],
  ['transform', '转换'], ['unregister', '注销'], ['update', '更新'], ['validate', '校验'],
]);

const sideEffectRules = [
  [['fetch', 'axios.', '.get(', '.post(', '.request('], '发起 HTTP 请求或访问外部服务。'],
  [['emitEvent', 'sendEvent', 'sendMedia', 'socket.send', 'transport.send'], '发送本地或远程 CWM 事件/媒体帧。'],
  [['onEvent', 'addEventListener', 'subscribe'], '注册事件、DOM 或运行时订阅。'],
  [['localStorage', 'sessionStorage', 'indexedDB'], '读取或修改浏览器持久化状态。'],
  [['WebSocket', 'AudioContext', 'MediaRecorder', 'getUserMedia'], '创建或控制浏览器实时媒体资源。'],
  [['document.', 'window.', 'history.', 'location.'], '读取或修改浏览器全局对象、页面或历史状态。'],
  [['setState', 'setMessages', 'setConversation', 'dispatch(', 'setStore', 'set((state'], '更新 React 或全局 Store 状态。'],
  [['navigate(', 'replaceState', 'pushState'], '改变前端路由或浏览器历史。'],
  [['URL.createObjectURL', 'URL.revokeObjectURL', 'Blob('], '创建、使用或释放浏览器二进制资源。'],
];

function walkFiles(directory, results = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(target, results);
    else if (/\.(?:js|jsx|ts|tsx)$/.test(entry.name)) results.push(target);
  }
  return results.sort();
}

function scriptKind(file) {
  if (file.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (file.endsWith('.ts')) return ts.ScriptKind.TS;
  if (file.endsWith('.jsx')) return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}

function rstEscape(value) {
  return String(value ?? '').replaceAll('\0', '').replaceAll('`', '\\`').replaceAll('|', '\\|');
}

function rstPlainText(value) {
  let text = String(value ?? '').replaceAll('\0', '').replaceAll('\\', '\\\\');
  for (const token of ['`', '*', '_', '|']) text = text.replaceAll(token, `\\${token}`);
  return text;
}

function rstHeading(title, adornment = '=') {
  const width = Math.max(80, Array.from(String(title)).length * 2 + 8);
  return [title, adornment.repeat(width)];
}

function rstCode(value) {
  const safe = String(value ?? '')
    .replaceAll('\0', '')
    .replaceAll('`', '\\x60')
    .replace(/\s+/g, ' ')
    .trim();
  return `\`\`${safe}\`\``;
}

function oneLine(value, limit = 360) {
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim();
  return normalized.length > limit ? `${normalized.slice(0, limit - 1).trim()}…` : normalized;
}

function splitIdentifier(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/^_+|_+$/g, '')
    .split(/_+/)
    .filter(Boolean);
}

function describeIdentifier(name) {
  const clean = name.replace(/ callback(?: @ \d+)?$/, '');
  if (clean === 'constructor') return '初始化类实例并建立运行状态';
  const parts = splitIdentifier(clean);
  if (!parts.length) return `实现 ${rstCode(name)} 对应的内部逻辑`;
  const first = parts[0].toLowerCase();
  if (first === 'use' && /^use[A-Z]/.test(clean)) {
    return `封装 ${rstCode(clean.slice(3) || clean)} 的 React 状态、订阅与生命周期`;
  }
  if (first === 'on' || first === 'handle') {
    return `处理 ${rstCode(parts.slice(1).join(' ') || clean)} 用户交互或运行时事件`;
  }
  const verb = verbDescriptions.get(first);
  const rest = parts.slice(1).join(' ') || clean;
  return verb ? `${verb}与 ${rstCode(rest)} 相关的数据或状态` : `实现 ${rstCode(clean)} 对应的前端处理`;
}

function nodeNameText(node, sourceFile) {
  if (!node) return '';
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return node.text;
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return oneLine(node.getText(sourceFile), 100);
}

function getJSDoc(node) {
  const docs = node.jsDoc ?? [];
  const chunks = [];
  for (const doc of docs) {
    if (typeof doc.comment === 'string') chunks.push(doc.comment);
    else if (Array.isArray(doc.comment)) chunks.push(doc.comment.map((item) => item.text ?? '').join(''));
  }
  return rstPlainText(oneLine(chunks.join(' ')));
}

function hasModifier(node, kind) {
  return Boolean(node.modifiers?.some((modifier) => modifier.kind === kind));
}

function isExported(node) {
  if (hasModifier(node, ts.SyntaxKind.ExportKeyword) || hasModifier(node, ts.SyntaxKind.DefaultKeyword)) return true;
  let parent = node.parent;
  while (parent && !ts.isSourceFile(parent)) {
    if (hasModifier(parent, ts.SyntaxKind.ExportKeyword) || hasModifier(parent, ts.SyntaxKind.DefaultKeyword)) return true;
    if (ts.isBlock(parent) || ts.isFunctionLike(parent) || ts.isClassLike(parent)) break;
    parent = parent.parent;
  }
  return false;
}

function callName(expression, sourceFile) {
  if (!expression) return '';
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression)) return oneLine(expression.getText(sourceFile), 120);
  return oneLine(expression.getText(sourceFile), 120);
}

function callbackContext(node, sourceFile) {
  const parent = node.parent;
  if (ts.isCallExpression(parent)) {
    return `${callName(parent.expression, sourceFile) || 'call'} callback`;
  }
  if (ts.isJsxExpression(parent) && ts.isJsxAttribute(parent.parent)) {
    return `${nodeNameText(parent.parent.name, sourceFile)} callback`;
  }
  if (ts.isPropertyAssignment(parent)) {
    return nodeNameText(parent.name, sourceFile);
  }
  if (ts.isVariableDeclaration(parent)) {
    return nodeNameText(parent.name, sourceFile);
  }
  if (ts.isReturnStatement(parent)) return 'returned callback';
  return 'anonymous callback';
}

function parameterInfo(parameter, sourceFile) {
  const name = oneLine(parameter.name.getText(sourceFile), 100);
  const type = parameter.type ? oneLine(parameter.type.getText(sourceFile), 160) : '';
  const defaultValue = parameter.initializer ? oneLine(parameter.initializer.getText(sourceFile), 160) : '';
  const optional = Boolean(parameter.questionToken);
  const rest = Boolean(parameter.dotDotDotToken);
  return { name: rest ? `...${name}` : name, type, defaultValue, optional, rest };
}

function collectBodyFacts(node, sourceFile) {
  const calls = [];
  const returns = [];
  const throws = [];
  let anonymousChildren = 0;
  const root = node;
  function visit(child) {
    if (child !== root && ts.isFunctionLike(child)) {
      anonymousChildren += 1;
      return;
    }
    if (ts.isCallExpression(child)) calls.push(callName(child.expression, sourceFile));
    if (ts.isReturnStatement(child)) returns.push(child.expression ? oneLine(child.expression.getText(sourceFile), 180) : 'undefined');
    if (ts.isThrowStatement(child)) throws.push(child.expression ? oneLine(child.expression.getText(sourceFile), 160) : 'Error');
    ts.forEachChild(child, visit);
  }
  visit(node);
  const uniqueCalls = [...new Set(calls.filter(Boolean))].slice(0, 18);
  const source = node.getText(sourceFile);
  const sideEffects = [];
  for (const [needles, description] of sideEffectRules) {
    if (needles.some((needle) => source.includes(needle))) sideEffects.push(description);
  }
  return {
    calls: uniqueCalls,
    returns: [...new Set(returns)].slice(0, 8),
    throws: [...new Set(throws)].slice(0, 8),
    sideEffects: [...new Set(sideEffects)],
    anonymousChildren,
  };
}

function inferDescription(info) {
  if (info.jsDoc) return info.jsDoc;
  const rawName = info.name;
  if (info.kind === 'component') {
    return `渲染 ${rstCode(rawName)} React 组件，并协调该界面的状态、事件和子组件。`;
  }
  if (info.kind === 'hook') {
    return `封装 ${rstCode(rawName)} Hook，向调用组件提供相关状态、动作与生命周期清理。`;
  }
  if (info.kind === 'effect-callback') {
    return '作为 React 副作用回调，在依赖变化或组件挂载/卸载时同步外部状态并返回可选清理函数。';
  }
  if (info.kind === 'state-updater') {
    return '根据前一状态计算并返回下一状态，避免并发更新覆盖。';
  }
  if (info.kind === 'event-callback') {
    return `处理 ${rstCode(info.contextName)} 对应的事件或订阅结果。`;
  }
  if (info.kind === 'collection-callback') {
    return `作为 ${rstCode(info.contextName)} 集合回调，对当前元素执行映射、筛选、排序或归并。`;
  }
  return `${describeIdentifier(rawName)}。`;
}

function classify(name, contextName, topLevel, className) {
  if (className) return 'method';
  if (topLevel && /^[A-Z]/.test(name)) return 'component';
  if (topLevel && /^use[A-Z]/.test(name)) return 'hook';
  if (/^useEffect(?:\.|$)/.test(contextName) || contextName === 'useLayoutEffect callback') return 'effect-callback';
  if (/^(?:set[A-Z]|setState) callback/.test(contextName)) return 'state-updater';
  if (/(?:onEvent|addEventListener|\.then|\.catch|\.finally) callback/.test(contextName)) return 'event-callback';
  if (/(?:\.map|\.filter|\.reduce|\.sort|\.find|\.some|\.every|\.forEach) callback/.test(contextName)) return 'collection-callback';
  return topLevel ? 'function' : 'local-function';
}

function functionDisplayName(node, sourceFile) {
  if (ts.isFunctionDeclaration(node) && node.name) return node.name.text;
  if (ts.isMethodDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)) return nodeNameText(node.name, sourceFile);
  if (ts.isConstructorDeclaration(node)) return 'constructor';
  if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) return nodeNameText(node.parent.name, sourceFile);
  if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isPropertyAssignment(node.parent)) return nodeNameText(node.parent.name, sourceFile);
  if (ts.isFunctionExpression(node) && node.name) return node.name.text;
  return `${callbackContext(node, sourceFile)} @ ${sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1}`;
}

function isTopLevelCallable(node) {
  if (ts.isFunctionDeclaration(node)) return ts.isSourceFile(node.parent);
  if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) {
    const statement = node.parent.parent?.parent;
    return Boolean(statement && ts.isVariableStatement(statement) && ts.isSourceFile(statement.parent));
  }
  return false;
}

function containingClassName(node, sourceFile) {
  let current = node.parent;
  while (current) {
    if (ts.isClassDeclaration(current) || ts.isClassExpression(current)) return current.name?.text ?? '<anonymous class>';
    if (ts.isFunctionLike(current)) return null;
    current = current.parent;
  }
  return null;
}

function containingNamedFunction(node, sourceFile) {
  let current = node.parent;
  while (current) {
    if (ts.isFunctionLike(current)) return functionDisplayName(current, sourceFile);
    current = current.parent;
  }
  return null;
}

function astMarker(file, node) {
  const sourceKey = path.relative(projectRoot, file).replaceAll(path.sep, '/');
  return `${sourceKey}:${node.pos}:${node.end}:FUNCTION`;
}

function collectModule(file) {
  const text = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const callables = [];
  const classes = new Map();

  function visit(node) {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      const className = node.name?.text ?? `<anonymous class @ ${sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1}>`;
      classes.set(className, {
        name: className,
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
        jsDoc: getJSDoc(node),
        exported: isExported(node),
        methods: [],
      });
    }
    if (ts.isFunctionLike(node) && !ts.isSourceFile(node)) {
      const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
      const name = functionDisplayName(node, sourceFile);
      const topLevel = isTopLevelCallable(node);
      const className = containingClassName(node, sourceFile);
      const contextName = callbackContext(node, sourceFile);
      const kind = classify(name, contextName, topLevel, className);
      const facts = collectBodyFacts(node, sourceFile);
      const info = {
        name,
        marker: astMarker(file, node),
        line,
        endLine: sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1,
        topLevel,
        className,
        parentFunction: containingNamedFunction(node, sourceFile),
        contextName,
        kind,
        async: Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword)),
        exported: isExported(node),
        generator: Boolean(node.asteriskToken),
        parameters: node.parameters?.map((parameter) => parameterInfo(parameter, sourceFile)) ?? [],
        returnType: node.type ? oneLine(node.type.getText(sourceFile), 180) : '',
        jsDoc: getJSDoc(node),
        ...facts,
      };
      info.description = inferDescription(info);
      callables.push(info);
      if (className && classes.has(className)) classes.get(className).methods.push(info);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);

  const imports = [];
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) imports.push(statement.moduleSpecifier.text);
  }
  return { sourceFile, callables, classes: [...classes.values()], imports };
}

function simpleSignature(info, includeAsync = false) {
  const params = info.parameters.map((parameter) => parameter.name).join(', ');
  const prefix = includeAsync && info.async ? 'async ' : '';
  return `${prefix}${info.name}(${params})`;
}

function parameterDescription(name) {
  const clean = name.replace(/^\.\.\./, '').replace(/[{}\[\]]/g, '');
  if (parameterDescriptions.has(clean)) return parameterDescriptions.get(clean);
  if (clean.endsWith('Id')) return '目标对象的公共或运行时标识。';
  if (clean.startsWith('on') && /^[A-Z]/.test(clean.slice(2, 3))) return '调用方提供的事件回调。';
  if (clean.startsWith('set') && /^[A-Z]/.test(clean.slice(3, 4))) return 'React 或 Store 状态更新函数。';
  return `调用方传入的 ${rstCode(clean || name)} 参数；具体结构由调用位置和 TypeScript/JSDoc 约束。`;
}

function returnDescription(info) {
  if (info.generator) return info.async ? '返回异步迭代器并逐项产生结果。' : '返回迭代器并逐项产生结果。';
  if (info.returnType) return `返回类型标注为 ${rstCode(info.returnType)} 的结果。`;
  if (!info.returns.length) return '无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。';
  const rendered = info.returns.slice(0, 4).map((item) => rstCode(item)).join('、');
  return `根据执行分支返回结果；代表性返回表达式为 ${rendered}。`;
}

function writeParameters(lines, info, indent) {
  lines.push(`${indent}**参数**`, '');
  if (!info.parameters.length) {
    lines.push(`${indent}无。`, '');
    return;
  }
  for (const parameter of info.parameters) {
    const details = [];
    if (parameter.type) details.push(`类型 ${rstCode(parameter.type)}`);
    if (parameter.defaultValue) details.push(`默认值 ${rstCode(parameter.defaultValue)}`);
    if (parameter.optional) details.push('可选');
    if (parameter.rest) details.push('剩余参数');
    lines.push(`${indent}${rstCode(parameter.name)}${details.length ? `（${details.join('；')}）` : ''}`);
    lines.push(`${indent}   ${parameterDescription(parameter.name)}`, '');
  }
}

function writeCallable(lines, info, directive, indent = '') {
  const signature = simpleSignature(info, false);
  lines.push(`${indent}.. CWM-AST-FUNCTION ${info.marker}`, '');
  lines.push(`${indent}.. js:${directive}:: ${rstEscape(signature)}`, '');
  const body = `${indent}   `;
  lines.push(`${body}${info.description}`, '');
  const visibility = info.exported ? '导出 API' : info.topLevel ? '模块内部入口' : '局部实现';
  const nature = info.async ? '异步函数' : '同步函数';
  lines.push(`${body}**性质**：${nature}；${visibility}；源码第 ${rstCode(info.line)}—${rstCode(info.endLine)} 行。`, '');
  writeParameters(lines, info, body);
  lines.push(`${body}**返回值**`, '', `${body}${returnDescription(info)}`, '');
  if (info.sideEffects.length) {
    lines.push(`${body}**副作用**`, '');
    for (const effect of info.sideEffects) lines.push(`${body}* ${effect}`);
    lines.push('');
  }
  if (info.throws.length) {
    lines.push(`${body}**显式抛出**：${info.throws.map((item) => rstCode(item)).join('、')}。`, '');
  }
  if (info.calls.length) {
    lines.push(`${body}**主要协作调用**：${info.calls.slice(0, 12).map((item) => rstCode(item)).join('、')}。`, '');
  }
  if (info.anonymousChildren) {
    lines.push(`${body}**内部回调数量**：${info.anonymousChildren}。这些回调会在本页“局部函数与匿名回调”中逐项列出。`, '');
  }
}

function writeLocalCallable(lines, info) {
  lines.push(`.. CWM-AST-FUNCTION ${info.marker}`, '');
  lines.push(`.. rubric:: ${rstCode(info.name)}`, '');
  lines.push('.. code-block:: javascript', '', `   ${simpleSignature(info, true)}`, '');
  lines.push(info.description, '');
  const parent = info.parentFunction ? `；所属函数 ${rstCode(info.parentFunction)}` : '';
  const nature = info.async ? '异步局部函数' : '同步局部函数';
  lines.push(`**性质**：${nature}；源码第 ${rstCode(info.line)}—${rstCode(info.endLine)} 行${parent}。`, '');
  writeParameters(lines, info, '');
  lines.push('**返回值**', '', returnDescription(info), '');
  if (info.sideEffects.length) {
    lines.push('**副作用**', '');
    for (const effect of info.sideEffects) lines.push(`* ${effect}`);
    lines.push('');
  }
  if (info.throws.length) {
    lines.push(`**显式抛出**：${info.throws.map((item) => rstCode(item)).join('、')}。`, '');
  }
  if (info.calls.length) {
    lines.push(`**主要协作调用**：${info.calls.slice(0, 12).map((item) => rstCode(item)).join('、')}。`, '');
  }
  if (info.anonymousChildren) {
    lines.push(`**内部回调数量**：${info.anonymousChildren}。这些回调也会在本页逐项说明。`, '');
  }
}


function moduleName(file) {
  return `src/${path.relative(sourceRoot, file).replaceAll(path.sep, '/').replace(/\.(?:js|jsx|ts|tsx)$/, '')}`;
}

function moduleSummary(relative, module) {
  const firstComment = module.sourceFile.statements
    .map((statement) => getJSDoc(statement))
    .find(Boolean);
  if (firstComment) return firstComment;
  if (relative.startsWith('runtime/protocol/')) return '该模块实现 CWM Protocol v1 的事件目录、MessagePack、二进制 Frame 或订阅规则。';
  if (relative.startsWith('runtime/transport/')) return '该模块实现 WebSocket Transport、连接队列与二进制发送边界。';
  if (relative.startsWith('context/')) return '该模块提供跨页面运行时 Context、事件分发或全局状态。';
  if (relative.startsWith('features/chat/')) return '该模块实现聊天 Surface、消息树、语音、输入区或消息交互。';
  if (relative.startsWith('features/notification/')) return '该模块实现通知订阅、展示与用户操作。';
  if (relative.startsWith('features/story/')) return '该模块实现 Story 模式的选择、状态或界面。';
  if (relative.startsWith('features/workspace/')) return '该模块实现 Workspace 设置、浏览与交互界面。';
  if (relative.startsWith('components/markdown/')) return '该模块实现 Markdown、Replacement、Widget 或卡片渲染。';
  if (relative.startsWith('components/ui/')) return '该模块封装可复用基础 UI 组件。';
  if (relative.startsWith('pages/')) return '该模块是 React Router 页面入口，负责装配页面级状态和 Surface。';
  if (relative.startsWith('lib/')) return '该模块提供跨 Feature 复用的浏览器或业务辅助函数。';
  return '该模块实现 CWM 前端中的组件、Hook、状态或辅助逻辑。';
}

function renderModule(file) {
  const relative = path.relative(sourceRoot, file).replaceAll(path.sep, '/');
  const module = collectModule(file);
  const moduleId = moduleName(file);
  const title = `${moduleId} 模块`;
  const lines = [...rstHeading(title, '='), '', `.. js:module:: ${moduleId}`, ''];
  lines.push(moduleSummary(relative, module), '');
  lines.push('.. note::', '', '   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。', '   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。', '');
  const topLevel = module.callables.filter((item) => item.topLevel && !item.className);
  const classMethods = new Set(module.classes.flatMap((item) => item.methods));
  const local = module.callables.filter((item) => !item.topLevel && !classMethods.has(item));
  lines.push(...rstHeading('源码与职责', '-'), '', `* **源码文件**：\`\`src/${relative}\`\``, `* **模块标识**：\`\`${moduleId}\`\``, `* **顶层函数/组件/Hook**：${topLevel.length}`, `* **类**：${module.classes.length}`, `* **局部函数与匿名回调**：${local.length}`, '');
  if (module.imports.length) {
    lines.push(...rstHeading('主要依赖', '-'), '', [...new Set(module.imports)].slice(0, 30).map((item) => `\`\`${rstEscape(item)}\`\``).join('、') + '。', '');
  }
  if (module.classes.length) {
    lines.push(...rstHeading('类', '-'), '');
    for (const cls of module.classes) {
      lines.push(`.. js:class:: ${rstEscape(cls.name)}()`, '');
      const body = '   ';
      lines.push(`${body}${cls.jsDoc || `封装 ${rstCode(cls.name)} 的状态和方法。`}`, '', `${body}**性质**：${cls.exported ? '导出类' : '模块内部类'}；源码第 ${rstCode(cls.line)} 行。`, '');
      if (cls.methods.length) {
        lines.push(`${body}.. rubric:: 方法`, '');
        for (const method of cls.methods) writeCallable(lines, method, 'method', body);
      }
    }
  }
  if (topLevel.length) {
    lines.push(...rstHeading('顶层函数、组件与 Hook', '-'), '');
    for (const callable of topLevel) writeCallable(lines, callable, 'function');
  }
  if (local.length) {
    lines.push(...rstHeading('局部函数与匿名回调', '-'), '', '这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。', '');
    for (const callable of local) writeLocalCallable(lines, callable);
  }
  if (!module.callables.length && !module.classes.length) lines.push('本模块未定义函数或类，主要提供常量、样式、类型或导入聚合。', '');
  return {
    content: `${lines.join('\n').trimEnd()}\n`,
    topLevel: topLevel.length,
    methods: module.classes.reduce((sum, cls) => sum + cls.methods.length, 0),
    local: local.length,
  };
}

function outputPath(file) {
  const relative = path.relative(sourceRoot, file).replace(/\.(?:js|jsx|ts|tsx)$/, '.rst');
  return path.join(outputRoot, relative);
}

function docNameFor(file) {
  return `/api/javascript/${path.relative(sourceRoot, file).replaceAll(path.sep, '/').replace(/\.(?:js|jsx|ts|tsx)$/, '')}`;
}

function groupName(file) {
  const parts = path.relative(sourceRoot, file).split(path.sep);
  return parts.length > 1 ? parts[0] : 'src_root';
}

function renderGroupIndex(group, entries) {
  const title = `${group} JavaScript API`;
  const lines = [`.. title:: ${title}`, '', '目录索引', '', '本页列出该源码区域的全部 JavaScript/TypeScript 模块。模块内部标题不会展开到主导航。', '', '.. list-table:: 模块清单', '   :header-rows: 1', '   :widths: 52 12 12 12 12', '', '   * - 模块', '     - 顶层', '     - 方法', '     - 局部/回调', '     - 源码'];
  for (const entry of entries) {
    const relative = path.relative(sourceRoot, entry.file).replaceAll(path.sep, '/');
    lines.push(`   * - :doc:\`${rstEscape(moduleName(entry.file))} <${docNameFor(entry.file)}>\``);
    lines.push(`     - ${entry.topLevel}`, `     - ${entry.methods}`, `     - ${entry.local}`, `     - \`\`src/${relative}\`\``);
  }
  lines.push('', '.. toctree::', '   :hidden:', '   :maxdepth: 1', '');
  for (const entry of entries) lines.push(`   ${docNameFor(entry.file)}`);
  lines.push('');
  return lines.join('\n');
}

function renderApiIndex(groups) {
  const title = '完整 JavaScript API 参考';
  const entries = [...groups.values()].flat();
  const totalTop = entries.reduce((sum, item) => sum + item.topLevel, 0);
  const totalMethods = entries.reduce((sum, item) => sum + item.methods, 0);
  const totalLocal = entries.reduce((sum, item) => sum + item.local, 0);
  const lines = [...rstHeading(title, '='), '', '本章节由 TypeScript AST 静态生成，覆盖顶层函数、React 组件、Hook、类方法、局部函数和匿名回调。', '', '.. important::', '', '   自动参考用于保证函数清单完整；理解 Surface、Event Runtime、语音和状态边界时，请先阅读人工架构与开发章节。', '', ...rstHeading('统计', '-'), '', `* 源码模块：${entries.length}`, `* 顶层函数、组件与 Hook：${totalTop}`, `* 类方法：${totalMethods}`, `* 局部函数与匿名回调：${totalLocal}`, '', ...rstHeading('源码区域', '-'), '', '.. toctree::', '   :maxdepth: 1', '   :titlesonly:', ''];
  const order = [...groups.keys()].sort((a, b) => {
    const priority = ['runtime', 'context', 'features', 'components', 'pages', 'hooks', 'lib', 'assets'];
    const ai = priority.indexOf(a); const bi = priority.indexOf(b);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || a.localeCompare(b);
  });
  for (const group of order) lines.push(`   ${group}/index`);
  lines.push('');
  return lines.join('\n');
}

function removeDirectory(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function main() {
  removeDirectory(outputRoot);
  fs.mkdirSync(outputRoot, { recursive: true });
  const groups = new Map();
  const failures = [];
  for (const file of walkFiles(sourceRoot)) {
    try {
      const rendered = renderModule(file);
      const target = outputPath(file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, rendered.content, 'utf8');
      const group = groupName(file);
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push({ file, ...rendered });
    } catch (error) {
      failures.push(`${path.relative(projectRoot, file)}: ${error?.stack ?? error}`);
    }
  }
  for (const [group, entries] of groups) {
    const target = path.join(outputRoot, group, 'index.rst');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${renderGroupIndex(group, entries)}\n`, 'utf8');
  }
  fs.writeFileSync(path.join(outputRoot, 'index.rst'), `${renderApiIndex(groups)}\n`, 'utf8');
  const entries = [...groups.values()].flat();
  const summary = [
    'CWM frontend JavaScript API generation',
    `modules=${entries.length}`,
    `groups=${groups.size}`,
    `failures=${failures.length}`,
    `function_nodes=${entries.reduce((sum, item) => sum + item.topLevel + item.methods + item.local, 0)}`,
    ...failures,
  ];
  fs.writeFileSync(path.join(outputRoot, 'GENERATION_SUMMARY.txt'), `${summary.join('\n')}\n`, 'utf8');
  console.log(summary.slice(0, 4).join(' | '));
  if (failures.length) process.exitCode = 1;
}

main();
