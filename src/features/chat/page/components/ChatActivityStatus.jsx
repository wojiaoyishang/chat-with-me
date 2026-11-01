import {Check, LoaderCircle} from 'lucide-react';
import {AnimatePresence, motion as Motion, useReducedMotion} from 'framer-motion';

/** Floating activity does not move the composer, body, or message toolbar. */
export default function ChatActivityStatus({compactionRunning, compactionCompleted, forwardingPending = 0, isMobile, t}) {
    const reduced = useReducedMotion();
    const activities = [];
    if (compactionRunning || compactionCompleted) activities.push({id: 'compaction', running: compactionRunning,
        label: t(compactionRunning ? 'context_compaction_running' : 'context_compaction_completed')});
    if (forwardingPending > 0) activities.push({id: 'forwarding', running: true,
        label: `正在转发正文 · ${forwardingPending} 条待发送`});
    return <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex max-w-[42vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 sm:flex-row" role="status" aria-live="polite">
        <AnimatePresence initial={false}>
            {activities.map(({id, running, label}) => <Motion.div key={id}
                initial={{opacity: 0, y: -3}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -3}}
                transition={{duration: reduced ? 0 : .18}}
                className="flex min-w-0 items-center gap-1.5 rounded-full bg-gray-50/95 px-2.5 py-1 text-[11px] font-medium text-gray-500 shadow-sm ring-1 ring-gray-200/70 dark:bg-zinc-900/95 dark:text-gray-300 dark:ring-zinc-700">
                {running ? <LoaderCircle className="h-3.5 w-3.5 shrink-0 motion-safe:animate-spin" />
                    : <Check className="h-3.5 w-3.5 shrink-0" />}
                <span className={isMobile ? 'sr-only' : 'truncate'}>{label}</span>
            </Motion.div>)}
        </AnimatePresence>
    </div>;
}
