import { memo } from 'react';
import {
    BookOpen,
    Code,
    Lightbulb,
    Loader2,
    Wrench,
} from 'lucide-react';

import AgentWidget from './agent/AgentWidget.jsx';
import ErrorBlock from './blocks/ErrorBlock.jsx';
import HtmlBlock from './blocks/HtmlBlock.jsx';
import MarkdownBlock from './blocks/MarkdownBlock.jsx';
import QueuingBlock from './blocks/QueuingBlock.jsx';
import TextBlock from './blocks/TextBlock.jsx';
import ToolCommandBlock from './blocks/ToolCommandBlock.jsx';
import ToolLogBlock from './blocks/ToolLogBlock.jsx';
import './cardBlockAnimations.css';
import { defaultRenderMarkdown } from './constants.jsx';
import StatusWidget from './status/StatusWidget.jsx';

const CARD_TYPES_WITH_NESTED_MARKDOWN = new Set([
    'markdown',
    'processing',
    'thinking',
    'toolCalling',
    'coding',
    'doc',
    'agent',
]);

const shouldCompareRenderContext = (type) => {
    return CARD_TYPES_WITH_NESTED_MARKDOWN.has(type);
};

const UnknownBlock = memo(({type, content}) => {
    return (
        <div className="bg-red-50/40 border border-red-200 p-3 my-2 rounded-md">
            <div className="text-red-700 text-xs mb-1.5 flex items-center gap-1.5">
                <span className="bg-red-200 text-red-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                    !
                </span>
                <strong>Unknown widget:</strong> {type}
            </div>

            <pre className="text-xs bg-red-50/60 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                {content}
            </pre>
        </div>
    );
}, (prev, next) => {
    return (
        prev.type === next.type &&
        prev.content === next.content
    );
});

UnknownBlock.displayName = 'UnknownBlock';

const CardBlock = memo(({
    content = '',
    id,
    type = 'markdown',
    contextId = '',
    replacement,
    renderMarkdown = defaultRenderMarkdown,
}) => {
    const commonProps = {
        content,
        id,
        type,
        contextId,
        replacement,
        renderMarkdown,
    };

    switch (type) {
        case 'markdown':
            return (
                <MarkdownBlock
                    {...commonProps}
                />
            );

        case 'text':
            return (
                <TextBlock
                    id={id}
                    content={content}
                />
            );

        case 'html':
            return (
                <HtmlBlock
                    id={id}
                    content={content}
                />
            );

        case 'toolCommand':
            return (
                <ToolCommandBlock
                    id={id}
                    content={content}
                />
            );

        case 'toolLog':
            return (
                <ToolLogBlock
                    id={id}
                    content={content}
                />
            );

        case 'processing':
            return (
                <StatusWidget
                    {...commonProps}
                    activeColor="text-blue-600"
                    doneColor="text-green-600"
                    Icon={Loader2}
                    isProcessing={true}
                    title="Processing"
                />
            );

        case 'thinking':
            return (
                <StatusWidget
                    {...commonProps}
                    activeColor="text-indigo-600"
                    doneColor="text-emerald-600"
                    Icon={Lightbulb}
                    title="Thinking"
                />
            );

        case 'toolCalling':
            return (
                <StatusWidget
                    {...commonProps}
                    activeColor="text-amber-600"
                    doneColor="text-emerald-600"
                    Icon={Wrench}
                    title="Tool Calling"
                />
            );

        case 'coding':
            return (
                <StatusWidget
                    {...commonProps}
                    activeColor="text-purple-600"
                    doneColor="text-green-600"
                    Icon={Code}
                    title="Coding"
                    defaultExpanded={true}
                />
            );

        case 'doc':
            return (
                <StatusWidget
                    {...commonProps}
                    activeColor="text-cyan-600"
                    doneColor="text-teal-600"
                    Icon={BookOpen}
                    title="Writing"
                    defaultExpanded={false}
                />
            );

        case 'agent':
            return (
                <AgentWidget
                    {...commonProps}
                />
            );

        case 'queuing':
            return <QueuingBlock/>;

        case 'error':
            return <ErrorBlock content={content}/>;

        default:
            return (
                <UnknownBlock
                    type={type}
                    content={content}
                />
            );
    }
}, (prev, next) => {
    if (
        prev.contextId !== next.contextId ||
        prev.content !== next.content ||
        prev.id !== next.id ||
        prev.type !== next.type
    ) {
        return false;
    }

    // Leaf card blocks such as toolLog/toolCommand do not consume replacement or renderMarkdown.
    // During streaming, unrelated replacement object changes should not disturb their DOM.
    if (!shouldCompareRenderContext(prev.type)) {
        return true;
    }

    return (
        prev.replacement === next.replacement &&
        prev.renderMarkdown === next.renderMarkdown
    );
});

CardBlock.displayName = 'CardBlock';

export default CardBlock;
