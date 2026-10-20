import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const TaskContext = createContext(null);

export function DocumentTaskListItem({ children, className, node }) {
    const offset = Number(node?.properties?.['data-document-task-offset']);
    const mapped = Number.isSafeInteger(offset) && offset >= 0 &&
        typeof node?.properties?.['data-document-task-checked'] === 'string';
    const task = mapped
        ? { offset, expectedChecked: node.properties['data-document-task-checked'] === 'true' }
        : null;
    return (
        <TaskContext.Provider value={task}>
            <li className={`my-1 cwm-document-todo-item ${className || ''}`}>{children}</li>
        </TaskContext.Provider>
    );
}

export function DocumentTaskInput({ node: _node, checked, onToggle, sourceContent, ...props }) {
    void _node;
    const { t } = useTranslation();
    const task = useContext(TaskContext);
    const editable = Boolean(task && onToggle && task.expectedChecked === Boolean(checked));
    return (
        <input
            {...props}
            type="checkbox"
            checked={Boolean(checked)}
            disabled={!editable}
            className={editable ? 'cursor-pointer accent-primary' : props.className}
            aria-label={checked ? t('documents_todo_uncheck') : t('documents_todo_check')}
            onChange={editable ? () => onToggle({ ...task, sourceContent }) : undefined}
        />
    );
}
