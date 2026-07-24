import {
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Check, X } from 'lucide-react';

import {emitEvent} from '@/context/useEventStore.jsx';
import ProgressTimeline from './ProgressTimeline.jsx';
import StableStepsButton from './StableStepsButton.jsx';
import ToolCallingRightStatus from './ToolCallingRightStatus.jsx';

const StatusHeader = memo(({
                               activeColor,
                               actions = [],
                               contextId = '',
                               currentColor,
                               displayTitle,
                               Icon,
                               expandedKey,
                               canToggleExpansion = false,
                               isDone,
                               isFailed,
                               isFinished,
                               isProcessing,
                               isToolCalling,
                               isWaitingApproval = false,
                               isResumingTool = false,
                               markId = null,
                               metaText = '',
                               progress,
                               truncatedLastLine,
                               waitingApprovalLabel = 'Waiting for approval',
                               resumingLabel = 'Sub-agent finished, resuming',
                           }) => {
    const previousIsFinishedRef = useRef(isFinished);
    const hasProgress = Boolean(progress);
    const [isFinishingProgressVisible, setIsFinishingProgressVisible] = useState(false);
    const [isFinishingProgressFading, setIsFinishingProgressFading] = useState(false);

    const justFinishedDuringRender = Boolean(
        isToolCalling &&
        hasProgress &&
        isFinished &&
        !previousIsFinishedRef.current &&
        !isFailed,
    );

    useEffect(() => {
        if (!isToolCalling || !hasProgress || isFailed) {
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
    }, [hasProgress, isToolCalling, isFinished, isFailed]);

    const shouldShowProgress = Boolean(
        progress &&
        !isWaitingApproval &&
        (!isFinished || isFinishingProgressVisible || justFinishedDuringRender)
    );
    const shouldFadeProgress = Boolean(hasProgress && isFinished && isFinishingProgressFading && !isFailed);
    const visibleActions = isFinished ? [] : actions;

    const handleActionClick = (event, action) => {
        event.preventDefault();
        event.stopPropagation();

        const commandPayloads = {
            cancelBackgroundTool: {
                command: 'Cancel-Background-Tool',
                msgId: contextId,
                toolCallingId: action.toolId,
            },
            resumeTask: {
                command: 'Task-Resume',
                taskRunId: action.taskRunId,
                requestId: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
            },
            cancelTask: {
                command: 'Task-Cancel',
                taskRunId: action.taskRunId,
                requestId: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
            },
        };
        const commandPayload = commandPayloads[action.command];
        if (!commandPayload) return;

        emitEvent({
            type: 'message',
            target: 'ChatPage',
            payload: commandPayload,
            markId,
        });
    };

    return (
        <div className="flex items-center justify-between gap-2 group">
            <div className={`flex items-center gap-2.5 min-w-0 flex-1 ${shouldShowProgress ? 'overflow-visible' : 'overflow-hidden'}`}>
                <div className={`${isResumingTool ? 'text-sky-600' : (isWaitingApproval ? 'text-gray-400' : (isToolCalling && !isFailed && !isFinished ? 'text-yellow-600' : currentColor))} flex-shrink-0`}>
                    {isFailed ? (
                        <X className="w-4 h-4 stroke-[3]"/>
                    ) : isToolCalling && isFinished ? (
                        <Check className="w-4 h-4 stroke-[3]"/>
                    ) : isResumingTool ? (
                        <Icon className="w-4 h-4 animate-pulse"/>
                    ) : isWaitingApproval ? (
                        <Icon className="w-4 h-4"/>
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
                        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                            <span
                                className={`text-sm font-medium ${isWaitingApproval ? 'text-gray-500' : (isResumingTool ? 'text-sky-700' : 'text-gray-800')}`}
                            >
                                {displayTitle}
                            </span>
                            {metaText ? (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-normal text-gray-500">
                                    {metaText}
                                </span>
                            ) : null}
                        </div>

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
                                className={`text-sm font-medium ${isFinished || isWaitingApproval ? 'text-gray-500' : (isResumingTool ? 'text-sky-700' : 'text-gray-800')}`}
                            >
                                {displayTitle}
                            </span>

                            {metaText ? (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-normal text-gray-500">
                                    {metaText}
                                </span>
                            ) : null}

                            {!isFinished && !isToolCalling && !isWaitingApproval && (
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
                {visibleActions.map((action) => (
                    <button
                        key={`${action.command}-${action.toolId || action.name}`}
                        type="button"
                        onClick={(event) => handleActionClick(event, action)}
                        disabled={!markId || (action.command === 'cancelBackgroundTool' ? !action.toolId : !action.taskRunId)}
                        className="shrink-0 cursor-pointer rounded-sm bg-orange-500/15 px-2 py-1 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {action.name}
                    </button>
                ))}

                {isToolCalling && !isFinished && (
                    <ToolCallingRightStatus
                        isDone={isDone}
                        isFailed={isFailed}
                        isFinished={isFinished}
                        isWaitingApproval={isWaitingApproval}
                        isResumingTool={isResumingTool}
                        waitingApprovalLabel={waitingApprovalLabel}
                        resumingLabel={resumingLabel}
                    />
                )}

                {canToggleExpansion && (
                    <StableStepsButton expandedKey={expandedKey}/>
                )}
            </div>
        </div>
    );
}, (prev, next) => {
    return (
        prev.activeColor === next.activeColor &&
        prev.actions === next.actions &&
        prev.contextId === next.contextId &&
        prev.currentColor === next.currentColor &&
        prev.displayTitle === next.displayTitle &&
        prev.Icon === next.Icon &&
        prev.expandedKey === next.expandedKey &&
        prev.canToggleExpansion === next.canToggleExpansion &&
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isProcessing === next.isProcessing &&
        prev.isToolCalling === next.isToolCalling &&
        prev.isWaitingApproval === next.isWaitingApproval &&
        prev.isResumingTool === next.isResumingTool &&
        prev.markId === next.markId &&
        prev.metaText === next.metaText &&
        prev.progress?.current === next.progress?.current &&
        prev.progress?.total === next.progress?.total &&
        prev.truncatedLastLine === next.truncatedLastLine &&
        prev.waitingApprovalLabel === next.waitingApprovalLabel &&
        prev.resumingLabel === next.resumingLabel
    );
});

StatusHeader.displayName = 'StatusHeader';

export default StatusHeader;
