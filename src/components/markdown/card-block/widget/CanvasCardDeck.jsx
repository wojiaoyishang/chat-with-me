import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, X} from 'lucide-react';

import {isUniversalModalLink, openUniversalModalLink} from '@/components/modal/universalModal.js';
import {resolveCwmUrl} from '@/lib/virtualUrl.js';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const resolveWidgetImageUrl = (value) => {
    if (typeof value !== 'string') return '';
    const raw = value.trim();
    if (!raw) return '';
    const cwm = resolveCwmUrl(raw);
    if (cwm !== null) return cwm || '';
    if (/^https:\/\//i.test(raw)) return raw;
    return '';
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

const sortNewestFirst = (entries) => [...entries].sort((a, b) => Number(b?.sequence || 0) - Number(a?.sequence || 0));

const rectFromCenter = (cx, cy, w, h) => ({x: cx - w / 2, y: cy - h / 2, w, h, cx, cy});
const pointInRect = (x, y, rect, padding = 0) => Boolean(
    rect
    && x >= rect.x - padding
    && x <= rect.x + rect.w + padding
    && y >= rect.y - padding
    && y <= rect.y + rect.h + padding
);

const makePose = (rect, extra = {}) => ({
    x: rect.x,
    y: rect.y,
    w: rect.w,
    h: rect.h,
    rotation: 0,
    opacity: 1,
    scale: 1,
    ...extra,
});

const interpolatePose = (from, to, t) => ({
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    w: lerp(from.w, to.w, t),
    h: lerp(from.h, to.h, t),
    rotation: lerp(from.rotation || 0, to.rotation || 0, t),
    opacity: lerp(from.opacity ?? 1, to.opacity ?? 1, t),
    scale: lerp(from.scale ?? 1, to.scale ?? 1, t),
});

const roundedRectPath = (ctx, x, y, w, h, radius) => {
    const r = Math.min(radius, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
};

const wrapText = (ctx, text, maxWidth, maxLines = 3) => {
    const raw = String(text || '').trim();
    if (!raw) return [];
    const chars = [...raw];
    const lines = [];
    let line = '';
    for (const char of chars) {
        const next = line + char;
        if (ctx.measureText(next).width > maxWidth && line) {
            lines.push(line);
            line = char;
            if (lines.length >= maxLines) break;
        } else {
            line = next;
        }
    }
    if (lines.length < maxLines && line) lines.push(line);
    if (lines.length === maxLines) {
        const consumed = lines.join('').length;
        if (consumed < raw.length) {
            let last = lines[lines.length - 1];
            while (last && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
            lines[lines.length - 1] = `${last}…`;
        }
    }
    return lines;
};

const imageCache = new Map();
const getCachedImage = (url, invalidate) => {
    if (!url || typeof Image === 'undefined') return null;
    let record = imageCache.get(url);
    if (!record) {
        const image = new Image();
        record = {image, status: 'loading'};
        imageCache.set(url, record);
        image.onload = () => {
            record.status = 'loaded';
            invalidate?.();
        };
        image.onerror = () => {
            record.status = 'error';
            invalidate?.();
        };
        image.decoding = 'async';
        image.src = url;
    }
    return record.status === 'loaded' ? record.image : null;
};

const getImageCrop = (image, width, height, position = 'center') => {
    const iw = image?.naturalWidth || image?.width || 1;
    const ih = image?.naturalHeight || image?.height || 1;
    const targetRatio = width / height;
    const sourceRatio = iw / ih;
    let sx = 0;
    let sy = 0;
    let sw = iw;
    let sh = ih;
    if (sourceRatio > targetRatio) {
        sw = ih * targetRatio;
        if (position === 'left') sx = 0;
        else if (position === 'right') sx = iw - sw;
        else sx = (iw - sw) / 2;
    } else {
        sh = iw / targetRatio;
        if (position === 'top') sy = 0;
        else if (position === 'bottom') sy = ih - sh;
        else sy = (ih - sh) / 2;
    }
    return {sx, sy, sw, sh};
};

const drawCard = (ctx, card, pose, {compact = false, dragging = false, invalidate} = {}) => {
    if (!card || !pose || pose.opacity <= 0.001) return;
    const {x, y, w, h} = pose;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const scale = pose.scale ?? 1;
    const radius = compact ? Math.max(10, w * 0.09) : Math.max(16, w * 0.075);
    const source = resolveWidgetImageUrl(card?.image || card?.imageUrl || card?.media?.url);
    const requestedStyle = ['auto', 'poster', 'text'].includes(String(card?.style || '').toLowerCase())
        ? String(card.style).toLowerCase()
        : 'auto';
    const image = requestedStyle === 'text' ? null : getCachedImage(source, invalidate);
    const style = image ? 'poster' : 'text';
    const title = String(card?.title || card?.label || card?.id || '');
    const subtitle = String(card?.subtitle || '');
    const description = String(card?.description || '');
    const badges = Array.isArray(card?.badges) ? card.badges.slice(0, compact ? 1 : 3) : [];
    const imagePosition = ['center', 'top', 'bottom', 'left', 'right'].includes(String(card?.imagePosition || '').toLowerCase())
        ? String(card.imagePosition).toLowerCase()
        : 'center';

    ctx.save();
    ctx.globalAlpha = pose.opacity ?? 1;
    ctx.translate(cx, cy);
    ctx.rotate((pose.rotation || 0) * Math.PI / 180);
    ctx.scale(scale, scale);
    ctx.translate(-w / 2, -h / 2);

    ctx.shadowColor = dragging ? 'rgba(15,23,42,.28)' : 'rgba(15,23,42,.16)';
    ctx.shadowBlur = dragging ? Math.max(24, w * 0.12) : Math.max(14, w * 0.075);
    ctx.shadowOffsetY = dragging ? Math.max(10, w * 0.04) : Math.max(7, w * 0.03);
    roundedRectPath(ctx, 0, 0, w, h, radius);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.save();
    roundedRectPath(ctx, 0, 0, w, h, radius);
    ctx.clip();

    if (style === 'poster') {
        const crop = getImageCrop(image, w, h, imagePosition);
        ctx.drawImage(image, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, w, h);
        const gradient = ctx.createLinearGradient(0, h * 0.38, 0, h);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.52, 'rgba(0,0,0,.10)');
        gradient.addColorStop(1, 'rgba(0,0,0,.80)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        if (badges.length && !compact) {
            let badgeX = w * 0.065;
            const badgeY = w * 0.065;
            ctx.font = `600 ${Math.max(10, w * 0.038)}px ui-sans-serif, system-ui, sans-serif`;
            for (const badge of badges) {
                const label = String(badge);
                const textW = ctx.measureText(label).width;
                const bw = textW + w * 0.08;
                const bh = Math.max(22, w * 0.085);
                roundedRectPath(ctx, badgeX, badgeY, bw, bh, bh / 2);
                ctx.fillStyle = 'rgba(0,0,0,.28)';
                ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,.96)';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, badgeX + w * 0.04, badgeY + bh / 2);
                badgeX += bw + 6;
            }
        }

        const padding = compact ? w * 0.08 : w * 0.075;
        const titleSize = compact ? Math.max(11, w * 0.105) : Math.max(17, w * 0.082);
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = `650 ${titleSize}px ui-sans-serif, system-ui, sans-serif`;
        const titleLines = wrapText(ctx, title, w - padding * 2, compact ? 2 : 2);
        const titleLineH = titleSize * 1.13;
        const subtitleSize = Math.max(10, titleSize * 0.52);
        const descSize = Math.max(10, titleSize * 0.48);
        const descLines = !compact && description ? 2 : 0;
        const reserved = titleLines.length * titleLineH
            + (subtitle && !compact ? subtitleSize * 1.55 : 0)
            + (descLines ? descSize * 2.5 : 0)
            + padding;
        let ty = h - reserved;
        for (const line of titleLines) {
            ctx.fillText(line, padding, ty);
            ty += titleLineH;
        }
        if (subtitle && !compact) {
            ctx.font = `550 ${subtitleSize}px ui-sans-serif, system-ui, sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,.82)';
            ty += subtitleSize * 0.25;
            ctx.fillText(subtitle, padding, ty);
            ty += subtitleSize * 1.35;
        }
        if (description && !compact) {
            ctx.font = `450 ${descSize}px ui-sans-serif, system-ui, sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,.76)';
            const lines = wrapText(ctx, description, w - padding * 2, 2);
            for (const line of lines) {
                ctx.fillText(line, padding, ty);
                ty += descSize * 1.35;
            }
        }
    } else {
        const bg = ctx.createRadialGradient(w * 0.5, h * 0.18, 0, w * 0.5, h * 0.5, Math.max(w, h));
        bg.addColorStop(0, '#ffffff');
        bg.addColorStop(0.64, '#fafaf9');
        bg.addColorStop(1, '#f5f5f4');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        const titleSize = compact ? Math.max(12, w * 0.11) : Math.max(20, w * 0.09);
        const subtitleSize = Math.max(10, titleSize * 0.52);
        const descSize = Math.max(10, titleSize * 0.48);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#171717';
        ctx.font = `650 ${titleSize}px ui-sans-serif, system-ui, sans-serif`;
        const titleLines = wrapText(ctx, title, w * 0.76, compact ? 2 : 3);
        const titleLineH = titleSize * 1.16;
        const descLines = !compact && description ? wrapText(ctx, description, w * 0.72, 3) : [];
        const totalH = titleLines.length * titleLineH
            + (subtitle && !compact ? subtitleSize * 1.7 : 0)
            + descLines.length * descSize * 1.45
            + (badges.length && !compact ? 28 : 0);
        let ty = (h - totalH) / 2;
        if (badges.length && !compact) {
            ctx.font = `600 ${Math.max(10, w * 0.035)}px ui-sans-serif, system-ui, sans-serif`;
            ctx.fillStyle = '#737373';
            ctx.fillText(badges.map(String).join(' · '), w / 2, ty);
            ty += 28;
        }
        ctx.fillStyle = '#171717';
        ctx.font = `650 ${titleSize}px ui-sans-serif, system-ui, sans-serif`;
        for (const line of titleLines) {
            ctx.fillText(line, w / 2, ty);
            ty += titleLineH;
        }
        if (subtitle && !compact) {
            ctx.font = `550 ${subtitleSize}px ui-sans-serif, system-ui, sans-serif`;
            ctx.fillStyle = '#737373';
            ty += subtitleSize * 0.25;
            ctx.fillText(subtitle, w / 2, ty);
            ty += subtitleSize * 1.45;
        }
        if (descLines.length) {
            ctx.font = `450 ${descSize}px ui-sans-serif, system-ui, sans-serif`;
            ctx.fillStyle = '#737373';
            for (const line of descLines) {
                ctx.fillText(line, w / 2, ty);
                ty += descSize * 1.45;
            }
        }
    }

    ctx.restore();
    roundedRectPath(ctx, 0, 0, w, h, radius);
    ctx.strokeStyle = 'rgba(0,0,0,.07)';
    ctx.lineWidth = 1;
    ctx.stroke();

    if (card?.detailHref && !compact) {
        const fs = Math.max(10, w * 0.036);
        const label = '查看详情';
        ctx.font = `550 ${fs}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = style === 'poster' ? 'rgba(255,255,255,.82)' : 'rgba(82,82,82,.68)';
        ctx.fillText(label, w - w * 0.065, h - w * 0.055);
    }

    ctx.restore();
};

const drawCardBack = (ctx, pose, {count = 0, active = 0, label = ''} = {}) => {
    const {x, y, w, h} = pose;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const scale = 1 + active * 0.055;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-w / 2, -h / 2);
    ctx.shadowColor = `rgba(15,23,42,${0.10 + active * 0.07})`;
    ctx.shadowBlur = 12 + active * 12;
    ctx.shadowOffsetY = 7;
    roundedRectPath(ctx, 0, 0, w, h, Math.max(10, w * 0.11));
    ctx.fillStyle = active > 0.01 ? 'rgba(250,250,249,1)' : 'rgba(250,250,249,.96)';
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.save();
    roundedRectPath(ctx, 0, 0, w, h, Math.max(10, w * 0.11));
    ctx.clip();
    ctx.fillStyle = '#fafaf9';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,.035)';
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += Math.max(8, w * 0.11)) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
    }
    ctx.restore();
    roundedRectPath(ctx, 0, 0, w, h, Math.max(10, w * 0.11));
    ctx.strokeStyle = active > 0.01 ? 'rgba(23,23,23,.20)' : 'rgba(0,0,0,.08)';
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = active > 0.01 ? '#525252' : '#a3a3a3';
    ctx.font = `650 ${Math.max(10, w * 0.12)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText(String(count), w / 2, h / 2 - 4);
    if (label) {
        ctx.font = `550 ${Math.max(9, w * 0.075)}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillStyle = active > 0.01 ? '#737373' : '#b0b0b0';
        ctx.fillText(label, w / 2, h / 2 + Math.max(14, w * 0.14));
    }
    ctx.restore();
};

const drawPocketStack = (ctx, {cards = [], count, rect, label, side, active, hiddenCardId, invalidate, edgeOnly = false, edgeInset = 28}) => {
    // Every visible layer is a real card from the pile. On mobile the pile itself is
    // intentionally positioned mostly outside the stage: only its inner edges peek in,
    // leaving the centre of the table to the main decision card.
    const visibleCards = cards
        .filter(Boolean)
        .filter((card) => String(card?.id || '') !== String(hiddenCardId || ''))
        .slice(0, 7);
    const visibleDepth = visibleCards.length;
    if (visibleDepth > 0) {
        const nominalStepX = edgeOnly ? clamp(rect.w * 0.028, 2.8, 4.4) : clamp(rect.w * 0.038, 3, 5.5);
        const nominalStepY = edgeOnly ? clamp(rect.w * 0.026, 2.4, 4.2) : clamp(rect.w * 0.055, 4, 7);
        const maxSpreadX = edgeOnly ? Math.max(10, rect.w * 0.105) : Math.max(10, rect.w * 0.12);
        const maxSpreadY = edgeOnly ? Math.max(10, rect.w * 0.09) : Math.max(14, rect.w * 0.16);
        const depthSpan = Math.max(1, visibleDepth - 1);
        const stepX = visibleDepth > 1 ? Math.min(nominalStepX, maxSpreadX / depthSpan) : 0;
        const stepY = visibleDepth > 1 ? Math.min(nominalStepY, maxSpreadY / depthSpan) : 0;
        // Stable, deliberately imperfect angles make the mobile edge piles feel like a
        // small handful of physical cards instead of a mathematically perfect UI stack.
        const mobileAnglePattern = [-2.4, 1.6, -1.2, 2.7, -2.0, 1.1, -2.8];
        const mobileYOffsetPattern = [0, 0.8, -0.4, 1.1, 0.2, -0.7, 0.9];
        for (let index = visibleDepth - 1; index >= 0; index -= 1) {
            const card = visibleCards[index];
            const depth = index;
            // Desktop fans slightly outward. Mobile edge piles fan inward so several
            // distinct real-card edges remain visible even though most of the pile is
            // clipped outside the canvas.
            const direction = edgeOnly
                ? (side === 'left' ? 1 : -1)
                : (side === 'left' ? -1 : 1);
            const dx = direction * depth * stepX;
            const dy = depth * stepY + (edgeOnly ? mobileYOffsetPattern[depth % mobileYOffsetPattern.length] : 0);
            const scale = index === 0
                ? 1 + active * (edgeOnly ? 0.025 : 0.035)
                : Math.max(edgeOnly ? 0.94 : 0.90, 1 - depth * (edgeOnly ? 0.010 : 0.018));
            const rotation = edgeOnly
                ? mobileAnglePattern[depth % mobileAnglePattern.length] * (side === 'left' ? 1 : -1)
                : (index === 0 ? 0 : (side === 'left' ? -1 : 1) * Math.min(2.2, depth * 0.45));
            drawCard(
                ctx,
                card,
                makePose({...rect, x: rect.x + dx, y: rect.y + dy}, {
                    scale,
                    rotation,
                    opacity: index === 0 ? 1 : Math.max(edgeOnly ? 0.84 : 0.72, 0.97 - depth * (edgeOnly ? 0.022 : 0.045)),
                }),
                {compact: true, invalidate},
            );
        }
    } else {
        // Only an actually empty pile uses the neutral empty-card treatment.
        drawCardBack(ctx, makePose(rect), {count: 0, active, label});
    }

    ctx.save();
    if (edgeOnly) {
        // Mobile count sits above the exposed pile instead of occupying the side edge.
        const chipX = side === 'left'
            ? Math.max(16, rect.x + rect.w - edgeInset * 0.48)
            : rect.x + edgeInset * 0.48;
        const chipY = Math.max(17, rect.y - 13);
        const chipR = active > 0.01 ? 14 : 12.5;
        ctx.beginPath();
        ctx.arc(chipX, chipY, chipR, 0, Math.PI * 2);
        ctx.fillStyle = active > 0.01 ? 'rgba(23,23,23,.88)' : 'rgba(255,255,255,.92)';
        ctx.fill();
        ctx.strokeStyle = active > 0.01 ? 'rgba(255,255,255,.24)' : 'rgba(0,0,0,.09)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = active > 0.01 ? '#fff' : '#666';
        ctx.fillText(String(count), chipX, chipY + 0.5);
        ctx.restore();
        return;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = active > 0.01 ? '#525252' : '#8a8a8a';
    ctx.font = `600 ${Math.max(10, rect.w * 0.105)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText(label, rect.cx, rect.y + rect.h + 8);
    ctx.font = `500 ${Math.max(9, rect.w * 0.085)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillStyle = '#a3a3a3';
    ctx.fillText(`${count} 张`, rect.cx, rect.y + rect.h + 23);
    ctx.restore();
};

const drawMainBackStack = (ctx, cards, layout, hiddenCardId, invalidate, poseOverrides = null) => {
    const poses = layout.mainStackPoses;
    cards.slice(0, 3).reverse().forEach((card, reverseIndex) => {
        const index = Math.min(cards.length, 3) - reverseIndex - 1;
        if (!card || String(card.id) === String(hiddenCardId || '')) return;
        const target = poses[index];
        const pose = poseOverrides?.get?.(String(card.id)) || target;
        drawCard(ctx, card, pose, {compact: false, invalidate});
    });
};

const calculateLayout = (width, viewportHeight = 760) => {
    const safeWidth = Math.max(300, width || 300);
    const safeViewportHeight = Math.max(320, Number(viewportHeight) || 760);
    const mobile = safeWidth < 640;
    // Mobile is not a scaled-down desktop three-column layout. Side piles live mostly
    // outside the stage and only expose a narrow real-card edge, allowing the primary
    // decision card to own the visual field.
    const viewportBudget = Math.max(mobile ? 318 : 280, safeViewportHeight - (mobile ? 154 : 150));
    const widthBudget = mobile ? safeWidth * 1.18 : safeWidth * 0.52;
    const stageHeight = clamp(
        Math.min(viewportBudget, widthBudget),
        mobile ? 318 : 280,
        mobile ? 500 : 500,
    );
    const maxCardWByHeight = Math.max(150, (stageHeight - (mobile ? 62 : 66)) / 1.4);
    const desiredCardW = mobile
        ? clamp(safeWidth * 0.77, 220, 296)
        : clamp(safeWidth * 0.27, 225, 310);
    const cardW = Math.min(desiredCardW, maxCardWByHeight);
    const cardH = cardW * 1.4;
    const pocketW = mobile
        ? clamp(cardW * 0.52, 112, 154)
        : clamp(cardW * 0.46, 92, 138);
    const pocketH = pocketW * 1.4;
    const centerY = mobile ? stageHeight * 0.455 : stageHeight * 0.47;
    const mainRect = rectFromCenter(safeWidth / 2, centerY, cardW, cardH);
    const mobilePocketVisible = mobile ? clamp(safeWidth * 0.075, 24, 32) : 0;
    const leftCenterX = mobile
        ? (-pocketW / 2 + mobilePocketVisible)
        : Math.max(18 + pocketW / 2, safeWidth * 0.075);
    const rightCenterX = mobile
        ? (safeWidth + pocketW / 2 - mobilePocketVisible)
        : safeWidth - Math.max(18 + pocketW / 2, safeWidth * 0.075);
    const leftRect = rectFromCenter(leftCenterX, centerY + (mobile ? 6 : 2), pocketW, pocketH);
    const rightRect = rectFromCenter(rightCenterX, centerY + (mobile ? 6 : 2), pocketW, pocketH);
    const pendingRect = mainRect;
    const reviewCardW = Math.min(
        mobile ? clamp(safeWidth * 0.76, 218, 292) : clamp(safeWidth * 0.27, 220, 300),
        maxCardWByHeight,
    );
    const reviewCardH = reviewCardW * 1.4;
    const reviewLeftRect = rectFromCenter(safeWidth * 0.5, centerY, reviewCardW, reviewCardH);
    const reviewRightRect = rectFromCenter(safeWidth * 0.5, centerY, reviewCardW, reviewCardH);
    const mainStackPoses = [
        makePose(mainRect),
        makePose({...mainRect, y: mainRect.y + (mobile ? 10 : 13)}, {scale: mobile ? 0.972 : 0.963, rotation: -0.9, opacity: 0.52}),
        makePose({...mainRect, y: mainRect.y + (mobile ? 19 : 25)}, {scale: mobile ? 0.946 : 0.928, rotation: 1.0, opacity: 0.30}),
    ];
    return {
        width: safeWidth,
        height: stageHeight,
        mobile,
        cardW,
        cardH,
        pocketW,
        pocketH,
        mobilePocketVisible,
        mainRect,
        leftRect,
        rightRect,
        pendingRect,
        reviewLeftRect,
        reviewRightRect,
        mainStackPoses,
    };
};

const getPointerPosition = (event, canvas, layout) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * (layout.width / Math.max(1, rect.width)),
        y: (event.clientY - rect.top) * (layout.height / Math.max(1, rect.height)),
    };
};

const pushPointerSample = (interaction, point, time = performance.now()) => {
    if (!interaction) return;
    if (!Array.isArray(interaction.samples)) interaction.samples = [];
    interaction.samples.push({x: point.x, y: point.y, t: time});
    const cutoff = time - 140;
    while (interaction.samples.length > 2 && interaction.samples[0].t < cutoff) interaction.samples.shift();
    if (interaction.samples.length > 10) interaction.samples.splice(0, interaction.samples.length - 10);
};

const getPointerVelocity = (samples, now = performance.now()) => {
    if (!Array.isArray(samples) || samples.length < 2) return {x: 0, y: 0};
    const recent = samples.filter((sample) => now - sample.t <= 92);
    const pool = recent.length >= 2 ? recent : samples.slice(-2);
    const first = pool[0];
    const last = pool[pool.length - 1];
    const dt = Math.max(8, last.t - first.t);
    return {
        x: (last.x - first.x) / dt,
        y: (last.y - first.y) / dt,
    };
};

const getFlingProjection = (centerX, velocityX, layout, pointerType = 'mouse') => {
    const speed = Math.abs(velocityX || 0);
    // Touch gets a slightly lower fling threshold because finger release samples are
    // naturally coarser than a desktop pointer. Projection is capped so a noisy final
    // sample can never throw a card across the whole table by accident.
    const minVelocity = pointerType === 'touch' ? 0.28 : 0.38; // canvas px / ms
    if (speed < minVelocity) return {x: centerX, distance: 0, velocityX: 0, active: false};
    const horizon = layout.mobile ? 185 : 165;
    const maxDistance = layout.width * (layout.mobile ? 0.68 : 0.58);
    const distance = clamp(velocityX * horizon, -maxDistance, maxDistance);
    return {
        x: clamp(centerX + distance, -layout.width * 0.15, layout.width * 1.15),
        distance,
        velocityX,
        active: true,
    };
};

const getFlingFlightDuration = (velocityX) => {
    const speed = Math.abs(velocityX || 0);
    if (speed < 0.28) return 225;
    return Math.round(clamp(238 - speed * 72, 128, 210));
};

const getMainDropTarget = (centerX, layout, maxSelectedReached) => {
    const leftThreshold = layout.mobile ? layout.width * 0.27 : layout.width * 0.36;
    const rightThreshold = layout.mobile ? layout.width * 0.73 : layout.width * 0.64;
    if (centerX <= leftThreshold) return 'left';
    if (!maxSelectedReached && centerX >= rightThreshold) return 'right';
    return null;
};

const getPocketDropTarget = (sourceSide, centerX, layout, maxSelectedReached) => {
    const directEdge = layout.mobile ? 0.77 : 0.72;
    const pendingNear = layout.mobile ? 0.42 : 0.43;
    if (sourceSide === 'left') {
        if (!maxSelectedReached && centerX >= layout.width * directEdge) return 'right';
        if (centerX >= layout.width * pendingNear) return 'pending';
        return null;
    }
    if (centerX <= layout.width * (1 - directEdge)) return 'left';
    if (centerX <= layout.width * (1 - pendingNear)) return 'pending';
    return null;
};

const getReviewDropTarget = (reviewCategory, centerX, layout) => {
    if (layout.mobile) {
        if (reviewCategory === 'left' && centerX >= layout.width * 0.72) return 'pending';
        if (reviewCategory === 'right' && centerX <= layout.width * 0.28) return 'pending';
        return null;
    }
    const reviewRect = reviewCategory === 'left' ? layout.reviewLeftRect : layout.reviewRightRect;
    const pendingRect = reviewCategory === 'left' ? layout.rightRect : layout.leftRect;
    const midpoint = (reviewRect.cx + pendingRect.cx) / 2;
    if (reviewCategory === 'left' && centerX >= midpoint) return 'pending';
    if (reviewCategory === 'right' && centerX <= midpoint) return 'pending';
    return null;
};

const getReviewPendingDropTarget = (reviewCategory, centerX, layout, maxSelectedReached) => {
    if (layout.mobile) {
        if (reviewCategory === 'left' && centerX <= layout.width * 0.34) return 'left';
        if (reviewCategory === 'right' && !maxSelectedReached && centerX >= layout.width * 0.66) return 'right';
        return null;
    }
    const reviewRect = reviewCategory === 'left' ? layout.reviewLeftRect : layout.reviewRightRect;
    const pendingRect = reviewCategory === 'left' ? layout.rightRect : layout.leftRect;
    const midpoint = (reviewRect.cx + pendingRect.cx) / 2;
    if (reviewCategory === 'left' && centerX <= midpoint) return 'left';
    if (reviewCategory === 'right' && !maxSelectedReached && centerX >= midpoint) return 'right';
    return null;
};

const getDestinationPose = (target, layout) => {
    if (target === 'left') return makePose(layout.leftRect, {rotation: -7, opacity: 1});
    if (target === 'right') return makePose(layout.rightRect, {rotation: 7, opacity: 1});
    return makePose(layout.pendingRect, {rotation: 0, opacity: 1});
};

const resolveProjectedDropTarget = (hit, centerX, layout, maxSelectedReached) => {
    if (!hit) return null;
    if (hit.kind === 'main') return getMainDropTarget(centerX, layout, maxSelectedReached);
    if (hit.kind === 'pocket' || hit.kind === 'ambientPocket') {
        return getPocketDropTarget(hit.side, centerX, layout, maxSelectedReached);
    }
    if (hit.kind === 'review') return getReviewDropTarget(hit.side, centerX, layout);
    if (hit.kind === 'reviewPending') return getReviewPendingDropTarget(hit.side, centerX, layout, maxSelectedReached);
    return null;
};

const getPocketSourcePose = (side, layout) => makePose(side === 'left' ? layout.leftRect : layout.rightRect);
const getReviewSourcePose = (category, layout) => makePose(category === 'left' ? layout.reviewLeftRect : layout.reviewRightRect);

const captureScrollSnapshot = (node) => {
    if (typeof document === 'undefined' || !node) return null;
    const entries = [];
    let current = node.parentElement;
    while (current) {
        const style = window.getComputedStyle(current);
        const overflow = `${style.overflow} ${style.overflowX} ${style.overflowY}`;
        if (/(auto|scroll|overlay)/.test(overflow) && current.scrollHeight > current.clientHeight) {
            entries.push({node: current, top: current.scrollTop, left: current.scrollLeft});
        }
        current = current.parentElement;
    }
    const scrollingElement = document.scrollingElement;
    if (scrollingElement && !entries.some((entry) => entry.node === scrollingElement)) {
        entries.push({node: scrollingElement, top: scrollingElement.scrollTop, left: scrollingElement.scrollLeft});
    }
    return entries;
};

const restoreScrollSnapshot = (snapshot) => {
    if (!snapshot) return;
    snapshot.forEach(({node, top, left}) => {
        if (!node?.isConnected) return;
        if (node.scrollTop !== top) node.scrollTop = top;
        if (node.scrollLeft !== left) node.scrollLeft = left;
    });
};

const CanvasCardDeck = ({widget, interactive, busy, act, onExit, initialReviewCategory = null, allowPageScroll = false}) => {
    const descriptor = widget?.descriptor || {};
    const cards = Array.isArray(descriptor.cards) ? descriptor.cards : [];
    const byId = useMemo(() => new Map(cards.map((card, index) => [String(card?.id || `card_${index + 1}`), card])), [cards]);
    const deckState = useMemo(() => normalizeDeckState(cards, widget?.state || {}), [cards, widget?.state, widget?.revision]);
    const pending = deckState.pending;
    const leftEntries = useMemo(() => sortNewestFirst(deckState.left), [deckState.left]);
    const rightEntries = useMemo(() => sortNewestFirst(deckState.right), [deckState.right]);
    const leftTopCard = leftEntries[0] ? byId.get(String(leftEntries[0].cardId)) : null;
    const rightTopCard = rightEntries[0] ? byId.get(String(rightEntries[0].cardId)) : null;
    const currentCard = pending[0] ? byId.get(String(pending[0])) : null;
    const [reviewCategory, setReviewCategory] = useState(() => (initialReviewCategory === 'left' || initialReviewCategory === 'right') ? initialReviewCategory : null);
    const [width, setWidth] = useState(820);
    const [viewportHeight, setViewportHeight] = useState(() => {
        if (typeof window === 'undefined') return 760;
        return Math.round(window.visualViewport?.height || window.innerHeight || 760);
    });
    const [interactionLocked, setInteractionLocked] = useState(false);
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const layout = useMemo(() => calculateLayout(width, viewportHeight), [viewportHeight, width]);
    const layoutRef = useRef(layout);
    const sceneRef = useRef(null);
    const animationRef = useRef(null);
    const committedRef = useRef(null);
    const frameRef = useRef(0);
    const interactionRef = useRef(null);
    const dragRef = useRef(null);
    const magnetRef = useRef({left: 0, right: 0, pending: 0, goals: {left: 0, right: 0, pending: 0}});
    const reflowRef = useRef(new Map());
    const previousPendingRef = useRef(pending.slice(0, 3));
    const pixelRatioRef = useRef(1);

    layoutRef.current = layout;
    sceneRef.current = {
        cards,
        byId,
        pending,
        leftEntries,
        rightEntries,
        leftTopCard,
        rightTopCard,
        currentCard,
        reviewCategory,
        descriptor,
        interactive,
        busy,
    };

    const openDetail = useCallback((href) => {
        if (!href) return;
        if (isUniversalModalLink(href)) {
            openUniversalModalLink(href);
            return;
        }
        window.open(href, '_blank', 'noopener,noreferrer');
    }, []);

    const requestDraw = useCallback(() => {
        if (frameRef.current) return;
        frameRef.current = requestAnimationFrame((time) => {
            frameRef.current = 0;
            const canvas = canvasRef.current;
            const scene = sceneRef.current;
            const currentLayout = layoutRef.current;
            if (!canvas || !scene || !currentLayout) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const dpr = pixelRatioRef.current || 1;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, currentLayout.width, currentLayout.height);

            const magnet = magnetRef.current;
            let needsNextFrame = false;
            ['left', 'right', 'pending'].forEach((key) => {
                const goal = magnet.goals[key] || 0;
                const next = magnet[key] + (goal - magnet[key]) * 0.24;
                if (Math.abs(next - goal) > 0.006) needsNextFrame = true;
                magnet[key] = Math.abs(next - goal) < 0.006 ? goal : next;
            });

            const animation = animationRef.current;
            const committed = committedRef.current;
            let animationPose = null;
            let animationCard = null;
            let hiddenCardId = dragRef.current?.cardId || committed?.cardId || null;
            if (animation) {
                const rawT = clamp((time - animation.start) / animation.duration, 0, 1);
                const t = animation.ease === 'inout' ? easeInOutCubic(rawT) : easeOutCubic(rawT);
                animationPose = interpolatePose(animation.from, animation.to, t);
                animationCard = animation.card;
                hiddenCardId = animation.cardId;
                if (rawT < 1) {
                    needsNextFrame = true;
                } else {
                    animationRef.current = null;
                    const resolve = animation.resolve;
                    queueMicrotask(() => resolve?.());
                }
            }

            const now = time;
            const reflowMap = reflowRef.current;
            const poseOverrides = new Map();
            reflowMap.forEach((entry, cardId) => {
                const rawT = clamp((now - entry.start) / entry.duration, 0, 1);
                const t = easeOutCubic(rawT);
                poseOverrides.set(cardId, interpolatePose(entry.from, entry.to, t));
                if (rawT < 1) needsNextFrame = true;
                else reflowMap.delete(cardId);
            });

            const drawPocket = (side, entries, rect) => {
                const active = magnet[side] || 0;
                const nudgeAmount = currentLayout.mobile ? 12 : 5;
                const nudge = active * (side === 'left' ? nudgeAmount : -nudgeAmount);
                const targetRect = {...rect, x: rect.x + nudge, cx: rect.cx + nudge};
                const pocketCards = entries
                    .map((entry) => scene.byId.get(String(entry?.cardId || '')))
                    .filter(Boolean);
                drawPocketStack(ctx, {
                    cards: pocketCards,
                    count: entries.length,
                    rect: targetRect,
                    label: side === 'left' ? (scene.descriptor.leftLabel || '放弃') : (scene.descriptor.rightLabel || '喜欢'),
                    side,
                    active,
                    hiddenCardId,
                    invalidate: requestDraw,
                    edgeOnly: currentLayout.mobile,
                    edgeInset: currentLayout.mobilePocketVisible,
                });
            };

            if (!scene.reviewCategory) {
                drawPocket('left', scene.leftEntries, currentLayout.leftRect);
                drawPocket('right', scene.rightEntries, currentLayout.rightRect);

                const pendingCards = scene.pending.slice(0, 3).map((id) => scene.byId.get(String(id))).filter(Boolean);
                const activeDrag = dragRef.current;
                if (activeDrag?.kind === 'main' && pendingCards[0] && String(pendingCards[0].id) === String(activeDrag.cardId)) {
                    const dragDistance = Math.abs(activeDrag.pose.x - currentLayout.mainRect.x);
                    const progress = easeOutCubic(clamp(dragDistance / Math.max(120, currentLayout.width * 0.28), 0, 1));
                    for (let index = 1; index < pendingCards.length; index += 1) {
                        const card = pendingCards[index];
                        const fromPose = currentLayout.mainStackPoses[index];
                        const toPose = currentLayout.mainStackPoses[index - 1];
                        poseOverrides.set(String(card.id), interpolatePose(fromPose, toPose, progress * 0.94));
                    }
                }
                if (activeDrag?.kind === 'pocket' && magnet.pending > 0.01) {
                    pendingCards.forEach((card, index) => {
                        const base = poseOverrides.get(String(card.id)) || currentLayout.mainStackPoses[index];
                        poseOverrides.set(String(card.id), {
                            ...base,
                            y: base.y - magnet.pending * 4,
                            scale: (base.scale ?? 1) * (1 + magnet.pending * 0.018),
                        });
                    });
                }
                drawMainBackStack(ctx, pendingCards, currentLayout, hiddenCardId, requestDraw, poseOverrides);

                if (!pendingCards.length) {
                    if (magnet.pending > 0.01) {
                        drawCardBack(ctx, makePose(currentLayout.mainRect), {count: 0, active: magnet.pending, label: scene.descriptor.middleLabel || '待选择'});
                    }
                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#a3a3a3';
                    ctx.font = '600 14px ui-sans-serif, system-ui, sans-serif';
                    ctx.fillText('卡片已全部分类', currentLayout.width / 2, currentLayout.height * 0.46);
                    ctx.font = '450 11px ui-sans-serif, system-ui, sans-serif';
                    ctx.fillText('点击两侧牌堆可以继续调整', currentLayout.width / 2, currentLayout.height * 0.46 + 24);
                    ctx.restore();
                }
            } else {
                const reviewEntries = scene.reviewCategory === 'left' ? scene.leftEntries : scene.rightEntries;
                const reviewCards = reviewEntries.slice(0, 4).map((entry) => scene.byId.get(String(entry.cardId))).filter(Boolean);
                const baseReviewRect = scene.reviewCategory === 'left' ? currentLayout.reviewLeftRect : currentLayout.reviewRightRect;
                const reviewActive = magnet[scene.reviewCategory] || 0;
                const reviewNudge = reviewActive * (scene.reviewCategory === 'left' ? 6 : -6);
                const reviewRect = {
                    ...baseReviewRect,
                    x: baseReviewRect.x + reviewNudge,
                    cx: baseReviewRect.cx + reviewNudge,
                };
                const pendingSide = scene.reviewCategory === 'left' ? 'right' : 'left';
                const pendingTargetRect = pendingSide === 'right' ? currentLayout.rightRect : currentLayout.leftRect;
                const pendingActive = magnet.pending || 0;
                const pendingNudgeAmount = currentLayout.mobile ? 12 : 5;
                const pendingNudge = pendingActive * (pendingSide === 'right' ? -pendingNudgeAmount : pendingNudgeAmount);
                const pendingRect = {...pendingTargetRect, x: pendingTargetRect.x + pendingNudge, cx: pendingTargetRect.cx + pendingNudge};
                const pendingPocketCards = scene.pending
                    .map((id) => scene.byId.get(String(id)))
                    .filter(Boolean);
                drawPocketStack(ctx, {
                    cards: pendingPocketCards,
                    count: scene.pending.length,
                    rect: pendingRect,
                    label: scene.descriptor.middleLabel || '待选择',
                    side: pendingSide,
                    active: pendingActive,
                    hiddenCardId,
                    invalidate: requestDraw,
                    edgeOnly: currentLayout.mobile,
                    edgeInset: currentLayout.mobilePocketVisible,
                });

                const stackPoses = [
                    makePose(reviewRect),
                    makePose({...reviewRect, y: reviewRect.y + (currentLayout.mobile ? 10 : 13)}, {scale: currentLayout.mobile ? 0.97 : 0.96, rotation: -1.1, opacity: 0.50}),
                    makePose({...reviewRect, y: reviewRect.y + (currentLayout.mobile ? 19 : 25)}, {scale: currentLayout.mobile ? 0.945 : 0.925, rotation: 1.2, opacity: 0.29}),
                    makePose({...reviewRect, y: reviewRect.y + (currentLayout.mobile ? 27 : 35)}, {scale: currentLayout.mobile ? 0.925 : 0.9, rotation: -0.6, opacity: 0.17}),
                ];
                const reviewDrag = dragRef.current;
                const reviewProgress = reviewDrag?.kind === 'review' && reviewDrag.side === scene.reviewCategory
                    ? easeOutCubic(clamp(Math.abs(reviewDrag.pose.x - baseReviewRect.x) / Math.max(110, currentLayout.width * 0.24), 0, 1))
                    : 0;
                reviewCards.slice().reverse().forEach((card, reverseIndex) => {
                    const index = reviewCards.length - reverseIndex - 1;
                    if (!card || String(card.id) === String(hiddenCardId || '')) return;
                    let pose = stackPoses[Math.min(index, stackPoses.length - 1)];
                    if (reviewProgress > 0 && index > 0) {
                        pose = interpolatePose(pose, stackPoses[Math.min(index - 1, stackPoses.length - 1)], reviewProgress * 0.94);
                    }
                    drawCard(ctx, card, pose, {invalidate: requestDraw});
                });

                ctx.save();
                ctx.textAlign = 'center';
                ctx.fillStyle = '#737373';
                ctx.font = '600 13px ui-sans-serif, system-ui, sans-serif';
                const reviewLabel = scene.reviewCategory === 'left'
                    ? (scene.descriptor.leftLabel || '放弃')
                    : (scene.descriptor.rightLabel || '喜欢');
                ctx.fillText(`${reviewLabel} · ${reviewEntries.length} 张`, reviewRect.cx, Math.max(18, reviewRect.y - 28));
                ctx.restore();
            }

            if (committed?.card && !animationCard) {
                drawCard(ctx, committed.card, committed.pose, {compact: committed.compact && committed.pose.w < 150, invalidate: requestDraw});
            }
            const drag = dragRef.current;
            if (drag?.card && !animationCard) {
                drawCard(ctx, drag.card, drag.pose, {
                    compact: (drag.kind === 'pocket' || drag.kind === 'reviewPending') && drag.pose.w < 150,
                    dragging: true,
                    invalidate: requestDraw,
                });
            }
            if (animationCard && animationPose) {
                drawCard(ctx, animationCard, animationPose, {compact: animation.compact && animationPose.w < 150, dragging: true, invalidate: requestDraw});
            }

            if (needsNextFrame) requestDraw();
        });
    }, []);

    useLayoutEffect(() => {
        const node = containerRef.current;
        if (!node || typeof ResizeObserver === 'undefined') return undefined;
        const update = () => {
            const next = Math.max(300, Math.round(node.getBoundingClientRect().width));
            setWidth((current) => Math.abs(current - next) > 1 ? next : current);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const viewport = window.visualViewport;
        const update = () => {
            const next = Math.max(280, Math.round(viewport?.height || window.innerHeight || 760));
            setViewportHeight((current) => Math.abs(current - next) > 2 ? next : current);
        };
        update();
        window.addEventListener('resize', update, {passive: true});
        viewport?.addEventListener?.('resize', update, {passive: true});
        return () => {
            window.removeEventListener('resize', update);
            viewport?.removeEventListener?.('resize', update);
        };
    }, []);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = clamp(window.devicePixelRatio || 1, 1, 2.5);
        pixelRatioRef.current = dpr;
        canvas.width = Math.round(layout.width * dpr);
        canvas.height = Math.round(layout.height * dpr);
        canvas.style.width = `${layout.width}px`;
        canvas.style.height = `${layout.height}px`;
        requestDraw();
    }, [layout, requestDraw]);

    useEffect(() => {
        const previous = previousPendingRef.current;
        const next = pending.slice(0, 3);
        if (previous.length && previous[0] !== next[0]) {
            const previousIndex = new Map(previous.map((id, index) => [String(id), index]));
            next.forEach((id, nextIndex) => {
                const oldIndex = previousIndex.get(String(id));
                if (oldIndex == null || oldIndex === nextIndex) return;
                const from = layout.mainStackPoses[Math.min(oldIndex, layout.mainStackPoses.length - 1)];
                const to = layout.mainStackPoses[Math.min(nextIndex, layout.mainStackPoses.length - 1)];
                reflowRef.current.set(String(id), {from, to, start: performance.now(), duration: 280});
            });
        }
        previousPendingRef.current = next;
        requestDraw();
    }, [layout, pending, requestDraw]);

    useEffect(() => {
        const committed = committedRef.current;
        if (committed) {
            const id = String(committed.cardId);
            const inPending = pending.some((item) => String(item) === id);
            const inLeft = leftEntries.some((item) => String(item?.cardId) === id);
            const inRight = rightEntries.some((item) => String(item?.cardId) === id);
            const arrived = committed.target === 'pending' ? inPending : committed.target === 'left' ? inLeft : inRight;
            if (arrived) {
                const handle = requestAnimationFrame(() => {
                    if (committedRef.current?.cardId === id) {
                        committedRef.current = null;
                        requestDraw();
                    }
                });
                return () => cancelAnimationFrame(handle);
            }
        }
        requestDraw();
        return undefined;
    }, [widget?.revision, pending, leftEntries, rightEntries, reviewCategory, width, busy, requestDraw]);

    useEffect(() => () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
    }, []);

    const setMagnetTarget = useCallback((target) => {
        magnetRef.current.goals = {
            left: target === 'left' ? 1 : 0,
            right: target === 'right' ? 1 : 0,
            pending: target === 'pending' ? 1 : 0,
        };
        requestDraw();
    }, [requestDraw]);

    const animateCardTo = useCallback((card, from, to, {duration = 235, compact = false, ease = 'out'} = {}) => new Promise((resolve) => {
        animationRef.current = {
            card,
            cardId: String(card?.id || ''),
            from,
            to,
            start: performance.now(),
            duration,
            compact,
            ease,
            resolve,
        };
        dragRef.current = null;
        requestDraw();
    }), [requestDraw]);

    const runActionAfterFlight = useCallback(async ({card, from, target, action, payload, compact = false, toPose = null, flightDuration = 230}) => {
        if (!card || interactionLocked || busy || !interactive) return false;
        // A widget revision replaces the replacement payload in React. Even though the
        // canvas has a fixed height, browser scroll anchoring (and the chat scroller) can
        // nudge the page by a few pixels during that commit. Preserve the user's exact
        // scroll position across the flight + server state hand-off.
        const scrollSnapshot = captureScrollSnapshot(containerRef.current);
        const restoreScroll = () => restoreScrollSnapshot(scrollSnapshot);
        const restoreAfterCommit = () => {
            restoreScroll();
            requestAnimationFrame(() => {
                restoreScroll();
                requestAnimationFrame(restoreScroll);
            });
        };
        const currentLayout = layoutRef.current;
        const targetPose = toPose || getDestinationPose(target, currentLayout);
        setInteractionLocked(true);
        committedRef.current = {
            cardId: String(card.id),
            card,
            target,
            pose: targetPose,
            compact,
        };
        setMagnetTarget(target);
        await animateCardTo(card, from, targetPose, {duration: flightDuration, compact});
        setMagnetTarget(null);
        requestDraw();
        const updated = await act(action, payload);
        restoreAfterCommit();
        if (!updated) {
            committedRef.current = null;
            const fromTarget = targetPose;
            await animateCardTo(card, fromTarget, from, {duration: 210, compact});
            setInteractionLocked(false);
            restoreAfterCommit();
            requestDraw();
            return false;
        }
        setInteractionLocked(false);
        restoreAfterCommit();
        requestDraw();
        return true;
    }, [act, animateCardTo, busy, interactionLocked, interactive, setMagnetTarget]);

    const openPocket = useCallback(async (side) => {
        if (interactionLocked || busy || !interactive || reviewCategory) return;
        const scene = sceneRef.current;
        const card = side === 'left' ? scene.leftTopCard : scene.rightTopCard;
        const entries = side === 'left' ? scene.leftEntries : scene.rightEntries;
        if (!card || !entries.length) return;
        const scrollSnapshot = captureScrollSnapshot(containerRef.current);
        const currentLayout = layoutRef.current;
        const from = getPocketSourcePose(side, currentLayout);
        const reviewRect = side === 'left' ? currentLayout.reviewLeftRect : currentLayout.reviewRightRect;
        const to = makePose(reviewRect, {scale: 1, rotation: 0, opacity: 1});
        setInteractionLocked(true);
        await animateCardTo(card, from, to, {duration: 265, compact: true, ease: 'inout'});
        setReviewCategory(side);
        restoreScrollSnapshot(scrollSnapshot);
        requestAnimationFrame(() => restoreScrollSnapshot(scrollSnapshot));
        setInteractionLocked(false);
    }, [animateCardTo, busy, interactionLocked, interactive, reviewCategory]);

    const closePocket = useCallback(async () => {
        if (!reviewCategory || interactionLocked || busy) return;
        const scene = sceneRef.current;
        const entries = reviewCategory === 'left' ? scene.leftEntries : scene.rightEntries;
        const card = entries[0] ? scene.byId.get(String(entries[0].cardId)) : null;
        if (!card) {
            setReviewCategory(null);
            return;
        }
        const scrollSnapshot = captureScrollSnapshot(containerRef.current);
        const currentLayout = layoutRef.current;
        const from = getReviewSourcePose(reviewCategory, currentLayout);
        const to = getPocketSourcePose(reviewCategory, currentLayout);
        setInteractionLocked(true);
        await animateCardTo(card, from, to, {duration: 245, compact: false, ease: 'inout'});
        setReviewCategory(null);
        restoreScrollSnapshot(scrollSnapshot);
        requestAnimationFrame(() => restoreScrollSnapshot(scrollSnapshot));
        setInteractionLocked(false);
    }, [animateCardTo, busy, interactionLocked, reviewCategory]);

    const resolvePointerTarget = useCallback((point) => {
        const scene = sceneRef.current;
        const currentLayout = layoutRef.current;
        if (scene.reviewCategory) {
            const reviewRect = scene.reviewCategory === 'left' ? currentLayout.reviewLeftRect : currentLayout.reviewRightRect;
            const entries = scene.reviewCategory === 'left' ? scene.leftEntries : scene.rightEntries;
            const card = entries[0] ? scene.byId.get(String(entries[0].cardId)) : null;
            if (card && pointInRect(point.x, point.y, reviewRect, 8)) {
                return {kind: 'review', side: scene.reviewCategory, card, pose: makePose(reviewRect)};
            }
            const pendingRect = scene.reviewCategory === 'left' ? currentLayout.rightRect : currentLayout.leftRect;
            const pendingCard = scene.pending[0] ? scene.byId.get(String(scene.pending[0])) : null;
            if (pendingCard && pointInRect(point.x, point.y, pendingRect, currentLayout.mobile ? 16 : 10)) {
                return {
                    kind: 'reviewPending',
                    side: scene.reviewCategory,
                    card: pendingCard,
                    pose: makePose(pendingRect),
                };
            }
            return null;
        }

        if (scene.currentCard && pointInRect(point.x, point.y, currentLayout.mainRect, 4)) {
            return {kind: 'main', card: scene.currentCard, pose: makePose(currentLayout.mainRect)};
        }
        const pocketHitPadding = currentLayout.mobile ? 16 : 8;
        if (scene.leftTopCard && pointInRect(point.x, point.y, currentLayout.leftRect, pocketHitPadding)) {
            return {kind: 'pocket', side: 'left', card: scene.leftTopCard, pose: makePose(currentLayout.leftRect)};
        }
        if (scene.rightTopCard && pointInRect(point.x, point.y, currentLayout.rightRect, pocketHitPadding)) {
            return {kind: 'pocket', side: 'right', card: scene.rightTopCard, pose: makePose(currentLayout.rightRect)};
        }
        return null;
    }, []);

    const onPointerDown = useCallback((event) => {
        if (!interactive || busy || interactionLocked || animationRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const inlineTouch = allowPageScroll && event.pointerType === 'touch';
        // An embedded deck must not claim a touch before its direction is known.
        // touch-action: pan-y + deferred pointer capture lets a vertical gesture become
        // normal chat/page scrolling, while horizontal card gestures remain ours.
        if (!inlineTouch) event.preventDefault();
        const currentLayout = layoutRef.current;
        const point = getPointerPosition(event, canvas, currentLayout);
        let hit = resolvePointerTarget(point);

        // Empty-space fling gesture: blank space becomes a remote handle for the nearest
        // side pile. The latest side card follows pointer displacement, then release
        // velocity projects its landing into source / pending / opposite pile. This is
        // identical on desktop and mobile; a blank tap still never opens a pile.
        if (!hit && !sceneRef.current.reviewCategory) {
            const scene = sceneRef.current;
            const side = point.x < currentLayout.width / 2 ? 'left' : 'right';
            const card = side === 'left' ? scene.leftTopCard : scene.rightTopCard;
            if (card) {
                hit = {
                    kind: 'ambientPocket',
                    side,
                    card,
                    pose: makePose(side === 'left' ? currentLayout.leftRect : currentLayout.rightRect),
                };
            }
        }

        if (!hit) return;
        if (!inlineTouch) {
            try {
                canvas.setPointerCapture(event.pointerId);
            } catch {
                // Some embedded browsers do not expose pointer capture; canvas hit-testing still stays local.
            }
        }
        const startTime = performance.now();
        interactionRef.current = {
            pointerId: event.pointerId,
            pointerType: event.pointerType || 'mouse',
            captured: !inlineTouch,
            hit,
            start: point,
            last: point,
            moved: false,
            startTime,
            samples: [{x: point.x, y: point.y, t: startTime}],
            target: null,
            projectedCenterX: hit.pose.x + hit.pose.w / 2,
            velocityX: 0,
        };
        // For an empty-space gesture the card should not jump out merely on press.
        // It materializes from the corresponding side pile only after an inward swipe
        // has crossed the drag threshold.
        dragRef.current = hit.kind === 'ambientPocket' ? null : {
            ...hit,
            cardId: String(hit.card?.id || ''),
            pose: {...hit.pose},
        };
        requestDraw();
    }, [allowPageScroll, busy, interactionLocked, interactive, requestDraw, resolvePointerTarget]);

    const onPointerMove = useCallback((event) => {
        const interaction = interactionRef.current;
        const canvas = canvasRef.current;
        if (!interaction || !canvas || interaction.pointerId !== event.pointerId) return;
        const currentLayout = layoutRef.current;
        const point = getPointerPosition(event, canvas, currentLayout);
        const now = performance.now();
        interaction.last = point;
        pushPointerSample(interaction, point, now);
        const dx = point.x - interaction.start.x;
        const dy = point.y - interaction.start.y;
        const distance = Math.hypot(dx, dy);
        const hit = interaction.hit;
        const inlineTouch = allowPageScroll && interaction.pointerType === 'touch';

        if (inlineTouch && !interaction.moved) {
            const absX = Math.abs(dx);
            const absY = Math.abs(dy);
            const verticalIntent = absY >= 7 && absY > absX * 1.15;
            if (verticalIntent) {
                // Hand the gesture back to the browser. Do not preventDefault, do not
                // retain capture, and remove the provisional card pose immediately.
                interactionRef.current = null;
                dragRef.current = null;
                setMagnetTarget(null);
                requestDraw();
                return;
            }
        }

        if (!interaction.moved && hit.kind === 'ambientPocket') {
            const inwardDistance = hit.side === 'left' ? dx : -dx;
            const threshold = event.pointerType === 'touch' ? 10 : 7;
            const horizontalEnough = Math.abs(dx) >= Math.abs(dy) * 1.02;
            if (inwardDistance >= threshold && horizontalEnough) interaction.moved = true;
        } else if (!interaction.moved && distance >= (event.pointerType === 'touch' ? 7 : 5)) {
            interaction.moved = true;
        }
        if (!interaction.moved) return;

        if (inlineTouch && !interaction.captured) {
            try {
                canvas.setPointerCapture(event.pointerId);
                interaction.captured = true;
            } catch {
                // Keep the gesture usable even when pointer capture is unavailable.
            }
        }
        if (event.cancelable) event.preventDefault();

        const pose = {
            ...hit.pose,
            x: hit.pose.x + dx,
            y: hit.pose.y + dy,
            rotation: clamp(dx / Math.max(42, hit.pose.w) * 5.5, -7, 7),
            scale: 1.015,
        };
        dragRef.current = {...hit, cardId: String(hit.card?.id || ''), pose};
        const centerX = pose.x + pose.w / 2;
        const velocity = getPointerVelocity(interaction.samples, now);
        const projection = getFlingProjection(centerX, velocity.x, currentLayout, interaction.pointerType);
        interaction.velocityX = velocity.x;
        interaction.projectedCenterX = projection.x;
        const scene = sceneRef.current;
        const maxSelected = Number(scene.descriptor.maxSelected || 0);
        const maxSelectedReached = maxSelected > 0 && scene.rightEntries.length >= maxSelected;
        const target = resolveProjectedDropTarget(hit, projection.x, currentLayout, maxSelectedReached);
        interaction.target = target;
        setMagnetTarget(target);
        requestDraw();
    }, [allowPageScroll, requestDraw, setMagnetTarget]);

    const finishPointer = useCallback(async (event, cancelled = false) => {
        const interaction = interactionRef.current;
        const canvas = canvasRef.current;
        if (!interaction || interaction.pointerId !== event.pointerId) return;
        interactionRef.current = null;
        try {
            canvas?.releasePointerCapture?.(event.pointerId);
        } catch {
            // Ignore stale pointer capture during unmount/cancel.
        }
        event.preventDefault();
        const hit = interaction.hit;
        const drag = dragRef.current;
        const moved = interaction.moved && !cancelled;
        let target = null;
        let velocityX = 0;
        let flightDuration = 225;
        if (moved && drag?.card) {
            const currentLayout = layoutRef.current;
            const finalPoint = getPointerPosition(event, canvas, currentLayout);
            const now = performance.now();
            pushPointerSample(interaction, finalPoint, now);
            const velocity = getPointerVelocity(interaction.samples, now);
            velocityX = velocity.x;
            const centerX = drag.pose.x + drag.pose.w / 2;
            const projection = getFlingProjection(centerX, velocityX, currentLayout, interaction.pointerType);
            const scene = sceneRef.current;
            const maxSelected = Number(scene.descriptor.maxSelected || 0);
            const maxSelectedReached = maxSelected > 0 && scene.rightEntries.length >= maxSelected;
            target = resolveProjectedDropTarget(hit, projection.x, currentLayout, maxSelectedReached);
            flightDuration = getFlingFlightDuration(velocityX);
        }
        setMagnetTarget(null);

        if (!moved) {
            dragRef.current = null;
            requestDraw();
            if (cancelled) return;
            if (hit.kind === 'ambientPocket') return;
            if (hit.kind === 'pocket') {
                await openPocket(hit.side);
                return;
            }
            if ((hit.kind === 'main' || hit.kind === 'review' || hit.kind === 'reviewPending') && hit.card?.detailHref) {
                openDetail(hit.card.detailHref);
            }
            return;
        }

        if (!drag?.card || !target) {
            if (drag?.card) {
                setInteractionLocked(true);
                await animateCardTo(drag.card, drag.pose, hit.pose, {duration: 190, compact: hit.kind === 'pocket'});
                setInteractionLocked(false);
            }
            dragRef.current = null;
            requestDraw();
            return;
        }

        dragRef.current = null;
        requestDraw();
        if (hit.kind === 'main') {
            await runActionAfterFlight({
                card: hit.card,
                from: drag.pose,
                target,
                action: 'classify',
                payload: {cardId: hit.card.id, category: target},
                flightDuration,
            });
            return;
        }
        if (hit.kind === 'pocket' || hit.kind === 'ambientPocket') {
            if (target === 'pending') {
                await runActionAfterFlight({
                    card: hit.card,
                    from: drag.pose,
                    target,
                    action: 'unclassify',
                    payload: {cardId: hit.card.id},
                    compact: true,
                    flightDuration,
                });
            } else {
                await runActionAfterFlight({
                    card: hit.card,
                    from: drag.pose,
                    target,
                    action: 'reclassify',
                    payload: {cardId: hit.card.id, category: target},
                    compact: true,
                    flightDuration,
                });
            }
            return;
        }
        if (hit.kind === 'review' && target === 'pending') {
            const currentLayout = layoutRef.current;
            const pendingPocketRect = hit.side === 'left' ? currentLayout.rightRect : currentLayout.leftRect;
            await runActionAfterFlight({
                card: hit.card,
                from: drag.pose,
                target,
                action: 'unclassify',
                payload: {cardId: hit.card.id},
                toPose: makePose(pendingPocketRect, {rotation: hit.side === 'left' ? 7 : -7, opacity: 1}),
                flightDuration,
            });
            return;
        }
        if (hit.kind === 'reviewPending' && (target === 'left' || target === 'right')) {
            const currentLayout = layoutRef.current;
            const reviewRect = target === 'left' ? currentLayout.reviewLeftRect : currentLayout.reviewRightRect;
            await runActionAfterFlight({
                card: hit.card,
                from: drag.pose,
                target,
                action: 'classify',
                payload: {cardId: hit.card.id, category: target},
                compact: true,
                toPose: makePose(reviewRect, {rotation: 0, opacity: 1}),
                flightDuration,
            });
        }
    }, [animateCardTo, openDetail, openPocket, requestDraw, runActionAfterFlight, setMagnetTarget]);


    const actByKeyboard = useCallback(async (category) => {
        if (!currentCard || busy || interactionLocked || !interactive) return;
        if (category === 'right' && Number(descriptor.maxSelected || 0) > 0 && rightEntries.length >= Number(descriptor.maxSelected || 0)) return;
        const from = makePose(layoutRef.current.mainRect);
        await runActionAfterFlight({
            card: currentCard,
            from,
            target: category,
            action: 'classify',
            payload: {cardId: currentCard.id, category},
        });
    }, [busy, currentCard, descriptor.maxSelected, interactionLocked, interactive, rightEntries.length, runActionAfterFlight]);

    return (
        <div ref={containerRef} className="w-full select-none overflow-hidden" style={{overflowAnchor: 'none'}} >
            <div
                className="relative mx-auto w-full overflow-hidden rounded-[24px] bg-black/[0.012]"
                style={{
                    height: `${layout.height}px`,
                    contain: 'layout size paint',
                    touchAction: allowPageScroll ? 'pan-y' : 'none',
                    overscrollBehavior: allowPageScroll ? 'auto' : 'contain',
                    overflowAnchor: 'none',
                }}
            >
                <canvas
                    ref={canvasRef}
                    className={`block h-full w-full ${interactive && !busy && !interactionLocked ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                    style={{
                        touchAction: allowPageScroll ? 'pan-y' : 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={(event) => void finishPointer(event, false)}
                    onPointerCancel={(event) => void finishPointer(event, true)}
                    aria-label={reviewCategory ? '分类牌堆交互区' : '卡片分类交互区'}
                />
            </div>

            <div className="sr-only" aria-live="polite">
                {reviewCategory
                    ? `正在查看${reviewCategory === 'left' ? (descriptor.leftLabel || '放弃') : (descriptor.rightLabel || '喜欢')}牌堆`
                    : `${descriptor.leftLabel || '放弃'} ${leftEntries.length} 张，${descriptor.middleLabel || '待选择'} ${pending.length} 张，${descriptor.rightLabel || '喜欢'} ${rightEntries.length} 张`}
            </div>

            {!reviewCategory && currentCard && (
                <div className="sr-only">
                    <button type="button" disabled={!interactive || busy || interactionLocked} onClick={() => void actByKeyboard('left')}>
                        将当前卡片放入{descriptor.leftLabel || '放弃'}
                    </button>
                    <button type="button" disabled={!interactive || busy || interactionLocked} onClick={() => void actByKeyboard('right')}>
                        将当前卡片放入{descriptor.rightLabel || '喜欢'}
                    </button>
                </div>
            )}

            <div className="mt-2 flex min-h-[44px] flex-col items-center justify-center gap-1 border-t border-black/[0.05] pt-2">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                        type="button"
                        disabled={busy || interactionLocked}
                        onClick={() => onExit?.({reviewCategory})}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/75 px-3 py-2 text-xs font-medium text-neutral-500 shadow-sm transition hover:border-neutral-300 hover:bg-white hover:text-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <X className="h-3.5 w-3.5"/>退出选择
                    </button>
                    {reviewCategory ? (
                        <button
                            type="button"
                            disabled={busy || interactionLocked}
                            onClick={() => void closePocket()}
                            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:text-neutral-950 hover:shadow disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"/>返回主牌堆
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={!interactive || busy || interactionLocked}
                            onClick={() => void act('submit', {})}
                            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
                        >
                            {descriptor.submitLabel || '完成选择'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                        </button>
                    )}
                </div>
                {!reviewCategory && (
                    <div className="text-[10px] leading-4 text-neutral-400">
                        {`${descriptor.leftLabel || '放弃'} ${leftEntries.length} · ${descriptor.middleLabel || '待选择'} ${pending.length} · ${descriptor.rightLabel || '喜欢'} ${rightEntries.length}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CanvasCardDeck;
