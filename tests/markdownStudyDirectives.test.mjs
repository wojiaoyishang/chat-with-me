import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkStudyDirectives from '../src/components/markdown/remarkStudyDirectives.js';
import { EditorState } from '@codemirror/state';
import { insertStudyBlock } from '../src/features/documents/commands.js';
import { localizeCardDirective } from '../src/features/documents/cardMenu.js';

const spec = { directives: [
    { name: 'study-session', kind: 'session', defaultAttributes: { title: '学习时段', start: '', end: '' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, start: { type: 'time' }, end: { type: 'time' } } },
    { name: 'study-section', kind: 'section', defaultAttributes: { title: '学习主题', number: '1' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, number: { type: 'text', maxLength: 16 } } },
    { name: 'study-card', kind: 'card', defaultAttributes: { title: '重点内容', tone: 'info', icon: 'book' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, tone: { type: 'enum', values: ['info', 'success', 'warning'] }, icon: { type: 'enum', values: ['book', 'idea'] } } },
    { name: 'study-comparison', kind: 'comparison', defaultAttributes: { title: '方案对比', tone: 'info', icon: 'book' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, tone: { type: 'enum', values: ['info', 'success', 'warning'] }, icon: { type: 'enum', values: ['book', 'idea'] } } },
] };
const directivePlugin = [remarkStudyDirectives, { spec }];

const parse = (source, documentSurface = true, cardSpec = spec) => {
    const processor = unified().use(remarkParse).use(remarkGfm);
    if (documentSurface) processor.use(remarkDirective).use(remarkStudyDirectives, { spec: cardSpec });
    return processor.runSync(processor.parse(source), { value: source });
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
        remarkPlugins: [remarkDirective, directivePlugin],
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
        const processor = unified().use(remarkParse).use(remarkDirective).use(remarkStudyDirectives, { idPrefix, spec });
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
        remarkPlugins: [remarkDirective, directivePlugin],
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
        remarkPlugins: [remarkDirective, directivePlugin],
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

test('new card kinds come from the manifest and retain Markdown children', () => {
    const tree = parse(':::study-comparison{title="两种方式"}\n| A | B |\n| --- | --- |\n| 左 | 右 |\n:::');
    assert.equal(tree.children[0].data?.hName, 'study-comparison');
    assert.equal(tree.children[0].data?.hProperties.title, '两种方式');
    assert.equal(tree.children[0].children[0].type, 'table');
});

test('without a loaded manifest, legacy source remains readable', () => {
    const tree = parse(':::study-card{title="旧内容"}\n**正文**\n:::', true, null);
    assert.equal(tree.children.some((node) => node.data?.hName === 'study-card'), false);
    assert.match(JSON.stringify(tree), /旧内容/);
    assert.match(JSON.stringify(tree), /正文/);
});

test('manifest toolbar snippets preserve nested session, section, and card boundaries', () => {
    let state = EditorState.create({ doc: '' });
    const view = {
        get state() { return state; },
        dispatch(transaction) { state = state.update(transaction).state; },
        focus() {},
    };
    const snippets = [
        { insert: { opening: ':::::study-session{title="阅读"}', closing: ':::::', placeholder: '时段正文' } },
        { insert: { opening: '::::study-section{title="重点" number="1"}', closing: '::::', placeholder: '章节正文' } },
        { insert: { opening: ':::study-card{title="提示"}', closing: ':::', placeholder: '卡片正文' } },
    ];
    for (const directive of snippets) insertStudyBlock(view, directive);
    const tree = parse(state.doc.toString());
    const session = tree.children.find((node) => node.data?.hName === 'study-session');
    const section = session.children.find((node) => node.data?.hName === 'study-section');
    const card = section.children.find((node) => node.data?.hName === 'study-card');
    assert.equal(card.children[0].children[0].value, '时段正文');
});

test('English card menu uses backend text and insertion template', () => {
    const directive = {
        name: 'study-callout',
        label: '提示卡片',
        description: '中文说明',
        insert: { opening: ':::study-callout{title="学习提示"}', closing: ':::', placeholder: '中文正文' },
        i18n: { en: {
            label: 'Callout',
            description: 'Emphasize a note.',
            insert: { opening: ':::study-callout{title="Note"}', closing: ':::', placeholder: 'Your note.' },
        } },
    };
    const localized = localizeCardDirective(directive, 'en-US', (key) => key);
    assert.equal(localized.label, 'Callout');
    assert.equal(localized.description, 'Emphasize a note.');
    assert.match(localized.insert.opening, /Note/);
    assert.equal(localized.insert.placeholder, 'Your note.');
    assert.equal(directive.insert.placeholder, '中文正文');
});
