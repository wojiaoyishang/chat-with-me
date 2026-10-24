import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

const mockControls = `
    import React from 'react';
    export const Button = ({ children, variant, size, ...props }) => <button {...props}>{children}</button>;
    export const Dialog = ({ open, children }) => open ? <div role="dialog">{children}</div> : null;
    export const DialogContent = ({ children }) => <div>{children}</div>;
    export const DialogHeader = ({ children }) => <header>{children}</header>;
    export const DialogTitle = ({ children }) => <h2>{children}</h2>;
    export const DialogDescription = ({ children }) => <p>{children}</p>;
    export const DialogFooter = ({ children }) => <footer>{children}</footer>;
    export const DialogTrigger = ({ children }) => children;
    export const AlertDialog = Dialog;
    export const AlertDialogContent = DialogContent;
    export const AlertDialogHeader = DialogHeader;
    export const AlertDialogTitle = DialogTitle;
    export const AlertDialogDescription = DialogDescription;
    export const AlertDialogFooter = DialogFooter;
    export const AlertDialogCancel = Button;
    export const AlertDialogAction = Button;
`;

await build({
    stdin: {
        contents: 'export { default } from "./src/components/setting/DynamicSettings.jsx";',
        resolveDir: process.cwd(),
        loader: 'jsx',
    },
    outfile: 'temp/default-tool-bulk-controls-test.mjs',
    bundle: true,
    format: 'esm',
    platform: 'node',
    packages: 'external',
    jsx: 'automatic',
    plugins: [{
        name: 'default-tool-controls',
        setup(builder) {
            builder.onResolve({ filter: /^react(?:\/|$)/ }, ({ path }) => ({ path, external: true }));
            builder.onResolve({ filter: /^@\/features\/tools\/toolPermissions\.js$/ }, () => ({
                path: `${process.cwd()}/src/features/tools/toolPermissions.js`,
            }));
            builder.onResolve({ filter: /^@\// }, ({ path }) => ({ path, namespace: 'mock' }));
            builder.onResolve({ filter: /^\.\/(OrderedOptionsEditor|JsonConfigEditor|TempCacheCleanup)\.jsx$/ }, ({ path }) => ({
                path, namespace: 'mock',
            }));
            builder.onLoad({ filter: /.*/, namespace: 'mock' }, ({ path }) => {
                if (path.endsWith('/dialog') || path.endsWith('/alert-dialog') || path.endsWith('/button')) {
                    return { contents: mockControls, loader: 'jsx' };
                }
                return {
                    contents: `
                        export default function Stub() { return null; }
                        export const formatLocalTimestamp = () => '';
                        export const resolveResourceUrl = (value) => value;
                        export const apiEndpoint = (value) => value;
                        export const BASE_BACKEND_URL = '';
                        export const useUserStore = () => ({});
                        export const onEvent = () => ({ then() {} });
                        export const Switch = () => null;
                        export const Checkbox = () => null;
                        export const RadioGroup = () => null;
                        export const RadioGroupItem = () => null;
                        export const Slider = () => null;
                        export const Input = () => null;
                        export const Popover = () => null;
                        export const PopoverContent = () => null;
                        export const PopoverTrigger = () => null;
                    `,
                    loader: 'jsx',
                };
            });
        },
    }],
});

const { default: DynamicSettings } = await import('../temp/default-tool-bulk-controls-test.mjs');

const options = [{
    type: 'toolPermissionMatrix', name: 'defaultToolPermissions', text: '默认工具状态',
    modes: [
        { name: 'allow', text: '允许' },
        { name: 'ask', text: '询问' },
        { name: 'deny', text: '拒绝' },
    ],
    groups: [{
        id: 'tools', name: '工具', tools: [
            { name: 'read_alias', permissionKey: 'task.read', text: '读取任务', default: 'ask' },
            { name: 'write_alias', permissionKey: 'knowledge.write', text: '写入知识', default: 'ask' },
            { name: 'limited', permissionKey: 'limited', text: '受限工具', default: 'ask', allowedModes: ['allow', 'ask'] },
            { name: 'fixed', permissionKey: 'fixed', text: '固定工具', default: 'ask', locked: true },
        ],
    }],
}];

const initialValues = {
    defaultToolPermissions: {
        baseRevision: 7,
        fallbackMode: 'ask',
        permissions: { 'task.read': 'ask', 'knowledge.write': 'deny', limited: 'ask', fixed: 'ask' },
    },
};

async function mount() {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost', pretendToBeVisual: true });
    for (const key of ['window', 'document', 'HTMLElement', 'Node', 'Event']) globalThis[key] = dom.window[key];
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const changes = [];
    const root = createRoot(document.getElementById('root'));
    await act(async () => root.render(React.createElement(DynamicSettings, {
        config: options, initialValues, onChange: (value) => changes.push(value.defaultToolPermissions),
    })));
    return {
        changes,
        close: async () => { await act(async () => root.unmount()); dom.window.close(); },
    };
}

const button = (label) => [...document.querySelectorAll('button')].find((node) => node.textContent.trim() === label);
const click = async (element) => { assert.ok(element); await act(async () => element.click()); };

test('default tool all controls confirm allow, cancel safely, and apply ask/deny immediately', async () => {
    const ui = await mount();
    try {
        await click(button('全部允许'));
        assert.match(document.querySelector('[role="dialog"]')?.textContent || '', /确认全部允许/);
        assert.equal(ui.changes.length, 0, 'opening the warning must not edit permissions');
        await click(button('取消'));
        assert.equal(ui.changes.length, 0, 'cancel must preserve the original permissions');

        await click(button('全部允许'));
        await click(button('确认全部允许'));
        assert.deepEqual(ui.changes[0], {
            baseRevision: 7, fallbackMode: 'allow',
            permissions: { 'task.read': 'allow', 'knowledge.write': 'allow', limited: 'allow', fixed: 'ask' },
        });

        await click(button('全部询问'));
        assert.deepEqual(ui.changes[1], {
            baseRevision: 7, fallbackMode: 'ask',
            permissions: { 'task.read': 'ask', 'knowledge.write': 'ask', limited: 'ask', fixed: 'ask' },
        });

        await click(button('全部拒绝'));
        assert.deepEqual(ui.changes[2], {
            baseRevision: 7, fallbackMode: 'deny',
            permissions: { 'task.read': 'deny', 'knowledge.write': 'deny', limited: 'ask', fixed: 'ask' },
        });
    } finally {
        await ui.close();
    }
});
