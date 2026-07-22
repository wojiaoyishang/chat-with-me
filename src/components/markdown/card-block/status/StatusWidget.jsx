import {
    memo,
    useEffect,
    useMemo,
} from 'react';
import {useTranslation} from 'react-i18next';

import { defaultRenderMarkdown } from '../constants.jsx';
import {
    getExpandedKey,
    hasExpandedUserOverride,
    setExpandedValue,
} from '../expandedStore.js';
import useExpandedState from '../useExpandedState.js';
import {
    getLastLineForPreview,
    getLatestProgressMarker,
    stripCardReplaceTokensForPreview,
    stripProgressMarkers,
    toSafeString,
} from '../utils.js';
import StatusBody from './StatusBody.jsx';
import StatusHeader from './StatusHeader.jsx';

const STATUS_MARKER_REGEX = /\[(DONE|FAILED)(?::[^\]\r\n]+)?\]/gi;
const TOOL_STATUS_MARKER_REGEX = /\[TOOL_STATUS:([a-z_]+)\]/gi;
const BADGE_MARKER_REGEX = /^[ \t]*\[BADGE\s+NAME:([^\]\r\n]*?)\s+COLOR:(#[0-9a-fA-F]{3,8})\][ \t]*$/gm;
const ACTION_MARKER_REGEX = /^[ \t]*\[ACTION\s+([^\]\r\n]*?)\][ \t]*$/gm;
const ACTION_FIELD_REGEX = /([A-Z_]+):([\s\S]*?)(?=\s+[A-Z_]+:|$)/g;

const getBadgeTextColor = (backgroundColor) => {
    const hex = backgroundColor.replace('#', '');

    let r;
    let g;
    let b;

    if (hex.length === 3 || hex.length === 4) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    }

    // YIQ contrast formula: use dark text on light backgrounds, white text on dark backgrounds.
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? '#111827' : '#ffffff';
};

const parseActionFields = (rawFields) => {
    const fields = {};

    for (const match of String(rawFields || '').matchAll(ACTION_FIELD_REGEX)) {
        const key = toSafeString(match[1]).trim();
        const value = toSafeString(match[2]).trim();

        if (key) {
            fields[key] = value;
        }
    }

    return fields;
};

