import React, { memo, useEffect, useId, useMemo, useRef } from 'react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';

import { rehypeInlineCodeProperty, remarkCardReplace } from './remarkDirectiveToComponent.js';
import { remarkCollapseExecutionStatuses } from './remarkCollapseExecutionStatuses.js';
import remarkCwmLinks from './remarkCwmLinks.js';
import remarkVideoDirective from './remarkVideoDirective.js';
import remarkStudyDirectives from './remarkStudyDirectives.js';
import rehypeDocumentTasks from './rehypeDocumentTasks.js';
import { DocumentTaskInput, DocumentTaskListItem } from './DocumentTaskControls.jsx';
import { StudyCard, StudyOutline, StudySection, StudySession } from './StudyVisuals.jsx';
import { useDocumentCardSpec } from './documentCardSpec.js';

import CodeBlock from './CodeBlock.jsx';
import './MarkdownContent.css';
import CardBlock from './card-block/CardBlock.jsx';
import ExecutionStatusGroup from '@/features/execution/ExecutionStatusGroup.jsx';
import { parseAgentContent } from './card-block/agent/agentContent.js';
import ReplacementContextBadge from '@/features/chat/ui/message/components/ReplacementContextBadge.jsx';
import {
    getCardReplaceIdFromAttributes,
    normalizeCardReplaceBlockBoundaries,
    normalizeReplacementEntry,
    normalizeReplacementLineBreaks,
    parseCardReplaceAttributes,
    parseReplacementProtocol,
} from './replacementProtocol.js';

import 'katex/dist/katex.min.css';

import { resolveCwmUrl } from '@/lib/virtualUrl.js';
import { downloadDocumentResource, isDocumentDownloadUrl } from '@/lib/resourceDownload.js';
import ResourceImage from './ResourceImage.jsx';
import ResourceVideo from './ResourceVideo.jsx';
import { toast } from 'sonner';
import { isUniversalModalLink, openUniversalModalLink } from '@/components/modal/universalModal.js';

const CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE = /:{2,3}\s*(card|card-replace)\s*\{([^}]*)\}\s*:{2,3}/g;
const CARD_REPLACE_BLOCK_DIRECTIVE_RE = /:{3}\s*(card|card-replace)\s*\{([^}]*)\}\s*\n[\s\S]*?\n:{3}/g;
const CARD_REPLACE_MUSTACHE_RE = /\{\{\s*(cardReplace|card-replace|card)\s+([^{}]*?)\s*\}\}/g;

export const MARKDOWN_COPY_CONTENT_COMPONENT_NAME = 'markdownCopyContent';

const getVisitedKey = (visitedIds) => {
    if (!Array.isArray(visitedIds) || visitedIds.length === 0) {
        return '';
    }

    return visitedIds.join('>');
};

const allowCustomScheme = (uri, key, node) => {
    if (isUniversalModalLink(uri)) return uri;
    const resolved = resolveCwmUrl(uri, { download: key === 'href' });
    if (resolved !== null) return resolved;
    return defaultUrlTransform(uri, key, node);
};

