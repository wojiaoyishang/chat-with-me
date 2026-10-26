import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),
    '../../../Python/Chat-With-Me-Backend/application/management_pages');
const [source, motion, template] = await Promise.all([
    readFile(path.join(root, 'static/management-source.js'), 'utf8'),
    readFile(path.join(root, 'static/page-motion.js'), 'utf8'),
    readFile(path.join(root, 'templates/management.html'), 'utf8'),
]);
const settle = () => new Promise((resolve) => setTimeout(resolve, 20));

async function taskPage(t, calls, extra = {}) {
    const html = template
        .replace('{{ config | tojson }}', JSON.stringify({ kind: 'tasks', apiBase: '/api' }))
        .replace('{{ stylesheet | safe }}', '')
        .replace('{{ script | safe }}', '');
    const dom = new JSDOM(html, {
        url: 'http://localhost/api/tasks/page?taskId=usage-task',
        runScripts: 'outside-only', pretendToBeVisual: true,
    });
    t.after(() => dom.window.close());
    const task = { taskId: 'usage-task', kind: 'workflow.run', title: '用量展示测试', status: 'completed' };
    let revision = 0;
    dom.window.matchMedia = () => ({ matches: false });
    dom.window.HTMLElement.prototype.scrollIntoView = () => {};
    dom.window.fetch = async (url) => {
        const pathname = new URL(String(url), dom.window.location.origin).pathname;
        const data = pathname.endsWith('/definitions') ? { definitions: [] }
            : pathname.endsWith('/details') ? { task, revision, modelCalls: calls, ...extra }
                : { tasks: [task] };
        return { ok: true, json: async () => ({ success: true, data }) };
    };
    dom.window.eval(`${motion}\n${source}`);
    const cells = () => [...dom.window.document.querySelectorAll('#detail table tbody tr')]
        .map((row) => row.lastElementChild);
    for (let attempt = 0; attempt < 20 && cells().length !== calls.length; attempt += 1) await settle();
    assert.equal(cells().length, calls.length, dom.window.document.querySelector('#notice').textContent);
    return { dom, cells, refresh: async () => {
        revision += 1;
        dom.window.document.dispatchEvent(new dom.window.Event('visibilitychange'));
        await settle(); await settle();
    } };
}

test('task model usage renders field provenance and exposes its meaning without object strings', async (t) => {
    const { cells } = await taskPage(t, [{
        callId: 'provider-call', model: 'deepseek-flash',
        usage: { inputTokens: 2874, outputTokens: 5648, totalTokens: 8522,
            provenance: { inputTokens: 'provider', outputTokens: 'provider', totalTokens: 'derived', cachedTokens: 'provider' } },
    }, {
        callId: 'estimated-call', usage: { provenance: { inputTokens: 'provider', outputTokens: 'estimated', totalTokens: 'derived' } },
    }, {
        usage: { provenance: { inputTokens: 'provider', outputTokens: 'provider', totalTokens: 'provider' } },
    }, {
        usage: { provenance: { inputTokens: 'estimated', outputTokens: 'estimated' } },
    }, {
        usage: { provenance: { inputTokens: 'unavailable' } },
    }]);
    assert.equal(cells()[0].querySelector('summary').textContent, '混合来源');
    assert.deepEqual([...cells()[0].querySelectorAll('.usage-source-fields span')].map((node) => node.textContent),
        ['输入：接口返回', '输出：接口返回', '总量：汇总计算（输入与输出合计）', '缓存输入：接口返回']);
    assert.equal(cells()[1].querySelector('summary').textContent, '混合来源（含估算）');
    assert.ok(cells()[1].querySelector('.usage-source-estimated'));
    assert.equal(cells()[2].querySelector('summary').textContent, '接口返回');
    assert.equal(cells()[3].querySelector('summary').textContent, '本地估算');
    assert.equal(cells()[4].querySelector('summary').textContent, '未提供');
    for (const cell of cells()) assert.doesNotMatch(cell.textContent, /\[object Object\]/);
});

test('empty or malformed provenance falls back to textual source and safely handles missing values', async (t) => {
    const { cells } = await taskPage(t, [
        { usage: { provenance: {}, source: 'provider' } },
        { usage: { provenance: { inputTokens: { unexpected: true } } }, usageSource: 'estimated' },
        { usage: { provenance: null }, usageSource: '由调用方提供' },
        { usage: { provenance: 'derived' } },
        { usage: { provenance: [], source: '' }, usageSource: {} },
        {},
        { usage: { provenance: { totalTokens: '<img src=x onerror=alert(1)>' } } },
        { usageSource: '__proto__' },
    ]);
    assert.deepEqual(cells().slice(0, 6).map((cell) => cell.textContent),
        ['接口返回', '本地估算', '由调用方提供', '汇总计算', '未知', '未知']);
    assert.equal(cells()[6].querySelector('img'), null);
    assert.match(cells()[6].textContent, /<img src=x onerror=alert\(1\)>/);
    assert.equal(cells()[7].textContent, '__proto__');
    assert.doesNotMatch(cells().map((cell) => cell.textContent).join(''), /\[object Object\]/);
});

test('opened usage explanation stays open after task details refresh', async (t) => {
    const { cells, refresh } = await taskPage(t, [{
        callId: 'same-call', usage: { provenance: { inputTokens: 'provider', totalTokens: 'derived' } },
    }]);
    cells()[0].querySelector('details').open = true;
    await refresh();
    assert.equal(cells()[0].querySelector('details').open, true);
});

test('task dashboard displays current pending responses and refreshes to zero', async (t) => {
    const metrics = { activeRequests: 2, totalRequests: 7, peakActiveRequests: 2 };
    const { dom, refresh } = await taskPage(t, [{ callId: 'probe', usage: {} }], {
        runtime: { workflowMetrics: metrics },
    });
    const tiles = () => [...dom.window.document.querySelectorAll('.detail-stats > div')];
    const connections = () => tiles().find((node) => node.textContent.includes('存在连接数'));
    assert.ok(connections(), dom.window.document.querySelector('#detail').textContent);
    assert.match(connections().textContent, /存在连接数2/);
    assert.match(connections().textContent, /不含空闲连接/);
    assert.equal(tiles().some((node) => node.textContent.includes('GPU')), false);
    metrics.activeRequests = 0;
    await refresh();
    assert.match(connections().textContent, /存在连接数0/);
});
