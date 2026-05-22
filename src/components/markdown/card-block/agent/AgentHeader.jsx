import { memo } from 'react';
import { Check, X } from 'lucide-react';

import useExpandedState from '../useExpandedState.js';
import StableStepsButton from '../status/StableStepsButton.jsx';

const AgentHeader = memo(({
                              Icon,
                              expandedKey,
                              isDone,
                              isFailed,
                              isFinished,
                              isProcessing,
                              lastLine,
                              statusConfig,
                              title,
                          }) => {
    const [isExpanded] = useExpandedState(expandedKey);

    return (
        <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                    className={`
                        flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center
                        ${statusConfig.iconBg}
                    `}
                >
                    {isFailed ? (
                        <X className="w-4 h-4 stroke-[2.5]"/>
                    ) : isDone ? (
                        <Check className="w-4 h-4 stroke-[2.5]"/>
                    ) : (
                        <Icon className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`}/>
                    )}
                </div>

                <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className="text-[13px] font-semibold text-zinc-800 whitespace-nowrap">
                        {title}
                    </span>

                    <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-zinc-100/80 border border-zinc-200/50 flex-shrink-0">
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${!isFinished ? 'animate-pulse' : ''}`}
                        />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                            {statusConfig.label}
                        </span>
                    </div>

                    {!isFinished && lastLine && !isExpanded && (
                        <span className="text-[11px] font-mono text-zinc-400 truncate hidden sm:block border-l border-zinc-200 ml-1 pl-2">
                            {lastLine}
                        </span>
                    )}
                </div>
            </div>

            <StableStepsButton expandedKey={expandedKey}/>
        </div>
    );
}, (prev, next) => {
    return (
        prev.Icon === next.Icon &&
        prev.expandedKey === next.expandedKey &&
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished &&
        prev.isProcessing === next.isProcessing &&
        prev.lastLine === next.lastLine &&
        prev.statusConfig === next.statusConfig &&
        prev.title === next.title
    );
});

AgentHeader.displayName = 'AgentHeader';

export default AgentHeader;