const preprocessContent = (text) => {
    if (typeof text !== 'string') return text;

    return normalizeCardReplaceBlockBoundaries(text)
        .replace(/\\\[/g, '$$$')
        .replace(/\\\]/g, '$$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
};

const CARD_REPLACE_TOKEN_NAMES = ['cardReplace', 'card-replace', 'card'];

const stripDanglingStreamingCardToken = (content) => {
    if (typeof content !== 'string' || !content) return content;

    const tokenStart = content.lastIndexOf('{{');
    if (tokenStart < 0) return content;

    const tokenTail = content.slice(tokenStart);
    if (tokenTail.includes('}}')) return content;

    const tokenBody = tokenTail.slice(2).trimStart();
    const mayBeCardToken = CARD_REPLACE_TOKEN_NAMES.some((name) => {
        return name.startsWith(tokenBody) || tokenBody === name || tokenBody.startsWith(`${name} `);
    });

    // 流式增量可能正好截断在 {{cardReplace ... 中间。此时交给 Markdown
    // 会把内部控制标记当普通文本显示；等下一段补齐后再正常解析即可。
    return mayBeCardToken ? content.slice(0, tokenStart) : content;
};

const toSafeString = (value) => {
    return typeof value === 'string' ? value : String(value ?? '');
};

const normalizeLineBreaks = normalizeReplacementLineBreaks;

const normalizeCopyText = (content) => {
    return normalizeLineBreaks(content).replace(/\n{3,}/g, '\n\n');
};

const COPY_TEXT_FIELD_PRIORITY = [
    'copyContent',
    'copyMarkdown',
    'copyText',
    'markdown',
    'displayContent',
    'displayText',
    'plainText',
    'plain',
    'text',
    'content',
    'frontend',
    'value',
    'children',
];

const stripCopyTypeMarker = (content) => {
    const parsed = parseReplacementProtocol(content);
    return parsed.hadMarker ? parsed.content : normalizeLineBreaks(content);
};

const extractCopyTextFromReplacementValue = (value, seenObjects = new WeakSet()) => {
    if (value == null) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value
            .map((item) => extractCopyTextFromReplacementValue(item, seenObjects))
            .filter(Boolean)
            .join('\n');
    }

    if (typeof value !== 'object') {
        return '';
    }

    if (seenObjects.has(value)) {
        return '';
    }

    seenObjects.add(value);

    for (const fieldName of COPY_TEXT_FIELD_PRIORITY) {
        if (Object.prototype.hasOwnProperty.call(value, fieldName)) {
            const fieldText = extractCopyTextFromReplacementValue(value[fieldName], seenObjects);

            if (fieldText) {
                return fieldText;
            }
        }
    }

    return '';
};

const normalizeReplacementCopyEntry = (replacement, id, explicitType) => {
    const normalizedId = String(id || '');

    if (!replacement || typeof replacement !== 'object') {
        return {
            exists: false,
            id: normalizedId,
            content: '',
        };
    }

    if (!Object.prototype.hasOwnProperty.call(replacement, normalizedId)) {
        return {
            exists: false,
            id: normalizedId,
            content: '',
        };
    }

    const entry = replacement[normalizedId];
    const rawCopyContent = extractCopyTextFromReplacementValue(entry);
    const protocol = parseReplacementProtocol(rawCopyContent);

    // Tool details routed exclusively to Task Window are deliberately absent from
    // the Assistant transcript. Keep message-level copy/TTS semantics aligned with
    // what the conversation surface actually shows instead of expanding hidden
    // command/log/result payloads back into the copied answer.
    if (
        ['taskwindowtool', 'workspacetransfer', 'executionstatus', 'escstatus'].includes(
            String(explicitType || entry?.type || protocol.type || '').toLowerCase(),
        )
    ) {
        return {
            exists: true,
            id: normalizedId,
            content: '',
        };
    }

    return {
        exists: true,
        id: normalizedId,
        content:
            String(explicitType || entry?.type || protocol.type || '').toLowerCase() === 'agent'
                ? parseAgentContent(stripCopyTypeMarker(rawCopyContent)).cleanContent
                : stripCopyTypeMarker(rawCopyContent),
    };
};

const isReplaceDirective = (directiveName, attributes) => {
    if (directiveName === 'card-replace') {
        return true;
    }

    if (directiveName !== 'card') {
        return false;
    }

    return String(attributes.type || '').trim() === 'replace';
};

