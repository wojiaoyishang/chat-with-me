import {normalizeReplacementEntry} from '../../components/markdown/replacementProtocol.js';
import {getExecutionDisplayState, parseExecutionStatus, projectExecutionStatus} from './executionStatusModel.js';

const terminal = new Set(['completed', 'historicalDone', 'failed', 'cancelled']);
const marker = /\[(DONE|FAILED)(?::[^\]\r\n]+)?\]/gi;

/** A display projection only. Never use this group to rebuild provider history. */
export function workProcessEntry(replacement, id, type = '') {
    const entry = normalizeReplacementEntry(replacement, id, type);
    if (!entry.exists || entry.snapshot || entry.contextStatus) return null;
    const meta = replacement?.[id]?.workProcess;
    if (entry.type === 'thinking') return {...entry, workProcess: meta || null};
    if (entry.type !== 'executionStatus') return null;
    const execution = parseExecutionStatus(entry.content);
    return execution && execution.inlineKind !== 'feedback' ? {...entry, execution} : null;
}

export function processIdentity(entry) {
    const source = entry?.execution || entry?.workProcess || {};
    return {conversationId: source.conversationId || '', runId: source.runId || '', executionId: source.executionId || ''};
}

export function sameProcess(left, right) {
    return ['conversationId', 'runId', 'executionId'].every((key) => !left[key] || !right[key] || left[key] === right[key]);
}

export function reasoningRecord(entry) {
    const matches = [...entry.content.matchAll(marker)];
    const last = matches.at(-1)?.[1]?.toUpperCase();
    const state = last === 'FAILED' ? 'failed' : entry.workProcess?.state === 'cancelled' ? 'cancelled'
        : last === 'DONE' ? 'completed' : entry.workProcess?.state || 'running';
    return {...entry, state, text: entry.content.replace(marker, '').trim(),
        startedAt: entry.workProcess?.startedAt, finishedAt: entry.workProcess?.finishedAt};
}

/** Keep a finished tool distinct from the still-running user turn. */
export function projectWorkProcess(entries, {live = null, isStreaming = false, tail = false} = {}) {
    const seen = new Set();
    const records = entries.map((entry) => {
        if (entry.type === 'thinking') return reasoningRecord(entry);
        const execution = projectExecutionStatus(entry.execution || parseExecutionStatus(entry.content), live);
        if (!execution) return null;
        const node = execution.toolStatusNodes?.[execution.toolCallId];
        return {...entry, execution, state: getExecutionDisplayState(execution),
            startedAt: execution.activityStartedAt || node?.startedAt,
            finishedAt: execution.activityFinishedAt || node?.finishedAt};
    }).filter(Boolean).filter((entry, index, all) => {
        // A delayed clear of a transient bridge must not leave an old spinner
        // running after a later model span or tool already superseded it.
        const status = entry.execution;
        return !status || status.toolCallId || ['tool', 'terminal'].includes(status.inlineKind)
            || ['failed', 'cancelled'].includes(entry.state) || index === all.length - 1;
    }).filter((entry) => {
        const key = entry.execution?.toolCallId || entry.id;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
    const calls = records.filter((entry) => entry.execution?.inlineKind === 'tool' || entry.execution?.toolCallId);
    const failures = calls.filter((entry) => entry.state === 'failed').length;
    const stopped = calls.filter((entry) => entry.state === 'cancelled').length;
    const active = records.filter((entry) => ['running', 'paused', 'recovering'].includes(entry.state));
    const latest = records.at(-1);
    const latestExecution = [...records].reverse().find((entry) => entry.execution)?.execution;
    const currentLive = latestExecution && live && sameProcess(processIdentity({execution: latestExecution}), processIdentity({execution: live})) ? live : null;
    const wholeState = tail && (currentLive?.status || (latestExecution?.inlineKind === 'terminal' ? latestExecution.status : ''));
    const current = active.at(-1);
    let state = wholeState === 'cancelled' ? 'cancelled'
        : ['failed', 'blocked', 'recoverable_failed'].includes(wholeState) ? 'failed'
            : tail && currentLive?.thinking?.paused ? 'paused'
                : wholeState === 'completed' ? 'completed'
                    : active.length || (tail && isStreaming) ? 'running' : 'completed';
    if (!isStreaming && !currentLive?.active && state === 'running') state = 'interrupted';
    if ((!isStreaming || !tail) && !['running', 'paused'].includes(state)
        && ['failed', 'cancelled'].includes(latest?.state)) state = latest.state;
    let label = state === 'failed' ? '执行需要处理' : state === 'cancelled' ? '执行已停止'
        : state === 'paused' ? '执行已暂停' : state === 'interrupted' ? '处理已中断'
            : state === 'completed' ? calls.length ? '处理完成' : '分析完成'
                : current?.type === 'thinking' ? current.workProcess?.label || '正在分析下一步'
                    : current?.execution?.action || current?.execution?.label || '正在继续处理';
    if (state === 'running' && !current) label = '正在分析下一步';
    const times = records.map((entry) => Number(entry.startedAt)).filter((value) => value > 0);
    const ends = records.map((entry) => Number(entry.finishedAt)).filter((value) => value > 0);
    const duration = records[0]?.startedAt && latest?.finishedAt && times.length && ends.length && !['running', 'paused'].includes(state)
        ? Math.max(0, Math.max(...ends) - Math.min(...times)) : null;
    return {records, calls, failures, stopped, state, label: String(label), duration,
        target: current?.execution || latestExecution,
        // Completed reasoning spans aren't counted as completed user operations.
        completed: calls.filter((entry) => terminal.has(entry.state)).length, latest};
}
