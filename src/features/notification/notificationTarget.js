/** Opaque follow-up records use their own focus channel, never a chat message anchor. */
export function notificationFocusSearch(notification) {
    const action = notification?.actions?.find((item) => item.type === 'open-conversation');
    const focus = action?.focus;
    const query = new URLSearchParams();
    if (focus?.kind === 'self-message' && focus.id) query.set('focusSelfMessage', String(focus.id));
    else if (notification?.source?.messageId) query.set('focusMessage', notification.source.messageId);
    return query.toString();
}
