import MDEditor from '@uiw/react-md-editor';
import styles from './SimpleMDEditor.module.css';
import React, { useRef, useEffect } from 'react';

function SimpleMDEditor({ text, setText }) {
    const editorRef = useRef(null);


    return (
        <div className={styles.editorWrapper}>
            <MDEditor
                value={text}
                onChange={setText}
                preview="edit"
                visibleDragbar={false}
                height="100%"
                textareaProps={{
                    spellCheck: false
                }}
                ref={editorRef}
            />
        </div>
    );
}

export default SimpleMDEditor;