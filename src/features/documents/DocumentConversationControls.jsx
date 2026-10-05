import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { MessagesSquare, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ConversationsList from '@/components/sidebar/ConversationsList.jsx';
import { onEvent } from '@/context/useEventStore.jsx';

export default function DocumentConversationControls({ conversationId, onSelect, onChatMode }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const listRef = useRef(null);
    useEffect(() => {
        const unsubscribe = onEvent({ event: 'sidebar.*' }).then(() => listRef.current?.reload());
        return unsubscribe;
    }, []);
    const select = (id) => {
        onSelect(id);
        setOpen(false);
    };
    return (
        <>
            <div className="ml-2 mr-3 flex shrink-0 items-center gap-2 md:ml-3 md:mr-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={t('documents_chat_mode')}
                    title={t('documents_chat_mode')}
                    onClick={onChatMode}
                >
                    <MessageSquare className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={t('documents_conversations')}
                    title={t('documents_conversations')}
                    onClick={() => setOpen(true)}
                >
                    <MessagesSquare className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label={t('documents_new_conversation')}
                    title={t('documents_new_conversation')}
                    onClick={() => select(null)}
                >
                    <Plus className="size-4" />
                </Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex h-[min(720px,85dvh)] max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-2xl">
                    <DialogHeader className="shrink-0 border-b px-6 py-5 text-left">
                        <DialogTitle className="text-lg">{t('documents_choose_a_conversation')}</DialogTitle>
                        <DialogDescription>
                            {t('documents_continue_an_existing_conversation_about_this_document_or_start_a_new_one')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex shrink-0 items-center justify-between gap-3 px-6 py-4">
                        <span className="text-sm text-muted-foreground">{t('documents_continue_a_conversation')}</span>
                        <Button variant="outline" size="sm" onClick={() => select(null)}>
                            <Plus className="size-4" />
                            {t('documents_start_a_new_conversation')}
                        </Button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5 sm:px-6">
                        <ConversationsList
                            ref={listRef}
                            selectedConversationId={conversationId}
                            onSelect={select}
                            onDelete={(id) => {
                                if (id === conversationId) onSelect(null);
                            }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
