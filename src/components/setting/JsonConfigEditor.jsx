import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { mount } from '@cwm/json-config-editor';

const EMPTY_SCHEMA = {};

/** Shared DOM editor used by React and backend-owned management pages. */
const JsonConfigEditor = forwardRef(function JsonConfigEditor({
    value, onChange, schema = EMPTY_SCHEMA, uiSchema, widgets,
    storage = 'value', defaultMode = 'form', readOnly = false,
    validate, label, onStateChange, onSave, className = '', resetKey,
}, ref) {
    const host = useRef(null);
    const controller = useRef(null);
    const callbacks = useRef({ onChange, onStateChange, onSave });
    const draftRef = useRef('');
    callbacks.current = { onChange, onStateChange, onSave };
    const data = useMemo(() => storage === 'json-string' ? { text: typeof value === 'string' ? value : value === undefined ? '' : JSON.stringify(value) } : { value }, [value, storage]);
    useEffect(() => {
        controller.current = mount(host.current, {
            ...data, schema, uiSchema, widgets, defaultMode, readOnly, validate, label,
            onChange: (next) => callbacks.current.onChange?.(storage === 'json-string' ? draftRef.current : next),
            onDraftChange: (draft) => { draftRef.current = draft; },
            onStateChange: (state) => callbacks.current.onStateChange?.(state),
            onSave: () => callbacks.current.onSave?.(),
        });
        return () => { controller.current?.destroy(); controller.current = null; };
        // A scene change explicitly resets its editor; value echoes preserve drafts and history.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage, resetKey]);
    useEffect(() => { controller.current?.setOptions({ ...data, schema, uiSchema, widgets, readOnly, validate, label }); }, [data, schema, uiSchema, widgets, readOnly, validate, label]);
    useImperativeHandle(ref, () => ({
        getValue: () => controller.current?.getValue(),
        getState: () => controller.current?.getState(),
        setDraft: (text) => controller.current?.setDraft(text),
        markSaved: () => controller.current?.markSaved(),
    }), []);
    return <div ref={host} className={className} data-json-storage={storage} />;
});
export default JsonConfigEditor;
