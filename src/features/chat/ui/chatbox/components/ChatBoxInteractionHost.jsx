import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Check, ShieldQuestion, X} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

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

const normalizeApprovalItems = (data) => {
    const source = Array.isArray(data?.approvalItems) ? data.approvalItems : [];
    if (source.length > 0) {
        return source.map((item, index) => ({
            itemId: item?.itemId || `t${index}`,
            toolName: item?.toolName || data?.approvalToolNames?.[index] || data?.toolNames?.[index] || 'Tool',
            callPreview: item?.callPreview || item?.toolName || '',
            callIndex: Number.isFinite(Number(item?.callIndex)) ? Number(item.callIndex) : index,
            status: item?.status || 'pending',
            decision: item?.decision || null,
            scope: item?.scope || 'once',
            groupType: item?.groupType || data?.approvalGroupType || 'single',
        }));
    }

    const fallbackNames = data?.approvalToolNames || data?.toolNames || [];
    return [{
        itemId: '',
        toolName: fallbackNames.join('、') || 'Tool',
        callPreview: data?.toolCallContent || '',
        callIndex: 0,
        status: 'pending',
        decision: null,
        scope: 'once',
        groupType: data?.approvalGroupType || 'single',
    }];
};

const CallSummary = ({value}) => {
    const summary = String(value || '').replace(/\s+/g, ' ').trim();
    if (!summary) return null;

    return (
        <div
            title={summary}
            className="mt-1 truncate font-mono text-[11px] leading-5 text-muted-foreground"
        >
            {summary}
        </div>
    );
};

const ApprovalActions = ({item, submitting, resolve, t}) => (
    <>
        <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={submitting}
                onClick={() => resolve(item.itemId, 'deny')}
                className="cursor-pointer"
            >
                <X className="h-4 w-4"/>
                {t('tool_approval_deny')}
            </Button>
            <Button
                type="button"
                size="sm"
                disabled={submitting}
                onClick={() => resolve(item.itemId, 'allow')}
                className="cursor-pointer"
            >
                <Check className="h-4 w-4"/>
                {t('tool_approval_allow')}
            </Button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
            <button
                type="button"
                disabled={submitting}
                onClick={() => resolve(item.itemId, 'deny', 'conversation')}
                className="cursor-pointer transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
                {t('tool_approval_deny_same')}
            </button>
            <span className="h-3 w-px bg-border"/>
            <button
                type="button"
                disabled={submitting}
                onClick={() => resolve(item.itemId, 'allow', 'conversation')}
                className="cursor-pointer transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
                {t('tool_approval_allow_same')}
            </button>
        </div>
    </>
);

const ApprovalStatusBadge = ({item, t}) => {
    if (item.status === 'pending') return null;
    const allowed = item.status === 'resolved' && item.decision === 'allow';
    const denied = item.status === 'resolved' && item.decision === 'deny';

    return (
        <Badge
            variant={denied ? 'destructive' : 'secondary'}
            className="ml-auto h-5 px-1.5 text-[10px]"
        >
            {allowed
                ? t('tool_approval_allowed')
                : denied
                    ? t('tool_approval_denied')
                    : t('tool_approval_cancelled')}
        </Badge>
    );
};

