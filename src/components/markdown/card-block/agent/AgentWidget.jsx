import {
    memo,
    useMemo,
} from 'react';
import { Bot } from 'lucide-react';

import { defaultRenderMarkdown } from '../constants.jsx';
import { getExpandedKey } from '../expandedStore.js';
import useExpandedState from '../useExpandedState.js';
import {
    getLastLineForPreview,
    getParagraphsForPreview,
    stripCardReplaceTokensForPreview,
    toSafeString,
} from '../utils.js';
import AgentBody from './AgentBody.jsx';
import AgentHeader from './AgentHeader.jsx';

const AgentWidget = memo(({
    content = '',
    Icon = Bot,
    id,
    isProcessing = false,
    title = 'Sub-Agent',
    defaultExpanded = false,
    contextId = '',
    type = 'agent',
    renderMarkdown = defaultRenderMarkdown,
}) => {
    const expandedKey = useMemo(() => {
        return getExpandedKey(contextId, id, type);
    }, [contextId, id, type]);

    useExpandedState(expandedKey, defaultExpanded);

    const {
        cleanContent,
        isDone,
        isFailed,
        lastLine,
        paragraphs,
        hasContent,
    } = useMemo(() => {
        const safeContent = toSafeString(content);
        const trimmedRaw = safeContent.trim();

        const isDone = trimmedRaw.endsWith('[AGENT-DONE]');
        const isFailed = trimmedRaw.endsWith('[AGENT-FAILED]');

        let clean = safeContent;

        if (isDone) {
            clean = safeContent.replace(/\n?\[AGENT-DONE\]\s*$/, '').trim();
        } else if (isFailed) {
            clean = safeContent.replace(/\n?\[AGENT-FAILED\]\s*$/, '').trim();
        } else {
            clean = clean.trim();
        }

        const previewContent = stripCardReplaceTokensForPreview(clean);
        const paragraphs = getParagraphsForPreview(previewContent);
        const lastLine = getLastLineForPreview(previewContent);
        const hasContent = clean.length > 0;

        return {
            cleanContent: clean,
            isDone,
            isFailed,
            lastLine,
            paragraphs,
            hasContent,
        };
    }, [content]);

    const isFinished = isDone || isFailed;

    const statusConfig = useMemo(() => {
        if (isFailed) {
            return {
                bg: 'bg-red-50/50',
                border: 'border-red-100',
                iconBg: 'bg-red-100 text-red-600',
                dot: 'bg-red-500',
                label: 'Failed',
            };
        }

        if (isDone) {
            return {
                bg: 'bg-zinc-50/30',
                border: 'border-zinc-200/60',
                iconBg: 'bg-emerald-100 text-emerald-600',
                dot: 'bg-emerald-500',
                label: 'Completed',
            };
        }

        return {
            bg: 'bg-white',
            border: 'border-zinc-200',
            iconBg: 'bg-blue-50 text-blue-600',
            dot: 'bg-blue-500',
            label: 'Running',
        };
    }, [isDone, isFailed]);

    return (
        <div
            className={`
                w-full my-2 border rounded-lg overflow-hidden transition-colors duration-200
                ${statusConfig.bg} ${statusConfig.border}
            `}
        >
            <AgentHeader
                Icon={Icon}
                expandedKey={expandedKey}
                hasSteps={paragraphs.length > 0}
                isDone={isDone}
                isFailed={isFailed}
                isFinished={isFinished}
                isProcessing={isProcessing}
                lastLine={lastLine}
                statusConfig={statusConfig}
                title={title}
                hasContent={hasContent}
            />

            <AgentBody
                cleanContent={cleanContent}
                expandedKey={expandedKey}
                hasContent={hasContent}
                renderMarkdown={renderMarkdown}
            />
        </div>
    );
}, (prev, next) => {
    return (
        prev.contextId === next.contextId &&
        prev.content === next.content &&
        prev.id === next.id &&
        prev.isProcessing === next.isProcessing &&
        prev.title === next.title &&
        prev.defaultExpanded === next.defaultExpanded &&
        prev.type === next.type &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

AgentWidget.displayName = 'AgentWidget';

export default AgentWidget;
