import {
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Check, X } from 'lucide-react';

import ProgressTimeline from './ProgressTimeline.jsx';
import StableStepsButton from './StableStepsButton.jsx';
import ToolCallingRightStatus from './ToolCallingRightStatus.jsx';

const StatusHeader = memo(({
    activeColor,
    currentColor,
    displayTitle,
    Icon,
    expandedKey,
    hasSteps,
    isDone,
    isFailed,
    isFinished,
    isProcessing,
    isToolCalling,
    progress,
    truncatedLastLine,
}) => {
    const previousIsFinishedRef = useRef(isFinished);
    const [isFinishingProgressVisible, setIsFinishingProgressVisible] = useState(false);
    const [isFinishingProgressFading, setIsFinishingProgressFading] = useState(false);

    const justFinishedDuringRender = Boolean(
        isToolCalling &&
        progress &&
        isFinished &&
        !previousIsFinishedRef.current &&
        !isFailed,
    );

    useEffect(() => {
        if (!isToolCalling || !progress || isFailed) {
            setIsFinishingProgressVisible(false);
            setIsFinishingProgressFading(false);
            previousIsFinishedRef.current = isFinished;
            return undefined;
        }

        const justFinished = isFinished && !previousIsFinishedRef.current;
        previousIsFinishedRef.current = isFinished;

        if (!isFinished) {
            setIsFinishingProgressVisible(false);
            setIsFinishingProgressFading(false);
            return undefined;
        }

        if (!justFinished) {
            return undefined;
        }

        setIsFinishingProgressVisible(true);
        setIsFinishingProgressFading(false);

        const fadeTimer = window.setTimeout(() => {
            setIsFinishingProgressFading(true);
        }, 650);

        const hideTimer = window.setTimeout(() => {
            setIsFinishingProgressVisible(false);
            setIsFinishingProgressFading(false);
        }, 1750);

        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(hideTimer);
        };
    }, [isToolCalling, progress, isFinished, isFailed]);

    const shouldShowProgress = Boolean(progress && (!isFinished || isFinishingProgressVisible || justFinishedDuringRender));
    const shouldFadeProgress = Boolean(progress && isFinished && isFinishingProgressFading && !isFailed);

    return (
        <div className="flex items-center justify-between gap-2 group">
            <div className={`flex items-center gap-2.5 min-w-0 flex-1 ${shouldShowProgress ? 'overflow-visible' : 'overflow-hidden'}`}>
                <div className={`${isToolCalling && !isFailed && !isFinished ? 'text-yellow-600' : currentColor} flex-shrink-0`}>
                    {isFailed ? (
                        <X className="w-4 h-4 stroke-[3]"/>
                    ) : isToolCalling && isFinished ? (
                        <Check className="w-4 h-4 stroke-[3]"/>
                    ) : isToolCalling ? (
                        <Icon className="w-4 h-4 animate-pulse"/>
                    ) : isDone ? (
                        <Check className="w-4 h-4 stroke-[3]"/>
                    ) : (
                        <Icon
                            className={`w-4 h-4 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`}
                        />
                    )}
                </div>

                {shouldShowProgress ? (
                    <>
                        <span
                            className="text-sm font-medium whitespace-nowrap flex-shrink-0 text-gray-800"
                        >
                            {displayTitle}
                        </span>

                        <ProgressTimeline
                            progress={progress}
                            progressKey={expandedKey}
                            isFailed={isFailed}
                            isDisappearing={shouldFadeProgress}
                        />
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                                className={`text-sm font-medium ${isFinished ? 'text-gray-500' : 'text-gray-800'}`}
                            >
                                {displayTitle}
                            </span>

                            {!isFinished && !isToolCalling && (
                                <div className={`flex items-center gap-1 ${activeColor}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.4s]"/>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.2s]"/>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
                                </div>
                            )}
                        </div>

                        {!isFinished && !isToolCalling && truncatedLastLine && (
                            <span className="text-xs font-mono text-gray-500 border-l border-gray-200 ml-3 pl-3 hidden sm:block flex-grow min-w-[200px] overflow-hidden whitespace-nowrap">
                                {truncatedLastLine}
                            </span>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
                {isToolCalling && !isFinished && (
                    <ToolCallingRightStatus
                        isDone={isDone}
                        isFailed={isFailed}
                        isFinished={isFinished}
                    />
                )}

                {hasSteps && (
                    <StableStepsButton expandedKey={expandedKey}/>
                )}
            </div>
        </div>
    );
}, (prev, next) => {
    return (
        prev.activeColor === next.activeColor &&
        prev.currentColor === next.currentColor &&
        prev.displayTitle === next.displayTitle &&
        prev.Icon === next.Icon &&
        prev.expandedKey === next.expandedKey &&
        prev.hasSteps === next.hasSteps &&
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isProcessing === next.isProcessing &&
        prev.isToolCalling === next.isToolCalling &&
        prev.progress?.current === next.progress?.current &&
        prev.progress?.total === next.progress?.total &&
        prev.truncatedLastLine === next.truncatedLastLine
    );
});

StatusHeader.displayName = 'StatusHeader';

export default StatusHeader;
