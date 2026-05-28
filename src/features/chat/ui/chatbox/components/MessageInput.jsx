import React, {memo, useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import ThreeDotLoading from '@/components/ui/ThreeDotLoading.jsx';

const MIN_TEXTAREA_HEIGHT = 48;
const MAX_TEXTAREA_HEIGHT = 512;
const MIN_ANIMATION_DURATION = 180;
const MAX_ANIMATION_DURATION = 560;

const easeInOutCubic = (t) => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const getMotionPreference = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const MessageInput = memo(({
                               value,
                               onChange,
                               onPaste,
                               onKeyDown,
                               isReadOnly,
                               placeholder,
                               textareaRef,
                               isEditMessage,
                               isVoiceRecording = false,
                               isVoiceRecognizing = false,
                               voiceWaveformLevels = [],
                               voiceRecordingLabel = 'Voice input in progress',
                               voiceRecognizingLabel = 'Recognizing voice input',
                               voiceRecognizingText = 'Recognizing...',
                           }) => {
    const cloneTextareaRef = useRef(null);
    const animationFrameRef = useRef(null);
    const isFirstAdjustRef = useRef(true);
    const lastMeasuredWidthRef = useRef(0);

    const cancelHeightAnimation = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

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
            minHeight: '0',
            maxHeight: 'none',
            resize: 'none',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: '-1',
        });
        document.body.appendChild(clone);
        cloneTextareaRef.current = clone;
    }, [textareaRef]);

    const cleanupTextareaClone = useCallback(() => {
        cancelHeightAnimation();
        if (cloneTextareaRef.current) {
            document.body.removeChild(cloneTextareaRef.current);
            cloneTextareaRef.current = null;
        }
    }, [cancelHeightAnimation]);

    const getTextareaHeightMetrics = useCallback(() => {
        const textarea = textareaRef.current;
        const clone = cloneTextareaRef.current;
        if (!textarea || !clone) return null;

        const computedStyle = getComputedStyle(textarea);
        clone.value = textarea.value || ' ';
        clone.style.width = `${textarea.offsetWidth}px`;
        clone.style.fontFamily = computedStyle.fontFamily;
        clone.style.fontSize = computedStyle.fontSize;
        clone.style.fontWeight = computedStyle.fontWeight;
        clone.style.letterSpacing = computedStyle.letterSpacing;
        clone.style.lineHeight = computedStyle.lineHeight;
        clone.style.padding = computedStyle.padding;
        clone.style.border = computedStyle.border;
        clone.style.boxSizing = computedStyle.boxSizing;
        clone.style.whiteSpace = computedStyle.whiteSpace;
        clone.style.wordBreak = computedStyle.wordBreak;
        clone.style.overflowWrap = computedStyle.overflowWrap;
        clone.style.height = 'auto';

        const contentHeight = Math.max(MIN_TEXTAREA_HEIGHT, clone.scrollHeight);
        const targetHeight = Math.min(contentHeight, MAX_TEXTAREA_HEIGHT);

        return {contentHeight, targetHeight};
    }, [textareaRef]);

    const settleTextarea = useCallback((textarea, contentHeight, targetHeight) => {
        textarea.style.height = `${targetHeight}px`;
        textarea.style.overflowY = contentHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';

        if (contentHeight > MAX_TEXTAREA_HEIGHT && document.activeElement === textarea) {
            textarea.scrollTop = textarea.scrollHeight;
        }
    }, []);

    const adjustTextareaHeight = useCallback((options = {}) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        initTextareaClone();
        const metrics = getTextareaHeightMetrics();
        if (!metrics) return;

        const {contentHeight, targetHeight} = metrics;
        const currentHeight = textarea.getBoundingClientRect().height || MIN_TEXTAREA_HEIGHT;
        const delta = targetHeight - currentHeight;
        const shouldJump =
            options.immediate ||
            isFirstAdjustRef.current ||
            getMotionPreference() ||
            Math.abs(delta) < 2;

        cancelHeightAnimation();

        if (shouldJump) {
            textarea.style.transition = 'none';
            settleTextarea(textarea, contentHeight, targetHeight);
            isFirstAdjustRef.current = false;
            return;
        }

        textarea.style.transition = 'none';
        textarea.style.overflowY = 'hidden';

        const startTime = performance.now();
        const duration = Math.min(
            MAX_ANIMATION_DURATION,
            Math.max(MIN_ANIMATION_DURATION, Math.abs(delta) * 2.4)
        );

        const tick = (now) => {
            const progress = Math.min(1, (now - startTime) / duration);
            const easedProgress = easeInOutCubic(progress);
            const nextHeight = currentHeight + delta * easedProgress;

            textarea.style.height = `${nextHeight}px`;

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(tick);
                return;
            }

            animationFrameRef.current = null;
            settleTextarea(textarea, contentHeight, targetHeight);
        };

        animationFrameRef.current = requestAnimationFrame(tick);
        isFirstAdjustRef.current = false;
    }, [cancelHeightAnimation, getTextareaHeightMetrics, initTextareaClone, settleTextarea, textareaRef]);

    useEffect(() => {
        initTextareaClone();
        return cleanupTextareaClone;
    }, [initTextareaClone, cleanupTextareaClone]);

    useLayoutEffect(() => {
        if (!isVoiceRecording && !isVoiceRecognizing) {
            adjustTextareaHeight({immediate: true});
        }
    }, [value, isEditMessage, isVoiceRecording, isVoiceRecognizing, adjustTextareaHeight]);

    useEffect(() => {
        if (isVoiceRecording || isVoiceRecognizing) return undefined;

        const textarea = textareaRef.current;
        if (!textarea || typeof ResizeObserver === 'undefined') return undefined;

        lastMeasuredWidthRef.current = textarea.offsetWidth;
        const observer = new ResizeObserver((entries) => {
            const nextWidth = entries[0]?.contentRect?.width ?? textarea.offsetWidth;
            if (Math.abs(nextWidth - lastMeasuredWidthRef.current) < 1) return;
            lastMeasuredWidthRef.current = nextWidth;
            adjustTextareaHeight({immediate: true});
        });

        observer.observe(textarea);
        return () => observer.disconnect();
    }, [adjustTextareaHeight, isVoiceRecording, isVoiceRecognizing, textareaRef]);

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    const handlePaste = useCallback((e) => {
        onPaste?.(e);

        if (!e.defaultPrevented) {
            requestAnimationFrame(() => adjustTextareaHeight());
        }
    }, [adjustTextareaHeight, onPaste]);

    if (isVoiceRecording || isVoiceRecognizing) {
        if (isVoiceRecognizing) {
            return (
                <div
                    className="flex min-h-[48px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 px-4 py-3"
                    role="status"
                    aria-live="polite"
                    aria-label={voiceRecognizingLabel}
                >
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                        <ThreeDotLoading/>
                        <span>{voiceRecognizingText}</span>
                    </div>
                </div>
            );
        }

        const bars = voiceWaveformLevels?.length
            ? voiceWaveformLevels
            : Array.from({length: 56}, () => 0);

        return (
            <div
                className="flex min-h-[48px] w-full items-center overflow-hidden rounded-xl bg-gray-50 px-4 py-3"
                role="status"
                aria-live="polite"
                aria-label={voiceRecordingLabel}
            >
                <div className="flex h-12 w-full items-center gap-[3px]" aria-hidden="true">
                    {bars.map((level, index) => {
                        const normalizedLevel = Math.max(0, Math.min(1, Number(level) || 0));
                        const height = 4 + normalizedLevel * 42;
                        const opacity = 0.28 + normalizedLevel * 0.62;

                        return (
                            <span
                                key={index}
                                className="block flex-1 rounded-full bg-gray-700"
                                style={{
                                    height: `${height}px`,
                                    opacity,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onPaste={handlePaste}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[48px] max-h-[512px] p-4 pt-4 pb-2 pr-4 text-gray-800 bg-transparent border-none resize-none outline-none pretty-scrollbar"
            rows={1}
            readOnly={isReadOnly}
            style={{overflowY: 'hidden', willChange: 'height'}}
        />
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.isReadOnly === nextProps.isReadOnly &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.isEditMessage === nextProps.isEditMessage &&
        prevProps.isVoiceRecording === nextProps.isVoiceRecording &&
        prevProps.isVoiceRecognizing === nextProps.isVoiceRecognizing &&
        prevProps.voiceWaveformLevels === nextProps.voiceWaveformLevels &&
        prevProps.voiceRecordingLabel === nextProps.voiceRecordingLabel &&
        prevProps.voiceRecognizingLabel === nextProps.voiceRecognizingLabel &&
        prevProps.voiceRecognizingText === nextProps.voiceRecognizingText &&
        prevProps.onChange === nextProps.onChange &&
        prevProps.onPaste === nextProps.onPaste &&
        prevProps.onKeyDown === nextProps.onKeyDown
    );
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;