import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';

test('speech cache and setting success logs require DEBUG, while persistence and actual errors remain available', async () => {
  const dom = new JSDOM('', { url: 'http://localhost/chat' });
  const previous = Object.fromEntries(['window', 'document', 'localStorage', 'CustomEvent', 'DEBUG_MODE'].map(key => [key, { present: Object.hasOwn(globalThis, key), value: globalThis[key] }]));
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, localStorage: dom.window.localStorage, CustomEvent: dom.window.CustomEvent });
  const consoleMethods = { info: console.info, log: console.log, error: console.error }, recorded = { info: [], log: [], error: [] }, settingsEvents = [];
  for (const method of Object.keys(recorded)) console[method] = (...args) => recorded[method].push(args);
  try {
    const speechPath = path.resolve('src/features/chat/page/hooks/useChatSpeech.js');
    await build({
      stdin: { contents: `export { logSpeechCache, logSpeechPlayError } from './src/features/chat/page/hooks/useChatSpeech.js'; export { setLocalSetting, getLocalSetting, TTS_LOCAL_SETTING_KEYS, LOCAL_SETTING_CHANGE_EVENT } from './src/lib/tools.jsx';`, resolveDir: process.cwd() },
      bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic', outfile: 'temp/speech-debug-test.mjs',
      define: { 'import.meta.env.BASE_URL': '"/"' },
      plugins: [{ name: 'speech-logging-isolation', setup(builder) {
        builder.onLoad({ filter: /useChatSpeech\.js$/ }, async ({ path: file }) => file === speechPath ? { contents: (await readFile(file, 'utf8')) + '\nexport { logSpeechCache, logSpeechPlayError };', loader: 'js' } : null);
        builder.onResolve({ filter: /^@\// }, ({ path: name }) => ['@/config.js', '@/context/useEventStore.jsx', '@/components/ui/ThreeDotLoading.jsx'].includes(name) || name.startsWith('@/lib/apiClient')
          ? { path: name, namespace: 'mock' } : { path: path.resolve('src', name.slice(2)) });
        builder.onResolve({ filter: /^sonner$/ }, ({ path: name }) => ({ path: name, namespace: 'mock' }));
        builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path: name }) => ({ contents:
          name === '@/config.js' ? 'export const apiEndpoint={};'
            : name.startsWith('@/lib/apiClient') ? 'export default {};'
              : name === '@/context/useEventStore.jsx' ? 'export const emitEvent=()=>{};'
                : name === 'sonner' ? 'export const toast={};' : 'export default ()=>null;', loader: 'js' }));
      } }],
    });
    const module = await import(`../temp/speech-debug-test.mjs?version=${Date.now()}`);
    dom.window.addEventListener(module.LOCAL_SETTING_CHANGE_EVENT, event => settingsEvents.push(event.detail));
    for (const debug of [undefined, false, true]) {
      if (debug === undefined) delete globalThis.DEBUG_MODE; else globalThis.DEBUG_MODE = debug;
      for (const values of Object.values(recorded)) values.length = 0;
      module.logSpeechCache('session-cache-reset', { reason: 'test' });
      module.setLocalSetting(module.TTS_LOCAL_SETTING_KEYS.playerPosition, { x: 12, y: 24 });
      assert.deepEqual(module.getLocalSetting(module.TTS_LOCAL_SETTING_KEYS.playerPosition), { x: 12, y: 24 });
      assert.equal(recorded.info.length, debug === true ? 1 : 0);
      assert.equal(recorded.log.length, debug === true ? 1 : 0);
      if (debug) assert.deepEqual(recorded.info[0], ['[ChatSpeech][TTS Cache]', 'session-cache-reset', { reason: 'test' }]);
    }
    assert.equal(settingsEvents.length, 3, 'Turning logging off must not disable setting change events');
    globalThis.DEBUG_MODE = false;
    module.logSpeechPlayError('playback', { error: new Error('audio unavailable') });
    assert.equal(recorded.error.length, 1);
    globalThis.localStorage = { getItem: () => null, setItem: () => { throw new Error('storage full'); } };
    assert.throws(() => module.setLocalSetting(module.TTS_LOCAL_SETTING_KEYS.playerPosition, {}), /storage full/);
    assert.equal(recorded.error.length, 2, 'Storage failures must still be reported');
  } finally {
    Object.assign(console, consoleMethods);
    for (const [key, { present, value }] of Object.entries(previous)) { if (present) globalThis[key] = value; else delete globalThis[key]; }
    dom.window.close();
  }
});
