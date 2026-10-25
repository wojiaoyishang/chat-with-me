import {LockKeyhole, Loader2, RefreshCw} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Button} from '@/components/ui/button';

export default function ConversationFreezeNotice({freeze}) {
    const {t} = useTranslation();
    if (!freeze.blocked) return null;
    return (
        <div role="status" data-conversation-frozen={freeze.frozen ? 'true' : 'checking'} className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            {freeze.loading ? <Loader2 className="size-4 shrink-0 animate-spin"/> : <LockKeyhole className="size-4 shrink-0"/>}
            <span className="min-w-0 flex-1">{t(freeze.frozen ? 'conversationFreeze.frozen' : freeze.error ? 'conversationFreeze.unavailable' : 'conversationFreeze.checking')}</span>
            {freeze.error && <Button type="button" variant="ghost" size="sm" onClick={freeze.refresh}><RefreshCw className="size-3.5"/>{t('retry')}</Button>}
        </div>
    );
}
