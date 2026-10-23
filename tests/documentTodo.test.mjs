import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import * as Y from 'yjs';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import rehypeDocumentTasks, { applyDocumentTaskToggle, documentTaskChange } from '../src/components/markdown/rehypeDocumentTasks.js';
import remarkStudyDirectives from '../src/components/markdown/remarkStudyDirectives.js';
import { insertTodoList } from '../src/features/documents/commands.js';

test('document preview toggles the exact nested duplicate task through CodeMirror and Y.Text', async () => {
    const dom = new JSDOM('<div id="editor"></div><div id="preview"></div>', {
        url: 'http://localhost/',
        pretendToBeVisual: true,
    });
    const previous = Object.fromEntries(['window', 'Window', 'document', 'MutationObserver', 'requestAnimationFrame', 'cancelAnimationFrame', 'ResizeObserver', 'IS_REACT_ACT_ENVIRONMENT'].map((key) => [key, globalThis[key]]));
    for (const key of ['window', 'Window', 'document', 'MutationObserver', 'requestAnimationFrame', 'cancelAnimationFrame'])
        globalThis[key] = dom.window[key];
    globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const oldNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
    Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
    await i18n.use(initReactI18next).init({ lng: 'zh', resources: { zh: { translation: {} } } });
    await build({
        entryPoints: ['src/components/markdown/DocumentTaskControls.jsx'],
        bundle: true,
        packages: 'external',
        jsx: 'automatic',
        platform: 'node',
        format: 'esm',
        outfile: 'temp/document-task-controls-test.mjs',
    });
    const [{ EditorState }, { EditorView }, { yCollab }, { DocumentTaskInput, DocumentTaskListItem }] = await Promise.all([
        import('@codemirror/state'),
        import('@codemirror/view'),
        import('y-codemirror.next'),
        import('../temp/document-task-controls-test.mjs'),
    ]);
    const original = ['\\(a\\)', '- [ ] 第一周', '- [ ] 第一周', '  - [ ] 第一周'].join('\n');
    const yDoc = new Y.Doc();
    const text = yDoc.getText('content');
    text.insert(0, original);
    const editor = new EditorView({
        parent: document.getElementById('editor'),
        state: EditorState.create({ doc: original, extensions: [yCollab(text, null)] }),
    });
    const root = createRoot(document.getElementById('preview'));
    const renderPreview = async (snapshot) => {
        // This is the existing MarkdownRenderer math preprocessor's shortening case.
        const rendered = snapshot.replaceAll('\\(', '$').replaceAll('\\)', '$');
        await act(async () => root.render(React.createElement(ReactMarkdown, {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypeDocumentTasks, { sourceContent: snapshot }]],
            components: {
                li: DocumentTaskListItem,
                input: (props) => React.createElement(DocumentTaskInput, {
                    ...props,
                    sourceContent: snapshot,
                    onToggle: (task) => applyDocumentTaskToggle({ ...task, editor, text }),
                }),
            },
        }, rendered)));
    };
    try {
        await renderPreview(original);
        let checkboxes = [...document.querySelectorAll('#preview input[type="checkbox"]')];
        assert.equal(checkboxes.length, 3);
        assert.ok(checkboxes.every((input) => !input.disabled));
        await act(async () => checkboxes[2].click());
        assert.equal(text.toString(), ['\\(a\\)', '- [ ] 第一周', '- [ ] 第一周', '  - [x] 第一周'].join('\n'));
        assert.equal(editor.state.doc.toString(), text.toString());

        // The deferred preview is now stale; a second click must not touch the Yjs text.
        const beforeStaleClick = text.toString();
        await act(async () => checkboxes[0].click());
        assert.equal(text.toString(), beforeStaleClick);

        await renderPreview(text.toString());
        checkboxes = [...document.querySelectorAll('#preview input[type="checkbox"]')];
        await act(async () => checkboxes[0].click());
        assert.equal(text.toString(), ['\\(a\\)', '- [x] 第一周', '- [ ] 第一周', '  - [x] 第一周'].join('\n'));

        const beforeRemoteEdit = text.toString();
        text.insert(0, '远端更新\n');
        await act(async () => checkboxes[1].click());
        assert.equal(text.toString(), `远端更新\n${beforeRemoteEdit}`);
    } finally {
        await act(async () => root.unmount());
        editor.destroy();
        yDoc.destroy();
        dom.window.close();
        for (const [key, value] of Object.entries(previous)) {
            if (value === undefined) delete globalThis[key];
            else globalThis[key] = value;
        }
        if (oldNavigator) Object.defineProperty(globalThis, 'navigator', oldNavigator);
        else delete globalThis.navigator;
    }
});

