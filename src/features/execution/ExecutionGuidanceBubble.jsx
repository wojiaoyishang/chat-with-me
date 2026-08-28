import {memo} from 'react';
import {Check, CircleAlert, LoaderCircle, MessageSquarePlus} from 'lucide-react';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';
import {useUserStore} from '@/context/userContext.jsx';
import {resolveResourceUrl} from '@/lib/virtualUrl.js';

const stateMeta = (state) => {
    const normalized = String(state || 'pending').toLowerCase();
    if (normalized === 'submitting') {
        return {label: '正在加入执行', Icon: LoaderCircle, spin: true, tone: 'text-blue-500'};
    }
    if (normalized === 'failed') {
        return {label: '补充未送达', Icon: CircleAlert, spin: false, tone: 'text-red-500'};
    }
    if (normalized === 'consumed' || normalized === 'responded') {
        return {label: '执行补充 · 已接收', Icon: Check, spin: false, tone: 'text-emerald-500'};
    }
    return {label: '执行补充', Icon: MessageSquarePlus, spin: false, tone: 'text-blue-500'};
};

const ExecutionGuidanceBubble = memo(({activity}) => {
    const user = useUserStore((state) => state.user);
    const content = String(activity?.content || activity?.label || '').trim();
    if (!content) return null;

    const state = String(activity?.state || 'pending').toLowerCase();
    const meta = stateMeta(state);
    const failed = state === 'failed';
    const Icon = meta.Icon;
    const displayName = String(user?.nickname || user?.username || user?.name || 'U').trim() || 'U';
    const avatar = user?.avatar ? resolveResourceUrl(user.avatar) : '';

    return (
        <div
            className="my-3 flex w-full items-end justify-end gap-3"
            data-execution-guidance-bubble="true"
            data-guidance-id={activity?.id || undefined}
        >
            <div
                className={`max-w-[80%] rounded-2xl rounded-br-md border px-4 py-2.5 shadow-sm transition-colors ${
                    failed
                        ? 'border-red-200 bg-red-50/80'
                        : 'border-blue-200/80 bg-blue-50/55'
                }`}
            >
                <div className={`mb-1 flex items-center justify-end gap-1 text-[11px] font-medium ${meta.tone}`}>
                    <Icon className={`h-3.5 w-3.5 ${meta.spin ? 'animate-spin' : ''}`} aria-hidden="true"/>
                    <span>{meta.label}</span>
                </div>
                <div className="whitespace-pre-wrap break-words text-right text-sm leading-6 text-gray-800">
                    {content}
                </div>
            </div>
            <Avatar className="h-10 w-10 shrink-0 border border-blue-100 shadow-sm">
                {avatar ? <AvatarImage src={avatar} alt={displayName}/> : null}
                <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
        </div>
    );
});

ExecutionGuidanceBubble.displayName = 'ExecutionGuidanceBubble';
export default ExecutionGuidanceBubble;
