import { useEffect, useState } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';
import { toast } from 'sonner';

const activeStates = ['queued', 'running', 'waiting_tool_approval', 'stopping'];
const labels = {
    pending: '执行中',
    delivered: '已交付',
    missing_result: '结束但未交付',
    not_started: '未开始',
    failed: '失败',
    stopped: '已停止',
    cancelled: '已取消',
    closed: '已关闭',
};
export default function SubAgentPanel({ conversationId }) {
    const [open, setOpen] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');
    const [limits, setLimits] = useState(null);
    const [revision, setRevision] = useState(0);
    const [result, setResult] = useState(null);
    const [busy, setBusy] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!open || !conversationId) return;
        let cancelled = false;
        let timer;
        const refresh = async () => {
            try {
                const data = await apiClient.get(apiEndpoint.AGENT_SESSIONS_ENDPOINT, { params: { conversationId } });
                if (!cancelled) {
                    setSessions(data.sessions || []);
                    setLimits(data.limits);
                    setError('');
                }
            } catch (error) {
                if (!cancelled) setError(error.message);
            } finally {
                if (!cancelled) timer = setTimeout(refresh, 5000);
            }
        };
        setSessions([]);
        setResult(null);
        void refresh();
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [open, conversationId, revision]);
    const stop = async (session) => {
        setBusy(session.sessionId);
        try {
            await apiClient.post(
                `${apiEndpoint.AGENT_SESSIONS_ENDPOINT}/${encodeURIComponent(session.sessionId)}/stop`,
                null,
                { params: { conversationId } },
            );
            setRevision((value) => value + 1);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(null);
        }
    };
    const read = async (session, offset = 0) => {
        setBusy(session.sessionId);
        try {
            const data = await apiClient.get(
                `${apiEndpoint.AGENT_SESSIONS_ENDPOINT}/${encodeURIComponent(session.sessionId)}/result`,
                { params: { conversationId, offset } },
            );
            setResult((previous) => ({
                ...data,
                content:
                    offset && previous?.sessionId === session.sessionId
                        ? previous.content + data.content
                        : data.content,
            }));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(null);
        }
    };
    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                disabled={!conversationId}
                title="子智能体"
                aria-label="子智能体"
                onClick={() => setOpen(true)}
            >
                <Bot className="size-4" />
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>子智能体</SheetTitle>
                        <SheetDescription>查看子任务层级、交付状态与结果。停止响应会保留子会话。</SheetDescription>
                    </SheetHeader>
                    <Button variant="ghost" className="my-3" onClick={() => setRevision((value) => value + 1)}>
                        <RefreshCw className="mr-2 size-4" />
                        刷新
                    </Button>
                    {limits && (
                        <p className="mb-3 text-xs text-gray-500">
                            并发上限 {limits.concurrency} · 已发起 {limits.usedRuns} 次生成 · 预算{' '}
                            {limits.runBudget || '不限'}
                        </p>
                    )}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {!error && sessions.length === 0 && <p className="text-sm text-gray-500">暂无子智能体</p>}
                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <section
                                key={session.sessionId}
                                className="rounded-xl border p-3"
                                style={{ marginLeft: Math.min(3, Math.max(0, session.depth - 1)) * 12 }}
                            >
                                <div className="flex justify-between gap-2">
                                    <strong className="break-words">{session.name}</strong>
                                    <span
                                        className={`shrink-0 text-xs ${session.deliveryStatus === 'delivered' ? 'text-green-600' : session.deliveryStatus === 'failed' || session.deliveryStatus === 'missing_result' ? 'text-amber-600' : 'text-gray-500'}`}
                                    >
                                        {labels[session.deliveryStatus] || session.status}
                                    </span>
                                </div>
                                <p className="my-2 whitespace-pre-wrap text-sm text-gray-600">{session.goal}</p>
                                <p className="text-xs text-gray-500">
                                    第 {session.depth} 层 · {session.model} · {session.roundCount} 轮 · 结果{' '}
                                    {session.resultSlot?.length || 0} 字符
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    结果验收：
                                    {session.resultVerification?.status === 'verified'
                                        ? '已通过确定性校验'
                                        : '未验证，需主智能体验收'}
                                </p>
                                {session.lastError && <p className="mt-2 text-sm text-red-500">{session.lastError}</p>}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setOpen(false);
                                            navigate(`/chat/${encodeURIComponent(session.conversationId)}`);
                                        }}
                                    >
                                        进入会话
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={Boolean(busy)}
                                        onClick={() => read(session)}
                                    >
                                        查看结果
                                    </Button>
                                    {activeStates.includes(session.status) && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={Boolean(busy)}
                                            onClick={() => stop(session)}
                                        >
                                            停止
                                        </Button>
                                    )}
                                </div>
                                {result?.sessionId === session.sessionId && (
                                    <div className="mt-3 rounded-lg bg-gray-50 p-3">
                                        <div className="whitespace-pre-wrap break-words text-sm">
                                            {result.content || session.lastResponse || '尚未提交结果'}
                                        </div>
                                        {result.nextOffset !== null && result.nextOffset !== undefined && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                disabled={Boolean(busy)}
                                                onClick={() => read(session, result.nextOffset)}
                                            >
                                                加载更多
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
