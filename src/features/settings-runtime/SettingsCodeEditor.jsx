import { useEffect, useRef, useState } from 'react';
import { Annotation, Compartment, EditorState, Prec, Transaction } from '@codemirror/state';
import { drawSelection, EditorView, keymap, lineNumbers, placeholder as editorPlaceholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab, redo, redoDepth, undo, undoDepth } from '@codemirror/commands';
import { defaultHighlightStyle, indentUnit, syntaxHighlighting } from '@codemirror/language';
import { Redo2, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { codeEditorLanguage } from './codeEditorLanguage.js';

const externalValue = Annotation.define();

/** Patch only the changed range so unaffected selections and undo entries can be mapped. */
function replaceExternalValue(view, value) {
    const current = view.state.doc.toString();
    if (current === value) return;
    let from = 0;
    let oldEnd = current.length;
    let newEnd = value.length;
    while (from < oldEnd && from < newEnd && current[from] === value[from]) from++;
    while (oldEnd > from && newEnd > from && current[oldEnd - 1] === value[newEnd - 1]) { oldEnd--; newEnd--; }
    view.dispatch({ changes: { from, to: oldEnd, insert: value.slice(from, newEnd) },
        annotations: [externalValue.of(true), Transaction.addToHistory.of(false)] });
}

/** A lazy, controlled code field; language support colors text without executing it. */
export default function SettingsCodeEditor({ item, value, onChange, disabled = false }) {
    const host = useRef(null);
    const editor = useRef(null);
    const configuration = useRef(new Compartment());
    const callbacks = useRef({ onChange });
    const pendingExternal = useRef(null);
    const composing = useRef(false);
    const compositionTimer = useRef(null);
    const [available, setAvailable] = useState({ undo: false, redo: false });
    callbacks.current = { onChange };
    const text = typeof value === 'string' ? value : '';
    const locked = disabled || item.readOnly === true;
    const height = Math.min(640, Math.max(160, Number(item.editorHeight) || 260));
    const language = item.language === 'jinja2' ? 'jinja2' : 'text';
    const label = item.text || String(item.name || '代码');
    const maxLength = Number.isSafeInteger(item.maxLength) && item.maxLength > 0 ? item.maxLength : Infinity;
    const placeholder = typeof item.placeholder === 'string' ? item.placeholder : '';

    const fieldExtensions = () => [
        EditorState.readOnly.of(locked), EditorView.editable.of(!locked),
        EditorView.contentAttributes.of({ 'aria-label': label, 'aria-multiline': 'true', 'aria-readonly': String(locked) }),
        codeEditorLanguage(language), editorPlaceholder(placeholder),
        EditorState.transactionFilter.of((transaction) => transaction.docChanged && !transaction.annotation(externalValue)
            && transaction.newDoc.length > maxLength && transaction.newDoc.length > transaction.startState.doc.length ? [] : transaction),
    ];

    useEffect(() => {
        const view = new EditorView({ parent: host.current, state: EditorState.create({ doc: text, extensions: [
            lineNumbers(), drawSelection(), history(), indentUnit.of('  '),
            keymap.of([indentWithTab, { key: 'Mod-Shift-z', run: redo }, ...defaultKeymap, ...historyKeymap]),
            syntaxHighlighting(defaultHighlightStyle), EditorView.lineWrapping,
            configuration.current.of(fieldExtensions()),
            EditorView.updateListener.of((update) => {
                if (update.docChanged && !update.transactions.some((transaction) => transaction.annotation(externalValue))
                    && !update.state.readOnly && pendingExternal.current === null)
                    callbacks.current.onChange?.(update.state.doc.toString());
                const next = { undo: undoDepth(update.state) > 0, redo: redoDepth(update.state) > 0 };
                setAvailable((previous) => previous.undo === next.undo && previous.redo === next.redo ? previous : next);
            }),
            Prec.highest(EditorView.domEventHandlers({
                keydown(event, view) {
                    // Escape releases Tab to browser focus navigation instead of trapping users in indentation.
                    if (event.key === 'Escape') { view.setTabFocusMode(2000); event.stopPropagation(); event.preventDefault(); return true; }
                    // Editor shortcuts must not become chat commands; save remains available to the containing form.
                    if (!((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's')) event.stopPropagation();
                    return false;
                },
                compositionstart() { composing.current = true; return false; },
                compositionend() {
                    composing.current = false;
                    clearTimeout(compositionTimer.current);
                    compositionTimer.current = setTimeout(() => {
                        if (editor.current !== view || pendingExternal.current === null) return;
                        const next = pendingExternal.current;
                        pendingExternal.current = null;
                        replaceExternalValue(view, next);
                    }, 50);
                    return false;
                },
            })),
            EditorView.theme({
                '&': { height: '100%', background: 'transparent', color: 'inherit', fontSize: '13px' },
                '&.cm-focused': { outline: 'none' },
                '.cm-scroller': { overflow: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace' },
                '.cm-content': { padding: '10px 0', minHeight: '100%', caretColor: 'currentColor' },
                '.cm-line': { padding: '0 12px', lineHeight: '1.7' },
                '.cm-gutters': { background: 'var(--muted)', color: 'var(--muted-foreground)', border: 'none', minWidth: '36px' },
                '.cm-gutterElement': { padding: '0 8px 0 4px' },
                '.cm-cursor': { borderLeftColor: 'currentColor' },
                '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { background: 'color-mix(in srgb, var(--primary) 18%, transparent)' },
            }),
        ] }) });
        editor.current = view;
        return () => {
            clearTimeout(compositionTimer.current);
            pendingExternal.current = null;
            editor.current = null;
            view.destroy();
        };
        // Keep one view and its history for this field; configuration and values update below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        editor.current?.dispatch({ effects: configuration.current.reconfigure(fieldExtensions()) });
        // Reconfigure finite field properties without replacing the document or undo history.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locked, language, label, maxLength, placeholder]);

    useEffect(() => {
        const view = editor.current;
        if (!view) return;
        if (view.state.doc.toString() === text) { pendingExternal.current = null; return; }
        if (composing.current || view.composing) pendingExternal.current = text;
        else { pendingExternal.current = null; replaceExternalValue(view, text); }
    }, [text]);

    const command = (run) => { if (editor.current && !locked) { run(editor.current); editor.current.focus(); } };
    return <div data-settings-code-editor={language} className="min-w-0 overflow-hidden rounded-md border bg-background text-foreground focus-within:ring-2 focus-within:ring-ring/30">
        <div className="flex h-9 items-center gap-1 border-b bg-muted/30 px-2">
            <span className="mr-auto text-xs text-muted-foreground">{language === 'jinja2' ? 'Jinja2' : '纯文本'}</span>
            <Button type="button" variant="ghost" size="icon" className="size-7" title="撤销" aria-label="撤销" disabled={locked || !available.undo} onClick={() => command(undo)}><Undo2 className="size-3.5" /></Button>
            <Button type="button" variant="ghost" size="icon" className="size-7" title="重做" aria-label="重做" disabled={locked || !available.redo} onClick={() => command(redo)}><Redo2 className="size-3.5" /></Button>
        </div>
        <div ref={host} style={{ height }} className="min-w-0" />
        <div className="border-t px-3 py-1.5 text-[11px] leading-5 text-muted-foreground">Tab / Shift+Tab 缩进 · Ctrl / ⌘+Z 撤销 · Ctrl+Y / ⌘+Shift+Z 重做 · Esc 后 Tab 移出</div>
    </div>;
}
