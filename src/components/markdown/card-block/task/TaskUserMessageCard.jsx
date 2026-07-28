import {memo, useMemo} from 'react';
import {LoaderCircle, MessageSquarePlus} from 'lucide-react';
import {useTranslation} from 'react-i18next';

const TaskUserMessageCard = memo(({
    content = '',
    showDivider: showDividerProp,
    pending = false,
}) => {
    const {t} = useTranslation();
    const data = useMemo(() => {
        try {
            const parsed = JSON.parse(String(content || '{}'));
            return {
                content: String(parsed?.content || ''),
                showDivider: parsed?.showDivider !== false,
            };
        } catch {
            return {
                content: String(content || ''),
                showDivider: true,
            };
        }
    }, [content]);

    if (!data.content.trim()) {
        return null;
    }

    const showDivider = showDividerProp ?? data.showDivider;

    return (
        <div className="my-5 w-full" data-task-user-message="true">
            {showDivider && (
                <div className="mb-3 flex items-center gap-3" aria-hidden="true">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-blue-200"/>
                    <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
                        <MessageSquarePlus className="h-3.5 w-3.5"/>
                        <span>{t('task_mode_new_requirement', '新的任务要求')}</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-200 to-blue-200"/>
                </div>
            )}

            <div className="flex w-full justify-end">
                <div className={`max-w-[85%] rounded-2xl rounded-br-md border border-blue-200 bg-blue-50/90 px-3.5 py-2.5 shadow-sm transition-opacity ${pending ? 'opacity-75' : 'opacity-100'}`}>
                    <div className="mb-1 flex items-center justify-end gap-1.5 text-right text-xs font-medium text-blue-600">
                        {pending && <LoaderCircle className="h-3 w-3 animate-spin" aria-hidden="true"/>}
                        <span>{t('task_mode_user_addition', '用户补充')}</span>
                    </div>
                    <div className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-800">
                        {data.content}
                    </div>
                </div>
            </div>
        </div>
    );
}, (prev, next) => (
    prev.content === next.content
    && prev.showDivider === next.showDivider
    && prev.pending === next.pending
));

TaskUserMessageCard.displayName = 'TaskUserMessageCard';

export default TaskUserMessageCard;
