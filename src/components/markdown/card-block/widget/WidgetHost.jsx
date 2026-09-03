import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
    Check,
    CheckCircle2,
    Layers3,
    Loader2,
    Send,
    X,
} from 'lucide-react';
import {toast} from 'sonner';

import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {generateUUID} from '@/lib/tools.jsx';
import {resolveCwmUrl} from '@/lib/virtualUrl.js';
import {useWidgetPresentation} from '@/features/chat/widgets/WidgetPresentationContext.jsx';
import {useBrowserBackLayer} from '@/lib/browserHistoryLayers.js';
import CanvasCardDeck from './CanvasCardDeck.jsx';

const parseWidget = (content) => {
    try {
        const value = JSON.parse(String(content || '{}'));
        return value && typeof value === 'object' ? value : {};
    } catch {
        return {};
    }
};

const getOptionValue = (option) => String(option?.value ?? option?.id ?? option ?? '');
const getOptionLabel = (option) => String(option?.label ?? option?.text ?? option?.value ?? option ?? '');

const INQUIRY_WIDGET_TYPES = new Set(['input', 'choice', 'confirm']);
let immersiveScrollLockCount = 0;
let immersivePreviousBodyOverflow = '';
let immersivePreviousBodyTouchAction = '';
let immersivePreviousBodyOverscrollBehavior = '';
let immersivePreviousHtmlOverscrollBehavior = '';
let immersiveBackgroundSnapshots = [];

