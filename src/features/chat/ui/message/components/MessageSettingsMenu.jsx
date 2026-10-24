import {useEffect, useRef, useState} from 'react';
import {Loader2, MoreHorizontal, ShieldCheck, ShieldOff} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {toast} from 'sonner';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {emitEvent} from '@/context/useEventStore.jsx';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import useMessageConfigCatalog from '../hooks/useMessageConfigCatalog.js';

export default function MessageSettingsMenu({msg, msgId, conversationId, readonly = false, onOpenChange}) {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const inFlight = useRef(false);
    const mounted = useRef(false);
    const identity = `${conversationId}:${msgId}`;
    const currentIdentity = useRef(identity);
    currentIdentity.current = identity;
    const {items, loading, error, retry} = useMessageConfigCatalog(open);
    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);
    useEffect(() => () => onOpenChange?.(false), [onOpenChange]);
    const changeOpen = (next) => {
        setOpen(next);
        onOpenChange?.(next);
        if (next) setSaveError('');
    };
    const configurable = Boolean(conversationId && msgId && !String(msgId).startsWith('<') && !readonly && msg?.readonly !== true && msg?.messageConfig?.canConfigure !== false);
    const save = async (definition) => {
        if (!configurable || inFlight.current) return;
        const previous = typeof msg?.messageConfig?.[definition.key] === 'boolean' ? msg.messageConfig[definition.key] : definition.default !== false;
        const requestIdentity = identity;
        inFlight.current = true;
        setSaving(true);
        setSaveError('');
        try {
            const response = await apiClient.patch(`${apiEndpoint.CHAT_MESSAGES_ENDPOINT}/${encodeURIComponent(msgId)}/config`, {
                conversationId,
                [definition.key]: !previous,
            });
            if (response?.messageId !== msgId || typeof response?.messageConfig?.[definition.key] !== 'boolean') throw new Error(t('messageConfig.invalidResponse'));
            if (!mounted.current || currentIdentity.current !== requestIdentity) return;
            emitEvent({event: 'message.updated', payload: response, conversationId, localOnly: true});
            changeOpen(false);
            toast.success(t(response.messageConfig.compressible === false ? 'messageConfig.savedProtected' : 'messageConfig.savedCompressible'), {
                description: t(response.restoredArtifactIds?.length ? 'messageConfig.restoredHint' : 'messageConfig.nextTurnHint'),
            });
        } catch (cause) {
            if (mounted.current && currentIdentity.current === requestIdentity) setSaveError(cause?.message || t('unknown_error'));
        } finally {
            inFlight.current = false;
            if (mounted.current && currentIdentity.current === requestIdentity) setSaving(false);
        }
    };

    if (!configurable) return null;
    return (
        <DropdownMenu open={open} onOpenChange={changeOpen}>
            <DropdownMenuTrigger asChild>
                <button type="button" disabled={saving} className="shrink-0 cursor-pointer rounded-sm p-1.5 transition-colors hover:bg-gray-200 disabled:cursor-wait" aria-label={t('messageConfig.title')} title={t('messageConfig.title')} onClick={event => event.stopPropagation()}>
                    {saving ? <Loader2 size={16} className="animate-spin text-gray-600"/> : <MoreHorizontal size={16} className="text-gray-600 hover:text-gray-800"/>}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" sideOffset={6} collisionPadding={12} className="w-64" data-message-settings="true" onClick={event => event.stopPropagation()} onPointerDown={event => event.stopPropagation()}>
                <DropdownMenuLabel>{t('messageConfig.title')}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {loading && <div role="status" className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin"/>{t('loading')}</div>}
                {error && <>
                    <p role="alert" className="break-words px-2 py-2 text-xs text-destructive">{t('messageConfig.catalogError')} {error}</p>
                    <DropdownMenuItem onSelect={event => { event.preventDefault(); retry(); }}>{t('retry')}</DropdownMenuItem>
                </>}
                {!loading && !error && items?.map((definition) => {
                    const enabled = typeof msg?.messageConfig?.[definition.key] === 'boolean' ? msg.messageConfig[definition.key] : definition.default !== false;
                    return (
                        <DropdownMenuItem key={definition.key} disabled={saving} onSelect={event => { event.preventDefault(); void save(definition); }}>
                            {enabled ? <ShieldCheck className="h-4 w-4"/> : <ShieldOff className="h-4 w-4"/>}
                            <span>{enabled ? definition.disableLabel || definition.label : definition.enableLabel || definition.label}</span>
                        </DropdownMenuItem>
                    );
                })}
                {!loading && !error && items?.length === 0 && <p className="px-2 py-2 text-xs text-muted-foreground">{t('messageConfig.empty')}</p>}
                {saveError && <p role="alert" className="break-words px-2 py-2 text-xs text-destructive">{saveError}</p>}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