const StatusWidget = memo(({
                               activeColor,
                               content = '',
                               doneColor,
                               Icon,
                               id,
                               markId = null,
                               isProcessing = false,
                               title,
                               defaultExpanded = false,
                               contextId = '',
                               type = '',
                               renderMarkdown = defaultRenderMarkdown,
                           }) => {
    const {t} = useTranslation();
    const expandedKey = useMemo(() => {
        return getExpandedKey(contextId, id, type);
    }, [contextId, id, type]);

    const {
        badges,
        actions,
        cleanContent,
        isDone,
        isFailed,
        lastLine,
        progress,
        toolStatus,
    } = useMemo(() => {
        const safeContent = toSafeString(content);

        const badges = [...safeContent.matchAll(BADGE_MARKER_REGEX)]
            .map((match) => {
                const name = toSafeString(match[1]).trim();
                const color = toSafeString(match[2]).trim();

                if (!name || !color) return null;

                return {
                    name,
                    color,
                };
            })
            .filter(Boolean);

        const actions = [...safeContent.matchAll(ACTION_MARKER_REGEX)]
            .map((match) => {
                const fields = parseActionFields(match[1]);
                const name = fields.NAME || '';
                const command = fields.COMMAND || '';
                const toolId = fields.TOOL_ID || '';

                if (!name || !command) return null;

                return {
                    name,
                    command,
                    toolId,
                };
            })
            .filter(Boolean);

        // replacement 增量可能在任意边界合并，结束标记不一定仍独占一行。
        // 工具卡片内容由后端协议生成，因此直接读取最后一个显式结束标记，
        // 可以避免相邻标记或历史快照中的粘连导致状态一直停留在 running。
        const markers = [...safeContent.matchAll(STATUS_MARKER_REGEX)];
        const lastMarker = markers.at(-1)?.[1]?.toUpperCase() ?? null;

        const isDone = lastMarker === 'DONE';
        const isFailed = lastMarker === 'FAILED';
        const toolStatusMarkers = [...safeContent.matchAll(TOOL_STATUS_MARKER_REGEX)];
        const toolStatus = toolStatusMarkers.at(-1)?.[1]?.toLowerCase() ?? null;

        let cleanContent = safeContent
            .replace(BADGE_MARKER_REGEX, '')
            .replace(ACTION_MARKER_REGEX, '')
            .replace(TOOL_STATUS_MARKER_REGEX, '')
            .replace(STATUS_MARKER_REGEX, '')
            .trimEnd();

        const progress = type === 'toolCalling'
            ? getLatestProgressMarker(cleanContent)
            : null;

        if (type === 'toolCalling') {
            cleanContent = stripProgressMarkers(cleanContent);
        }

        const previewContent = stripCardReplaceTokensForPreview(cleanContent);
        const lastLine = getLastLineForPreview(previewContent);

        return {
            badges,
            actions,
            cleanContent,
            isDone,
            isFailed,
            lastLine,
            progress,
            toolStatus,
        };
    }, [content, type]);

    const truncatedLastLine = useMemo(() => {
        if (!lastLine) return '';

        const maxLen = 80;

        if (lastLine.length <= maxLen) {
            return lastLine;
        }

        return `...${lastLine.slice(-maxLen)}`;
    }, [lastLine]);

    const isToolCalling = type === 'toolCalling';
    const isWaitingApproval = toolStatus === 'waiting_approval' && !isDone && !isFailed;
    const isWaitingSubagent = toolStatus === 'waiting_subagent' && !isDone && !isFailed;
    const isResumingSubagent = toolStatus === 'resuming_subagent' && !isDone && !isFailed;
    const isWaitingToolState = isWaitingApproval || isWaitingSubagent;
    const isProgressComplete = isToolCalling && progress?.isComplete === true;
    const isFinished = isDone || isFailed || isProgressComplete;

    // 显式结束标记是主信号；批处理进度达到 total 也应立即收敛为完成，
    // 避免结束增量延迟到达时卡片仍表现为正在调用。用户手动展开/收起仍有最高优先级。
    const isToolCallingSettled = isFinished;
    const shouldAutoExpandToolCalling = isToolCalling && !isToolCallingSettled;

    useExpandedState(expandedKey, isToolCalling ? shouldAutoExpandToolCalling : defaultExpanded);

    useEffect(() => {
        if (!isToolCalling || hasExpandedUserOverride(expandedKey)) {
            return;
        }

        setExpandedValue(expandedKey, !isToolCallingSettled);
    }, [expandedKey, isToolCalling, isToolCallingSettled]);

    let displayTitle = title;
    if (isWaitingApproval) {
        displayTitle = t('tool_approval_waiting_status', 'Waiting for approval');
    } else if (isWaitingSubagent) {
        displayTitle = t('tool_subagent_waiting_status', 'Waiting for sub-agent');
    } else if (isResumingSubagent) {
        displayTitle = t('tool_subagent_resuming_status', 'Sub-agent finished, resuming');
    } else if (isToolCalling) {
        if (isFailed) {
            displayTitle = `${title} Failed`;
        } else if (isDone) {
            displayTitle = `${title} Finished`;
        } else if (isProgressComplete) {
            displayTitle = `${title} Done`;
        }
    } else {
        if (isDone) displayTitle = `${title} Finished`;
        if (isFailed) displayTitle = `${title} Failed`;
    }

    const displayTitleWithBadges = badges.length > 0 ? (
        <span className="inline-flex min-w-0 items-center gap-1.5 align-middle">
            <span className="min-w-0 truncate">{displayTitle}</span>
            <span className="inline-flex shrink-0 flex-wrap items-center gap-1">
                {badges.map((badge, index) => (
                    <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${badge.name}-${badge.color}-${index}`}
                        className="inline-flex min-h-[20px] items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none"
                        style={{
                            backgroundColor: badge.color,
                            color: getBadgeTextColor(badge.color),
                        }}
                        title={badge.name}
                    >
                        {badge.name}
                    </span>
                ))}
            </span>
        </span>
    ) : displayTitle;

    let currentColor = activeColor;
    if (isWaitingToolState) currentColor = 'text-gray-400';
    if (isResumingSubagent) currentColor = 'text-sky-600';
    if (isDone || isProgressComplete) currentColor = doneColor;
    if (isFailed) currentColor = 'text-red-600';

    return (
        <div className="w-full py-1.5">
            <StatusHeader
                activeColor={activeColor}
                currentColor={currentColor}
                displayTitle={displayTitleWithBadges}
                Icon={Icon}
                expandedKey={expandedKey}
                actions={actions}
                canToggleExpansion
                contextId={contextId}
                isDone={isDone}
                isFailed={isFailed}
                isFinished={isFinished}
                isProcessing={isProcessing}
                isToolCalling={isToolCalling}
                isWaitingApproval={isWaitingToolState}
                isResumingTool={isResumingSubagent}
                markId={markId}
                progress={progress}
                truncatedLastLine={truncatedLastLine}
                waitingApprovalLabel={
                    isWaitingSubagent
                        ? t('tool_subagent_waiting_status', 'Waiting for sub-agent')
                        : t('tool_approval_waiting_status', 'Waiting for approval')
                }
                resumingLabel={t('tool_subagent_resuming_status', 'Sub-agent finished, resuming')}
            />

            <StatusBody
                cleanContent={cleanContent}
                expandedKey={expandedKey}
                isFailed={isFailed}
                isFinished={isFinished}
                isToolCalling={isToolCalling}
                renderMarkdown={renderMarkdown}
            />
        </div>
    );
}, (prev, next) => {
    return (
        prev.contextId === next.contextId &&
        prev.activeColor === next.activeColor &&
        prev.content === next.content &&
        prev.doneColor === next.doneColor &&
        prev.Icon === next.Icon &&
        prev.id === next.id &&
        prev.markId === next.markId &&
        prev.isProcessing === next.isProcessing &&
        prev.title === next.title &&
        prev.defaultExpanded === next.defaultExpanded &&
        prev.type === next.type &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

StatusWidget.displayName = 'StatusWidget';

export default StatusWidget;
