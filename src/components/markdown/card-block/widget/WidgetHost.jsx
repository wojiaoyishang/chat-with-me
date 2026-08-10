import {memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
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
import {isUniversalModalLink, openUniversalModalLink} from '@/components/modal/universalModal.js';
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

const CARD_IMAGE_POSITIONS = {
    center: 'center center',
    top: 'center top',
    bottom: 'center bottom',
    left: 'left center',
    right: 'right center',
};

const CardFace = ({card, onOpenDetail, compact = false}) => {
    const source = resolveWidgetImageUrl(card?.image || card?.imageUrl || card?.media?.url);
    const [imageFailed, setImageFailed] = useState(false);
    useEffect(() => setImageFailed(false), [source, card?.id]);
    const badges = Array.isArray(card?.badges) ? card.badges.slice(0, 4) : [];
    const requestedStyle = ['auto', 'poster', 'text'].includes(String(card?.style || '').toLowerCase())
        ? String(card.style).toLowerCase()
        : 'auto';
    const hasImage = Boolean(source && !imageFailed);
    const style = requestedStyle === 'text' || !hasImage ? 'text' : 'poster';
    const title = card?.title || card?.label || card?.id || '';
    const imagePosition = CARD_IMAGE_POSITIONS[String(card?.imagePosition || 'center').toLowerCase()] || CARD_IMAGE_POSITIONS.center;

    if (style === 'poster') {
        return (
            <div className={`relative aspect-[5/7] w-full overflow-hidden rounded-[22px] border border-black/[0.06] bg-neutral-100 shadow-[0_18px_50px_rgba(15,23,42,0.16),0_3px_10px_rgba(15,23,42,0.08)] ${compact ? 'rounded-[18px]' : ''}`}>
                <img
                    src={source}
                    alt=""
                    draggable={false}
                    onError={() => setImageFailed(true)}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    style={{objectPosition: imagePosition}}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent via-45% to-black/80"/>
                {badges.length > 0 && (
                    <div className="absolute left-3 top-3 flex max-w-[80%] flex-wrap gap-1.5">
                        {badges.map((badge, index) => (
                            <span key={`${badge}-${index}`} className="rounded-full border border-white/20 bg-black/25 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white shadow-sm backdrop-blur-md">
                                {String(badge)}
                            </span>
                        ))}
                    </div>
                )}
                <div className={`absolute inset-x-0 bottom-0 p-4 text-white ${compact ? 'p-3' : 'sm:p-5'}`}>
                    <div className={`${compact ? 'text-base' : 'text-xl sm:text-2xl'} font-semibold leading-tight tracking-[-0.02em] drop-shadow-sm`}>{title}</div>
                    {card?.subtitle && <div className="mt-1 text-xs font-medium text-white/80 sm:text-sm">{card.subtitle}</div>}
                    {card?.description && !compact && <div className="mt-2 line-clamp-3 text-xs leading-5 text-white/80 sm:text-sm">{card.description}</div>}
                    {card?.detailHref && !compact && (
                        <button
                            type="button"
                            onPointerDown={(event) => event.stopPropagation()}
                            onClick={(event) => {
                                event.stopPropagation();
                                onOpenDetail(card.detailHref);
                            }}
                            className="mt-3 text-xs font-medium text-white/85 underline decoration-white/35 underline-offset-4 transition hover:text-white"
                        >
                            查看详情
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`relative flex aspect-[5/7] w-full flex-col items-center justify-center overflow-hidden rounded-[22px] border border-black/[0.07] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,1),rgba(250,250,249,0.98)_58%,rgba(245,245,244,0.96))] px-7 text-center shadow-[0_18px_50px_rgba(15,23,42,0.12),0_3px_10px_rgba(15,23,42,0.06)] ${compact ? 'rounded-[18px] px-5' : ''}`}>
            {badges.length > 0 && (
                <div className="mb-5 flex max-w-full flex-wrap justify-center gap-1.5">
                    {badges.map((badge, index) => (
                        <span key={`${badge}-${index}`} className="rounded-full bg-black/[0.055] px-2.5 py-1 text-[10px] font-medium tracking-wide text-neutral-500">
                            {String(badge)}
                        </span>
                    ))}
                </div>
            )}
            <div className={`${compact ? 'text-lg' : 'text-2xl sm:text-[1.7rem]'} max-w-full font-semibold leading-tight tracking-[-0.035em] text-neutral-900`}>{title}</div>
            {card?.subtitle && <div className="mt-2 text-xs font-medium tracking-wide text-neutral-500 sm:text-sm">{card.subtitle}</div>}
            {card?.description && !compact && <div className="mt-4 line-clamp-5 max-w-[90%] text-sm leading-6 text-neutral-500">{card.description}</div>}
            {card?.detailHref && !compact && (
                <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                        event.stopPropagation();
                        onOpenDetail(card.detailHref);
                    }}
                    className="mt-5 text-xs font-medium text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-900"
                >
                    查看详情
                </button>
            )}
        </div>
    );
};

const normalizeDeckState = (cards, rawState) => {
    const byId = new Map(cards.map((card, index) => [String(card?.id || `card_${index + 1}`), card]));
    if (Array.isArray(rawState?.pending) && Array.isArray(rawState?.left) && Array.isArray(rawState?.right)) {
        return {
            pending: rawState.pending.map(String).filter((id) => byId.has(id)),
            left: rawState.left.filter((item) => item && byId.has(String(item.cardId))),
            right: rawState.right.filter((item) => item && byId.has(String(item.cardId))),
        };
    }
    const left = [];
    const right = [];
    const classified = new Set();
    (Array.isArray(rawState?.decisions) ? rawState.decisions : []).forEach((item, index) => {
        const cardId = String(item?.cardId || '');
        if (!byId.has(cardId)) return;
        const target = item?.action === 'right' ? right : left;
        target.push({cardId, sequence: index + 1});
        classified.add(cardId);
    });
    return {
        pending: [...byId.keys()].filter((id) => !classified.has(id)),
        left,
        right,
    };
};

const DECK_SPRING = {type: 'spring', stiffness: 330, damping: 30, mass: 0.82};
const REVIEW_SPRING = {type: 'spring', stiffness: 300, damping: 29, mass: 0.88};
const waitForAnimationFloor = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HORIZONTAL_COMMIT_DISTANCE = 92;
const HORIZONTAL_FLICK_MIN_DISTANCE = 24;
const HORIZONTAL_FLICK_VELOCITY = 680;
const REVIEW_COMMIT_DISTANCE = 88;
const REVIEW_FLICK_MIN_DISTANCE = 22;
const REVIEW_FLICK_VELOCITY = 620;

const captureElementRect = (element) => {
    const rect = element?.getBoundingClientRect?.();
    if (!rect) return null;
    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom,
    };
};

const resolveHorizontalClassification = (offsetX, velocityX) => {
    if (offsetX >= HORIZONTAL_COMMIT_DISTANCE) return 'right';
    if (offsetX <= -HORIZONTAL_COMMIT_DISTANCE) return 'left';

    // Velocity may only assist a swipe when the card is already travelling in
    // the same direction. This prevents a quick reverse/flick at pointer-up
    // from classifying in the opposite direction to the visible card position.
    if (offsetX >= HORIZONTAL_FLICK_MIN_DISTANCE && velocityX >= HORIZONTAL_FLICK_VELOCITY) return 'right';
    if (offsetX <= -HORIZONTAL_FLICK_MIN_DISTANCE && velocityX <= -HORIZONTAL_FLICK_VELOCITY) return 'left';
    return null;
};

