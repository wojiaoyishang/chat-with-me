import assert from 'node:assert/strict';
import test from 'node:test';
import { readonlyImageSource, readonlyImageSize } from '../src/features/settings-runtime/readonlyImage.js';

test('read-only image permits app resources and raster data, without network trackers or active SVG', () => {
    for (const value of ['data:image/png;base64,aGVsbG8=', '/public/icon.png', 'cwm://artifact/example']) assert.equal(readonlyImageSource(value), value);
    for (const value of ['https://tracker.invalid/image.png', '//tracker.invalid/x', '/\\tracker.invalid/x', 'data:image/svg+xml;base64,PHN2Zz4=', 'javascript:alert(1)', null, 'x'.repeat(2_000_001)]) assert.equal(readonlyImageSource(value), '');
});

test('server-authored image sizes remain bounded and responsive', () => {
    assert.equal(readonlyImageSize(undefined), 240);
    assert.equal(readonlyImageSize(9000), 640);
    assert.equal(readonlyImageSize(2), 32);
    assert.equal(readonlyImageSize(300), 300);
});
