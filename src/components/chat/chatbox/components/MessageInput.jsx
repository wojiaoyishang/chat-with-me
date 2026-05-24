import React, {memo, useCallback, useEffect, useRef} from 'react';

const MessageInput = memo(({
                               value,
                               onChange,
                               onPaste,
                               onKeyDown,
                               isReadOnly,
                               placeholder,
                               textareaRef,
                               isEditMessage,
                           }) => {
    const cloneTextareaRef = useRef(null);

    const initTextareaClone = useCallback(() => {
        if (cloneTextareaRef.current) return;
        const textarea = textareaRef.current;
        if (!textarea) return;
        const clone = textarea.cloneNode();
        Object.assign(clone.style, {
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
            visibility: 'hidden',
            height: 'auto',
            resize: 'none',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: '-1',
        });
        document.body.appendChild(clone);
        cloneTextareaRef.current = clone;
    }, [textareaRef]);

    const cleanupTextareaClone = useCallback(() => {
        if (cloneTextareaRef.current) {
            document.body.removeChild(cloneTextareaRef.current);
            cloneTextareaRef.current = null;
        }
    }, []);

    const adjustTextareaHeight = useCallback(() => {
        const textarea = textareaRef.current;
        const clone = cloneTextareaRef.current;
        if (!textarea || !clone) return;

        clone.value = textarea.value;
        clone.style.width = textarea.offsetWidth + 'px';
        const computedStyle = getComputedStyle(textarea);
        clone.style.fontFamily = computedStyle.fontFamily;
        clone.style.fontSize = computedStyle.fontSize;
        clone.style.lineHeight = computedStyle.lineHeight;
        clone.style.padding = computedStyle.padding;
        clone.style.border = computedStyle.border;
        clone.style.boxSizing = computedStyle.boxSizing;

        const contentHeight = clone.scrollHeight;
        const cappedHeight = Math.min(contentHeight, 512);
        textarea.style.height = cappedHeight + 'px';
        textarea.style.overflowY = contentHeight > 48 ? 'scroll' : 'auto';
    }, [textareaRef]);

    useEffect(() => {
        initTextareaClone();
        return cleanupTextareaClone;
    }, [initTextareaClone, cleanupTextareaClone]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [value, isEditMessage, adjustTextareaHeight]);

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[48px] max-h-[132px] p-4 pt-4 pb-2 pr-4 text-gray-800 bg-transparent border-none resize-none outline-none pretty-scrollbar"
            rows={1}
            readOnly={isReadOnly}
            style={{transition: 'height 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}
        />
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.isReadOnly === nextProps.isReadOnly &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.isEditMessage === nextProps.isEditMessage &&
        prevProps.onChange === nextProps.onChange &&
        prevProps.onPaste === nextProps.onPaste &&
        prevProps.onKeyDown === nextProps.onKeyDown
    );
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;
