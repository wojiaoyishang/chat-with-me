import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

await build({
    stdin: {
        contents: 'export {getActionPresentation} from "./src/features/settings-runtime/actionPresentation.js"; export {SettingsActionLabel} from "./src/features/settings-runtime/SettingsActionLabel.jsx";',
        resolveDir: process.cwd(), loader: 'jsx',
    },
    outfile: 'temp/settings-action-presentation-test.mjs', bundle: true,
    platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic',
});
const { getActionPresentation, SettingsActionLabel } = await import('../temp/settings-action-presentation-test.mjs');

test('declared action appearance is independent of identity and confirmation behavior', () => {
    const confirm = { danger: true, title: '确认允许？' };
    const action = { id: 'opaque-action', value: 'arbitrary', icon: 'shield-check', tone: 'success', confirm };
    const original = structuredClone(action);
    const presentation = getActionPresentation(action);
    assert.equal(presentation.variant, 'ghost');
    assert.match(presentation.className, /emerald/);
    assert.deepEqual(action, original);
    assert.equal(action.confirm, confirm);
    assert.match(getActionPresentation({ confirm }).className, /destructive/);
    assert.deepEqual(getActionPresentation({ value: 'allow' }), { variant: 'outline', className: '' });
    assert.equal(getActionPresentation({ tone: 'success', variant: 'outline' }).variant, 'outline');
});

test('only controlled icon and tone metadata is rendered and labels remain literal text', () => {
    const html = renderToStaticMarkup(React.createElement(SettingsActionLabel, {
        action: { icon: 'shield-check' }, label: '<allow everyone>',
    }));
    assert.match(html, /data-slot="action-icon"/);
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /&lt;allow everyone&gt;/);
    const unknown = renderToStaticMarkup(React.createElement(SettingsActionLabel, {
        action: { icon: '<img src=x>', label: '普通操作' },
    }));
    assert.equal(unknown, '普通操作');
    assert.deepEqual(getActionPresentation({ tone: 'text-red-600 arbitrary-css' }), { variant: 'outline', className: '' });
});

test('action labels retain one icon and leave progress to the floating notice', () => {
    const html = renderToStaticMarkup(React.createElement(SettingsActionLabel, {
        action: { icon: 'shield-check', label: '全部允许' },
    }));
    assert.doesNotMatch(html, /data-slot="action-progress"/);
    assert.match(html, /data-slot="action-icon"/);
    assert.equal((html.match(/<svg/g) || []).length, 1);
});