const resolveWidgetImageUrl = (value) => {
    if (typeof value !== 'string') return '';
    const raw = value.trim();
    if (!raw) return '';

    const resolvedCwm = resolveCwmUrl(raw);
    if (resolvedCwm !== null) return resolvedCwm || '';
    if (/^https:\/\//i.test(raw)) return raw;
    return '';
};

const acquireImmersiveScrollLock = (overlayRoot = null) => {
    if (typeof document === 'undefined') return () => {};
    if (immersiveScrollLockCount === 0) {
        immersivePreviousBodyOverflow = document.body.style.overflow;
        immersivePreviousBodyTouchAction = document.body.style.touchAction;
        immersivePreviousBodyOverscrollBehavior = document.body.style.overscrollBehavior;
        immersivePreviousHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';

        // The immersive deck is a real modal interaction scene. Make the app behind
        // it inert instead of merely covering it visually, so mobile swipe gestures
        // cannot reach the chat/sidebar tree while the deck is open.
        immersiveBackgroundSnapshots = Array.from(document.body.children)
            .filter((node) => node !== overlayRoot)
            .map((node) => ({
                node,
                inert: Boolean(node.inert),
                pointerEvents: node.style.pointerEvents,
            }));
        immersiveBackgroundSnapshots.forEach(({node}) => {
            try { node.inert = true; } catch { /* old embedded browser */ }
            node.style.pointerEvents = 'none';
        });
    }
    immersiveScrollLockCount += 1;
    return () => {
        immersiveScrollLockCount = Math.max(0, immersiveScrollLockCount - 1);
        if (immersiveScrollLockCount === 0) {
            document.body.style.overflow = immersivePreviousBodyOverflow;
            document.body.style.touchAction = immersivePreviousBodyTouchAction;
            document.body.style.overscrollBehavior = immersivePreviousBodyOverscrollBehavior;
            document.documentElement.style.overscrollBehavior = immersivePreviousHtmlOverscrollBehavior;
            immersiveBackgroundSnapshots.forEach(({node, inert, pointerEvents}) => {
                if (!node?.isConnected) return;
                try { node.inert = inert; } catch { /* old embedded browser */ }
                node.style.pointerEvents = pointerEvents;
            });
            immersiveBackgroundSnapshots = [];
            immersivePreviousBodyOverflow = '';
            immersivePreviousBodyTouchAction = '';
            immersivePreviousBodyOverscrollBehavior = '';
            immersivePreviousHtmlOverscrollBehavior = '';
        }
    };
};

const WidgetFrame = ({title, description, children, footer, className = ''}) => (
    <div className={`my-3 w-full max-w-none overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
        {(title || description) && (
            <div className="border-b border-gray-100 px-4 py-3 sm:px-5">
                {title && <div className="text-sm font-semibold text-gray-900 sm:text-base">{title}</div>}
                {description && <div className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">{description}</div>}
            </div>
        )}
        <div className="px-4 py-4 sm:px-5">{children}</div>
        {footer && <div className="border-t border-gray-100 px-4 py-3 sm:px-5">{footer}</div>}
    </div>
);

const DeckFrame = ({title, description, children, footer, className = ''}) => (
    <div className={`my-1 w-full max-w-none px-1 py-1 sm:px-2 ${className}`}>
        {(title || description) && (
            <div className="mb-1.5 text-center sm:mb-2">
                {title && <div className="text-sm font-semibold tracking-[-0.02em] text-neutral-900 sm:text-base">{title}</div>}
                {description && <div className="mx-auto mt-0.5 max-w-2xl text-[11px] leading-4 text-neutral-500 sm:text-xs">{description}</div>}
            </div>
        )}
        {children}
        {footer && <div className="mt-1.5">{footer}</div>}
    </div>
);

const CompletedWidget = ({widget}) => {
    const type = widget?.widgetType;
    const result = widget?.result || {};
    let summary = '已完成交互';
    if (type === 'card_deck') {
        const descriptor = widget?.descriptor || {};
        const left = Array.isArray(result?.rejected) ? result.rejected : [];
        const middle = Array.isArray(result?.pending) ? result.pending : [];
        const right = Array.isArray(result?.selected) ? result.selected : (result?.selected ? [result.selected] : []);
        summary = `${descriptor.leftLabel || '放弃'} ${left.length} · ${descriptor.middleLabel || '待选择'} ${middle.length} · ${descriptor.rightLabel || '喜欢'} ${right.length}`;
    } else if (type === 'input') {
        summary = `已提交：${String(result?.value ?? '')}`;
    } else if (type === 'choice') {
        const value = result?.value;
        summary = `已选择：${Array.isArray(value) ? value.join('、') : String(value ?? '')}`;
    } else if (type === 'confirm') {
        summary = result?.confirmed ? '已确认' : '已取消';
    }
    const deliveryStatus = String(widget?.deliveryStatus || '');
    const deliveryHint = deliveryStatus === 'pending'
        ? '已提交，等待当前回复结束后发送'
        : (deliveryStatus === 'delivered' ? '已作为用户消息发送' : '');
    return (
        <div className="flex items-start gap-2 rounded-xl bg-emerald-50/70 px-3 py-2.5 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0"/>
            <div className="min-w-0">
                <div className="break-words">{summary}</div>
                {deliveryHint && <div className="mt-0.5 text-[11px] text-emerald-700/70">{deliveryHint}</div>}
            </div>
        </div>
    );
};

const CardDeckResumePrompt = ({descriptor, onResume}) => {
    const cards = Array.isArray(descriptor?.cards) ? descriptor.cards.slice(0, 3) : [];
    return (
        <div className="relative my-2 h-[112px] w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-sm">
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-75 blur-[7px] saturate-75" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.95),rgba(229,229,229,.78))]"/>
                {cards.map((card, index) => {
                    const source = resolveWidgetImageUrl(card?.image || card?.imageUrl || card?.media?.url);
                    const transforms = [
                        'translate(-78%,-45%) rotate(-9deg)',
                        'translate(-50%,-52%) rotate(1deg)',
                        'translate(-22%,-45%) rotate(9deg)',
                    ];
                    return (
                        <div
                            key={String(card?.id || index)}
                            className="absolute left-1/2 top-1/2 aspect-[5/7] w-[82px] overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-md"
                            style={{transform: transforms[index]}}
                        >
                            {source ? (
                                <img src={source} alt="" draggable={false} className="h-full w-full object-cover"/>
                            ) : (
                                <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-semibold text-neutral-500">
                                    {String(card?.title || card?.label || '')}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="absolute inset-0 bg-white/45 backdrop-blur-[5px]" aria-hidden="true"/>
            <div className="relative z-[1] flex h-full items-center justify-center px-4">
                <button
                    type="button"
                    onClick={onResume}
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black hover:shadow-xl"
                >
                    <Layers3 className="h-4 w-4"/>继续卡片选择
                </button>
            </div>
        </div>
    );
};

const EmbeddedCardDeckScrollGuard = ({children}) => (
    <div
        className="w-full"
        style={{touchAction: 'pan-y', overscrollBehaviorY: 'auto'}}
        // Embedded decks are the deliberate exception to the immersive scroll lock:
        // vertical touch/wheel gestures must remain available to the surrounding chat.
        // Stop pointer bubbling so app-level horizontal swipe handlers do not steal a
        // card gesture, but never prevent the browser's native vertical scroll here.
        onPointerDown={(event) => event.stopPropagation()}
        onPointerMove={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        onPointerCancel={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        onTouchEnd={(event) => event.stopPropagation()}
    >
        {children}
    </div>
);

const CardDeckWidget = ({widget, interactive, busy, act, onExit, initialReviewCategory, allowPageScroll = false}) => {
    if (widget?.status === 'completed') return <CompletedWidget widget={widget}/>;
    return (
        <CanvasCardDeck
            widget={widget}
            interactive={interactive}
            busy={busy}
            act={act}
            onExit={onExit}
            initialReviewCategory={initialReviewCategory}
            allowPageScroll={allowPageScroll}
        />
    );
};

const InputWidget = ({widget, interactive, busy, act}) => {
    const descriptor = widget?.descriptor || {};
    const [value, setValue] = useState(widget?.state?.value ?? descriptor.defaultValue ?? '');
    useEffect(() => setValue(widget?.state?.value ?? descriptor.defaultValue ?? ''), [widget?.revision]);
    if (widget?.status === 'completed') return <CompletedWidget widget={widget}/>;
    const Field = descriptor.multiline ? 'textarea' : 'input';
    return (
        <div className="space-y-3">
            <Field
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={descriptor.placeholder || ''}
                disabled={!interactive || busy}
                rows={descriptor.multiline ? 4 : undefined}
                className="pretty-scrollbar w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:bg-gray-50"
                onKeyDown={!descriptor.multiline ? (event) => {
                    if (event.key === 'Enter' && interactive && !busy) void act('submit', {value});
                } : undefined}
            />
            <div className="flex justify-end">
                <button
                    type="button"
                    disabled={!interactive || busy || (descriptor.required && !String(value).trim())}
                    onClick={() => void act('submit', {value})}
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Send className="h-4 w-4"/>提交
                </button>
            </div>
        </div>
    );
};

const ChoiceWidget = ({widget, interactive, busy, act}) => {
    const descriptor = widget?.descriptor || {};
    const options = Array.isArray(descriptor.options) ? descriptor.options : [];
    const multiple = Boolean(descriptor.multiple);
    const [value, setValue] = useState(widget?.state?.value ?? (multiple ? [] : ''));
    useEffect(() => setValue(widget?.state?.value ?? (multiple ? [] : '')), [widget?.revision, multiple]);
    if (widget?.status === 'completed') return <CompletedWidget widget={widget}/>;

    const toggle = (optionValue) => {
        if (!multiple) {
            setValue(optionValue);
            return;
        }
        setValue((current) => {
            const list = Array.isArray(current) ? current : [];
            return list.includes(optionValue) ? list.filter(item => item !== optionValue) : [...list, optionValue];
        });
    };
    const hasValue = multiple ? Array.isArray(value) && value.length > 0 : Boolean(value);
    return (
        <div className="space-y-2">
            {options.map((option, index) => {
                const optionValue = getOptionValue(option);
                const selected = multiple ? (Array.isArray(value) && value.includes(optionValue)) : value === optionValue;
                return (
                    <button
                        key={`${optionValue}-${index}`}
                        type="button"
                        disabled={!interactive || busy}
                        onClick={() => toggle(optionValue)}
                        className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${selected ? 'border-gray-900 bg-gray-50' : 'border-gray-200 bg-white hover:bg-gray-50'} disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center ${multiple ? 'rounded-md' : 'rounded-full'} border ${selected ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'}`}>
                            {selected && <Check className="h-3.5 w-3.5"/>}
                        </span>
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-gray-800">{getOptionLabel(option)}</span>
                            {option?.description && <span className="mt-0.5 block text-xs leading-5 text-gray-500">{option.description}</span>}
                        </span>
                    </button>
                );
            })}
            <div className="flex justify-end pt-2">
                <button
                    type="button"
                    disabled={!interactive || busy || (descriptor.required && !hasValue)}
                    onClick={() => void act('submit', {value})}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    确定
                </button>
            </div>
        </div>
    );
};

