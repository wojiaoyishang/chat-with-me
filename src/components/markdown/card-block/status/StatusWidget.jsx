import {
    memo,
    useEffect,
    useMemo,
} from 'react';

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

const STATUS_MARKER_REGEX = /^[ \t]*(\[DONE\]|\[FAILED\])[ \t]*$/gm;
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

        // [DONE] / [FAILED] 允许出现在中间任意一行。
        // 状态以最后一次出现的显式结束标记为准。
        // 只匹配“整行就是标记”的情况，避免误判正文里的普通文本。
        const markers = [...safeContent.matchAll(STATUS_MARKER_REGEX)];
        const lastMarker = markers.at(-1)?.[1] ?? null;

        const isDone = lastMarker === '[DONE]';
        const isFailed = lastMarker === '[FAILED]';

        let cleanContent = safeContent
            .replace(BADGE_MARKER_REGEX, '')
            .replace(ACTION_MARKER_REGEX, '')
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
    const isProgressComplete = isToolCalling && progress?.isComplete === true;
    const isFinished = isDone || isFailed || isProgressComplete;

    // 自动展开/收起只以显式结束标记为准：没有 [DONE]/[FAILED] 就认为工具仍在调用中。
    // 如果用户手动点过展开按钮，则后续自动逻辑不再覆盖用户选择。
    const isToolCallingSettled = isDone || isFailed;
    const shouldAutoExpandToolCalling = isToolCalling && !isToolCallingSettled;

    useExpandedState(expandedKey, isToolCalling ? shouldAutoExpandToolCalling : defaultExpanded);

    useEffect(() => {
        if (!isToolCalling || hasExpandedUserOverride(expandedKey)) {
            return;
        }

        setExpandedValue(expandedKey, !isToolCallingSettled);
    }, [expandedKey, isToolCalling, isToolCallingSettled]);

    let displayTitle = title;
    if (isToolCalling) {
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
                markId={markId}
                progress={progress}
                truncatedLastLine={truncatedLastLine}
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
