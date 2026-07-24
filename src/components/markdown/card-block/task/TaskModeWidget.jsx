import {memo, useEffect, useMemo, useState} from 'react';
import {ListChecks} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {defaultRenderMarkdown} from '../constants.jsx';
import {getExpandedKey} from '../expandedStore.js';
import useExpandedState from '../useExpandedState.js';
import StatusBody from '../status/StatusBody.jsx';
import StatusHeader from '../status/StatusHeader.jsx';
import {getLastLineForPreview, stripCardReplaceTokensForPreview, toSafeString} from '../utils.js';

const TASK_STATUS_REGEX = /\[TASK_STATUS:([^\]\r\n]+)\]/gi;
const TASK_TITLE_REGEX = /\[TITLE:([^\]\r\n]*)\]/gi;
const TASK_RUN_ID_REGEX = /\[TASK_RUN_ID:([^\]\r\n]+)\]/gi;
const TASK_RECOVERABLE_REGEX = /\[TASK_RECOVERABLE:true\]/gi;
const TASK_ERROR_REGEX = /\[TASK_ERROR:([^\]\r\n]*)\]/gi;
const TASK_STARTED_AT_REGEX = /\[TASK_STARTED_AT:(\d+)\]/gi;
const TASK_ENDED_AT_REGEX = /\[TASK_ENDED_AT:(\d+)\]/gi;
const TASK_SEGMENT_DONE_REGEX = /\[TASK_SEGMENT_DONE:true\]/gi;
const DONE_REGEX = /\[DONE\]/gi;

const getLastMarkerValue = (content, regex, fallback = '') => {
    const matches = [...content.matchAll(regex)];
    return matches.at(-1)?.[1]?.trim() || fallback;
};

const formatElapsed = (elapsedMs) => {
    const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const padded = value => String(value).padStart(2, '0');

    return hours > 0
        ? `${hours}:${padded(minutes)}:${padded(seconds)}`
        : `${padded(minutes)}:${padded(seconds)}`;
};

const TaskModeWidget = memo(({
    content = '',
    contextId = '',
    id,
    markId = null,
    renderMarkdown = defaultRenderMarkdown,
    type = 'taskMode',
}) => {
    const {t} = useTranslation();
    const [now, setNow] = useState(() => Date.now());
    const expandedKey = useMemo(() => getExpandedKey(contextId, id, type), [contextId, id, type]);
    useExpandedState(expandedKey, false);

    const parsed = useMemo(() => {
        const safeContent = toSafeString(content);
        const status = getLastMarkerValue(safeContent, TASK_STATUS_REGEX, 'running').toLowerCase();
        const title = getLastMarkerValue(safeContent, TASK_TITLE_REGEX, t('task_mode_entering', '正在进入任务模式...'));
        const taskRunId = getLastMarkerValue(safeContent, TASK_RUN_ID_REGEX);
        const error = getLastMarkerValue(safeContent, TASK_ERROR_REGEX);
        const startedAt = Number(getLastMarkerValue(safeContent, TASK_STARTED_AT_REGEX, '0')) || 0;
        const endedAt = Number(getLastMarkerValue(safeContent, TASK_ENDED_AT_REGEX, '0')) || 0;
        const recoverable = TASK_RECOVERABLE_REGEX.test(safeContent);
        TASK_RECOVERABLE_REGEX.lastIndex = 0;
        const segmentDone = TASK_SEGMENT_DONE_REGEX.test(safeContent);
        TASK_SEGMENT_DONE_REGEX.lastIndex = 0;
        const hasDoneMarker = DONE_REGEX.test(safeContent);
        DONE_REGEX.lastIndex = 0;

        const cleanContent = safeContent
            .replace(TASK_STATUS_REGEX, '')
            .replace(TASK_TITLE_REGEX, '')
            .replace(TASK_RUN_ID_REGEX, '')
            .replace(TASK_RECOVERABLE_REGEX, '')
            .replace(TASK_ERROR_REGEX, '')
            .replace(TASK_STARTED_AT_REGEX, '')
            .replace(TASK_ENDED_AT_REGEX, '')
            .replace(TASK_SEGMENT_DONE_REGEX, '')
            .replace(DONE_REGEX, '')
            .trim();

        const isFinished = segmentDone || hasDoneMarker || status === 'completed' || status === 'cancelled';
        const isFailed = status === 'recoverable_failed' || status === 'failed';
        const actions = [];

        if (recoverable && taskRunId) {
            actions.push({
                name: t('task_mode_resume', '继续任务'),
                command: 'resumeTask',
                taskRunId,
            });
        }
        if (!isFinished && taskRunId) {
            actions.push({
                name: t('task_mode_cancel', '终止任务'),
                command: 'cancelTask',
                taskRunId,
            });
        }

        const preview = getLastLineForPreview(stripCardReplaceTokensForPreview(cleanContent));

        return {
            actions,
            cleanContent,
            error,
            endedAt,
            isFailed,
            isFinished,
            segmentDone,
            startedAt,
            status,
            title: segmentDone
                ? `${title}${t('task_mode_previous_history_suffix', '（之前的任务历史）')}`
                : title,
            truncatedLastLine: error || preview,
        };
    }, [content, t]);

    useEffect(() => {
        if (!parsed.startedAt || parsed.endedAt || parsed.isFinished) {
            return undefined;
        }
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
    }, [parsed.endedAt, parsed.isFinished, parsed.startedAt]);

    const elapsedText = parsed.startedAt
        ? `${t('task_mode_elapsed', '任务耗时')} ${formatElapsed((parsed.endedAt || now) - parsed.startedAt)}`
        : '';

    const currentColor = parsed.isFailed
        ? 'text-red-600'
        : parsed.isFinished
            ? 'text-emerald-600'
            : parsed.status === 'recovering' || parsed.status === 'retrying'
                ? 'text-sky-600'
                : 'text-blue-600';

    return (
        <div className="my-3 w-full px-1 py-1.5 sm:px-1.5">
            <StatusHeader
                activeColor="text-blue-600"
                actions={parsed.actions}
                canToggleExpansion
                contextId={contextId}
                currentColor={currentColor}
                displayTitle={parsed.title}
                expandedKey={expandedKey}
                Icon={ListChecks}
                isDone={parsed.isFinished && !parsed.isFailed}
                isFailed={parsed.isFailed}
                isFinished={parsed.isFinished}
                isProcessing={false}
                isToolCalling={false}
                markId={markId}
                metaText={elapsedText}
                truncatedLastLine={parsed.truncatedLastLine}
            />
            <StatusBody
                cleanContent={parsed.cleanContent}
                expandedKey={expandedKey}
                isFailed={parsed.isFailed}
                isFinished={parsed.isFinished}
                renderMarkdown={renderMarkdown}
            />
        </div>
    );
}, (prev, next) => (
    prev.content === next.content
    && prev.contextId === next.contextId
    && prev.id === next.id
    && prev.markId === next.markId
    && prev.renderMarkdown === next.renderMarkdown
    && prev.type === next.type
));

TaskModeWidget.displayName = 'TaskModeWidget';

export default TaskModeWidget;
