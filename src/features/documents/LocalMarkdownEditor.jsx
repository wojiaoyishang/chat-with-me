import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, drawSelection } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, undo, redo } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { Bold, Italic, Heading2, List, Code, Undo2, Redo2, Eye, Columns2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { prefixLines, wrapSelection } from './commands.js';

// Local mode shares Markdown syntax and editing commands with document editing,
// without creating a collaborative resource or exposing document operations.
export default function LocalMarkdownEditor({
    value = '',
    onChange,
    readOnly = false,
    autoFocus = false,
    onEditorKeyDown,
}) {
    const { t } = useTranslation();
    const host = useRef(null);
    const editor = useRef(null);
    const callbacks = useRef({ onChange, onEditorKeyDown });
    callbacks.current = { onChange, onEditorKeyDown };
    const [previewOpen, setPreviewOpen] = useState(false);
    const preview = useDeferredValue(value);
    useEffect(() => {
        const view = new EditorView({
            parent: host.current,
            state: EditorState.create({
                doc: value,
                extensions: [
                    markdown(),
                    syntaxHighlighting(defaultHighlightStyle),
                    lineNumbers(),
                    drawSelection(),
                    history(),
                    keymap.of([...defaultKeymap, ...historyKeymap]),
                    EditorView.lineWrapping,
                    EditorState.readOnly.of(readOnly),
                    EditorView.editable.of(!readOnly),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged && !readOnly) callbacks.current.onChange?.(update.state.doc.toString());
                    }),
                    EditorView.domEventHandlers({
                        keydown: (event) => {
                            event.stopPropagation();
                            callbacks.current.onEditorKeyDown?.(event);
                            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's')
                                event.preventDefault();
                            return event.defaultPrevented;
                        },
                    }),
                    EditorView.theme({
                        '&': { height: '100%', background: 'transparent', color: 'inherit' },
                        '.cm-scroller': { overflow: 'auto', fontFamily: 'ui-monospace, Consolas, monospace' },
                        '.cm-content': { padding: '16px 12px', minHeight: '100%' },
                        '.cm-gutters': { background: 'transparent', border: 'none', color: '#999' },
                    }),
                ],
            }),
        });
        editor.current = view;
        if (autoFocus && !readOnly) {
            view.dispatch({ selection: { anchor: view.state.doc.length } });
            view.focus();
        }
        return () => {
            editor.current = null;
            view.destroy();
        };
        // Changes to text are synchronized below without rebuilding undo history.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readOnly, autoFocus]);
    useEffect(() => {
        const view = editor.current;
        if (view && view.state.doc.toString() !== value)
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    }, [value]);
    const tools = [
        ['documents_undo', Undo2, undo],
        ['documents_redo', Redo2, redo],
        ['documents_heading', Heading2, (view) => prefixLines(view, '## ')],
        ['documents_bold', Bold, (view) => wrapSelection(view, '**', '**', t('documents_text'))],
        ['documents_italic', Italic, (view) => wrapSelection(view, '*', '*', t('documents_text'))],
        ['documents_bullet_list', List, (view) => prefixLines(view, '- ')],
        ['documents_code', Code, (view) => wrapSelection(view, '`', '`', t('documents_code'))],
    ];
    return (
        <div className="flex h-full min-h-0 flex-col rounded-lg border bg-background text-foreground">
            <div className="flex shrink-0 items-center gap-1 border-b p-1.5">
                {!readOnly &&
                    tools.map(([label, Icon, run]) => (
                        <Button
                            key={label}
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            title={t(label)}
                            aria-label={t(label)}
                            onClick={() => {
                                if (editor.current) {
                                    run(editor.current);
                                    editor.current.focus();
                                }
                            }}
                        >
                            <Icon className="size-4" />
                        </Button>
                    ))}
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto size-8"
                    title={t('documents_preview')}
                    aria-label={t('documents_preview')}
                    aria-pressed={previewOpen}
                    onClick={() => setPreviewOpen(!previewOpen)}
                >
                    {previewOpen ? <Columns2 className="size-4" /> : <Eye className="size-4" />}
                </Button>
            </div>
            <div className="flex min-h-0 flex-1">
                <div ref={host} className="min-w-0 flex-1 overflow-hidden" />
                {previewOpen && (
                    <div className="min-w-0 flex-1 overflow-auto border-l p-5">
                        <MarkdownRenderer content={preview} renderSurface="document-preview" />
                    </div>
                )}
            </div>
        </div>
    );
}