const ToolApprovalInteraction = ({interaction, onDismiss}) => {
    const {t} = useTranslation();
    const [submittingIds, setSubmittingIds] = useState(() => new Set());
    const data = interaction.data || {};
    const approvalId = data.approvalId || interaction.id;
    const items = useMemo(() => normalizeApprovalItems(data), [data]);
    const pendingCount = items.filter(item => item.status === 'pending').length;
    const groupType = String(data.approvalGroupType || items[0]?.groupType || 'single').toLowerCase();
    const isGroup = groupType === 'batch' || groupType === 'order';
    const hasMultipleItems = items.length > 1;
    const isIgnore = String(data.toolCallMode || '').toLowerCase() === 'ignore';

    const resolve = useCallback(async (itemId, decision, scope = 'once') => {
        const submittingKey = itemId || '__approval__';
        if (!approvalId || submittingIds.has(submittingKey)) return;
        setSubmittingIds(prev => new Set(prev).add(submittingKey));
        try {
            const payload = await emitEvent({
                type: 'agent',
                target: 'AgentApproval',
                markId: interaction.markId,
                payload: {
                    command: 'Resolve-Tool-Approval',
                    approvalId,
                    itemId: itemId || undefined,
                    decision,
                    scope,
                },
            });
            const groupResolved = Boolean(
                payload?.groupResolved
                || payload?.resolved
                || payload?.value?.groupResolved
                || payload?.value?.approvalStatus === 'resolved'
            );
            if (groupResolved) onDismiss(interaction.id);
        } catch (error) {
            console.error('Resolve tool approval failed:', error);
        } finally {
            setSubmittingIds(prev => {
                const next = new Set(prev);
                next.delete(submittingKey);
                return next;
            });
        }
    }, [approvalId, interaction.id, interaction.markId, onDismiss, submittingIds]);

    const groupBadge = groupType === 'batch'
        ? t('tool_approval_batch_badge', 'Batch')
        : groupType === 'order'
            ? t('tool_approval_order_badge', 'Order')
            : null;

    const singleItem = items[0];

    return (
        <Card className="w-full gap-0 rounded-2xl border-border/80 bg-background/95 py-0 shadow-xl backdrop-blur-xl">
            <CardContent className="p-3.5">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                        <ShieldQuestion className="h-5 w-5"/>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <div className="text-sm font-semibold text-foreground">
                                {hasMultipleItems
                                    ? t('tool_approval_multiple_title', {count: pendingCount || items.length})
                                    : interaction.title || t('tool_approval_title')}
                            </div>
                            {groupBadge && <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{groupBadge}</Badge>}
                            {isIgnore && <Badge variant="outline" className="h-5 px-1.5 text-[10px]">{t('tool_approval_ignore_badge', 'Ignore')}</Badge>}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-muted-foreground">
                            {isGroup
                                ? t('tool_approval_group_description')
                                : interaction.description || t('tool_approval_description_named', {tools: singleItem?.toolName || ''})}
                        </div>
                    </div>
                </div>

                {!hasMultipleItems && singleItem ? (
                    <div className="mt-3 border-t border-border/70 pt-3">
                        <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate text-sm font-medium text-foreground">{singleItem.toolName}</span>
                            <ApprovalStatusBadge item={singleItem} t={t}/>
                        </div>
                        <CallSummary value={singleItem.callPreview}/>
                        {singleItem.status === 'pending' && (
                            <ApprovalActions
                                item={singleItem}
                                submitting={submittingIds.has(singleItem.itemId || '__approval__')}
                                resolve={resolve}
                                t={t}
                            />
                        )}
                    </div>
                ) : (
                    <div className="mt-3 max-h-[min(48vh,25rem)] space-y-2 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                        {items.map((item, index) => {
                            const pending = item.status === 'pending';
                            const submitting = submittingIds.has(item.itemId || '__approval__');
                            const allowed = item.status === 'resolved' && item.decision === 'allow';
                            const denied = item.status === 'resolved' && item.decision === 'deny';
                            return (
                                <Card
                                    key={item.itemId || index}
                                    className={`gap-0 rounded-xl py-0 shadow-none transition-colors ${
                                        allowed
                                            ? 'border-emerald-200 bg-emerald-50/45 dark:border-emerald-900 dark:bg-emerald-950/20'
                                            : denied
                                                ? 'border-destructive/25 bg-destructive/5'
                                                : item.status === 'cancelled'
                                                    ? 'border-border/60 bg-muted/30 opacity-65'
                                                    : 'border-border/80 bg-card'
                                    }`}
                                >
                                    <CardContent className="p-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="truncate text-sm font-medium text-foreground">{item.toolName}</span>
                                            <Badge variant="outline" className="h-5 shrink-0 px-1.5 text-[10px] text-muted-foreground">
                                                {index + 1}/{items.length}
                                            </Badge>
                                            <ApprovalStatusBadge item={item} t={t}/>
                                        </div>
                                        <CallSummary value={item.callPreview}/>

                                        {pending && (
                                            <ApprovalActions
                                                item={item}
                                                submitting={submitting}
                                                resolve={resolve}
                                                t={t}
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
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

    const visible = useMemo(() => interactions.filter(item => interactionRenderers.has(item.kind)), [interactions]);
    if (visible.length === 0) return null;

    return (
        <div className="pointer-events-none mx-auto w-full max-w-225 px-4">
            <div className="pointer-events-auto ml-auto flex max-h-[min(62vh,36rem)] w-full max-w-lg flex-col gap-2 overflow-y-auto pb-1 pr-1 [scrollbar-gutter:stable]">
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
