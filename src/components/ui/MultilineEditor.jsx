import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { createMultilineEditor } from '@cwm/json-config-editor';

/** The same plain-text editor used by backend chunk previews and JSON form fields. */
const MultilineEditor = forwardRef(function MultilineEditor({
    value = '', onChange, label = '文本', rows = 6, readOnly = false, disabled = false,
    placeholder = '', className = '', id, name, required, maxLength, minLength, autoFocus,
    'aria-label': ariaLabel, onBlur, onFocus,
}, ref) {
    const host = useRef(null), controller = useRef(null), callbacks = useRef({ onChange, onBlur, onFocus });
    callbacks.current = { onChange, onBlur, onFocus };
    useEffect(() => {
        const editor = createMultilineEditor({ document: host.current.ownerDocument, onChange: (_value, event) => callbacks.current.onChange?.(event) });
        controller.current = editor; host.current.append(editor.root);
        const blur = event => callbacks.current.onBlur?.(event), focus = event => callbacks.current.onFocus?.(event);
        editor.input.addEventListener('blur', blur); editor.input.addEventListener('focus', focus);
        return () => { editor.input.removeEventListener('blur', blur); editor.input.removeEventListener('focus', focus); editor.destroy(); controller.current = null; };
    }, []);
    useEffect(() => {
        const editor = controller.current; if (!editor) return;
        editor.setOptions({ value, label, rows, readOnly, placeholder });
        const input = editor.input; input.disabled = disabled; input.required = Boolean(required);
        for (const [key, next] of Object.entries({ id, name, maxLength, minLength })) {
            if (next == null) input.removeAttribute(key); else input.setAttribute(key, String(next));
        }
        input.setAttribute('aria-label', ariaLabel || label);
    }, [value, label, rows, readOnly, placeholder, disabled, required, id, name, maxLength, minLength, ariaLabel]);
    useEffect(() => { if (autoFocus) controller.current?.input.focus(); }, [autoFocus]);
    useImperativeHandle(ref, () => ({ focus: () => controller.current?.input.focus(), select: () => controller.current?.selectAll(), getValue: () => controller.current?.getValue() }), []);
    return <div ref={host} className={className} />;
});
export default MultilineEditor;