const shouldCommitOneWayDrag = (direction, offsetX, velocityX) => {
    const sign = direction === 'right' ? 1 : -1;
    const signedOffset = offsetX * sign;
    const signedVelocity = velocityX * sign;
    return signedOffset >= REVIEW_COMMIT_DISTANCE
        || (signedOffset >= REVIEW_FLICK_MIN_DISTANCE && signedVelocity >= REVIEW_FLICK_VELOCITY);
};

const getHorizontalTravel = (originBox, targetBox, direction) => {
    if (!originBox || !targetBox) return null;
    const sign = direction === 'right' ? 1 : -1;
    const originX = originBox.left + originBox.width / 2;
    const targetX = targetBox.left + targetBox.width / 2;
    const directed = (targetX - originX) * sign;
    return directed > 0 ? directed : null;
};

const resolvePocketReverseIntent = ({
    side,
    offsetX,
    velocityX,
    originBox,
    oppositeBox,
    allowDirectOpposite = false,
    preview = false,
}) => {
    const direction = side === 'left' ? 'right' : 'left';
    const sign = direction === 'right' ? 1 : -1;
    const signedOffset = offsetX * sign;

    if (allowDirectOpposite && side === 'left') {
        const fullTravel = getHorizontalTravel(originBox, oppositeBox, 'right');
        const directThreshold = fullTravel
            ? Math.max(176, fullTravel * (preview ? 0.58 : 0.72))
            : (preview ? 250 : 320);
        if (signedOffset >= directThreshold) return 'right';
    }

    if (preview) return signedOffset >= 34 ? 'pending' : null;
    return shouldCommitOneWayDrag(direction, offsetX, velocityX) ? 'pending' : null;
};

const getDirectedFlightVector = ({originBox, targetBox, direction, fallbackDistance = 340, fallbackY = 0}) => {
    const sign = direction === 'right' ? 1 : -1;
    let dx = sign * Math.abs(fallbackDistance);
    let dy = fallbackY;

    if (originBox && targetBox) {
        const originX = originBox.left + originBox.width / 2;
        const originY = originBox.top + originBox.height / 2;
        const targetX = targetBox.left + targetBox.width / 2;
        const targetY = targetBox.top + targetBox.height / 2;
        dx = targetX - originX;
        dy = targetY - originY;
    }

    // The visual destination is semantic, not inferred from the transient drag
    // transform. Clamp the sign so a stale/measured rect can never send a card
    // into the opposite pocket.
    const minimumDirectedTravel = 120;
    const signedMeasuredTravel = dx * sign;
    dx = signedMeasuredTravel > 0
        ? sign * Math.max(minimumDirectedTravel, signedMeasuredTravel)
        : sign * Math.max(minimumDirectedTravel, Math.abs(fallbackDistance));
    return {dx, dy};
};

const collectScrollableAncestors = (node) => {
    if (typeof window === 'undefined' || !node) return [];
    const found = [];
    let current = node.parentElement;
    while (current) {
        const style = window.getComputedStyle(current);
        const overflow = `${style.overflow} ${style.overflowX} ${style.overflowY}`;
        if (/(auto|scroll|overlay)/.test(overflow) && (current.scrollHeight > current.clientHeight || current.scrollWidth > current.clientWidth)) {
            found.push(current);
        }
        current = current.parentElement;
    }
    const scrollingElement = document.scrollingElement;
    if (scrollingElement && !found.includes(scrollingElement)) found.push(scrollingElement);
    return found;
};

const useDesktopDragStability = () => {
    const snapshotRef = useRef(null);

    const begin = useCallback((event) => {
        if (typeof document === 'undefined' || (event?.pointerType && event.pointerType !== 'mouse')) return;
        const scrollNodes = collectScrollableAncestors(event?.currentTarget).map((node) => ({
            node,
            top: node.scrollTop,
            left: node.scrollLeft,
        }));
        snapshotRef.current = {
            scrollNodes,
            bodyUserSelect: document.body.style.userSelect,
            htmlScrollBehavior: document.documentElement.style.scrollBehavior,
        };
        document.body.style.userSelect = 'none';
        document.documentElement.style.scrollBehavior = 'auto';
    }, []);

    const hold = useCallback(() => {
        const snapshot = snapshotRef.current;
        if (!snapshot) return;
        snapshot.scrollNodes.forEach(({node, top, left}) => {
            if (node.scrollTop !== top) node.scrollTop = top;
            if (node.scrollLeft !== left) node.scrollLeft = left;
        });
    }, []);

    const end = useCallback(() => {
        const snapshot = snapshotRef.current;
        if (!snapshot || typeof document === 'undefined') return;
        snapshot.scrollNodes.forEach(({node, top, left}) => {
            if (node.scrollTop !== top) node.scrollTop = top;
            if (node.scrollLeft !== left) node.scrollLeft = left;
        });
        document.body.style.userSelect = snapshot.bodyUserSelect;
        document.documentElement.style.scrollBehavior = snapshot.htmlScrollBehavior;
        snapshotRef.current = null;
    }, []);

    useEffect(() => () => end(), [end]);
    return {begin, hold, end};
};

const animateNativeOverlay = async (element, {
    fromX = 0,
    fromY = 0,
    toX = 0,
    toY = 0,
    fromScale = 1,
    toScale = 1,
    fromRotate = 0,
    toRotate = 0,
    fromOpacity = 1,
    toOpacity = 1,
    duration = 250,
} = {}) => {
    if (!element) return;
    const fromTransform = `translate3d(${fromX}px, ${fromY}px, 0) scale(${fromScale}) rotate(${fromRotate}deg)`;
    const toTransform = `translate3d(${toX}px, ${toY}px, 0) scale(${toScale}) rotate(${toRotate}deg)`;
    if (typeof element.animate !== 'function') {
        element.style.transform = toTransform;
        element.style.opacity = String(toOpacity);
        await waitForAnimationFloor(duration);
        return;
    }
    const animation = element.animate([
        {transform: fromTransform, opacity: fromOpacity},
        {transform: toTransform, opacity: toOpacity},
    ], {
        duration,
        easing: 'cubic-bezier(.2,.82,.2,1)',
        fill: 'forwards',
    });
    try {
        await animation.finished;
    } catch {
        // Cancellation is expected when the widget unmounts while a request completes.
    }
};

const NativeCardDragOverlay = ({snapshot, overlayRef}) => {
    if (!snapshot || typeof document === 'undefined') return null;
    const {card, rect, compact = false} = snapshot;
    return createPortal(
        <div
            ref={overlayRef}
            className="pointer-events-none fixed select-none"
            style={{
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                zIndex: 12050,
                transform: 'translate3d(0px, 0px, 0) scale(1) rotate(0deg)',
                transformOrigin: '50% 50%',
                willChange: 'transform, opacity',
                contain: 'layout paint style',
            }}
            aria-hidden="true"
        >
            <CardFace card={card} compact={compact} onOpenDetail={() => {}}/>
        </div>,
        document.body,
    );
};

const PocketCardBack = ({side, count = 0}) => (
    <div className="relative aspect-[5/7] w-full overflow-hidden rounded-[14px] border border-black/[0.07] bg-[linear-gradient(145deg,rgba(255,255,255,.98),rgba(245,245,244,.96))] shadow-[0_10px_26px_rgba(15,23,42,.10)]">
        <div className="absolute inset-2 rounded-[10px] border border-neutral-200/80 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_6px,rgba(0,0,0,.025)_6px,rgba(0,0,0,.025)_7px)]"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
            <Layers3 className="h-4 w-4"/>
            <span className="mt-1 text-[10px] font-semibold tabular-nums">{count}</span>
        </div>
        <div className={`absolute top-2 h-1.5 w-1.5 rounded-full bg-neutral-300 ${side === 'left' ? 'left-2' : 'right-2'}`}/>
    </div>
);

