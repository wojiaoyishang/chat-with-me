import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import React, {act} from 'react';

test('hidden message viewport pauses stream renders and catches up when shown', async () => {
    const dom = new JSDOM('<div id="root"></div>', {url: 'http://localhost/chat/conversation-1'});
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.messageContainerTest = {renders: []};

    await build({
        entryPoints: ['src/features/chat/ui/MessageContainer.jsx'],
        bundle: true,
        packages: 'external',
        jsx: 'automatic',
        format: 'esm',
        platform: 'node',
        outfile: 'temp/message-container-inactive-test.mjs',
        plugins: [{
            name: 'message-container-isolation',
            setup(builder) {
                builder.onResolve({filter: /^react(?:\/|$)/}, ({path}) => ({path, external: true}));
                builder.onResolve({filter: /.*/}, ({path, kind}) => (
                    kind === 'entry-point' ? null : {path, namespace: 'mock'}
                ));
                builder.onLoad({filter: /.*/, namespace: 'mock'}, ({path}) => {
                    let contents = 'export default () => null;';
                    if (path === 'react-i18next') {
                        contents = 'export const useTranslation = () => ({t: (key) => key});';
                    } else if (path === 'sonner') {
                        contents = 'export const toast = {error: () => {}};';
                    } else if (path.endsWith('MessageItem.jsx')) {
                        contents = `export default function MessageItem({msg}) {
                            globalThis.messageContainerTest.renders.push(msg.content);
                            return <div data-message-content>{msg.content}</div>;
                        }`;
                    } else if (path.endsWith('useMessageAnimation.js')) {
                        contents = `export default function useMessageAnimation() {
                            return {
                                enteringMessages: new Set(), leavingMessages: new Set(),
                                fadeMessages: new Set(), setFadeMessages: () => {},
                                getMessageAnimationClass: () => '',
                            };
                        }`;
                    } else if (path.endsWith('useMessageEvents.js')) {
                        contents = 'export default function useMessageEvents() {}';
                    }
                    return {loader: 'jsx', contents};
                });
            },
        }],
    });

    const {default: MessageContainer} = await import(`../temp/message-container-inactive-test.mjs?time=${Date.now()}`);
    const {createRoot} = await import('react-dom/client');
    const root = createRoot(document.getElementById('root'));
    const message = (content) => ({
        'message-1': {content, position: 'left', prevMessage: null, nextMessage: null, messages: []},
    });
    const render = async (active, content) => {
        await act(async () => root.render(React.createElement(MessageContainer, {
            active,
            conversationId: 'conversation-1',
            messagesOrder: ['message-1'],
            messages: message(content),
        })));
    };

    try {
        await render(true, '初始内容');
        assert.deepEqual(globalThis.messageContainerTest.renders, ['初始内容']);

        await render(false, '流式片段一');
        await render(false, '流式片段二');
        assert.deepEqual(globalThis.messageContainerTest.renders, ['初始内容']);
        assert.equal(document.querySelector('[data-message-content]').textContent, '初始内容');

        await render(true, '流式片段二');
        assert.deepEqual(globalThis.messageContainerTest.renders, ['初始内容', '流式片段二']);
        assert.equal(document.querySelector('[data-message-content]').textContent, '流式片段二');

        await render(true, '流式片段三');
        assert.deepEqual(globalThis.messageContainerTest.renders, ['初始内容', '流式片段二', '流式片段三']);
    } finally {
        await act(async () => root.unmount());
        dom.window.close();
        delete globalThis.messageContainerTest;
    }
});
