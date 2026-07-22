import { memo } from 'react';
import { Check } from 'lucide-react';

import AnimatedProgressFill from './AnimatedProgressFill.jsx';
import {
    getCompactProgressSteps,
    getProgressStorageKey,
    getVisualProgressPercent,
} from './progressUtils.js';

const ProgressTimeline = memo(({
    progress,
    progressKey,
    isFailed,
    isDisappearing = false,
}) => {
    if (!progress) {
        return null;
    }

    const {current, total, isNotStarted} = progress;
    const steps = Array.from({length: total}, (_, index) => index + 1);
    const compactSteps = getCompactProgressSteps(current, total);
    const progressPercent = getVisualProgressPercent(current, total);
    const isComplete = current >= total;
    const shouldBreathe = !isFailed && current > 0 && !isComplete;
    const latestCompletedStep = current > 0 && !isComplete ? Math.min(current, total) : null;

    const tone = isFailed
        ? {
            active: 'bg-red-500 border-red-500 text-white',
            activeText: 'text-red-600',
            fill: 'from-red-400 via-red-500 to-red-400',
            glow: 'shadow-red-200/70',
        }
        : {
            active: 'bg-yellow-500 border-yellow-500 text-white',
            activeText: 'text-yellow-700',
            fill: 'from-yellow-300 via-yellow-500 to-yellow-300',
            glow: 'shadow-yellow-200/80',
        };

    const progressStorageKey = getProgressStorageKey(progressKey, total);

    return (
        <div
            className={`w-full min-w-0 flex-1 overflow-visible transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDisappearing ? 'opacity-0 scale-x-[0.985] blur-[0.5px]' : 'opacity-100 scale-x-100 blur-0'}`}
            aria-label={`Tool progress ${current} of ${total}`}
        >
            <div className="hidden sm:flex items-center gap-3 w-full min-w-0 pr-0 overflow-visible">
                <span className={`text-xs font-bold tabular-nums whitespace-nowrap ${isNotStarted ? 'text-zinc-400' : tone.activeText}`}>
                    {current}/{total}
                </span>

                <div className="relative flex items-center min-w-0 flex-1 py-1.5">
                    <div className="absolute left-2 right-2 top-1/2 h-3.5 -translate-y-1/2 rounded-full bg-zinc-200/90 overflow-hidden shadow-inner">
                        <AnimatedProgressFill
                            className={`h-full rounded-full bg-gradient-to-r ${tone.fill} shadow-lg ${tone.glow} transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left`}
                            isActive={shouldBreathe && !isDisappearing}
                            progressKey={progressKey}
                            storageKey={`${progressStorageKey}::desktop`}
                            targetPercent={progressPercent}
                        />
                    </div>

                    <div className="relative z-[1] flex items-center justify-between w-full min-w-0">
                        {steps.map((step) => {
                            const isCompleted = step <= current;
                            const isLatestCompleted = step === latestCompletedStep && !isFailed;

                            return (
                                <div
                                    key={step}
                                    className={`
                                        relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible
                                        ${isCompleted ? tone.active : 'border-zinc-300 bg-white text-zinc-400'}
                                        ${isLatestCompleted ? 'card-progress-node-breathe' : ''}
                                    `}
                                >
                                    {isLatestCompleted && (
                                        <span
                                            className="card-progress-node-halo pointer-events-none absolute inset-[2px] rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.82) 0%, rgba(250, 204, 21, 0.34) 52%, rgba(250, 204, 21, 0) 74%)',
                                            }}
                                        />
                                    )}

                                    {isCompleted ? (
                                        <Check className="relative z-[1] h-3.5 w-3.5 stroke-[3]"/>
                                    ) : (
                                        <span className="relative z-[1]">{step}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="sm:hidden flex items-center gap-2 w-full min-w-0 overflow-visible">
                <div className="relative h-4 min-w-0 flex-1 rounded-full bg-zinc-200/90 overflow-hidden shadow-inner">
                    <AnimatedProgressFill
                        className={`h-full rounded-full bg-gradient-to-r ${tone.fill} shadow-lg ${tone.glow} transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left`}
                        isActive={shouldBreathe && !isDisappearing}
                        progressKey={progressKey}
                        storageKey={`${progressStorageKey}::mobile`}
                        targetPercent={progressPercent}
                    />
                </div>

                {compactSteps.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {compactSteps.map((step) => {
                            const isCompleted = step <= current;
                            const isLatestCompleted = step === latestCompletedStep && !isFailed;

                            return (
                                <div
                                    key={step}
                                    className={`
                                        relative flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-all duration-300 overflow-visible
                                        ${isCompleted ? tone.active : 'border-zinc-300 bg-white text-zinc-400'}
                                        ${isLatestCompleted ? 'card-progress-node-breathe' : ''}
                                    `}
                                >
                                    {isLatestCompleted && (
                                        <span
                                            className="card-progress-node-halo pointer-events-none absolute inset-[2px] rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.82) 0%, rgba(250, 204, 21, 0.34) 52%, rgba(250, 204, 21, 0) 74%)',
                                            }}
                                        />
                                    )}

                                    {isCompleted ? (
                                        <Check className="relative z-[1] h-3.5 w-3.5 stroke-[3]"/>
                                    ) : (
                                        <span className="relative z-[1]">{step}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <span className={`text-[10px] font-bold tabular-nums whitespace-nowrap ${isNotStarted ? 'text-zinc-400' : tone.activeText}`}>
                    {current}/{total}
                </span>
            </div>
        </div>
    );
}, (prev, next) => {
    return (
        prev.progressKey === next.progressKey &&
        prev.isFailed === next.isFailed &&
        prev.isDisappearing === next.isDisappearing &&
        prev.progress?.current === next.progress?.current &&
        prev.progress?.total === next.progress?.total
    );
});

ProgressTimeline.displayName = 'ProgressTimeline';

export default ProgressTimeline;
