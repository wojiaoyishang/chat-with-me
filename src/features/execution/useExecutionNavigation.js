import { useEffect, useState } from 'react';
import { getExpandedKey, setExpandedValue } from '@/components/markdown/card-block/expandedStore.js';

export default function useExecutionNavigation({ request, open, execution, timelineItems, ownerMessageId,
    ownerReplacement, scrollRef, setAutoFollow, onHandled }) {
    const [highlightedKey, setHighlightedKey] = useState(null);

    useEffect(() => {
        if (!open || !request) return undefined;
        setAutoFollow(false);
        const toolId = request.toolCallId || Object.values(execution.toolStatusNodes || {})
            .find((node) => node.statusId === request.statusId)?.toolCallId
            || execution.activities?.find((activity) => activity.id === request.activityId && activity.kind === 'tool')?.toolCallId;
        const item = timelineItems.find((entry) => entry.type === 'tool_card'
            ? toolId && entry.card.toolCallId === toolId
            : request.activityId ? entry.activity.id === request.activityId
                : toolId ? entry.activity.kind === 'tool' && entry.activity.toolCallId === toolId
                    : entry.activity.statusId === request.statusId);
        if (!item) return undefined; // A realtime card can arrive after the inline node.
        if (item.type === 'tool_card') {
            const innerId = item.card.innerReplacementId || `${item.card.toolCallId}-toolCalling`;
            setExpandedValue(getExpandedKey(ownerMessageId, innerId, 'toolCalling:task_window'), true, { isUserAction: true });
        }
        const frame = requestAnimationFrame(() => {
            const container = scrollRef.current;
            if (!container) return;
            const rows = container.querySelectorAll('[data-task-tool-call-id], [data-task-activity-id]');
            const row = Array.from(rows).find((node) => item.type === 'tool_card'
                ? node.getAttribute('data-task-tool-call-id') === item.card.toolCallId
                : node.getAttribute('data-task-activity-id') === item.activity.id);
            if (!row) return;
            const nested = request.replacementId && Array.from(row.querySelectorAll('[data-card-block-id]'))
                .find((node) => node.getAttribute('data-card-block-id') === request.replacementId);
            if (request.replacementId && !nested) return; // Wait for the result replacement to finish mounting.
            const target = nested || row;
            const top = Math.max(0, container.scrollTop + target.getBoundingClientRect().top
                - container.getBoundingClientRect().top - 12);
            // Only move the task scroll area; scrollIntoView can move the document behind it.
            container.scrollTo({ top, behavior: 'smooth' });
            setHighlightedKey(item.key);
            onHandled?.(request.requestId);
        });
        return () => cancelAnimationFrame(frame);
    }, [request, open, execution.toolStatusNodes, execution.activities, timelineItems, ownerMessageId, ownerReplacement,
        scrollRef, setAutoFollow, onHandled]);

    useEffect(() => {
        if (!highlightedKey) return undefined;
        const timer = setTimeout(() => setHighlightedKey(null), 1800);
        return () => clearTimeout(timer);
    }, [highlightedKey]);

    return highlightedKey;
}
