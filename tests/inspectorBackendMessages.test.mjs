import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { transformSync } from 'esbuild';
const source = fs.readFileSync(new URL('../src/features/chat/page/components/InspectorBackendMessages.jsx', import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace('export default function', 'function');
const highlight = fs.readFileSync(new URL('../src/features/chat/page/components/InspectorHighlight.jsx', import.meta.url), 'utf8').replace('export default function', 'function');
const script = transformSync(`
const React = require('react');
const useMemo = (fn) => fn();
const useState = () => [globalThis.query || '', () => {}];
const Search = () => <span />;
const Input = (props) => <input {...props} />;
const Button = ({children, ...props}) => <button {...props}>{children}</button>;
const Badge = ({children}) => <span>{children}</span>;
const Virtuoso = ({data, itemContent}) => <div>{data.map((item,index) => <div key={index}>{itemContent(index,item)}</div>)}</div>;
${highlight}
${source}
exports.Browser = InspectorBackendMessages;
`, {loader:'jsx', format:'cjs', jsx:'automatic'}).code;
const context = {require:createRequire(import.meta.url), exports:{}, query:''};
vm.runInNewContext(script, context);
const items = [
    {partId:'1', role:'user', orderIndex:0, messageId:'u', source:'conversation', content:'Search needle in processed body', replacements:[{id:'nested',content:'needle'}], sourcePayload:{content:'original'}, providerPayload:{role:'user',content:'processed'}},
    {partId:'2', role:'system', orderIndex:1, source:'context-injection', content:'injected rules', replacements:[]},
];
const render = () => renderToStaticMarkup(React.createElement(context.exports.Browser, {section:{items, notice:'current branch'},renderReplacements:(nodes, query) => React.createElement('span', null, nodes.map(node => `${node.id}:${node.content}:${query}`).join(','))}));
test('backend messages tab shows projected body, source, protocol and recursive replacement renderer', () => {
    context.query='';
    const html=render();
    assert.match(html,/Search needle in processed body/);
    assert.match(html,/injected rules/);
    assert.match(html,/original/);
    assert.match(html,/nested:needle/);
    assert.match(html,/定位消息/);
});
test('backend search filters all fields, highlights content, and opens matching protocol fields', () => {
    context.query='needle';
    let html=render();
    assert.match(html,/<mark[^>]*>needle<\/mark>/);
    assert.doesNotMatch(html,/injected rules/);
    context.query='original';
    html=render();
    assert.match(html,/<details[^>]*open/);
    assert.match(html,/<mark[^>]*>original<\/mark>/);
    context.query='missing';
    assert.match(render(),/没有匹配/);
});
