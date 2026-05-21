import { memo } from 'react';
import { Check, X } from 'lucide-react';

const ToolCallingRightStatus = memo(({
    isDone,
    isFailed,
    isFinished,
}) => {
    if (isFailed) {
        return (
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100">
                <X className="h-3.5 w-3.5 stroke-[3]"/>
            </div>
        );
    }

    if (isFinished || isDone) {
        return (
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                <Check className="h-3.5 w-3.5 stroke-[3]"/>
            </div>
        );
    }

    return (
        <div className="flex h-6 flex-shrink-0 items-center justify-center px-1.5 rounded-full bg-yellow-50/80 border border-yellow-100 text-yellow-600">
            <span className="flex items-center gap-1" aria-label="Tool calling is running">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.35s]"/>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse [animation-delay:-0.18s]"/>
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"/>
            </span>
        </div>
    );
}, (prev, next) => {
    return (
        prev.isDone === next.isDone &&
        prev.isFailed === next.isFailed &&
        prev.isFinished === next.isFinished
    );
});

ToolCallingRightStatus.displayName = 'ToolCallingRightStatus';

export default ToolCallingRightStatus;
