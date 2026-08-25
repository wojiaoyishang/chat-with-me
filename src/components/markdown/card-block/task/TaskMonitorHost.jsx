import {memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import TaskMonitorWindow from './TaskMonitorWindow.jsx';
import {
    closeTaskMonitor,
    useTaskMonitorStore,
} from './useTaskMonitorStore.js';

const normalizeId = (value) => String(value || '').trim();

const TaskMonitorHost = memo(({conversationId}) => {
    const {t} = useTranslation();
    const normalizedConversationId = normalizeId(conversationId);
    const session = useTaskMonitorStore(state => (
        normalizedConversationId ? state.sessions[normalizedConversationId] || null : null
    ));
    const activeCard = session?.activeCardId
        ? session.cards[session.activeCardId] || null
        : null;
    const open = Boolean(session?.isOpen && activeCard);

    useEffect(() => () => {
        if (normalizedConversationId) closeTaskMonitor(normalizedConversationId);
    }, [normalizedConversationId]);

    if (!open || !activeCard) return null;

    return (
        <TaskMonitorWindow
            actions={activeCard.actions}
            cleanContent={activeCard.cleanContent}
            elapsedText={activeCard.elapsedText}
            error={activeCard.error}
            isFailed={activeCard.isFailed}
            isFinished={activeCard.isFinished}
            conversationId={normalizedConversationId}
            contentKey={activeCard.cardId}
            onClose={() => closeTaskMonitor(normalizedConversationId)}
            open
            renderMarkdown={activeCard.renderMarkdown}
            status={activeCard.status}
            taskRunId={activeCard.taskRunId}
            title={activeCard.title}
            workspaceName={activeCard.workspaceName}
            t={t}
        />
    );
});

TaskMonitorHost.displayName = 'TaskMonitorHost';

export default TaskMonitorHost;
