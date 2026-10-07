/** Foreground means both a visible tab and a focused browser window. */
export const widgetNotificationChannel = ({
    visible,
    focused,
    currentConversationId,
    targetConversationId,
    conversationVisible,
}) => {
    if (!visible || !focused) return 'system';
    if (conversationVisible && targetConversationId && targetConversationId === currentConversationId) return 'none';
    return 'page';
};