const replaceCopyDirectives = (source, directiveRegex, replacement, options) => {
    const { depth, maxDepth, visitedIds } = options;

    directiveRegex.lastIndex = 0;

    return source.replace(directiveRegex, (_match, directiveName, rawAttributes) => {
        const attributes = parseCardReplaceAttributes(rawAttributes);
        const finalId = getCardReplaceIdFromAttributes(attributes);
        const hasReplacementEntry = Boolean(
            finalId &&
            replacement &&
            typeof replacement === 'object' &&
            Object.prototype.hasOwnProperty.call(replacement, finalId),
        );

        // copy 走纯 Markdown 文本路径：UI card marker 本身不进入剪切板。
        // 明确的 replace marker 会展开 replacement；其它 card marker 如能命中 replacement，也按 replacement 展开；否则移除。
        if (!isReplaceDirective(directiveName, attributes) && !hasReplacementEntry) {
            return '';
        }

        if (!finalId) {
            return '';
        }

        if (visitedIds.includes(finalId)) {
            console.error(`[MarkdownRenderer] cardReplace copy 文本出现循环引用，id: ${finalId}`);
            return '';
        }

        const normalized = normalizeReplacementCopyEntry(replacement, finalId, attributes.type);

        if (!normalized.exists) {
            return '';
        }

        return resolveMarkdownCopyContent(normalized.content, replacement, {
            depth: depth + 1,
            maxDepth,
            visitedIds: [...visitedIds, finalId],
        });
    });
};

export const resolveMarkdownCopyContent = (content, replacement = {}, options = {}) => {
    const { depth = 0, maxDepth = 10, visitedIds = [] } = options;

    const source = normalizeLineBreaks(content);

    if (!source) {
        return '';
    }

    if (depth >= maxDepth) {
        return normalizeCopyText(
            source
                .replace(CARD_REPLACE_BLOCK_DIRECTIVE_RE, '')
                .replace(CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE, '')
                .replace(CARD_REPLACE_MUSTACHE_RE, ''),
        );
    }

    const withoutBlockDirectives = replaceCopyDirectives(source, CARD_REPLACE_BLOCK_DIRECTIVE_RE, replacement, {
        depth,
        maxDepth,
        visitedIds,
    });

    const withoutSelfClosingDirectives = replaceCopyDirectives(
        withoutBlockDirectives,
        CARD_REPLACE_SELF_CLOSING_DIRECTIVE_RE,
        replacement,
        { depth, maxDepth, visitedIds },
    );

    const withoutMustacheDirectives = replaceCopyDirectives(
        withoutSelfClosingDirectives,
        CARD_REPLACE_MUSTACHE_RE,
        replacement,
        { depth, maxDepth, visitedIds },
    );

    return normalizeCopyText(withoutMustacheDirectives);
};

export const createMarkdownCopyContentComponent = (copyContent) => {
    const safeCopyContent = toSafeString(copyContent);

    return {
        content: safeCopyContent,
        copyContent: safeCopyContent,
        markdownContent: safeCopyContent,
        displayContent: safeCopyContent,
        text: safeCopyContent,
        getContent: () => safeCopyContent,
        getCopyContent: () => safeCopyContent,
        getMarkdownContent: () => safeCopyContent,
        getDisplayContent: () => safeCopyContent,
        getText: () => safeCopyContent,
        toString: () => safeCopyContent,
    };
};

// Keep the code renderer identity stable while the message grows. Replacing a
// renderer function remounts its whole subtree and can discard a pressed copy button.
const MarkdownCode = ({ className, children, isCodeBlock, ...props }) => {
    const match = /\blanguage-([^\s]+)/.exec(className || '');
    const language = match ? match[1] : '';
    if (!isCodeBlock) return <code className="cwm-md-inline-code" {...props}>{children}</code>;
    return <CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />;
};