const CardPocket = ({
    side,
    label,
    count,
    entries,
    topCard,
    active,
    onClick,
    onReverse,
    onReverseTargetChange,
    returning,
    oppositePocketRef,
    pendingTargetRef,
    allowDirectOpposite = false,
    interactive,
    busy,
    pocketRef,
}) => {
    const canOpen = entries.length > 0;
    const returningHere = returning?.side === side;
    const externalFlightHere = Boolean(returningHere && returning?.externalFlight);
    const displayCard = returningHere && !externalFlightHere ? returning.card : topCard;
    const displayCardId = String(displayCard?.id || '');
    const reverseDragStability = useDesktopDragStability();
    const suppressOpenUntilRef = useRef(0);
    const nativeSessionRef = useRef(null);
    const nativeOverlayRef = useRef(null);
    const [nativeOverlay, setNativeOverlay] = useState(null);
    const [sourceHidden, setSourceHidden] = useState(false);
    const [reverseDragging, setReverseDragging] = useState(false);

    const setReverseTarget = useCallback((target) => {
        if (!target) {
            onReverseTargetChange?.(null);
            return;
        }
        onReverseTargetChange?.({source: side, target});
    }, [onReverseTargetChange, side]);

    const canReverse = Boolean(canOpen && displayCard && interactive && !busy && !returningHere);

    const clearNativeDrag = useCallback(() => {
        nativeSessionRef.current = null;
        setNativeOverlay(null);
        setSourceHidden(false);
        setReverseDragging(false);
        setReverseTarget(null);
        reverseDragStability.end();
    }, [reverseDragStability, setReverseTarget]);

    useEffect(() => () => {
        nativeSessionRef.current = null;
        reverseDragStability.end();
    }, [reverseDragStability]);

    const handlePointerDown = useCallback((event) => {
        if (!canReverse || !displayCard) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        const rect = captureElementRect(event.currentTarget);
        if (!rect) return;
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        nativeSessionRef.current = {
            pointerId: event.pointerId,
            cardId: displayCardId,
            rect,
            startX: event.clientX,
            startY: event.clientY,
            lastX: event.clientX,
            lastY: event.clientY,
            lastT: now,
            velocityX: 0,
            dx: 0,
            dy: 0,
            moved: false,
        };
        try {
            event.currentTarget.setPointerCapture?.(event.pointerId);
        } catch {
            // Pointer capture can fail if the pointer is already cancelled.
        }
        event.preventDefault();
        event.stopPropagation();
        suppressOpenUntilRef.current = Date.now() + 420;
        reverseDragStability.begin(event);
        setNativeOverlay({card: displayCard, rect, compact: true});
        setSourceHidden(true);
        setReverseDragging(true);
        setReverseTarget(null);
    }, [canReverse, displayCard, displayCardId, reverseDragStability, setReverseTarget]);

    const handlePointerMove = useCallback((event) => {
        const session = nativeSessionRef.current;
        if (!session || session.pointerId !== event.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        reverseDragStability.hold();

        const dx = event.clientX - session.startX;
        const dy = event.clientY - session.startY;
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        const dt = Math.max(8, now - session.lastT);
        const instantVelocityX = ((event.clientX - session.lastX) / dt) * 1000;
        session.velocityX = session.velocityX * 0.55 + instantVelocityX * 0.45;
        session.lastX = event.clientX;
        session.lastY = event.clientY;
        session.lastT = now;
        session.dx = dx;
        session.dy = dy;
        if (Math.hypot(dx, dy) >= 5) session.moved = true;

        const overlay = nativeOverlayRef.current;
        if (overlay) {
            const rotate = Math.max(-7, Math.min(7, dx / 34));
            overlay.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.018) rotate(${rotate}deg)`;
        }

        const intent = resolvePocketReverseIntent({
            side,
            offsetX: dx,
            velocityX: session.velocityX,
            originBox: session.rect,
            oppositeBox: captureElementRect(oppositePocketRef?.current),
            allowDirectOpposite,
            preview: true,
        });
        setReverseTarget(intent);
    }, [allowDirectOpposite, oppositePocketRef, reverseDragStability, setReverseTarget, side]);

    const finishNativePointer = useCallback(async (event, cancelled = false) => {
        const session = nativeSessionRef.current;
        if (!session || session.pointerId !== event.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        suppressOpenUntilRef.current = Date.now() + 420;
        reverseDragStability.hold();

        session.finishing = true;

        const dx = event.clientX - session.startX;
        const dy = event.clientY - session.startY;
        const overlay = nativeOverlayRef.current;
        const moved = session.moved || Math.hypot(dx, dy) >= 5;

        if (cancelled) {
            await animateNativeOverlay(overlay, {
                fromX: dx,
                fromY: dy,
                toX: 0,
                toY: 0,
                fromScale: 1.018,
                toScale: 1,
                fromRotate: Math.max(-7, Math.min(7, dx / 34)),
                toRotate: 0,
                duration: 180,
            });
            clearNativeDrag();
            return;
        }

        if (!moved) {
            clearNativeDrag();
            onClick?.();
            return;
        }

        const intent = resolvePocketReverseIntent({
            side,
            offsetX: dx,
            velocityX: session.velocityX,
            originBox: session.rect,
            oppositeBox: captureElementRect(oppositePocketRef?.current),
            allowDirectOpposite,
            preview: false,
        });

        if (!intent) {
            await animateNativeOverlay(overlay, {
                fromX: dx,
                fromY: dy,
                toX: 0,
                toY: 0,
                fromScale: 1.018,
                toScale: 1,
                fromRotate: Math.max(-7, Math.min(7, dx / 34)),
                toRotate: 0,
                duration: 190,
            });
            clearNativeDrag();
            return;
        }

        setReverseTarget(intent);
        const directOpposite = side === 'left' && intent === 'right';
        const targetBox = captureElementRect(directOpposite ? oppositePocketRef?.current : pendingTargetRef?.current);
        const originBox = session.rect;
        const direction = side === 'left' ? 'right' : 'left';
        const {dx: targetDx, dy: targetDy} = getDirectedFlightVector({
            originBox,
            targetBox,
            direction,
            fallbackDistance: directOpposite ? 560 : 300,
            fallbackY: directOpposite ? 0 : -6,
        });
        const targetScale = originBox && targetBox && originBox.width > 0
            ? Math.max(directOpposite ? 0.92 : 1.45, Math.min(directOpposite ? 1.12 : 3.25, targetBox.width / originBox.width))
            : (directOpposite ? 1 : 2.45);

        const actionPromise = Promise.resolve(onReverse?.(
            side,
            displayCard,
            originBox,
            intent,
            {externalFlight: true},
        ));
        const flightPromise = animateNativeOverlay(overlay, {
            fromX: dx,
            fromY: dy,
            toX: targetDx,
            toY: targetDy,
            fromScale: 1.018,
            toScale: targetScale,
            fromRotate: Math.max(-7, Math.min(7, dx / 34)),
            toRotate: directOpposite ? 4.5 : (side === 'left' ? 3.5 : -3.5),
            fromOpacity: 1,
            toOpacity: 0.08,
            duration: directOpposite ? 270 : 250,
        });
        await Promise.allSettled([actionPromise, flightPromise]);
        clearNativeDrag();
    }, [allowDirectOpposite, clearNativeDrag, displayCard, onClick, onReverse, oppositePocketRef, pendingTargetRef, reverseDragStability, setReverseTarget, side]);

    const sharedLayoutId = canOpen && topCard && !returningHere && !sourceHidden
        ? `deck-pocket-card-${side}-${String(topCard.id)}`
        : undefined;

    return (
        <>
            <NativeCardDragOverlay snapshot={nativeOverlay} overlayRef={nativeOverlayRef}/>
            <motion.div
                ref={pocketRef}
                animate={{
                    scale: active ? 1.055 : 1,
                    x: active ? (side === 'left' ? 8 : -8) : 0,
                    y: active ? -3 : 0,
                }}
                whileHover={canOpen && !returningHere && !reverseDragging ? {y: -3, scale: 1.018} : undefined}
                transition={DECK_SPRING}
                className="group relative flex min-w-0 flex-col items-center justify-center px-1 py-2 text-center"
                aria-label={`${label}，${count} 张`}
                style={{zIndex: reverseDragging || returningHere ? 70 : (active ? 50 : 10)}}
            >
                <motion.div
                    animate={{opacity: active ? 0.18 : 0, scale: active ? 1.16 : 0.92}}
                    transition={DECK_SPRING}
                    className="pointer-events-none absolute top-1/2 h-28 w-24 -translate-y-[58%] rounded-full bg-neutral-900/15 blur-2xl sm:h-36 sm:w-28"
                />
                <div className="relative h-[7.9rem] w-[5.65rem] sm:h-[10.1rem] sm:w-[7.2rem]">
                    {[2, 1].map((layer) => (
                        <motion.div
                            key={layer}
                            className="pointer-events-none absolute inset-0"
                            animate={{
                                x: side === 'left' ? -layer * 4 : layer * 4,
                                y: layer * 5,
                                rotate: side === 'left' ? -layer * 2.2 : layer * 2.2,
                                scale: 1 - layer * 0.025,
                                opacity: canOpen ? 0.72 - layer * 0.12 : 0.38,
                            }}
                            transition={DECK_SPRING}
                        >
                            <PocketCardBack side={side} count={count}/>
                        </motion.div>
                    ))}

                    {returningHere && !externalFlightHere && topCard && String(topCard.id) !== String(returning.card?.id || '') && (
                        <motion.div
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[14px]"
                            initial={{opacity: 0.4, scale: 0.95}}
                            animate={{opacity: 0.94, scale: 0.975, y: 3}}
                            transition={DECK_SPRING}
                            style={{zIndex: 4}}
                        >
                            <CardFace card={topCard} compact/>
                        </motion.div>
                    )}

                    <motion.div
                        layoutId={sharedLayoutId}
                        className="absolute inset-0 overflow-visible rounded-[14px]"
                        transition={DECK_SPRING}
                        style={{zIndex: 5}}
                    >
                        <motion.button
                            type="button"
                            disabled={!canOpen || returningHere}
                            animate={returningHere && !externalFlightHere ? {
                                x: returning.dx,
                                y: returning.dy,
                                scale: returning.scale,
                                rotate: returning.destination === 'right' ? 4.5 : (side === 'left' ? 3.5 : -3.5),
                                opacity: 0.08,
                            } : {
                                x: 0,
                                y: 0,
                                scale: 1,
                                rotate: active ? (side === 'left' ? -2.5 : 2.5) : 0,
                                opacity: sourceHidden || externalFlightHere ? 0 : 1,
                            }}
                            transition={DECK_SPRING}
                            className="absolute inset-0 touch-none select-none rounded-[14px] text-left disabled:cursor-default"
                            aria-label={canOpen
                                ? `${label}顶部卡片。点击查看牌堆，${side === 'left'
                                    ? '向右拖回待选择，继续拖动可移入另一侧牌堆'
                                    : '向左拖回待选择'}`
                                : `${label}暂无卡片`}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={(event) => void finishNativePointer(event, false)}
                            onPointerCancel={(event) => void finishNativePointer(event, true)}
                            onLostPointerCapture={(event) => {
                                const session = nativeSessionRef.current;
                                if (session && session.pointerId === event.pointerId && sourceHidden && !session.finishing) {
                                    // pointerup sets finishing before the browser releases capture;
                                    // only unexpected capture loss should cancel the drag layer.
                                    clearNativeDrag();
                                }
                            }}
                            onClick={(event) => {
                                // Pointer clicks are handled explicitly in pointerup so a drag
                                // can never fall through and open either pocket. Keep keyboard
                                // activation available for accessibility.
                                if (event.detail !== 0 || Date.now() < suppressOpenUntilRef.current) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    return;
                                }
                                if (canOpen && !returningHere) onClick?.();
                            }}
                        >
                            {displayCard ? <CardFace card={displayCard} compact/> : <PocketCardBack side={side} count={0}/>} 
                        </motion.button>
                    </motion.div>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={count}
                            initial={{opacity: 0, scale: 0.65, y: 4}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            exit={{opacity: 0, scale: 0.7, y: -4}}
                            transition={{duration: 0.16}}
                            className="pointer-events-none absolute -bottom-2 -right-2 z-10 flex h-6 min-w-6 items-center justify-center rounded-full border border-white bg-neutral-900 px-1.5 text-[10px] font-semibold tabular-nums text-white shadow-md"
                        >
                            {count}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <div className="mt-3 max-w-full truncate text-[11px] font-medium text-neutral-600 sm:text-xs">{label}</div>
                <div className={`mt-0.5 text-[10px] transition ${canOpen ? 'text-neutral-400 group-hover:text-neutral-500' : 'text-neutral-300'}`}>
                    {canOpen
                        ? (side === 'left' ? '点击翻开 · 右拖撤回 / 继续右拖改选' : '点击翻开 · 左拖撤回')
                        : '暂无卡片'}
                </div>
            </motion.div>
        </>
    );
};

const PendingReturnPocket = ({side, count, topCard, label = '放回待选择', pocketRef, active = false}) => (
    <motion.div
        ref={pocketRef}
        animate={{
            scale: active ? 1.065 : 1,
            x: active ? (side === 'left' ? 9 : -9) : 0,
            y: active ? -3 : 0,
            opacity: active ? 1 : 0.82,
        }}
        transition={REVIEW_SPRING}
        className="relative flex min-w-[82px] flex-col items-center justify-center px-1 py-2 text-center sm:min-w-[112px]"
    >
        <motion.div
            animate={{opacity: active ? 0.18 : 0, scale: active ? 1.14 : 0.92}}
            transition={REVIEW_SPRING}
            className="pointer-events-none absolute top-1/2 h-28 w-24 -translate-y-[58%] rounded-full bg-neutral-900/15 blur-2xl sm:h-32 sm:w-28"
        />
        <div className="relative h-[7.9rem] w-[5.65rem] sm:h-[9.4rem] sm:w-[6.7rem]">
            {[2, 1].map((layer) => (
                <motion.div
                    key={layer}
                    animate={{
                        x: side === 'left' ? -layer * 3.5 : layer * 3.5,
                        y: layer * 4.5,
                        rotate: side === 'left' ? -layer * 2 : layer * 2,
                        scale: 1 - layer * 0.025,
                        opacity: 0.48,
                    }}
                    transition={REVIEW_SPRING}
                    className="pointer-events-none absolute inset-0"
                >
                    <PocketCardBack side={side} count={count}/>
                </motion.div>
            ))}
            <motion.div
                className="absolute inset-0 overflow-hidden rounded-[14px]"
                animate={{rotate: active ? (side === 'left' ? -2.8 : 2.8) : 0}}
                transition={REVIEW_SPRING}
            >
                {topCard ? <CardFace card={topCard} compact/> : <PocketCardBack side={side} count={count}/>} 
            </motion.div>
            <span className="absolute -bottom-2 -right-2 z-10 flex h-6 min-w-6 items-center justify-center rounded-full border border-white bg-white px-1.5 text-[10px] font-semibold tabular-nums text-neutral-700 shadow-md">{count}</span>
        </div>
        <div className="mt-3 text-[11px] font-medium text-neutral-600 sm:text-xs">{label}</div>
        <div className={`mt-0.5 text-[10px] transition ${active ? 'text-neutral-600' : 'text-neutral-400'}`}>{active ? '松手放回' : '拖到这张牌'}</div>
    </motion.div>
);
const LegacyCardDeckWidget = ({widget, interactive, busy, act}) => {
    const descriptor = widget?.descriptor || {};
    const cards = Array.isArray(descriptor.cards) ? descriptor.cards : [];
    const byId = useMemo(() => new Map(cards.map((card, index) => [String(card?.id || `card_${index + 1}`), card])), [cards]);
    const deckState = useMemo(() => normalizeDeckState(cards, widget?.state || {}), [cards, widget?.state, widget?.revision]);
    const pending = deckState.pending;
    const leftEntries = useMemo(() => [...deckState.left].sort((a, b) => Number(b.sequence || 0) - Number(a.sequence || 0)), [deckState.left]);
    const rightEntries = useMemo(() => [...deckState.right].sort((a, b) => Number(b.sequence || 0) - Number(a.sequence || 0)), [deckState.right]);
    const [reviewCategory, setReviewCategory] = useState(null);
    const [modeDirection, setModeDirection] = useState(1);
    const [departing, setDeparting] = useState(null);
    const [reviewDeparting, setReviewDeparting] = useState(null);
    const [reviewDragTowardTarget, setReviewDragTowardTarget] = useState(false);
    const [mainDragTarget, setMainDragTarget] = useState(null);
    const [pocketReturning, setPocketReturning] = useState(null);
    const [pocketReverseDragIntent, setPocketReverseDragIntent] = useState(null);
    const [deckViewportHeight, setDeckViewportHeight] = useState(null);
    const leftPocketRef = useRef(null);
    const rightPocketRef = useRef(null);
    const returnPocketRef = useRef(null);
    const deckLandingRef = useRef(null);
    const cardRef = useRef(null);
    const mainModeRef = useRef(null);
    const mainDragOriginRef = useRef(null);
    const reviewDragOriginRef = useRef(null);
    const mainDragStability = useDesktopDragStability();
    const reviewDragStability = useDesktopDragStability();

    // During a reverse pull from a side pocket the server may update pending
    // before the flight animation finishes. Keep that returning card out of the
    // main stack until it visually reaches the centre, otherwise two copies of
    // the same card briefly appear.
    const pendingForMainRender = useMemo(() => {
        if (!pocketReturning?.cardId || pocketReturning?.destination !== 'pending') return pending;
        return pending.filter((id) => String(id) !== String(pocketReturning.cardId));
    }, [pending, pocketReturning?.cardId, pocketReturning?.destination]);
    const leftEntriesForRender = useMemo(() => {
        if (!pocketReturning?.cardId || pocketReturning?.destination !== 'left') return leftEntries;
        return leftEntries.filter((item) => String(item?.cardId) !== String(pocketReturning.cardId));
    }, [leftEntries, pocketReturning?.cardId, pocketReturning?.destination]);
    const rightEntriesForRender = useMemo(() => {
        if (!pocketReturning?.cardId || pocketReturning?.destination !== 'right') return rightEntries;
        return rightEntries.filter((item) => String(item?.cardId) !== String(pocketReturning.cardId));
    }, [rightEntries, pocketReturning?.cardId, pocketReturning?.destination]);
    const current = byId.get(String(pendingForMainRender[0] || ''));

    const openDetail = useCallback((href) => {
        if (!href) return;
        if (isUniversalModalLink(href)) {
            openUniversalModalLink(href);
            return;
        }
        window.open(href, '_blank', 'noopener,noreferrer');
    }, []);

    const reviewEntries = reviewCategory === 'left' ? leftEntries : rightEntries;
    const reviewEntry = reviewEntries[0];
    const reviewCard = reviewEntry ? byId.get(String(reviewEntry.cardId)) : null;
    const reviewLabel = reviewCategory === 'left' ? (descriptor.leftLabel || '放弃') : (descriptor.rightLabel || '喜欢');
    const leftTopCard = leftEntriesForRender[0] ? byId.get(String(leftEntriesForRender[0].cardId)) : null;
    const rightTopCard = rightEntriesForRender[0] ? byId.get(String(rightEntriesForRender[0].cardId)) : null;
    const pendingTopCard = pending[0] ? byId.get(String(pending[0])) : null;

    useLayoutEffect(() => {
        if (reviewCategory || !mainModeRef.current || typeof ResizeObserver === 'undefined') return undefined;
        const node = mainModeRef.current;
        const updateHeight = () => {
            const height = Math.ceil(node.getBoundingClientRect().height);
            if (height > 0) setDeckViewportHeight(height);
        };
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(node);
        return () => observer.disconnect();
    }, [reviewCategory, cards.length, pending.length, leftEntries.length, rightEntries.length]);

    useEffect(() => {
        if (reviewCategory && reviewEntries.length === 0 && !reviewDeparting) {
            setReviewCategory(null);
            setModeDirection(reviewCategory === 'left' ? -1 : 1);
        }
    }, [reviewCategory, reviewDeparting, reviewEntries.length]);

    const openPocket = useCallback((category) => {
        const list = category === 'left' ? leftEntries : rightEntries;
        if (list.length === 0 || pocketReturning) return;
        setModeDirection(category === 'left' ? -1 : 1);
        setReviewDeparting(null);
        setReviewDragTowardTarget(false);
        setMainDragTarget(null);
        if (mainModeRef.current) {
            const height = Math.ceil(mainModeRef.current.getBoundingClientRect().height);
            if (height > 0) setDeckViewportHeight(height);
        }
        setReviewCategory(category);
    }, [leftEntries, pocketReturning, rightEntries]);

    const closePocket = useCallback(() => {
        setModeDirection(reviewCategory === 'left' ? -1 : 1);
        setReviewCategory(null);
        setReviewDeparting(null);
        setReviewDragTowardTarget(false);
        setMainDragTarget(null);
        reviewDragStability.end();
    }, [reviewCategory, reviewDragStability]);

    const flyAndClassify = useCallback(async (category, dragOriginBox = null) => {
        if (!interactive || busy || departing || pocketReturning || !current) return;
        if (category === 'right' && Number(descriptor.maxSelected || 0) > 0 && rightEntries.length >= Number(descriptor.maxSelected || 0)) return;

        // Always measure the destination against the card's RESTING rect. The
        // card may already be translated by Framer Motion when onDragEnd fires;
        // using that transient rect as the animation origin can invert dx.
        const originBox = dragOriginBox || captureElementRect(cardRef.current);
        const pocket = category === 'right' ? rightPocketRef.current : leftPocketRef.current;
        const pocketBox = captureElementRect(pocket);
        const {dx, dy} = getDirectedFlightVector({
            originBox,
            targetBox: pocketBox,
            direction: category,
            fallbackDistance: 340,
            fallbackY: -16,
        });

        const departure = {
            cardId: String(current.id),
            card: current,
            category,
            dx,
            dy,
        };
        setMainDragTarget(category);
        setDeparting(departure);

        const [updated] = await Promise.all([
            act('classify', {cardId: current.id, category}),
            waitForAnimationFloor(420),
        ]);
        if (!updated) {
            setDeparting(null);
            setMainDragTarget(null);
            return;
        }
        setDeparting(null);
        setMainDragTarget(null);
    }, [act, busy, current, departing, descriptor.maxSelected, interactive, pocketReturning, rightEntries.length]);

    const returnLatestPocketCard = useCallback(async (side, card, dragOriginBox = null, destination = 'pending', options = {}) => {
        if (!interactive || busy || pocketReturning || departing || !card || reviewCategory) return false;
        const externalFlight = options?.externalFlight === true;
        const directToRight = side === 'left' && destination === 'right';
        if (directToRight && Number(descriptor.maxSelected || 0) > 0 && rightEntries.length >= Number(descriptor.maxSelected || 0)) {
            return false;
        }

        const direction = side === 'left' ? 'right' : 'left';
        const originBox = dragOriginBox || captureElementRect(side === 'left' ? leftPocketRef.current : rightPocketRef.current);
        const targetBox = captureElementRect(directToRight ? rightPocketRef.current : deckLandingRef.current);
        const {dx, dy} = getDirectedFlightVector({
            originBox,
            targetBox,
            direction,
            fallbackDistance: directToRight ? 560 : 300,
            fallbackY: directToRight ? 0 : -6,
        });
        const scale = originBox && targetBox && originBox.width > 0
            ? Math.max(directToRight ? 0.92 : 1.45, Math.min(directToRight ? 1.12 : 3.25, targetBox.width / originBox.width))
            : (directToRight ? 1 : 2.45);

        const snapshot = {
            side,
            destination: directToRight ? 'right' : 'pending',
            cardId: String(card.id),
            card,
            dx,
            dy,
            scale,
            externalFlight,
        };
        setPocketReturning(snapshot);

        const [updated] = await Promise.all([
            directToRight
                ? act('reclassify', {cardId: card.id, category: 'right'})
                : act('unclassify', {cardId: card.id}),
            waitForAnimationFloor(externalFlight ? (directToRight ? 270 : 250) : (directToRight ? 470 : 430)),
        ]);
        if (!updated) {
            setPocketReturning(null);
            setPocketReverseDragIntent(null);
            return false;
        }
        setPocketReturning(null);
        setPocketReverseDragIntent(null);
        return true;
    }, [act, busy, departing, descriptor.maxSelected, interactive, pocketReturning, reviewCategory, rightEntries.length]);


    const returnReviewCard = useCallback(async (dragOriginBox = null) => {
        const activeCard = reviewDeparting?.card || reviewCard;
        if (!interactive || busy || reviewDeparting || !activeCard || !reviewCategory) return;
        const direction = reviewCategory === 'left' ? 'right' : 'left';
        const originBox = dragOriginBox || captureElementRect(cardRef.current);
        const pocketBox = captureElementRect(returnPocketRef.current);
        const {dx, dy} = getDirectedFlightVector({
            originBox,
            targetBox: pocketBox,
            direction,
            fallbackDistance: 300,
            fallbackY: 0,
        });
        const snapshot = {
            cardId: String(activeCard.id),
            card: activeCard,
            dx,
            dy,
        };
        setReviewDeparting(snapshot);
        setReviewDragTowardTarget(true);
        const [updated] = await Promise.all([
            act('unclassify', {cardId: activeCard.id}),
            waitForAnimationFloor(390),
        ]);
        if (!updated) {
            setReviewDeparting(null);
            setReviewDragTowardTarget(false);
            return;
        }
        setReviewDeparting(null);
        setReviewDragTowardTarget(false);
    }, [act, busy, interactive, reviewCard, reviewCategory, reviewDeparting, reviewDragStability]);


    if (widget?.status === 'completed') return <CompletedWidget widget={widget}/>;

    const pendingIdsForRender = pendingForMainRender.slice(0, departing && pendingForMainRender[0] === departing.cardId ? 4 : 3);
    const visibleDeckCards = pendingIdsForRender.map((id) => byId.get(String(id))).filter(Boolean);
    if (departing?.card && !visibleDeckCards.some((card) => String(card?.id) === departing.cardId)) {
        visibleDeckCards.unshift(departing.card);
    }

    const getDeckPose = (cardId) => {
        if (departing?.cardId === cardId) {
            return {
                x: departing.dx,
                y: departing.dy,
                scale: 0.2,
                rotate: departing.category === 'right' ? 11 : -11,
                opacity: 0.05,
                zIndex: 40,
            };
        }
        const pendingIndex = pendingForMainRender.indexOf(cardId);
        const shift = departing && pendingForMainRender[0] === departing.cardId ? 1 : 0;
        const visualIndex = Math.max(0, pendingIndex - shift);
        const poses = [
            {x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30},
            {x: 0, y: 12, scale: 0.963, rotate: -1.05, opacity: 0.84, zIndex: 20},
            {x: 0, y: 24, scale: 0.926, rotate: 1.25, opacity: 0.6, zIndex: 10},
        ];
        return poses[Math.min(visualIndex, poses.length - 1)];
    };

    const reviewFrontCard = reviewDeparting?.card || reviewCard;
    const reviewCardsForStack = reviewEntries.slice(0, 4)
        .map((entry) => byId.get(String(entry.cardId)))
        .filter(Boolean);
    if (reviewDeparting?.card && !reviewCardsForStack.some((card) => String(card?.id) === reviewDeparting.cardId)) {
        reviewCardsForStack.unshift(reviewDeparting.card);
    }

    const reviewCardPose = reviewDeparting ? {
        x: reviewDeparting.dx,
        y: reviewDeparting.dy,
        scale: 0.24,
        rotate: reviewCategory === 'left' ? 9 : -9,
        opacity: 0.05,
    } : {x: 0, y: 0, scale: 1, rotate: 0, opacity: 1};

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{
                height: deckViewportHeight ? `${deckViewportHeight}px` : undefined,
                overflow: 'clip',
                contain: 'layout paint',
            }}
        >
            <AnimatePresence initial={false} mode="sync" custom={modeDirection}>
                {reviewCategory && reviewFrontCard ? (
                    <motion.section
                        key={`review-${reviewCategory}`}
                        custom={modeDirection}
                        initial={{x: modeDirection * 54, opacity: 0, scale: 0.986}}
                        animate={{x: 0, opacity: 1, scale: 1}}
                        exit={{x: modeDirection * 42, opacity: 0, scale: 0.988}}
                        transition={REVIEW_SPRING}
                        className="absolute inset-0 mx-auto flex h-full w-full max-w-[46rem] flex-col overflow-hidden rounded-[30px] border border-black/[0.045] bg-black/[0.018] px-3 py-3 sm:px-6 sm:py-4"
                    >
                        <div className="flex shrink-0 items-center justify-between gap-3 px-1 pb-1.5 sm:pb-2">
                            <div className="min-w-0">
                                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">分类牌堆</div>
                                <div className="mt-0.5 truncate text-sm font-semibold text-neutral-700 sm:text-base">{reviewLabel}</div>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                                <Layers3 className="h-4 w-4"/>
                                <span className="tabular-nums">{reviewEntries.length} 张</span>
                            </div>
                        </div>

                        <div className="shrink-0 pb-1 text-center text-[10px] text-neutral-400 sm:text-[11px]">
                            {reviewCategory === 'left' ? `把顶部卡片向右拖回${descriptor.middleLabel || '待选择'}` : `把顶部卡片向左拖回${descriptor.middleLabel || '待选择'}`}
                        </div>

                        <div className={`grid min-h-0 flex-1 items-center gap-3 sm:gap-6 ${reviewCategory === 'left' ? 'grid-cols-[minmax(0,20rem)_minmax(82px,1fr)] sm:grid-cols-[minmax(17rem,20rem)_minmax(112px,1fr)]' : 'grid-cols-[minmax(82px,1fr)_minmax(0,20rem)] sm:grid-cols-[minmax(112px,1fr)_minmax(17rem,20rem)]'}`}>
                            {reviewCategory === 'right' && (
                                <PendingReturnPocket
                                    side="left"
                                    count={pending.length}
                                    topCard={pendingTopCard}
                                    pocketRef={returnPocketRef}
                                    active={reviewDragTowardTarget}
                                />
                            )}

                            <div className="relative flex h-full min-h-0 min-w-0 items-center justify-center overflow-visible">
                                <div className="pointer-events-none absolute bottom-[8%] h-10 w-[66%] rounded-[50%] bg-black/[0.06] blur-xl"/>
                                {reviewCardsForStack.slice(1, 4).reverse().map((card) => {
                                    const sourceIndex = reviewCardsForStack.findIndex((candidate) => String(candidate?.id) === String(card?.id));
                                    const depth = Math.max(1, sourceIndex);
                                    return (
                                        <motion.div
                                            key={`review-stack-${card.id}`}
                                            initial={{y: 30, scale: 0.9, opacity: 0}}
                                            animate={{
                                                x: 0,
                                                y: depth * 13,
                                                scale: 1 - depth * 0.042,
                                                rotate: depth % 2 ? -1.4 : 1.4,
                                                opacity: 0.72 - depth * 0.1,
                                            }}
                                            transition={REVIEW_SPRING}
                                            className="pointer-events-none absolute w-[min(54vw,16.5rem)] select-none sm:w-72"
                                            style={{zIndex: 20 - depth, willChange: 'transform'}}
                                        >
                                            <CardFace card={card} onOpenDetail={openDetail}/>
                                        </motion.div>
                                    );
                                })}

                                <AnimatePresence initial={false} mode="popLayout">
                                    {reviewFrontCard && (
                                        <motion.div
                                            key={`review-front-${reviewFrontCard.id}`}
                                            layoutId={!reviewDeparting ? `deck-pocket-card-${reviewCategory}-${String(reviewFrontCard.id)}` : undefined}
                                            ref={cardRef}
                                            initial={{y: 16, scale: 0.95, opacity: 0}}
                                            animate={reviewCardPose}
                                            exit={{y: 14, scale: 0.94, opacity: 0}}
                                            transition={REVIEW_SPRING}
                                            className="absolute w-[min(54vw,16.5rem)] touch-none select-none sm:w-72"
                                            style={{zIndex: 30, willChange: 'transform'}}
                                            drag={interactive && !busy && !reviewDeparting ? 'x' : false}
                                            dragDirectionLock
                                            dragMomentum={false}
                                            onPointerDown={(event) => {
                                                reviewDragOriginRef.current = {
                                                    cardId: String(reviewFrontCard?.id || ''),
                                                    rect: captureElementRect(event.currentTarget),
                                                };
                                            }}
                                            onDragStart={(event) => {
                                                if (reviewDragOriginRef.current?.cardId !== String(reviewFrontCard?.id || '')) {
                                                    reviewDragOriginRef.current = {
                                                        cardId: String(reviewFrontCard?.id || ''),
                                                        rect: captureElementRect(cardRef.current),
                                                    };
                                                }
                                                reviewDragStability.begin(event);
                                                setReviewDragTowardTarget(false);
                                            }}
                                            onDrag={(_, info) => {
                                                reviewDragStability.hold();
                                                const toward = reviewCategory === 'left' ? info.offset.x > 44 : info.offset.x < -44;
                                                setReviewDragTowardTarget(toward);
                                            }}
                                            onDragEnd={(_, info) => {
                                                reviewDragStability.hold();
                                                const direction = reviewCategory === 'left' ? 'right' : 'left';
                                                const shouldReturn = shouldCommitOneWayDrag(direction, info.offset.x, info.velocity.x);
                                                const originBox = reviewDragOriginRef.current?.cardId === String(reviewFrontCard?.id || '')
                                                    ? reviewDragOriginRef.current?.rect
                                                    : null;
                                                reviewDragOriginRef.current = null;
                                                reviewDragStability.end();
                                                if (shouldReturn) {
                                                    void returnReviewCard(originBox);
                                                } else {
                                                    setReviewDragTowardTarget(false);
                                                }
                                            }}
                                            whileDrag={{cursor: 'grabbing', boxShadow: '0 24px 70px rgba(15,23,42,.18)'}}
                                        >
                                            <CardFace card={reviewFrontCard} onOpenDetail={openDetail}/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {reviewCategory === 'left' && (
                                <PendingReturnPocket
                                    side="right"
                                    count={pending.length}
                                    topCard={pendingTopCard}
                                    pocketRef={returnPocketRef}
                                    active={reviewDragTowardTarget}
                                />
                            )}
                        </div>

                        <div className="flex shrink-0 flex-col items-center gap-1 border-t border-black/[0.05] pt-3">
                            <button
                                type="button"
                                disabled={busy || Boolean(reviewDeparting)}
                                onClick={closePocket}
                                className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"/>返回主牌堆
                            </button>
                            <div className="text-[10px] text-neutral-400 sm:text-[11px]">移走顶部卡片后，后方牌堆会自动补位</div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.div
                        key="main-deck"
                        ref={mainModeRef}
                        initial={{x: -modeDirection * 30, opacity: 0, scale: 0.99}}
                        animate={{x: 0, opacity: 1, scale: 1}}
                        exit={{x: -modeDirection * 34, opacity: 0.32, scale: 0.99}}
                        transition={REVIEW_SPRING}
                        className={`${deckViewportHeight ? 'absolute inset-0' : 'relative'} w-full`}
                    >
                        <div className="grid w-full grid-cols-[minmax(76px,1fr)_minmax(0,20rem)_minmax(76px,1fr)] items-center gap-2 sm:grid-cols-[minmax(116px,1fr)_minmax(16rem,20rem)_minmax(116px,1fr)] sm:gap-5">
                            <CardPocket
                                side="left"
                                label={descriptor.leftLabel || '放弃'}
                                count={leftEntriesForRender.length}
                                entries={leftEntriesForRender}
                                topCard={leftTopCard}
                                active={mainDragTarget === 'left'}
                                onClick={() => openPocket('left')}
                                onReverse={returnLatestPocketCard}
                                onReverseTargetChange={setPocketReverseDragIntent}
                                returning={pocketReturning}
                                oppositePocketRef={rightPocketRef}
                                pendingTargetRef={deckLandingRef}
                                allowDirectOpposite={!(Number(descriptor.maxSelected || 0) > 0 && rightEntries.length >= Number(descriptor.maxSelected || 0))}
                                interactive={interactive}
                                busy={busy || Boolean(departing)}
                                pocketRef={leftPocketRef}
                            />

                            <motion.div
                                animate={{
                                    x: pocketReverseDragIntent?.target === 'pending'
                                        ? (pocketReverseDragIntent.source === 'left' ? -5 : 5)
                                        : 0,
                                    y: pocketReverseDragIntent?.target === 'pending' ? -2 : 0,
                                    scale: pocketReverseDragIntent?.target === 'pending' ? 1.012 : 1,
                                }}
                                transition={DECK_SPRING}
                                className="relative flex min-h-[25rem] min-w-0 items-center justify-center sm:min-h-[29rem]"
                            >
                                <div ref={deckLandingRef} className="pointer-events-none absolute aspect-[5/7] w-[min(54vw,16.5rem)] opacity-0 sm:w-72"/>
                                <motion.div
                                    animate={{
                                        opacity: pocketReverseDragIntent?.target === 'pending' ? 0.11 : 0.055,
                                        scale: pocketReverseDragIntent?.target === 'pending' ? 1.14 : 1,
                                    }}
                                    transition={DECK_SPRING}
                                    className="pointer-events-none absolute bottom-[7%] h-10 w-[70%] rounded-[50%] bg-black blur-xl"
                                />
                                {current || departing ? (
                                    <div className="relative flex h-full w-full items-center justify-center">
                                        <AnimatePresence initial={false} mode="popLayout">
                                            {visibleDeckCards.map((card) => {
                                                const cardId = String(card?.id || '');
                                                const pose = getDeckPose(cardId);
                                                const isFront = cardId === String(current?.id || '') && !departing;
                                                const attractedPose = isFront && mainDragTarget
                                                    ? {...pose, y: -5, scale: 1.018, rotate: mainDragTarget === 'right' ? 2.4 : -2.4}
                                                    : pose;
                                                return (
                                                    <motion.div
                                                        key={`deck-card-${cardId}`}
                                                        ref={isFront ? cardRef : null}
                                                        initial={{y: 34, scale: 0.88, rotate: 0.7, opacity: 0}}
                                                        animate={attractedPose}
                                                        exit={{y: 24, scale: 0.9, opacity: 0}}
                                                        transition={DECK_SPRING}
                                                        className={`absolute w-[min(54vw,16.5rem)] touch-none select-none sm:w-72 ${isFront ? '' : 'pointer-events-none'}`}
                                                        style={{zIndex: pose.zIndex, willChange: 'transform'}}
                                                        drag={isFront && interactive && !busy && !pocketReturning ? 'x' : false}
                                                        dragDirectionLock
                                                        dragMomentum={false}
                                                        whileDrag={{cursor: 'grabbing', boxShadow: '0 26px 76px rgba(15,23,42,.2)'}}
                                                        tabIndex={isFront && interactive && !busy && !pocketReturning ? 0 : -1}
                                                        role={isFront ? 'group' : undefined}
                                                        aria-label={isFront ? `当前候选：${card?.title || card?.label || card?.id || ''}` : undefined}
                                                        onPointerDown={isFront ? (event) => {
                                                            mainDragOriginRef.current = {
                                                                cardId,
                                                                rect: captureElementRect(event.currentTarget),
                                                            };
                                                        } : undefined}
                                                        onDragStart={isFront ? (event) => {
                                                            if (mainDragOriginRef.current?.cardId !== cardId) {
                                                                mainDragOriginRef.current = {
                                                                    cardId,
                                                                    rect: captureElementRect(cardRef.current),
                                                                };
                                                            }
                                                            setMainDragTarget(null);
                                                            mainDragStability.begin(event);
                                                        } : undefined}
                                                        onDrag={isFront ? (_, info) => {
                                                            mainDragStability.hold();
                                                            let target = null;
                                                            if (info.offset.x <= -56) target = 'left';
                                                            if (info.offset.x >= 56 && !(Number(descriptor.maxSelected || 0) > 0 && rightEntries.length >= Number(descriptor.maxSelected || 0))) target = 'right';
                                                            setMainDragTarget((currentTarget) => currentTarget === target ? currentTarget : target);
                                                        } : undefined}
                                                        onKeyDown={isFront ? (event) => {
                                                            if (!interactive || busy || pocketReturning) return;
                                                            if (event.key === 'ArrowLeft') {
                                                                event.preventDefault();
                                                                void flyAndClassify('left');
                                                            } else if (event.key === 'ArrowRight') {
                                                                event.preventDefault();
                                                                void flyAndClassify('right');
                                                            }
                                                        } : undefined}
                                                        onDragEnd={isFront ? (_, info) => {
                                                            mainDragStability.hold();
                                                            const category = resolveHorizontalClassification(info.offset.x, info.velocity.x);
                                                            const originBox = mainDragOriginRef.current?.cardId === cardId
                                                                ? mainDragOriginRef.current?.rect
                                                                : null;
                                                            mainDragOriginRef.current = null;
                                                            mainDragStability.end();
                                                            if (!interactive || busy || pocketReturning || !category) {
                                                                setMainDragTarget(null);
                                                                return;
                                                            }
                                                            void flyAndClassify(category, originBox);
                                                        } : undefined}
                                                    >
                                                        <CardFace card={card} onOpenDetail={openDetail}/>
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.95, y: 10}}
                                        animate={{opacity: 1, scale: 1, y: 0}}
                                        transition={DECK_SPRING}
                                        className="flex aspect-[5/7] w-[min(54vw,16.5rem)] flex-col items-center justify-center rounded-[22px] border border-dashed border-neutral-300 bg-white/45 text-center text-neutral-500 sm:w-72"
                                    >
                                        <Layers3 className="mb-3 h-7 w-7 text-neutral-400"/>
                                        <div className="text-sm font-medium">卡片已全部分类</div>
                                        <div className="mt-1 text-xs text-neutral-400">点击两侧真实牌堆可以继续调整</div>
                                    </motion.div>
                                )}
                            </motion.div>

                            <CardPocket
                                side="right"
                                label={descriptor.rightLabel || '喜欢'}
                                count={rightEntriesForRender.length}
                                entries={rightEntriesForRender}
                                topCard={rightTopCard}
                                active={mainDragTarget === 'right' || (pocketReverseDragIntent?.source === 'left' && pocketReverseDragIntent?.target === 'right')}
                                onClick={() => openPocket('right')}
                                onReverse={returnLatestPocketCard}
                                onReverseTargetChange={setPocketReverseDragIntent}
                                returning={pocketReturning}
                                oppositePocketRef={leftPocketRef}
                                pendingTargetRef={deckLandingRef}
                                interactive={interactive}
                                busy={busy || Boolean(departing)}
                                pocketRef={rightPocketRef}
                            />
                        </div>

                        {current && (
                            <motion.div className="mt-1 flex items-center justify-center gap-5 text-neutral-400">
                                <motion.button
                                    type="button"
                                    disabled={!interactive || busy || Boolean(departing) || Boolean(pocketReturning)}
                                    onClick={() => void flyAndClassify('left')}
                                    whileTap={{scale: 0.9}}
                                    className="rounded-full border border-neutral-200 bg-white/80 p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:text-neutral-700 hover:shadow disabled:opacity-40"
                                    aria-label={descriptor.leftLabel || '放弃'}
                                ><ArrowLeft className="h-4 w-4"/></motion.button>
                                <div className="text-[11px] tabular-nums">{Math.min(cards.length, cards.length - pending.length + 1)} / {cards.length}</div>
                                <motion.button
                                    type="button"
                                    disabled={!interactive || busy || Boolean(departing) || Boolean(pocketReturning) || (Number(descriptor.maxSelected || 0) > 0 && rightEntries.length >= Number(descriptor.maxSelected || 0))}
                                    onClick={() => void flyAndClassify('right')}
                                    whileTap={{scale: 0.9}}
                                    className="rounded-full border border-neutral-200 bg-white/80 p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:text-neutral-700 hover:shadow disabled:opacity-40"
                                    aria-label={descriptor.rightLabel || '喜欢'}
                                ><ArrowRight className="h-4 w-4"/></motion.button>
                            </motion.div>
                        )}

                        <div className="mt-5 flex flex-col items-center justify-center gap-1.5 border-t border-black/[0.05] pt-4">
                            <button
                                type="button"
                                disabled={!interactive || busy || Boolean(pocketReturning)}
                                onClick={() => void act('submit', {})}
                                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
                            >
                                {descriptor.submitLabel || '完成选择'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                            </button>
                            <div className="text-[11px] text-neutral-400">
                                {`${descriptor.leftLabel || '放弃'} ${leftEntries.length} · ${descriptor.middleLabel || '待选择'} ${pending.length} · ${descriptor.rightLabel || '喜欢'} ${rightEntries.length}`}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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

const WidgetHost = memo(({content = '', markId = null, messageReadonly = false, messageIsLatest = true}) => {
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
        if (!widget?.widgetId || !markId || busy) return null;
        setBusy(true);
        try {
            const data = await apiClient.post(
                `${apiEndpoint.CHAT_WIDGETS_ENDPOINT}/${encodeURIComponent(widget.widgetId)}/action`,
                {
                    markId,
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
    }, [busy, markId, widget]);

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
    && prev.markId === next.markId
    && prev.messageReadonly === next.messageReadonly
    && prev.messageIsLatest === next.messageIsLatest
));

WidgetHost.displayName = 'WidgetHost';
export default WidgetHost;
