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
    getParagraphsForPreview,
    stripCardReplaceTokensForPreview,
    stripProgressMarkers,
    toSafeString,
} from '../utils.js';
import StatusBody from './StatusBody.jsx';
import StatusHeader from './StatusHeader.jsx';

const StatusWidget = memo(({
    activeColor,
    content = '',
    doneColor,
    Icon,
    id,
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
        cleanContent,
        isDone,
        isFailed,
        lastLine,
        paragraphs,
        progress,
    } = useMemo(() => {
        const safeContent = toSafeString(content);
        const trimmedContent = safeContent.trim();

        const isDone = trimmedContent.endsWith('[DONE]');
        const isFailed = trimmedContent.endsWith('[FAILED]');

        let cleanContent = safeContent;

        if (isDone) {
            cleanContent = safeContent.replace(/\n\[DONE\]\s*$/, '').trimEnd();
        } else if (isFailed) {
            cleanContent = safeContent.replace(/\n\[FAILED\]\s*$/, '').trimEnd();
        }

        const progress = type === 'toolCalling'
            ? getLatestProgressMarker(cleanContent)
            : null;

        if (type === 'toolCalling') {
            cleanContent = stripProgressMarkers(cleanContent);
        }

        const previewContent = stripCardReplaceTokensForPreview(cleanContent);
        const lastLine = getLastLineForPreview(previewContent);
        const paragraphs = getParagraphsForPreview(previewContent);

        return {
            cleanContent,
            isDone,
            isFailed,
            lastLine,
            paragraphs,
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

    let currentColor = activeColor;
    if (isDone || isProgressComplete) currentColor = doneColor;
    if (isFailed) currentColor = 'text-red-600';

    return (
        <div className="w-full py-1.5">
            <StatusHeader
                activeColor={activeColor}
                currentColor={currentColor}
                displayTitle={displayTitle}
                Icon={Icon}
                expandedKey={expandedKey}
                hasSteps={paragraphs.length > 0}
                isDone={isDone}
                isFailed={isFailed}
                isFinished={isFinished}
                isProcessing={isProcessing}
                isToolCalling={isToolCalling}
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
        prev.isProcessing === next.isProcessing &&
        prev.title === next.title &&
        prev.defaultExpanded === next.defaultExpanded &&
        prev.type === next.type &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

StatusWidget.displayName = 'StatusWidget';

export default StatusWidget;
