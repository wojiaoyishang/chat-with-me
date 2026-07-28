import MDEditor from '@uiw/react-md-editor';
import styles from './SimpleMDEditor.module.css';
import React, {useCallback, useRef} from 'react';

function SimpleMDEditor({
                            text,
                            setText,
                            readOnly = false,
                            autoFocus = false,
                            onEditorKeyDown,
                        }) {
    const editorWrapperRef = useRef(null);

    const handleChange = useCallback((nextValue) => {
        if (readOnly) return;
        setText?.(nextValue ?? '');
    }, [readOnly, setText]);

    const handleKeyDown = useCallback((event) => {
        // The fullscreen editor is rendered through a portal. Keyboard events from a
        // portal still bubble through the React tree, where ChatPage/ChatBox shortcuts
        // may consume them. Keep normal text editing inside the editor.
        event.stopPropagation();
        onEditorKeyDown?.(event);
    }, [onEditorKeyDown]);

    const handleEditorPointerDownCapture = useCallback((event) => {
        if (readOnly || event.button !== 0) return;

        const target = event.target;
        if (!(target instanceof Element)) return;

        // Toolbar controls and the real textarea keep their native pointer behavior.
        if (target.closest('textarea, button, a, input, select, [role="button"], .w-md-editor-toolbar')) {
            return;
        }

        // @uiw/react-md-editor can leave a blank strip where the input area is taller
        // than .w-md-editor-text. Clicking that strip targets a div instead of the
        // textarea, so explicitly hand focus to the editor and place the caret at end.
        if (!target.closest('.w-md-editor-content, .w-md-editor-area, .w-md-editor-text')) {
            return;
        }

        const textarea = editorWrapperRef.current?.querySelector('textarea.w-md-editor-text-input');
        if (!textarea) return;

        event.preventDefault();
        textarea.focus({preventScroll: true});
        const length = textarea.value?.length ?? 0;
        textarea.setSelectionRange?.(length, length);
    }, [readOnly]);

    return (
        <div
            ref={editorWrapperRef}
            className={styles.editorWrapper}
            data-color-mode="light"
            onPointerDownCapture={handleEditorPointerDownCapture}
        >
            <MDEditor
                value={typeof text === 'string' ? text : ''}
                onChange={handleChange}
                preview={readOnly ? 'preview' : 'edit'}
                visibleDragbar={false}
                height="100%"
                textareaProps={{
                    spellCheck: false,
                    readOnly,
                    autoFocus: autoFocus && !readOnly,
                    onKeyDown: handleKeyDown,
                }}
            />
        </div>
    );
}

export default SimpleMDEditor;
