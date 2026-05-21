import { memo } from 'react';
import { CircleX } from 'lucide-react';

const ErrorBlock = memo(({content = ''}) => {
    return (
        <div className="group my-3 flex items-start gap-3 overflow-hidden rounded-xl border border-red-100 bg-red-50/40 p-4 transition-all hover:bg-red-50/60 shadow-sm">
            <div className="flex-shrink-0">
                <CircleX className="h-5 w-5 text-red-500/90 shadow-sm rounded-full"/>
            </div>

            <div className="flex-1 min-w-0">
                <pre className="font-mono text-[13px] leading-relaxed text-red-800/90 whitespace-pre-wrap break-all selection:bg-red-200">
                    {content}
                </pre>
            </div>
        </div>
    );
}, (prev, next) => {
    return prev.content === next.content;
});

ErrorBlock.displayName = 'ErrorBlock';

export default ErrorBlock;