test('task changes reject stale snapshots and only replace a marker character', () => {
    const source = '- [x] 第一周\r\n- [ ] 第一周';
    assert.deepEqual(documentTaskChange(source, source, 3, true), { from: 3, to: 4, insert: ' ' });
    assert.equal(documentTaskChange(source, source, 3, false), null);
    assert.equal(documentTaskChange(source, source + '\n远端更新', 3, true), null);
    assert.equal(documentTaskChange(source, source, 8, true), null);
});

test('loose and nested lists remain mapped when preprocessing changes a task line', () => {
    const source = ['- [ ] 阅读 \\(x\\)', '', '  补充说明', '  - [ ] 嵌套'].join('\n');
    const normalize = (line) => line.replaceAll('\\(', '$').replaceAll('\\)', '$');
    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeDocumentTasks, { sourceContent: source, normalizeLine: normalize }]],
    }, normalize(source)));
    assert.equal((html.match(/data-document-task-offset=/g) || []).length, 2);
    assert.match(html, /data-document-task-offset="3"/);
    assert.match(html, /data-document-task-offset="[0-9]+"[^>]*>.*嵌套/s);
});

test('todo insertion keeps indentation and selects the new task label', async () => {
    const { EditorState } = await import('@codemirror/state');
    const view = {
        state: EditorState.create({ doc: '  ', selection: { anchor: 2 } }),
        dispatch(spec) { this.state = this.state.update(spec).state; },
        focus() {},
    };
    insertTodoList(view, '第一周');
    assert.equal(view.state.doc.toString(), '  - [ ] 第一周');
    assert.equal(view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to), '第一周');
});

test('Todo inside nested study cards still targets its original source marker', () => {
    const source = [
        ':::::study-session{title="阅读"}',
        '::::study-section{number="1" title="第一周"}',
        ':::study-card{title="任务"}',
        '- [ ] 第一周阅读',
        ':::',
        '::::',
        ':::::',
    ].join('\n');
    const spec = { directives: [
        { name: 'study-session', kind: 'session', defaultAttributes: { title: '时段', start: '', end: '' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, start: { type: 'time' }, end: { type: 'time' } } },
        { name: 'study-section', kind: 'section', defaultAttributes: { title: '主题', number: '1' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, number: { type: 'text', maxLength: 16 } } },
        { name: 'study-card', kind: 'card', defaultAttributes: { title: '提示', tone: 'info', icon: 'book' }, allowedAttributes: { title: { type: 'text', maxLength: 120 }, tone: { type: 'enum', values: ['info'] }, icon: { type: 'enum', values: ['book'] } } },
    ] };
    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, {
        remarkPlugins: [remarkGfm, remarkDirective, [remarkStudyDirectives, { spec }]],
        rehypePlugins: [[rehypeDocumentTasks, { sourceContent: source }]],
    }, source));
    const offset = source.indexOf('- [ ] 第一周阅读') + 3;
    assert.match(html, new RegExp(`data-document-task-offset="${offset}"`));
    const change = documentTaskChange(source, source, offset, false);
    assert.deepEqual(change, { from: offset, to: offset + 1, insert: 'x' });
    assert.equal(source.slice(0, change.from) + change.insert + source.slice(change.to), source.replace('- [ ] 第一周阅读', '- [x] 第一周阅读'));
});
