import {CircleAlert, CheckCircle2, Loader2} from 'lucide-react';

const operationStatus = (operation) => {
    if (operation.state === 'uncertain') return ['结果待核验', CircleAlert, 'text-amber-600'];
    if (operation.state === 'cancel_requested') return ['取消待确认', Loader2, 'text-amber-600'];
    if (operation.state === 'running') return ['后台运行中', Loader2, 'text-blue-500'];
    if (operation.state === 'failed') return ['执行失败', CircleAlert, 'text-red-500'];
    return [operation.observed ? '结果已取回' : '结果待读取', CheckCircle2, 'text-emerald-600'];
};

/** Show interrupted waits without confusing them with cancelled tool executions. */
export default function ExecutionOperations({operations}) {
    const rows = (Array.isArray(operations) ? operations : []).filter((item) => item?.detached);
    if (!rows.length) return null;
    return (
        <section aria-label="被打断的工具">
            <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-400">被打断的工具</h3>
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-700">
                {rows.map((operation) => {
                    const [label, Icon, color] = operationStatus(operation);
                    const running = ['running', 'cancel_requested'].includes(operation.state);
                    return (
                        <div key={operation.id} data-execution-operation={operation.id} className="px-3 py-2.5 text-xs">
                            <div className="flex min-w-0 items-center gap-2">
                                <Icon aria-hidden="true" className={`size-3.5 shrink-0 ${color} ${running ? 'animate-spin' : ''}`} />
                                <span className="min-w-0 flex-1 truncate" title={operation.label}>{operation.label || '工具调用'}</span>
                                <span className={`shrink-0 ${color}`}>{label}</span>
                            </div>
                            <div className="mt-1 break-all pl-5.5 font-mono text-[10px] text-gray-400">{operation.id}</div>
                            {operation.error && <p className="mt-1 pl-5.5 leading-relaxed text-amber-600">{operation.error}</p>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
