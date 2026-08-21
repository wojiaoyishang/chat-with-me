/** CWM Protocol v1 semantic event catalog. */
/** Validate one concrete semantic event name. Wildcards are not accepted here. */
const EVENT_NAME_PATTERN = /^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9_-]*)+$/;
const EVENT_WILDCARD_PATTERN = /^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9_-]*)*\.\*$/;

export const normalizeEventName = (value) => {
    const event = String(value || '');
    if (event !== event.trim() || !EVENT_NAME_PATTERN.test(event)) {
        throw new TypeError(`Invalid semantic event name: ${value}`);
    }
    return event;
};

/** Validate a subscription pattern such as ``notification.*`` or ``*``. */
export const normalizeEventPattern = (value) => {
    const pattern = String(value || '');
    if (pattern === '*') return pattern;
    if (pattern !== pattern.trim()) {
        throw new TypeError(`Invalid semantic event pattern: ${value}`);
    }
    if (EVENT_NAME_PATTERN.test(pattern) || EVENT_WILDCARD_PATTERN.test(pattern)) {
        return pattern;
    }
    throw new TypeError(`Invalid semantic event pattern: ${value}`);
};

export const eventMatchesPattern = (pattern, event) => {
    const normalizedPattern = normalizeEventPattern(pattern);
    const normalizedEvent = normalizeEventName(event);
    if (normalizedPattern === '*') return true;
    if (normalizedPattern.endsWith('.*')) {
        return normalizedEvent.startsWith(normalizedPattern.slice(0, -1));
    }
    return normalizedPattern === normalizedEvent;
};

