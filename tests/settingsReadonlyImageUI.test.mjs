import assert from 'node:assert/strict';
import test from 'node:test';
import { mount } from './helpers/settingsRuntimeHarness.mjs';

test('backend read-only image renders pixels at declared size without upload or editing controls', async () => {
    const value = 'data:image/png;base64,aGVsbG8=';
    const ui = await mount([{ type: 'readonly-image', name: 'preview', text: '预览', alt: '像素预览', width: 220, height: 220 }], null, null, {}, { preview: value });
    try {
        const image = document.querySelector('img');
        assert.equal(image.getAttribute('src'), value);
        assert.equal(image.width, 220);
        assert.equal(image.getAttribute('alt'), '像素预览');
        assert.equal(document.querySelector('input'), null);
        assert.equal(settingsUI.calls.length, 0);
    } finally { await ui.close(); }
});
