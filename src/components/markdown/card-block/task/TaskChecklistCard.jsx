import {memo, useMemo} from 'react';
import {
    Ban,
    CheckCircle2,
    Circle,
    ListTodo,
    LoaderCircle,
} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader} from '@/components/ui/card';

const STATUS_META = {
    pending: {Icon: Circle, className: 'text-gray-400'},
    in_progress: {Icon: LoaderCircle, className: 'text-blue-600 animate-spin'},
    completed: {Icon: CheckCircle2, className: 'text-emerald-600'},
    invalidated: {Icon: Ban, className: 'text-gray-400'},
};

const TaskChecklistCard = memo(({content = ''}) => {
    const {t} = useTranslation();
    const data = useMemo(() => {
        try {
            const parsed = JSON.parse(String(content || '{}'));
            return {
                items: Array.isArray(parsed?.items) ? parsed.items : [],
                status: String(parsed?.status || 'running'),
            };
        } catch {
            return {items: [], status: 'invalid'};
        }
    }, [content]);

    const completedCount = data.items.filter(item => item?.status === 'completed').length;

    if (data.items.length === 0 && data.status !== 'invalid') {
        return null;
    }

    return (
        <Card className="my-3 gap-0 overflow-hidden rounded-lg border-gray-200 bg-white/70 py-0">
            <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-gray-100 px-3.5 py-2.5">
                <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-800">
                    <ListTodo className="h-4 w-4 shrink-0 text-blue-600"/>
                    <span>{t('task_mode_checklist', '任务清单')}</span>
                </div>
                <Badge variant="outline" className="shrink-0 font-normal text-gray-500">
                    {completedCount}/{data.items.length}
                </Badge>
            </CardHeader>

            <CardContent className="px-0">
                {data.items.length > 0 ? (
                <div className="divide-y divide-gray-100">
                    {data.items.map((item, index) => {
                        const status = STATUS_META[item?.status] ? item.status : 'pending';
                        const {Icon, className} = STATUS_META[status];
                        const invalidated = status === 'invalidated';
                        const completed = status === 'completed';

                        return (
                            <div
                                key={item?.id || `${index}-${item?.text || ''}`}
                                className="flex items-start gap-2.5 px-3.5 py-2.5"
                            >
                                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${className}`}/>
                                <div className="min-w-0 flex-1">
                                    <div className={`text-sm leading-5 ${completed || invalidated ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                        {item?.text || t('task_mode_unnamed_item', '未命名任务')}
                                    </div>
                                    {item?.reason ? (
                                        <div className="mt-0.5 text-xs leading-4 text-gray-500">
                                            {item.reason}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="px-3.5 py-3 text-sm text-gray-500">
                    {data.status === 'invalid'
                        ? t('task_mode_checklist_invalid', '任务清单数据不可用。')
                        : t('task_mode_checklist_empty', '智能体尚未添加任务项。')}
                </div>
                )}
            </CardContent>
        </Card>
    );
}, (prev, next) => prev.content === next.content);

TaskChecklistCard.displayName = 'TaskChecklistCard';

export default TaskChecklistCard;
