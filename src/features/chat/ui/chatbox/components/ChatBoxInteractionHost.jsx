import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Check, ShieldQuestion, X} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';

const interactionRenderers = new Map();
const registryListeners = new Set();

const notifyRegistryChanged = () => {
    registryListeners.forEach(listener => listener());
};

/**
 * Register an interaction renderer displayed above ChatBox.
 *
 * New interactive prompts only need a stable kind and a renderer. Their WebSocket
 * broadcasts continue to use Show/Update/Dismiss-Interaction, so the host itself
 * does not need to know the interaction's business protocol.
 */
export const registerChatBoxInteraction = (kind, renderer) => {
    interactionRenderers.set(kind, renderer);
    notifyRegistryChanged();

    return () => {
        if (interactionRenderers.get(kind) === renderer) {
            interactionRenderers.delete(kind);
            notifyRegistryChanged();
        }
    };
};

const ToolApprovalInteraction = ({interaction, onDismiss}) => {
    const {t} = useTranslation();
    const [submitting, setSubmitting] = useState(false);
    const data = interaction.data || {};
    const approvalId = data.approvalId || interaction.id;
    const toolNames = data.approvalToolNames || data.toolNames || [];
    const defaultDescription = toolNames.length > 0
        ? t('tool_approval_description_named', {tools: toolNames.join('、')})
        : t('tool_approval_description');

    const resolve = useCallback(async (decision, scope = 'once') => {
        if (!approvalId || submitting) return;
        setSubmitting(true);
        try {
            await emitEvent({
                type: 'agent',
                target: 'AgentApproval',
                markId: interaction.markId,
                payload: {
                    command: 'Resolve-Tool-Approval',
                    approvalId,
                    decision,
                    scope,
                },
            }).then((payload) => {
                if (payload?.success || payload?.resolved) onDismiss(interaction.id);
            });
        } catch (error) {
            console.error('Resolve tool approval failed:', error);
        } finally {
            setSubmitting(false);
        }
    }, [approvalId, interaction.id, interaction.markId, onDismiss, submitting]);

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-xl">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-amber-50 p-2 text-amber-600">
                    <ShieldQuestion className="h-5 w-5"/>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-gray-900">
                        {interaction.title || t('tool_approval_title')}
                    </div>
                    <div className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                        {interaction.description || defaultDescription}
                    </div>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                    type="button"
                    disabled={submitting}
                    onClick={() => resolve('deny')}
                    className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <X className="h-4 w-4"/>{t('tool_approval_deny')}
                </button>
                <button
                    type="button"
                    disabled={submitting}
                    onClick={() => resolve('allow')}
                    className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gray-900 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Check className="h-4 w-4"/>{t('tool_approval_allow')}
                </button>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-gray-400">
                <button type="button" disabled={submitting} onClick={() => resolve('deny', 'conversation')} className="cursor-pointer transition hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50">
                    {t('tool_approval_deny_same')}
                </button>
                <span className="h-3 w-px bg-gray-200"/>
                <button type="button" disabled={submitting} onClick={() => resolve('allow', 'conversation')} className="cursor-pointer transition hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50">
                    {t('tool_approval_allow_same')}
                </button>
            </div>
        </div>
    );
};

registerChatBoxInteraction('toolApproval', ToolApprovalInteraction);

const ChatBoxInteractionHost = ({markId}) => {
    const [interactions, setInteractions] = useState([]);
    const [, setRegistryVersion] = useState(0);

    const dismiss = useCallback((id) => {
        setInteractions(prev => prev.filter(item => item.id !== id));
    }, []);

    useEffect(() => {
        const listener = () => setRegistryVersion(value => value + 1);
        registryListeners.add(listener);
        return () => registryListeners.delete(listener);
    }, []);

    useEffect(() => {
        setInteractions([]);
    }, [markId]);

    useEffect(() => onEvent({type: 'widget', target: 'ChatBox', markId}).then(({payload}) => {
        const command = payload?.command;
        if (command === 'Show-Interaction') {
            const value = payload.value;
            if (!value?.id || !value?.kind) return;
            setInteractions(prev => [
                ...prev.filter(item => item.id !== value.id),
                {...value, markId},
            ]);
        } else if (command === 'Update-Interaction') {
            const value = payload.value;
            if (!value?.id) return;
            setInteractions(prev => prev.map(item => item.id === value.id ? {...item, ...value, markId} : item));
        } else if (command === 'Dismiss-Interaction') {
            dismiss(payload.id || payload.value?.id);
        } else if (command === 'Clear-Interactions') {
            setInteractions([]);
        }
    }), [dismiss, markId]);

    const visible = useMemo(() => interactions.slice(-3), [interactions]);
    if (visible.length === 0) return null;

    return (
        <div className="pointer-events-none mx-auto w-full max-w-225 px-4">
            <div className="pointer-events-auto ml-auto flex w-full max-w-md flex-col gap-2 pb-1">
                {visible.map(interaction => {
                    const Renderer = interactionRenderers.get(interaction.kind);
                    return Renderer ? (
                        <Renderer key={interaction.id} interaction={interaction} onDismiss={dismiss}/>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default ChatBoxInteractionHost;
