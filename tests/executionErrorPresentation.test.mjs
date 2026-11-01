import assert from 'node:assert/strict';
import test from 'node:test';
import {executionErrorPresentation} from '../src/features/execution/executionErrorPresentation.js';

test('provider error exposes the useful message and retains request diagnostics', () => {
    const raw = '服务器错误：' + JSON.stringify({error: {
        message: 'Thinking mode does not support this tool_choice (request_id: request-123)',
        type: 'invalid_request_error', code: 'invalid_request_error', param: null,
    }});
    const view = executionErrorPresentation(raw);
    assert.equal(view.message, 'Thinking mode does not support this tool_choice (request_id: request-123)');
    assert.equal(view.details, raw);
});

test('plain text and broken JSON never disappear when error extraction fails', () => {
    for (const raw of ['连接失败，请重试。', '服务器错误：{"error":{"message":"unfinished', '{"error":{"code":403}}']) {
        assert.deepEqual(executionErrorPresentation(raw), {message: raw, details: ''});
    }
});

test('structured errors with a long unbroken diagnostic retain the original data', () => {
    const error = {message: '请求失败', detail: 'x'.repeat(10000)};
    const view = executionErrorPresentation(error);
    assert.equal(view.message, '请求失败');
    assert.deepEqual(JSON.parse(view.details), error);
});