export const EventName = Object.freeze({
    PROTOCOL_REPLY: 'protocol.reply',
    PROTOCOL_ERROR: 'protocol.error',
    TRANSPORT_CONNECTED: 'transport.connected',
    TRANSPORT_DISCONNECTED: 'transport.disconnected',
    TRANSPORT_ERROR: 'transport.error',

    CONVERSATION_CREATE: 'conversation.create',
    TURN_START: 'turn.start',
    TURN_STARTED: 'turn.started',
    TURN_COMPLETED: 'turn.completed',
    TURN_CANCELLED: 'turn.cancelled',
    TURN_FAILED: 'turn.failed',
    CONVERSATION_MESSAGES_LOADED: 'conversation.messages.loaded',
    CONVERSATION_BRANCH_SWITCH: 'conversation.branch.switch',
    CONVERSATION_TREE_CHANGED: 'conversation.tree.changed',
    CONVERSATION_DELETED: 'conversation.deleted',
    RUN_BACKGROUND_TOOLS_CANCEL: 'run.background_tools.cancel',
    RUN_BACKGROUND_TOOL_CANCEL: 'run.background_tool.cancel',
    TASK_CANCEL: 'task.cancel',
    TASK_INTERRUPT: 'task.interrupt',
    TASK_RESUME: 'task.resume',
    DASHBOARD_SELECTION_CHANGE: 'dashboard.selection.change',
    SPEECH_SYNTHESIZE: 'speech.synthesize',
    SPEECH_CANCEL: 'speech.cancel',
    SPEECH_PAUSE: 'speech.pause',
    SPEECH_RESUME: 'speech.resume',
    TOOL_PERMISSION_SET: 'tool.permission.set',
    TOOL_PERMISSIONS_SET: 'tool.permissions.set',
    TOOL_APPROVAL_RESOLVE: 'tool.approval.resolve',

    COMPOSER_CLEAR: 'composer.clear',
    COMPOSER_STATUS_CHANGED: 'composer.status.changed',
    COMPOSER_MESSAGE_SEEDED: 'composer.message.seeded',
    TASK_STATE_CHANGED: 'task.state.changed',
    MESSAGE_CREATED: 'message.created',
    MESSAGE_ORDER_CHANGED: 'message.order.changed',
    MESSAGE_BRANCH_LOADED: 'message.branch.loaded',
    MESSAGES_RELOAD_REQUESTED: 'conversation.messages.reload_requested',
    MESSAGE_CONTENT_DELTA: 'message.content.delta',
    MESSAGE_CONTENT_SET: 'message.content.set',
    MESSAGE_REPLACEMENT_DELTA: 'message.replacement.delta',
    MESSAGE_REPLACEMENT_SET: 'message.replacement.set',
    MESSAGE_ATTACHMENTS_SET: 'message.attachments.set',
    MESSAGE_BACKGROUND_TOOLS_SET: 'message.background_tools.set',
    MESSAGES_RECONCILED: 'conversation.messages.reconciled',
    MESSAGE_KNOWLEDGE_NODES_ADDED: 'message.knowledge.nodes_added',
    MESSAGE_KNOWLEDGE_NETWORK_ADDED: 'message.knowledge.network_added',
    MESSAGE_KNOWLEDGE_NETWORK_REMOVED: 'message.knowledge.network_removed',
    MESSAGE_KNOWLEDGE_FOCUSED: 'message.knowledge.focused',

    SPEECH_STARTED: 'speech.started',
    SPEECH_AUDIO_CHUNK: 'speech.audio.chunk',
    SPEECH_SEGMENT_READY: 'speech.segment.ready',
    SPEECH_GENERATION_PROGRESS: 'speech.generation.progress',
    SPEECH_BUFFER_PROGRESS: 'speech.buffer.progress',
    SPEECH_ENDED: 'speech.ended',
    SPEECH_FAILED: 'speech.failed',
    SPEECH_CANCELLED: 'speech.cancelled',
    SPEECH_PAUSED: 'speech.paused',
    SPEECH_RESUMED: 'speech.resumed',

    DASHBOARD_REQUEST_ID_SET: 'dashboard.request_id.set',
    CONTEXT_TOAST_SHOW: 'context.toast.show',
    CONTEXT_STATE_CHANGED: 'context.state.changed',
    CONTEXT_COMPACTION_STATE_CHANGED: 'context.compaction_state.changed',
    SIDEBAR_CONVERSATIONS_RELOAD: 'sidebar.conversations.reload',
    SIDEBAR_CONVERSATION_TITLE_CHANGED: 'sidebar.conversation.title_changed',
    SIDEBAR_CONVERSATION_DATE_CHANGED: 'sidebar.conversation.date_changed',
    NOTIFICATION_UPSERT: 'notification.upsert',
    NOTIFICATION_RESOLVE: 'notification.resolve',
    NOTIFICATION_REMOVE: 'notification.remove',
    NOTIFICATION_SYNC: 'notification.sync',
    TOOL_APPROVAL_SHOW: 'tool.approval.show',
    TOOL_APPROVAL_DISMISS: 'tool.approval.dismiss',
    TOOL_PERMISSION_CHANGED: 'tool.permission.changed',
    TOOL_DEFAULT_PERMISSIONS_CHANGED: 'tool.default_permissions.changed',
    WIDGET_STATE_CHANGED: 'widget.state.changed',
    WORKSPACE_TRANSFER_STATE_CHANGED: 'workspace.transfer.state_changed',
    STORY_CHANGED: 'story.changed',
    STORY_DELETED: 'story.deleted',
    STORY_PERMISSIONS_CHANGED: 'story.permissions.changed',
    STORY_OPEN: 'story.open',

    DOCUMENT_EXTRACT_TEXT: 'document.extract.text',
    DOCUMENT_EXTRACT_SELECTION_HTML: 'document.extract.selection_html',
    DOCUMENT_CURSOR_MOVE_AND_SELECT: 'document.cursor.move_and_select',
    DOCUMENT_CURSOR_POSITION_GET: 'document.cursor.position.get',
    DOCUMENT_FIND_AND_SELECT: 'document.find_and_select',
    DOCUMENT_HTML_INSERT: 'document.html.insert',
    DOCUMENT_FONTS_GET: 'document.fonts.get',

    COMPOSER_CONTENT_GET: 'composer.content.get',
    COMPOSER_CONTENT_SET: 'composer.content.set',
    COMPOSER_EDIT_SET: 'composer.edit.set',
    INTERACTION_SHOW: 'interaction.show',
    INTERACTION_UPDATE: 'interaction.update',
    INTERACTION_DISMISS: 'interaction.dismiss',
    INTERACTION_CLEAR: 'interaction.clear',
    MESSAGE_CHILDREN_CHANGED: 'message.children.changed',
    MESSAGE_SWITCHING_CHANGED: 'message.switching.changed',
    MESSAGE_DELETE_REQUESTED: 'message.delete.requested',
    SPEECH_PLAY_REQUESTED: 'speech.play.requested',
    SPEECH_STOP_REQUESTED: 'speech.stop.requested',
    SPEECH_PAUSE_REQUESTED: 'speech.pause.requested',
    SPEECH_RESUME_REQUESTED: 'speech.resume.requested',
    SPEECH_RATE_SET: 'speech.rate.set',
    SPEECH_SEGMENT_PREVIOUS: 'speech.segment.previous',
    SPEECH_SEGMENT_NEXT: 'speech.segment.next',
    SPEECH_SEGMENT_SEEK: 'speech.segment.seek',
    COMPOSER_SETUP: 'composer.setup',
    COMPOSER_QUICK_OPTIONS_SET: 'composer.quick_options.set',
});
