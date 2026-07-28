import {memo, useMemo} from 'react';
import TaskUserMessageCard from './TaskUserMessageCard.jsx';

const groupPreviews = (previews) => {
    const groups = [];
    const groupMap = new Map();

    previews.forEach((preview) => {
        const taskRunId = String(preview?.taskRunId || '');
        const groupKey = taskRunId || '__unknown_task__';
        let group = groupMap.get(groupKey);

        if (!group) {
            group = {
                key: groupKey,
                showDivider: false,
                items: [],
            };
            groupMap.set(groupKey, group);
            groups.push(group);
        }

        group.showDivider = group.showDivider || preview?.showDivider === true;
        group.items.push(preview);
    });

    return groups;
};

const TaskInterruptPreviewGroup = memo(({previews = []}) => {
    const groups = useMemo(() => groupPreviews(previews), [previews]);

    if (groups.length === 0) return null;

    return (
        <div className="w-full" data-task-interrupt-preview="true">
            {groups.map((group) => (
                <div key={group.key} className="w-full">
                    {group.items.map((item, index) => (
                        <TaskUserMessageCard
                            key={item.requestId}
                            content={JSON.stringify({content: item.content})}
                            showDivider={group.showDivider && index === 0}
                            pending={item.pending !== false}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}, (prev, next) => prev.previews === next.previews);

TaskInterruptPreviewGroup.displayName = 'TaskInterruptPreviewGroup';

export default TaskInterruptPreviewGroup;
