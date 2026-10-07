import { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { useTranslation } from 'react-i18next';
import { Bell, CheckCheck, X, ExternalLink } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/apiClient.js';
import { onEvent } from '@/context/useEventStore.jsx';
import { useNotificationStore } from './useNotificationStore.js';
import { toast } from 'sonner';

const useCenter = create((set) => ({ open: false, setOpen: (open) => set({ open }) }));
export function NotificationCenterTrigger({ listItem = false } = {}) {
    const { t } = useTranslation();
    const setOpen = useCenter((state) => state.setOpen);
    const notifications = useNotificationStore((state) => state.notifications);
    const count = Object.keys(notifications).length;
    return (
        <Button
            variant="ghost"
            size={listItem ? 'default' : 'icon'}
            className={`relative shrink-0 ${listItem ? 'w-full justify-start gap-3' : ''}`}

            title={t('messageCenter.title')}
            aria-label={t('messageCenter.title')}
            onClick={() => setOpen(true)}
        >
            <Bell className="size-4 shrink-0" />
            {listItem && <span>{t('messageCenter.title')}</span>}
            {count > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Button>
    );
}
export default function NotificationCenter({ onOpenNotification }) {
    const { t } = useTranslation();
    const { open, setOpen } = useCenter();
    const pending = useNotificationStore((state) => state.notifications);
    const resolved = useNotificationStore((state) => state.resolvedRevisions);
    const resolve = useNotificationStore((state) => state.resolveNotification);
    const [tab, setTab] = useState('current');
    const [history, setHistory] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [nextOffset, setNextOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);
    const requestId = useRef(0);
    const loadRef = useRef(null);
    loadRef.current = async (offset = 0) => {
        const id = ++requestId.current;
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(`/notification/history?offset=${offset}&limit=50`);
            if (id !== requestId.current) return;
            setHistory((previous) => {
                const values = new Map((offset ? previous : []).map((item) => [item.id, item]));
                for (const item of response.notifications) values.set(item.id, item);
                return [...values.values()];
            });
            setHasMore(response.hasMore);
            setNextOffset(response.nextOffset);
        } catch (failure) {
            if (id === requestId.current) setError(failure.message);
        } finally {
            if (id === requestId.current) setLoading(false);
        }
    };
    useEffect(() => {
        if (!open) return;
        void loadRef.current();
        const version = requestId;
        const off = onEvent({ event: 'notification.*' }).then(() => void loadRef.current());
        return () => {
            ++version.current;
            off();
        };
    }, [open]);
    const close = async (notification = null) => {
        setBusy(true);
        try {
            if (notification) {
                const result = await apiClient.post(`/notification/${encodeURIComponent(notification.id)}/close`);
                resolve(result.id, result.revision);
            } else {
                const result = await apiClient.post('/notification/close-all');
                for (const item of result.closed) resolve(item.id, item.revision);
            }
            void loadRef.current();
        } catch (failure) {
            toast.error(failure.message);
        } finally {
            setBusy(false);
        }
    };
    const all = new Map(history.map((item) => [item.id, item]));
    for (const item of Object.values(pending)) all.set(item.id, item);
    const items = (tab === 'current' ? Object.values(pending) : [...all.values()])
        .map((item) => (resolved[item.id] >= item.revision ? { ...item, status: 'resolved' } : item))
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return (
        <Sheet open={open} onOpenChange={setOpen} modal={false}>
            <SheetContent
                className="flex w-full flex-col p-0 sm:max-w-lg"
                onInteractOutside={(event) => {
                    if (event.target instanceof Element && event.target.closest('[data-sonner-toaster]'))
                        event.preventDefault();
                }}
            >
                <SheetHeader className="border-b p-5">
                    <SheetTitle>{t('messageCenter.title')}</SheetTitle>
                    <SheetDescription>{t('messageCenter.description')}</SheetDescription>
                </SheetHeader>
                <div className="flex items-center gap-2 border-b px-4 py-2">
                    {['current', 'history'].map((value) => (
                        <Button
                            key={value}
                            variant={tab === value ? 'secondary' : 'ghost'}
                            size="sm"
                            aria-pressed={tab === value}
                            onClick={() => setTab(value)}
                        >
                            {t(`messageCenter.${value}`)}
                        </Button>
                    ))}
                    <Button
                        className="ml-auto"
                        variant="ghost"
                        size="sm"
                        disabled={busy || !Object.keys(pending).length}
                        onClick={() => void close()}
                    >
                        <CheckCheck className="mr-2 size-4" />
                        {t('messageCenter.closeAll')}
                    </Button>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {!items.length && (
                        <p className="py-12 text-center text-sm text-muted-foreground">
                            {t(loading && tab === 'history' ? 'messageCenter.loading' : 'messageCenter.empty')}
                        </p>
                    )}
                    {items.map((item) => (
                        <article key={item.id} className="space-y-2 rounded-xl border p-4">
                            <div className="flex items-start gap-2">
                                <h3 className="min-w-0 flex-1 break-words font-medium">{item.title}</h3>
                                {item.status === 'pending' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-7 shrink-0"
                                        disabled={busy}
                                        title={t('messageCenter.close')}
                                        aria-label={t('messageCenter.close')}
                                        onClick={() => void close(item)}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                )}
                            </div>
                            {item.body && (
                                <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                                    {item.body}
                                </p>
                            )}
                            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                                <time>{new Date(item.createdAt).toLocaleString()}</time>
                                <span>
                                    {t(item.status === 'pending' ? 'messageCenter.pending' : 'messageCenter.closed')}
                                </span>
                            </div>
                            {item.actions?.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setOpen(false);
                                        onOpenNotification(item);
                                    }}
                                >
                                    <ExternalLink className="mr-2 size-4" />
                                    {t('messageCenter.view')}
                                </Button>
                            )}
                        </article>
                    ))}
                    {tab === 'history' && hasMore && (
                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={loading}
                            onClick={() => void loadRef.current(nextOffset)}
                        >
                            {t(loading ? 'messageCenter.loading' : 'messageCenter.more')}
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
