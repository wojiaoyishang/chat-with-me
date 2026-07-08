import {toast} from 'sonner';
import {emitEvent} from '@/context/useEventStore.jsx';
import {copyTextToClipboard} from '@/lib/tools.jsx';
import {getCopyContent} from './copyContent.js';

/**
 * 处理消息操作。
 * 子组件直接传入 msg，仅额外传入组件无法从 msg 推导出的上下文信息。
 */
export const handleMessageAction = (action, msg, {markId, msgId}, t) => {
    switch (action) {
        case 'speak':
            emitEvent({
                type: 'message',
                target: 'ChatPage',
                payload: {
                    command: 'Speak-Message',
                    msgId
                },
                markId,
                fromWebsocket: true
            });
            break;
        case 'stopSpeak':
            emitEvent({
                type: 'message',
                target: 'ChatPage',
                payload: {
                    command: 'Stop-Speech',
                    msgId
                },
                markId,
                fromWebsocket: true
            });
            break;
        case 'cancelBackgroundTools':
            emitEvent({
                type: 'message',
                target: 'ChatPage',
                payload: {
                    command: 'Cancel-Background-Tools',
                    msgId,
                    streamId: msg.backgroundTools?.streamId
                },
                markId
            }).then((payload) => {
                if (payload?.success) {
                    toast.success(t('background_tools_cancel_requested'));
                } else {
                    toast.error(t('background_tools_cancel_failed', {message: payload?.value || t('unknown_error')}));
                }
            });
            break;
        case 'delete':
            emitEvent({
                type: 'message',
                target: 'ChatPage',
                payload: {
                    command: 'Delete-Message',
                    value: msgId
                },
                markId,
                fromWebsocket: true
            });
            break;
        case 'edit':
            emitEvent({
                type: 'widget',
                target: 'ChatBox',
                payload: {
                    command: 'Set-EditMessage',
                    isEdit: true,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId,
                    role: msg.role
                },
                markId,
                fromWebsocket: true
            });
            break;
        case 'copy':
            copyTextToClipboard(getCopyContent(msg)).then(() => {
                toast.success(t('message_copied'));
            }).catch(err => {
                toast.error(t('message_not_copied', {message: err}));
            });
            break;
        case 'regenerate':
            emitEvent({
                type: 'widget',
                target: 'ChatBox',
                payload: {
                    command: 'Set-EditMessage',
                    isEdit: true,
                    immediate: true,
                    isRegenerate: true,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId,
                    role: msg.role
                },
                markId,
                fromWebsocket: true
            });
            break;
        case 'progenerate':
            emitEvent({
                type: 'widget',
                target: 'ChatBox',
                payload: {
                    command: 'Set-EditMessage',
                    isEdit: true,
                    immediate: true,
                    isProgenerate: true,
                    attachments: msg.attachments,
                    msgId,
                    role: msg.role
                },
                markId,
                fromWebsocket: true
            });
            break;
        case 'fork':
            emitEvent({
                type: 'widget',
                target: 'ChatBox',
                payload: {
                    command: 'Set-EditMessage',
                    isEdit: true,
                    isFork: true,
                    isRegenerate: true,
                    attachments: msg.attachments,
                    content: msg.content,
                    msgId,
                    role: msg.role
                },
                markId,
                fromWebsocket: true
            });
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
};