const createComponents = ({
    contextId = '',
    conversationId = null,
    replacementRef,
    depth = 0,
    maxDepth = 10,
    visitedIds = [],
    isStreaming = false,
    messageContextState = null,
    messageReadonly = false,
    messageIsLatest = true,
    renderSurface = 'conversation',
    onTaskToggle = null,
    sourceContent = '',
    cardSpec = null,
}) => {
    const getCurrentReplacement = () => {
        return replacementRef?.current || {};
    };

    const renderNestedMarkdown = (nestedContent, extra = {}) => {
        return (
            <MarkdownRendererInner
                contextId={contextId}
                content={nestedContent}
                replacement={getCurrentReplacement()}
                conversationId={conversationId}
                depth={extra.depth ?? depth + 1}
                maxDepth={maxDepth}
                visitedIds={extra.visitedIds ?? visitedIds}
                isStreaming={isStreaming}
                messageContextState={messageContextState}
                messageIsLatest={messageIsLatest}
                renderSurface={renderSurface}
            />
        );
    };

    const cardComponents = cardSpec ? Object.fromEntries(cardSpec.directives.map(({ name, kind }) => [
        name,
        kind === 'session' ? StudySession :
            kind === 'section' ? StudySection :
                (props) => <StudyCard {...props} kind={kind || name.slice('study-'.length)} iconSymbols={cardSpec.iconSymbols} />,
    ])) : {};

    return {
        ...(cardSpec ? { 'study-outline': StudyOutline, ...cardComponents } : {}),
        p: ({ children }) => <p className="my-2">{children}</p>,

        ul: ({ children, className }) => <ul className={`list-disc pl-5 my-2 ${renderSurface === 'document' && onTaskToggle ? `cwm-document-todo-list ${className || ''}` : ''}`}>{children}</ul>,

        ol: ({ children, className }) => <ol className={`list-decimal pl-5 my-2 ${renderSurface === 'document' && onTaskToggle ? `cwm-document-todo-list ${className || ''}` : ''}`}>{children}</ol>,

        li: ({ children, className, node }) => {
            if (renderSurface !== 'document' || !onTaskToggle)
                return <li className="my-1">{children}</li>;
            return <DocumentTaskListItem className={className} node={node}>{children}</DocumentTaskListItem>;
        },
        ...(renderSurface === 'document' && onTaskToggle
            ? { input: (props) => <DocumentTaskInput {...props} onToggle={onTaskToggle} sourceContent={sourceContent} /> }
            : {}),

        h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
        ),

        h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>,

        h3: ({ children }) => <h3 className="text-lg font-medium mt-5 mb-2 text-foreground">{children}</h3>,

        hr: () => <hr className="cwm-md-rule" />,

        blockquote: ({ children }) => (
            <blockquote className="cwm-md-quote">{children}</blockquote>
        ),

        a: ({ href, children }) => {
            const modalLink = isUniversalModalLink(href);
            return (
                <a
                    href={href}
                    target={modalLink ? undefined : '_blank'}
                    rel={modalLink ? undefined : 'noopener noreferrer'}
                    className="text-primary underline-offset-4 hover:underline"
                    onClick={
                        modalLink
                            ? (event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  openUniversalModalLink(href);
                              }
                            : isDocumentDownloadUrl(href)
                              ? (event) => {
                                    event.preventDefault();
                                    void downloadDocumentResource(href).catch((error) => toast.error(error.message));
                                }
                              : undefined
                    }
                >
                    {children}
                </a>
            );
        },

        code: MarkdownCode,

        table: ({ children }) => (
            <div className="cwm-md-table-scroll pretty-scrollbar" role="region" aria-label="Table" tabIndex={0}>
                <table className="cwm-md-table">{children}</table>
            </div>
        ),
        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children, style }) => <th style={style}>{children}</th>,
        td: ({ children, style }) => <td style={style}>{children}</td>,

        img: ({ src, alt, className, ...props }) => {
            return <ResourceImage key={src} src={src} alt={alt} galleryId={contextId} className={`cwm-md-image ${className || ''}`} {...props} />;
        },

        video: ({ src, title, poster }) => <ResourceVideo src={src} title={title} poster={poster} />,

        'card-replace': ({ id, type, node }) => {
            const finalId = String(id || node?.properties?.id || '');
            const tokenType = String(type || node?.properties?.type || '');
            const currentReplacement = getCurrentReplacement();

            // 情况 1：没有 id，但提供了 type
            // 允许渲染，正文为空
            if (!finalId && tokenType) {
                return (
                    <div className="block w-full clear-both" data-tts-ignore="true">
                        <CardBlock
                            id=""
                            type={tokenType}
                            content=""
                            contextId={contextId}
                            conversationId={conversationId}
                            replacement={currentReplacement}
                            messageIsLatest={messageIsLatest}
                            renderSurface={renderSurface}
                            renderMarkdown={(markdownContent) => {
                                return renderNestedMarkdown(markdownContent, {
                                    depth: depth + 1,
                                    visitedIds,
                                });
                            }}
                        />
                    </div>
                );
            }

            // 情况 2：没有 id，也没有 type
            // 这是无效 token，不渲染
            if (!finalId && !tokenType) {
                return null;
            }

            // 情况 3：循环引用
            // 直接红色 error 卡片展示
            if (visitedIds.includes(finalId)) {
                console.error(`[MarkdownRenderer] cardReplace 出现循环引用，id: ${finalId}`);

                return (
                    <div className="block w-full clear-both" data-tts-ignore="true">
                        <CardBlock
                            id={finalId}
                            type="error"
                            content={`cardReplace 出现循环引用，id: ${finalId}`}
                            contextId={contextId}
                            conversationId={conversationId}
                            replacement={currentReplacement}
                            messageIsLatest={messageIsLatest}
                            renderSurface={renderSurface}
                            renderMarkdown={(markdownContent) => {
                                return renderNestedMarkdown(markdownContent, {
                                    depth: depth + 1,
                                    visitedIds,
                                });
                            }}
                        />
                    </div>
                );
            }

            // 情况 4：嵌套过深
            // 也用 error 卡片展示
            if (depth >= maxDepth) {
                console.error(`[MarkdownRenderer] cardReplace 嵌套过深，id: ${finalId}`);

                return (
                    <div className="block w-full clear-both" data-tts-ignore="true">
                        <CardBlock
                            id={finalId}
                            type="error"
                            content={`cardReplace 嵌套过深，id: ${finalId}`}
                            contextId={contextId}
                            conversationId={conversationId}
                            replacement={currentReplacement}
                            messageIsLatest={messageIsLatest}
                            renderSurface={renderSurface}
                            renderMarkdown={(markdownContent) => {
                                return renderNestedMarkdown(markdownContent, {
                                    depth: depth + 1,
                                    visitedIds,
                                });
                            }}
                        />
                    </div>
                );
            }

            const normalized = normalizeReplacementEntry(currentReplacement, finalId, tokenType, isStreaming);

            // 情况 5：有 id，但 replacement 找不到
            // 按你的要求：只 console.warn，不渲染组件
            if (!normalized.exists) {
                return null;
            }

            const nextVisitedIds = [...visitedIds, finalId];
            let groupedIds = [];
            try {
                const parsed = JSON.parse(String(node?.properties?.groupedIds || node?.properties?.['grouped-ids'] || '[]'));
                if (Array.isArray(parsed)) groupedIds = parsed.filter((value) => typeof value === 'string');
            } catch {
                // An incomplete group attribute should fall back to the latest row.
            }
            const groupedEntries = normalized.type === 'executionStatus'
                ? groupedIds.map((groupedId) => {
                    const entry = normalizeReplacementEntry(currentReplacement, groupedId, '', isStreaming);
                    return entry.exists && entry.type === 'executionStatus'
                        ? {id: groupedId, content: entry.content}
                        : null;
                }).filter(Boolean)
                : [];

            return (
                <div
                    className="block w-full clear-both"
                    data-tts-source-id={finalId}
                    data-tts-source-type="replacement"
                    data-tts-ignore={normalized.allowTts ? undefined : 'true'}
                >
                    <ReplacementContextBadge
                        conversationId={conversationId}
                        messageId={contextId}
                        replacementId={finalId}
                        status={normalized.contextStatus}
                        messageState={messageContextState}
                    />
                    {groupedEntries.length > 1 ? (
                        <ExecutionStatusGroup entries={groupedEntries} conversationId={conversationId} />
                    ) : <CardBlock
                        id={finalId}
                        type={normalized.type}
                        content={normalized.content}
                        allowTts={normalized.allowTts}
                        contextId={contextId}
                        conversationId={conversationId}
                        replacement={currentReplacement}
                        contextStatus={normalized.contextStatus}
                        messageContextState={messageContextState}
                        messageReadonly={messageReadonly}
                        messageIsLatest={messageIsLatest}
                        renderSurface={renderSurface}
                        renderMarkdown={(markdownContent) => {
                            return renderNestedMarkdown(markdownContent, {
                                depth: depth + 1,
                                visitedIds: nextVisitedIds,
                            });
                        }}
                    />}
                </div>
            );
        },
    };
};

