import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkStudyDirectives from '../src/components/markdown/remarkStudyDirectives.js';

const parse = (source, documentSurface = true) => {
    const processor = unified().use(remarkParse);
    if (documentSurface) processor.use(remarkDirective).use(remarkStudyDirectives);
    return processor.runSync(processor.parse(source));
};

test('study sessions build a single outline and unique anchors under an opening title', () => {
    const source = '# 我的计划\n\n:::study-session{start="19:56" end="20:02" title="准备"}\n第一步\n:::\n\n:::study-session{start="20:02" end="20:09" title="练习"}\n第二步\n:::';
    const tree = parse(source);
    assert.equal(tree.children[0].type, 'heading');
    assert.equal(tree.children[1].data?.hName, 'study-outline');
    const items = JSON.parse(tree.children[1].data.hProperties.items);
    assert.deepEqual(items.map(({ id, title }) => [id, title]), [
        ['study-session-1', '准备'],
        ['study-session-2', '练习'],
    ]);
    assert.equal(tree.children[2].data.hProperties.id, items[0].id);
    assert.equal(tree.children[3].data.hProperties.id, items[1].id);

    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkDirective, remarkStudyDirectives],
        components: {
            'study-outline': ({ items: serialized }) => React.createElement('nav', { 'data-count': JSON.parse(serialized).length }),
            'study-session': ({ id, children }) => React.createElement('section', { id }, children),
        },
    }, source));
    assert.match(html, /<nav data-count="2"><\/nav>/);
    assert.match(html, /<section id="study-session-2">/);
});

test('separate document previews can namespace their agenda anchors', () => {
    const source = ':::study-session{title="阅读"}\n正文\n:::';
    const processWithPrefix = (idPrefix) => {
        const processor = unified().use(remarkParse).use(remarkDirective).use(remarkStudyDirectives, { idPrefix });
        return processor.runSync(processor.parse(source)).children.find((node) => node.data?.hName === 'study-session').data.hProperties.id;
    };
    assert.equal(processWithPrefix('doc-a'), 'doc-a-session-1');
    assert.equal(processWithPrefix('doc-b'), 'doc-b-session-1');
});

test('nested visual blocks preserve ordinary Markdown children', () => {
    const source = ':::::study-session{start="19:56" end="20:02" title="阅读"}\n' +
        '导读段落。\n\n' +
        '::::study-section{number="1" title="重点"}\n' +
        ':::study-card{title="资料" tone="success" icon="book"}\n' +
        '[原文](https://example.com) 和 ![示意](assets/demo.png)\n' +
        ':::\n::::\n:::::';
    const tree = parse(source);
    const session = tree.children.find((node) => node.data?.hName === 'study-session');
    const section = session.children.find((node) => node.data?.hName === 'study-section');
    const card = section.children.find((node) => node.data?.hName === 'study-card');
    assert.equal(card.data.hProperties.tone, 'success');
    assert.deepEqual(card.children[0].children.filter((node) => ['link', 'image'].includes(node.type)).map((node) => node.type), ['link', 'image']);

    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkDirective, remarkStudyDirectives],
        components: {
            'study-outline': () => null,
            'study-session': ({ children }) => React.createElement('section', null, children),
            'study-section': ({ children }) => React.createElement('section', null, children),
            'study-card': ({ children }) => React.createElement('aside', null, children),
        },
    }, source));
    assert.match(html, /<a href="https:\/\/example.com">原文<\/a>/);
    assert.match(html, /<img src="assets\/demo.png" alt="示意"/);
});

test('unsafe and unrecognized attributes never reach the rendered element', () => {
    const node = parse(':::study-card{title="提示" tone="danger" icon="javascript" onclick="alert(1)" style="color:red" id="evil"}\n内容\n:::').children[0];
    assert.deepEqual(node.data.hProperties, { title: '提示', tone: 'info', icon: 'book' });
});

test('code fences and conversation Markdown do not activate study visuals', () => {
    const source = '```md\n:::study-session{title="代码"}\n内容\n:::\n```';
    assert.equal(parse(source).children[0].type, 'code');
    assert.equal(parse(source).children.some((node) => node.data?.hName === 'study-outline'), false);

    const ordinary = parse(':::study-session{title="原样"}\n正文\n:::', false);
    assert.equal(ordinary.children.some((node) => node.data?.hName === 'study-outline'), false);
    assert.equal(ordinary.children.some((node) => node.data?.hName === 'study-session'), false);
});

test('unknown container, leaf and inline directives keep their Markdown source', () => {
    const source = '::::study-session{title="阅读"}\n' +
        ':::warning\n**注意** [资料](https://example.com)\n:::\n' +
        ':badge[新] 与 ::note[普通]\n' +
        '::::';
    const tree = parse(source);
    const session = tree.children.find((node) => node.data?.hName === 'study-session');
    assert.equal(session.children.some((node) => node.data?.hName === 'warning'), false);
    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkDirective, remarkStudyDirectives],
        components: {
            'study-outline': () => null,
            'study-session': ({ children }) => React.createElement('section', null, children),
        },
    }, source));
    assert.match(html, /:::warning/);
    assert.match(html, /<strong>注意<\/strong>/);
    assert.match(html, /<a href="https:\/\/example.com">资料<\/a>/);
    assert.match(html, /:badge\[新\]/);
    assert.match(html, /::note\[普通\]/);
});

test('an unclosed container keeps its content visible', () => {
    const tree = parse(':::study-session{title="阅读"}\n正文不能丢失');
    const session = tree.children.find((node) => node.data?.hName === 'study-session');
    assert.match(JSON.stringify(session || tree), /正文不能丢失/);
});