const ConfirmWidget = ({widget, interactive, busy, act}) => {
    const descriptor = widget?.descriptor || {};
    if (widget?.status === 'completed') return <CompletedWidget widget={widget}/>;
    return (
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
                type="button"
                disabled={!interactive || busy}
                onClick={() => void act('cancel', {})}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
                <X className="h-4 w-4"/>{descriptor.cancelLabel || '取消'}
            </button>
            <button
                type="button"
                disabled={!interactive || busy}
                onClick={() => void act('confirm', {})}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
                <Check className="h-4 w-4"/>{descriptor.confirmLabel || '确认'}
            </button>
        </div>
    );
};

const WidgetHost = memo(({content = '', conversationId = null, messageReadonly = false, messageIsLatest = true}) => {
    const presentation = useWidgetPresentation();
    const parsed = useMemo(() => parseWidget(content), [content]);
    const [widget, setWidget] = useState(parsed);
    const [busy, setBusy] = useState(false);
    const clientIdRef = useRef(generateUUID());
    const immersivePanelRef = useRef(null);
    const immersiveRootRef = useRef(null);
    const messageIsLatestRef = useRef(messageIsLatest);
    messageIsLatestRef.current = messageIsLatest;
    const [cardDeckPaused, setCardDeckPaused] = useState(() => (
        messageIsLatest === false
        && parsed?.widgetType === 'card_deck'
        && parsed?.descriptor?.immersive === true
    ));
    const [cardDeckResumeState, setCardDeckResumeState] = useState({reviewCategory: null});

    useEffect(() => {
        setWidget((current) => {
            const nextRevision = Number(parsed?.revision || 0);
            const currentRevision = Number(current?.revision || 0);
            return nextRevision >= currentRevision ? parsed : current;
        });
    }, [parsed]);

    useEffect(() => {
        // A newly mounted widget in the current tail message may auto-enter immersive
        // mode. Older active widgets (the common case after refresh/history hydration)
        // start paused instead, so they only reopen after an explicit user action.
        setCardDeckPaused(Boolean(
            messageIsLatestRef.current === false
            && parsed?.widgetType === 'card_deck'
            && parsed?.descriptor?.immersive === true
        ));
        setCardDeckResumeState({reviewCategory: null});
    }, [parsed?.widgetId]);

    useEffect(() => {
        if (widget?.status === 'completed') setCardDeckPaused(false);
    }, [widget?.status]);

    const descriptor = widget?.descriptor || {};
    const interactive = !messageReadonly && widget?.status === 'active';
    const immersiveActive = Boolean(
        interactive
        && widget?.widgetType === 'card_deck'
        && descriptor.immersive === true
        && !cardDeckPaused
    );
    const floatingInquiryActive = Boolean(
        interactive
        && INQUIRY_WIDGET_TYPES.has(widget?.widgetType)
        && descriptor.floatInChatBox === true
        && presentation.chatBoxHostElement
    );

    useEffect(() => {
        if (!immersiveActive) return undefined;
        const releaseScrollLock = acquireImmersiveScrollLock(immersiveRootRef.current);
        const frame = requestAnimationFrame(() => {
            const panel = immersivePanelRef.current;
            const focusTarget = panel?.querySelector?.('button:not(:disabled), [tabindex="0"], input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');
            focusTarget?.focus?.({preventScroll: true});
        });
        return () => {
            cancelAnimationFrame(frame);
            releaseScrollLock();
        };
    }, [immersiveActive]);

    const exitCardDeck = useCallback((state = {}) => {
        setCardDeckResumeState({
            reviewCategory: state?.reviewCategory === 'left' || state?.reviewCategory === 'right'
                ? state.reviewCategory
                : null,
        });
        setCardDeckPaused(true);
    }, []);

    const resumeCardDeck = useCallback(() => {
        setCardDeckPaused(false);
    }, []);

    useBrowserBackLayer(immersiveActive, () => {
        setCardDeckPaused(true);
        return true;
    }, {kind: 'immersive-card-deck'});

    const act = useCallback(async (action, payload = {}) => {
        if (!widget?.widgetId || !conversationId || busy) return null;
        setBusy(true);
        try {
            const data = await apiClient.post(
                `${apiEndpoint.CHAT_WIDGETS_ENDPOINT}/${encodeURIComponent(widget.widgetId)}/action`,
                {
                    conversationId,
                    action,
                    payload,
                    interactionId: generateUUID(),
                    expectedRevision: Number(widget.revision || 0),
                    clientId: clientIdRef.current,
                },
            );
            if (data?.widget) setWidget(data.widget);
            return data?.widget || null;
        } catch (error) {
            if (error?.data?.widget) setWidget(error.data.widget);
            toast.error(error?.message || '小组件操作失败');
            return null;
        } finally {
            setBusy(false);
        }
    }, [busy, conversationId, widget]);

    if (!widget?.widgetId || !widget?.widgetType) {
        return (
            <div className="my-2 w-full rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                小组件数据无效。
            </div>
        );
    }

    if (cardDeckPaused && interactive && widget.widgetType === 'card_deck') {
        return <CardDeckResumePrompt descriptor={descriptor} onResume={resumeCardDeck}/>;
    }

    let body = null;
    if (widget.widgetType === 'card_deck') {
        body = (
            <CardDeckWidget
                widget={widget}
                interactive={interactive}
                busy={busy}
                act={act}
                onExit={exitCardDeck}
                initialReviewCategory={cardDeckResumeState.reviewCategory}
                allowPageScroll={descriptor.immersive !== true}
            />
        );
    } else if (widget.widgetType === 'input') {
        body = <InputWidget widget={widget} interactive={interactive} busy={busy} act={act}/>;
    } else if (widget.widgetType === 'choice') {
        body = <ChoiceWidget widget={widget} interactive={interactive} busy={busy} act={act}/>;
    } else if (widget.widgetType === 'confirm') {
        body = <ConfirmWidget widget={widget} interactive={interactive} busy={busy} act={act}/>;
    } else {
        body = <div className="text-sm text-gray-500">暂不支持的小组件：{widget.widgetType}</div>;
    }

    const renderFrame = (className = '') => {
        const Frame = widget.widgetType === 'card_deck' ? DeckFrame : WidgetFrame;
        return (
            <Frame
                title={descriptor.title || descriptor.question || descriptor.prompt}
                description={descriptor.description || descriptor.prompt}
                className={className}
                footer={busy && widget.widgetType !== 'card_deck' ? (
                    <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
                        <Loader2 className="h-3.5 w-3.5 animate-spin"/>正在同步…
                    </div>
                ) : null}
            >
                {body}
            </Frame>
        );
    };

    if (immersiveActive && typeof document !== 'undefined') {
        return (
            <>
                <div className="my-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    卡片选择已进入沉浸模式，请在居中的选择器中完成操作。
                </div>
                {createPortal(
                    <div
                        ref={immersiveRootRef}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6"
                        aria-live="polite"
                        style={{touchAction: 'none', overscrollBehavior: 'none'}}
                        onPointerDown={(event) => event.stopPropagation()}
                        onPointerMove={(event) => event.stopPropagation()}
                        onPointerUp={(event) => event.stopPropagation()}
                        onPointerCancel={(event) => event.stopPropagation()}
                        onTouchStart={(event) => event.stopPropagation()}
                        onTouchMove={(event) => event.stopPropagation()}
                        onTouchEnd={(event) => event.stopPropagation()}
                        onWheel={(event) => event.stopPropagation()}
                    >
                        <div className="absolute inset-0 bg-black/25 backdrop-blur-md" aria-hidden="true"/>
                        <div
                            ref={immersivePanelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label={descriptor.title || '卡片选择'}
                            onKeyDownCapture={(event) => {
                                if (event.key === 'Escape') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }}
                            className="pretty-scrollbar relative z-[1] max-h-[calc(100dvh-1.5rem)] w-[min(94vw,80rem)] overflow-y-auto overscroll-contain [scrollbar-gutter:stable]"
                        >
                            {renderFrame('my-0')}
                        </div>
                    </div>,
                    document.body,
                )}
            </>
        );
    }

    if (floatingInquiryActive) {
        return (
            <>
                <div className="my-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    问询已显示在输入框上方，可直接完成选择或输入。
                </div>
                {createPortal(
                    <div className="pretty-scrollbar mb-2 max-h-[min(50dvh,28rem)] w-full overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]">
                        {renderFrame('my-0 shadow-lg')}
                    </div>,
                    presentation.chatBoxHostElement,
                )}
            </>
        );
    }

    if (widget.widgetType === 'card_deck' && interactive && descriptor.immersive !== true) {
        return (
            <EmbeddedCardDeckScrollGuard>
                {renderFrame()}
            </EmbeddedCardDeckScrollGuard>
        );
    }

    return renderFrame();
}, (prev, next) => (
    prev.content === next.content
    && prev.conversationId === next.conversationId
    && prev.messageReadonly === next.messageReadonly
    && prev.messageIsLatest === next.messageIsLatest
));

WidgetHost.displayName = 'WidgetHost';
export default WidgetHost;
