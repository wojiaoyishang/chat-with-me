import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { MergeView } from '@codemirror/merge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { connectDiffBlocks } from './diffConnections.js';

export default function DocumentDiff({ before, current, versionLabel }) {
    const { t } = useTranslation();
    const host = useRef(null);
    const merge = useRef(null);
    const position = useRef(-1);
    const [count, setCount] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        const extensions = [
            EditorState.readOnly.of(true),
            EditorView.editable.of(false),
            lineNumbers(),
            markdown(),
            syntaxHighlighting(defaultHighlightStyle),
            EditorView.theme({
                '&': { color: 'var(--foreground)', background: 'transparent' },
                '.cm-scroller': {
                    fontFamily: 'Consolas, "SFMono-Regular", "Microsoft YaHei", monospace',
                    fontSize: '13px',
                },
                '.cm-line': { lineHeight: '1.8' },
                '.cm-gutters': { background: 'var(--muted)', color: 'var(--muted-foreground)', border: 'none' },
                '&.cm-merge-a .cm-changedLine, &.cm-merge-b .cm-changedLine': { background: 'rgb(59 130 246 / 10%)' },
                '&.cm-merge-a .cm-changedText, &.cm-merge-b .cm-changedText': {
                    background: 'rgb(59 130 246 / 20%) !important',
                    textDecoration: 'none',
                },
                '.cm-deletedText': { background: 'rgb(239 68 68 / 20%)' },
                '.cm-insertedText': { background: 'rgb(34 197 94 / 20%)' },
            }),
        ];
        const view = new MergeView({
            parent: host.current,
            a: { doc: before, extensions },
            b: { doc: current, extensions },
            highlightChanges: true,
            gutter: true,
            collapseUnchanged: collapsed ? { margin: 3, minSize: 8 } : undefined,
        });
        merge.current = view;
        for (const [editor, label] of [
            [view.a, t('documents_historical_version')],
            [view.b, t('documents_current_content')],
        ]) {
            const heading = document.createElement('div');
            heading.className = 'border-b bg-muted/30 px-3 py-2 text-xs md:hidden';
            heading.textContent = label;
            editor.dom.prepend(heading);
        }
        position.current = -1;
        setCount(view.chunks.length);
        const disconnect = connectDiffBlocks(view, host.current);
        return () => {
            disconnect();
            merge.current = null;
            view.destroy();
        };
    }, [before, current, collapsed, t]);
    const navigate = (step) => {
        const view = merge.current;
        if (!view?.chunks.length) return;
        position.current =
            position.current < 0
                ? step > 0
                    ? 0
                    : view.chunks.length - 1
                : (position.current + step + view.chunks.length) % view.chunks.length;
        const chunk = view.chunks[position.current];
        for (const [editor, from] of [
            [view.a, chunk.fromA],
            [view.b, chunk.fromB],
        ]) {
            editor.dispatch({
                effects: EditorView.scrollIntoView(Math.min(from, editor.state.doc.length), { y: 'center' }),
            });
        }
    };
    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex shrink-0 flex-wrap items-center gap-1 border-b px-3 py-2">
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={!count}
                    aria-label={t('documents_previous_change')}
                    title={t('documents_previous_change')}
                    onClick={() => navigate(-1)}
                >
                    <ArrowUp className="size-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={!count}
                    aria-label={t('documents_next_change')}
                    title={t('documents_next_change')}
                    onClick={() => navigate(1)}
                >
                    <ArrowDown className="size-4" />
                </Button>
                <Button
                    size="sm"
                    variant={collapsed ? 'secondary' : 'ghost'}
                    aria-pressed={collapsed}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {t('documents_only_changes')}
                </Button>
                <span className="ml-auto text-xs text-muted-foreground">
                    {t('documents_difference_count', { count })}
                </span>
            </div>
            <div className="hidden shrink-0 grid-cols-2 border-b bg-muted/30 text-xs md:grid">
                <span className="truncate border-r px-3 py-2">
                    {t('documents_historical_version')} · {versionLabel}
                </span>
                <span className="px-3 py-2">{t('documents_current_content')}</span>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden">
                <div
                    ref={host}
                    className="h-full overflow-auto [&_.cm-mergeView]:min-h-full [&_.cm-mergeViewEditors]:min-h-full [&_.cm-mergeViewEditors]:flex-col md:[&_.cm-mergeViewEditors]:flex-row md:[&_.cm-mergeViewEditors]:gap-9 [&_.cm-mergeViewEditor]:w-full md:[&_.cm-mergeViewEditor]:w-1/2"
                />
            </div>
        </div>
    );
}
