import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function WebSocketReconnectPrompt({ open, onRetry, connecting = false, automatic = true }) {
    const { t } = useTranslation();
    const [retrying, setRetrying] = useState(false);
    const retry = async () => {
        if (retrying || connecting) return;
        setRetrying(true);
        try {
            await onRetry();
        } catch (error) {
            toast.error(t('websocket.connect_failed', { message: error.message || t('unknown_error') }));
        } finally {
            setRetrying(false);
        }
    };
    return <Dialog open={open} modal={false}>
        <DialogContent showCloseButton={false}
            className="z-[12010] top-auto bottom-4 left-auto right-4 w-[calc(100%-2rem)] max-w-sm translate-x-0 translate-y-0 gap-3 sm:max-w-sm pointer-events-auto"
            onOpenAutoFocus={(event) => event.preventDefault()}
            onCloseAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => event.preventDefault()}
            onEscapeKeyDown={(event) => event.preventDefault()}>
            <DialogTitle>{t('websocket.popover_title')}</DialogTitle>
            <DialogDescription aria-live="polite">{t(automatic ? 'websocket.auto_reconnect_tip' : 'websocket.popover_content')}</DialogDescription>
            <Button onClick={retry} disabled={retrying || connecting}>
                {(retrying || connecting) && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                {t(retrying || connecting ? 'websocket.connecting' : 'retry')}
            </Button>
        </DialogContent>
    </Dialog>;
}
