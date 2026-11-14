import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';

// Vite can compile successfully while CommonJS initialization fails at runtime.
// Import the emitted runtime, rather than the source packages or dev prebundle.
try {
    const assets = new URL('../dist/assets/', import.meta.url);
    const chunks = (await readdir(assets)).filter((file) => /^react-runtime-.*\.js$/.test(file));
    assert.equal(chunks.length, 1, 'Expected one production react-runtime chunk');
    const runtime = Object.values(await import(new URL(chunks[0], assets)));
    const react = runtime.find((value) => typeof value?.Children?.map === 'function'
        && typeof value?.createElement === 'function');
    const renderer = runtime.find((value) => typeof value?.createRoot === 'function');
    assert.ok(react, 'Production React exports did not initialize');
    assert.ok(renderer, 'Production React DOM client did not initialize');
    assert.equal(renderer.version, react.version, 'React and React DOM versions differ');
    console.log(`Production runtime initialized: React / React DOM ${react.version}`);
} catch (error) {
    // Avoid dumping an entire minified bundle as part of an uncaught import error.
    console.error(`Production runtime check failed: ${error.message}`);
    process.exitCode = 1;
}
