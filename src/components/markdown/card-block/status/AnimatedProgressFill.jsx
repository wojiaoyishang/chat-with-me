import {
    memo,
    useEffect,
    useState,
} from 'react';

const progressPercentMap = new Map();

const AnimatedProgressFill = memo(({
    className = '',
    isActive = false,
    progressKey,
    storageKey,
    targetPercent,
}) => {
    const safeTargetPercent = Math.max(0, Math.min(100, Number(targetPercent) || 0));
    const resolvedStorageKey = storageKey || progressKey || '__tool_progress__';
    const [displayPercent, setDisplayPercent] = useState(() => {
        if (progressPercentMap.has(resolvedStorageKey)) {
            return progressPercentMap.get(resolvedStorageKey);
        }

        return safeTargetPercent <= 0 ? 0 : Math.max(0, safeTargetPercent - 18);
    });

    useEffect(() => {
        let rafId = 0;

        rafId = window.requestAnimationFrame(() => {
            setDisplayPercent(safeTargetPercent);
            progressPercentMap.set(resolvedStorageKey, safeTargetPercent);
        });

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [resolvedStorageKey, safeTargetPercent]);

    return (
        <div
            className={`${className} ${isActive ? 'card-progress-breathe' : ''}`}
            style={{
                width: `${displayPercent}%`,
            }}
        />
    );
}, (prev, next) => {
    return (
        prev.className === next.className &&
        prev.isActive === next.isActive &&
        prev.progressKey === next.progressKey &&
        prev.storageKey === next.storageKey &&
        prev.targetPercent === next.targetPercent
    );
});

AnimatedProgressFill.displayName = 'AnimatedProgressFill';

export default AnimatedProgressFill;
