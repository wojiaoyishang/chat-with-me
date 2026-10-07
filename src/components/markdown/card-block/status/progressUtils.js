export const getProgressStorageKey = (progressKey, total) => {
    return `${progressKey || '__tool_progress__'}::${total || 0}`;
};

export const getCompactProgressSteps = (current, total) => {
    if (current <= 0) {
        return [];
    }

    return [Math.min(current, total)];
};

export const getVisualProgressPercent = (current, total) => {
    if (total <= 0 || current <= 0) {
        return 0;
    }

    if (current >= total) {
        return 100;
    }

    // 完成一个工具后，视觉上向下一段轻轻推进一点点，
    // 让进度看起来还在持续流动，但不会越过下一个工具节点。
    const fakeAdvance = 0.22;
    const maxBeforeNextStep = current + 0.38;
    const visualCurrent = Math.min(current + fakeAdvance, maxBeforeNextStep, total);

    return Math.max(0, Math.min(96, (visualCurrent / total) * 100));
};

/** Bound the visible tool nodes while keeping the current position in view. */
export const getVisibleProgressSteps = (current, total, limit = 6) => {
    const count = Math.max(0, Math.floor(Number(total) || 0));
    const size = Math.min(count, Math.max(1, Math.floor(Number(limit) || 6)));
    const start = Math.max(1, Math.min(Math.max(1, current) - Math.floor((size - 1) / 2), count - size + 1));
    return Array.from({ length: size }, (_, index) => start + index);
};

/** 28px node, 4px gap and 8px edge clearance; never render a clipped node. */
export const getProgressNodeCapacity = (width) =>
    Math.max(0, Math.floor((Math.max(0, Number(width) || 0) - 8 + 4) / 32));
