import MDEditor from '@uiw/react-md-editor';
import styles from './SimpleMDEditor.module.css';
import React, {useCallback} from 'react';

function SimpleMDEditor({
                            text,
                            setText,
                            readOnly = false,
                            autoFocus = false,
                            onEditorKeyDown,
                        }) {
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

    return (
        <div className={styles.editorWrapper} data-color-mode="light">
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
