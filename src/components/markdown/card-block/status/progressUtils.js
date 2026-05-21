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
