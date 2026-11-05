import {memo, useCallback, useContext, useEffect, useState} from 'react';
import {StreamingTextContext} from './streamingTextContext.js';

const FADE_MS = 180;
const MAX_FADING_CHUNKS = 8;
const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, {granularity: 'grapheme'}) : null;

const appendBoundary = (text, boundary) => {
    if (segmenter) {
        const offset = Math.max(0, boundary - 64);
        for (const part of segmenter.segment(text.slice(offset))) {
            const start = offset + part.index;
            if (start >= boundary) break;
            if (start + part.segment.length > boundary) return start;
        }
    }
    // Do not split a surrogate pair even on engines without Intl.Segmenter.
    if (boundary > 0 && /[\uD800-\uDBFF]/.test(text[boundary - 1]) && /[\uDC00-\uDFFF]/.test(text[boundary] || '')) return boundary - 1;
    return boundary;
};

const initialState = (text, animate) => ({text, prefix: animate ? '' : text, sequence: animate ? 1 : 0,
    chunks: animate && text ? [{id: 1, text, createdAt: Date.now()}] : []});

/** Fade received text batches only; completed content has no extra DOM wrappers. */
const StreamingText = memo(({text = ''}) => {
    const {enabled, animateMount} = useContext(StreamingTextContext);
    const [state, setState] = useState(() => initialState(text, enabled && animateMount));
    let current = state;
    if (state.text !== text || (!enabled && state.chunks.length)) {
        if (enabled && text.startsWith(state.text) && text.length > state.text.length) {
            const boundary = appendBoundary(text, state.text.length);
            const sequence = state.sequence + 1;
            let prefix = boundary === state.text.length ? state.prefix : text.slice(0, boundary);
            const chunks = boundary === state.text.length ? [...state.chunks] : [];
            chunks.push({id: sequence, text: text.slice(boundary), createdAt: Date.now()});
            while (chunks.length > MAX_FADING_CHUNKS) prefix += chunks.shift().text;
            current = {text, prefix, chunks, sequence};
        } else current = initialState(text, false);
        // Reconcile this component's own received text, never append fake tokens
        // on an interval or put the already-visible prefix through another fade.
        setState(current);
    }
    const finish = useCallback((id) => setState((value) => {
        const chunks = value.chunks.map((chunk) => chunk.id === id ? {...chunk, done: true} : chunk);
        let prefix = value.prefix;
        while (chunks[0]?.done) prefix += chunks.shift().text;
        return {...value, prefix, chunks};
    }), []);
    const firstId = current.chunks[0]?.id;
    const firstCreatedAt = current.chunks[0]?.createdAt;
    useEffect(() => {
        if (firstId === undefined) return;
        // Background tabs/reduced motion may never dispatch animationend.
        const timer = setTimeout(() => finish(firstId), Math.max(0, firstCreatedAt + FADE_MS - Date.now()));
        return () => clearTimeout(timer);
    }, [firstId, firstCreatedAt, finish]);
    return <>{current.prefix}{current.chunks.map((chunk) => <span key={chunk.id} className="cwm-stream-token"
        data-stream-token={chunk.id} onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) finish(chunk.id);
        }}>{chunk.text}</span>)}</>;
});
StreamingText.displayName = 'StreamingText';
export default StreamingText;