function MarkdownRendererInner({
    resourceBaseUrl = null,
    extraRehypePlugins = [],
    contextId = '',
    conversationId = null,
    content,
    replacement = {},
    depth = 0,
    maxDepth = 10,
    visitedIds = [],
    msg = null,
    messageContextState: messageContextStateProp = null,
    isStreaming: isStreamingProp = null,
    messageIsLatest: messageIsLatestProp = null,
    copyContentComponentName = MARKDOWN_COPY_CONTENT_COMPONENT_NAME,
    renderSurface = 'conversation',
    onTaskToggle = null,
}) {
    const studyIdPrefix = useId();
    const documentSurface = renderSurface === 'document' || renderSurface === 'document-preview';
    const { spec: cardSpec, loading: cardsLoading, error: cardsError } = useDocumentCardSpec(documentSurface);
    const replacementRef = useRef(replacement);
    replacementRef.current = replacement;
    const isStreaming = isStreamingProp ?? msg?.readonly === true;
    const messageContextState = messageContextStateProp ?? msg?.contextState ?? null;
    const messageReadonly = msg?.readonly === true || Boolean(isStreamingProp);
    // Only editable document checkboxes read the whole source. Ordinary message
    // deltas must not recreate list/quote renderers around an existing code block.
    const taskSourceContent = renderSurface === 'document' && onTaskToggle ? content : '';
    // Active-branch tail detection. After a page reload, an older active widget may
    // still be actionable, but it must not auto-open an immersive selector over the
    // latest conversation. Users can still reopen it explicitly from its inline launcher.
    const messageIsLatest = messageIsLatestProp ?? (msg ? msg?.nextMessage == null : true);

    const visitedKey = useMemo(() => {
        return getVisitedKey(visitedIds);
    }, [visitedIds]);

    const components = useMemo(() => {
        return createComponents({
            contextId,
            conversationId,
            replacementRef,
            depth,
            maxDepth,
            visitedIds,
            isStreaming,
            messageContextState,
            messageReadonly,
            messageIsLatest,
            renderSurface,
            onTaskToggle,
            sourceContent: taskSourceContent,
            cardSpec,
        });
    }, [
        contextId,
        conversationId,
        replacementRef,
        depth,
        maxDepth,
        visitedKey,
        isStreaming,
        messageContextState,
        messageReadonly,
        messageIsLatest,
        renderSurface,
        onTaskToggle,
        taskSourceContent,
        cardSpec,
    ]);

    const processedContent = useMemo(() => {
        const preprocessed = preprocessContent(content);

        if (msg?.readonly === true) {
            return stripDanglingStreamingCardToken(preprocessed);
        }

        return preprocessed;
    }, [content, msg?.readonly]);

    const copyContent = useMemo(() => {
        return resolveMarkdownCopyContent(content, replacement, {
            maxDepth,
        });
    }, [content, replacement, maxDepth]);

    useEffect(() => {
        if (depth !== 0 || !msg || typeof msg.registerComponent !== 'function') {
            return undefined;
        }

        if (!copyContentComponentName) {
            return undefined;
        }

        const copyContentComponent = createMarkdownCopyContentComponent(copyContent);

        msg.registerComponent(copyContentComponentName, copyContentComponent);

        return () => {
            if (typeof msg.unregisterComponent !== 'function') {
                return;
            }

            if (typeof msg.getComponent === 'function') {
                const currentComponent = msg.getComponent(copyContentComponentName);

                if (currentComponent && currentComponent !== copyContentComponent) {
                    return;
                }
            }

            msg.unregisterComponent(copyContentComponentName);
        };
    }, [depth, msg, copyContentComponentName, copyContent]);

    const hasCardSource = /(?:^|\n)\s*:{3,}study-[a-z-]+(?=[\s{])/.test(processedContent || '');
    const studyDirectivesEnabled = documentSurface && cardSpec && hasCardSource;
    const documentRemarkPlugins = [
        ...(studyDirectivesEnabled ? [remarkDirective] : []),
        ...(studyDirectivesEnabled ? [[remarkStudyDirectives, { idPrefix: studyIdPrefix, spec: cardSpec }]] : []),
    ];

    if (documentSurface && cardsLoading && !cardSpec && hasCardSource) {
        return <div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>;
    }

    const markdown = (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, ...documentRemarkPlugins, remarkCardReplace, [remarkCollapseExecutionStatuses, {replacement}], remarkVideoDirective, remarkCwmLinks, rehypeInlineCodeProperty]}
            rehypePlugins={[
                rehypeKatex,
                ...extraRehypePlugins,
                ...(renderSurface === 'document' && onTaskToggle
                    ? [[rehypeDocumentTasks, { sourceContent: content, normalizeLine: preprocessContent }]]
                    : []),
            ]}
            components={components}
            urlTransform={(uri, key, node) => {
                const safe = allowCustomScheme(uri, key, node);
                if (resourceBaseUrl && safe?.startsWith('assets/')) {
                    const relative = safe.slice('assets/'.length);
                    if (relative.split('/').some((part) => part === '..' || part === '.')) return '';
                    return resourceBaseUrl + relative.split('/').map(encodeURIComponent).join('/');
                }
                return safe;
            }}
        >
            {processedContent}
        </ReactMarkdown>
    );
    return documentSurface ? (
        <div className="cwm-document-card-surface">
            {cardsError && !cardSpec && hasCardSource && <p role="status">卡片样式暂不可用，以下显示 Markdown 原文。</p>}
            {markdown}
        </div>
    ) : markdown;
}

const areVisitedIdsEqual = (prev = [], next = []) => {
    if (prev === next) return true;
    if (prev.length !== next.length) return false;

    for (let i = 0; i < prev.length; i += 1) {
        if (prev[i] !== next[i]) return false;
    }

    return true;
};

const MarkdownRenderer = memo(MarkdownRendererInner, (prev, next) => {
    return (
        prev.resourceBaseUrl === next.resourceBaseUrl &&
        prev.extraRehypePlugins === next.extraRehypePlugins &&
        prev.contextId === next.contextId &&
        prev.content === next.content &&
        prev.replacement === next.replacement &&
        prev.depth === next.depth &&
        prev.maxDepth === next.maxDepth &&
        prev.msg === next.msg &&
        prev.messageContextState === next.messageContextState &&
        prev.isStreaming === next.isStreaming &&
        prev.messageIsLatest === next.messageIsLatest &&
        prev.copyContentComponentName === next.copyContentComponentName &&
        prev.renderSurface === next.renderSurface &&
        prev.onTaskToggle === next.onTaskToggle &&
        areVisitedIdsEqual(prev.visitedIds, next.visitedIds)
    );
});

export default MarkdownRenderer;
