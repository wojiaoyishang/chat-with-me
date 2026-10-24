import {useCallback, useEffect, useRef, useState} from 'react';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {onEvent} from '@/context/useEventStore.jsx';
import {useTaskStore} from '@/features/tasks/useTaskStore.js';

const TERMINAL_STATUSES = new Set(['completed', 'failed', 'cancelled']);

export default function useConversationFork({conversationId, clientRequestId, onComplete}) {
    const [task, setTask] = useState(null);
    const [submitting, setSubmitting] = useState(true);
    const [submitError, setSubmitError] = useState('');
    const [refreshError, setRefreshError] = useState('');
    const mounted = useRef(false);
    const started = useRef(false);
    const inFlight = useRef(false);
    const currentTask = useRef(null);
    const completed = useRef(false);
    const completeCallback = useRef(onComplete);
    completeCallback.current = onComplete;

    const acceptTask = useCallback((next) => {
        if (!next?.taskId || next.kind !== 'conversation.fork' || !Number.isInteger(next.revision)) return false;
        const previous = currentTask.current;
        if (previous && (previous.taskId !== next.taskId || previous.revision > next.revision)) return false;
        currentTask.current = next;
        useTaskStore.getState().merge([next]);
        if (mounted.current) {
            setTask(next);
            setRefreshError('');
            if (next.status === 'completed' && next.result?.conversationId && !completed.current) {
                completed.current = true;
                completeCallback.current?.(next.result);
            }
        }
        return true;
    }, []);

    const submit = useCallback(async () => {
        if (inFlight.current || currentTask.current) return;
        inFlight.current = true;
        if (mounted.current) { setSubmitting(true); setSubmitError(''); }
        try {
            const next = await apiClient.post(
                `${apiEndpoint.CHAT_CONVERSATIONS_ENDPOINT}/${encodeURIComponent(conversationId)}/fork`,
                {clientRequestId},
            );
            if (!acceptTask(next)) throw new Error('Invalid fork task response');
        } catch (error) {
            if (mounted.current) setSubmitError(error?.message || 'Request failed');
        } finally {
            inFlight.current = false;
            if (mounted.current) setSubmitting(false);
        }
    }, [conversationId, clientRequestId, acceptTask]);

    useEffect(() => {
        mounted.current = true;
        if (!started.current) {
            started.current = true;
            void submit();
        }
        return () => { mounted.current = false; };
    }, [submit]);

    const taskId = task?.taskId;
    const terminal = TERMINAL_STATUSES.has(task?.status);
    useEffect(() => {
        if (!taskId || terminal) return;
        const controller = new AbortController();
        let loading = false;
        const refresh = async () => {
            if (loading || controller.signal.aborted) return;
            loading = true;
            try {
                const next = await apiClient.get(`${apiEndpoint.TASKS_ENDPOINT}/${encodeURIComponent(taskId)}`, {signal: controller.signal});
                if (!controller.signal.aborted) acceptTask(next);
            } catch (error) {
                if (!controller.signal.aborted) setRefreshError(error?.message || 'Request failed');
            } finally { loading = false; }
        };
        const changed = onEvent({event: 'task.changed'}).then(({payload}) => {
            if (payload?.taskId !== taskId || controller.signal.aborted) return;
            if (!acceptTask(payload)) void refresh();
        });
        const reconnected = onEvent({event: 'transport.connected'}).then(() => void refresh());
        void refresh();
        const timer = setInterval(() => { if (!document.hidden) void refresh(); }, 3000);
        return () => { controller.abort(); clearInterval(timer); changed(); reconnected(); };
    }, [taskId, terminal, acceptTask]);

    return {task, submitting, submitError, refreshError, retrySubmission: submit, terminal};
}
