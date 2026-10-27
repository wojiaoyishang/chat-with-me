import React, { createContext, memo, useContext, useEffect, useId, useMemo, useRef } from 'react';
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
import ReplacementContextBadge from '@/features/chat/ui/message/components/ReplacementContextBadge.jsx';
import {
    normalizeCardReplaceBlockBoundaries,
    normalizeReplacementEntry,
} from './replacementProtocol.js';

import 'katex/dist/katex.min.css';

import { resolveCwmUrl } from '@/lib/virtualUrl.js';
import { authorizedResourceUrl } from '../../runtime/backend/connection.js';
import { downloadDocumentResource, isDocumentDownloadUrl } from '@/lib/resourceDownload.js';
import ResourceImage from './ResourceImage.jsx';
import ResourceVideo from './ResourceVideo.jsx';
import { createMarkdownCopyContentComponent, resolveMarkdownCopyContent } from './markdownCopy.js';
import { executionGroupingKey, projectReplacements } from './replacementProjection.js';
import { toast } from 'sonner';
import { isUniversalModalLink, openUniversalModalLink } from '@/components/modal/universalModal.js';

export const MARKDOWN_COPY_CONTENT_COMPONENT_NAME = 'markdownCopyContent';

const getVisitedKey = (visitedIds) => {
    if (!Array.isArray(visitedIds) || visitedIds.length === 0) {
        return '';
    }

    return JSON.stringify(visitedIds);
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

// Keep the code renderer identity stable while the message grows. Replacing a
// renderer function remounts its whole subtree and can discard a pressed copy button.
const MarkdownCode = ({ className, children, isCodeBlock, ...props }) => {
    const match = /\blanguage-([^\s]+)/.exec(className || '');
    const language = match ? match[1] : '';
    if (!isCodeBlock) return <code className="cwm-md-inline-code" {...props}>{children}</code>;
    return <CodeBlock codeString={String(children || '').replace(/\n$/, '')} language={language} />;
};

// Renderers below are pure element factories. React sees only the stable host
// components, while current permissions, task source and replacements flow via
// context. Changing readonly at stream completion must not remount a video (or
// an ancestor paragraph/list/card) with the same source.
const MarkdownRenderersContext = createContext(null);
const stableRendererHosts = new Map();
const getStableRendererHost = (name) => {
    if (!stableRendererHosts.has(name)) {
        const RendererHost = (props) => {
            const renderers = useContext(MarkdownRenderersContext);
            return renderers?.[name]?.(props) ?? null;
        };
        RendererHost.displayName = `Markdown(${name})`;
        stableRendererHosts.set(name, RendererHost);
    }
    return stableRendererHosts.get(name);
};

const createElementRenderers = ({
    contextId = '',
    conversationId = null,
    replacement,
    depth = 0,
    maxDepth = 10,
    visitedIds = [],
    isStreaming = false,
    messageContextState = null,
    messageReadonly = false,
    messageIsLatest = true,
    renderSurface = 'conversation',
    snapshot = false,
    onTaskToggle = null,
    sourceContent = '',
    cardSpec = null,
}) => {
    const getCurrentReplacement = () => {
        return replacement;
    };

    const renderNestedMarkdown = (nestedContent, extra = {}) => {
        return (
            <MarkdownRenderer
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
                snapshot={snapshot || extra.snapshot === true}
            />
        );
    };

    const cardComponents = cardSpec ? Object.fromEntries(cardSpec.directives.map(({ name, kind }) => [
        name,
        kind === 'session' ? (props) => <StudySession {...props} /> :
            kind === 'section' ? (props) => <StudySection {...props} /> :
                (props) => <StudyCard {...props} kind={kind || name.slice('study-'.length)} iconSymbols={cardSpec.iconSymbols} />,
    ])) : {};

    return {
        ...(cardSpec ? { 'study-outline': (props) => <StudyOutline {...props} />, ...cardComponents } : {}),
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
                            snapshot={snapshot}
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
                            snapshot={snapshot}
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
                            snapshot={snapshot}
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
            const cardSnapshot = snapshot || normalized.snapshot;

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
            const groupedEntries = !cardSnapshot && normalized.type === 'executionStatus'
                ? groupedIds.map((groupedId) => {
                    // The grouping plugin already verified each token's status
                    // type. Persisted replacements may contain plain JSON with
                    // the type supplied only by that original Markdown token.
                    const entry = normalizeReplacementEntry(currentReplacement, groupedId, 'executionStatus', isStreaming);
                    return entry.exists && !entry.snapshot && entry.type === 'executionStatus'
                        ? {id: groupedId, content: entry.content}
                        : null;
                }).filter(Boolean)
                : [];
            const continuationId = String(node?.properties?.continuationId || node?.properties?.['continuation-id'] || '');
            const continuationEntry = !cardSnapshot && normalized.type === 'executionStatus' && continuationId
                ? normalizeReplacementEntry(currentReplacement, continuationId, 'executionStatus', isStreaming)
                : null;
            const continuation = continuationEntry?.exists && continuationEntry.content.trim()
                ? {id: continuationId, content: continuationEntry.content} : null;

            return (
                <div
                    className="block w-full clear-both"
                    data-tts-source-id={finalId}
                    data-tts-source-type="replacement"
                    data-tts-ignore={normalized.allowTts ? undefined : 'true'}
                >
                    {!cardSnapshot && <ReplacementContextBadge
                        conversationId={conversationId}
                        messageId={contextId}
                        replacementId={finalId}
                        status={normalized.contextStatus}
                        messageState={messageContextState}
                    />}
                    {groupedEntries.length > 1 || (groupedEntries.length && continuation) ? (
                        <ExecutionStatusGroup entries={groupedEntries} continuation={continuation} conversationId={conversationId} />
                    ) : <CardBlock
                        id={finalId}
                        type={normalized.type}
                        snapshot={cardSnapshot}
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
                                snapshot: cardSnapshot,
                            });
                        }}
                    />}
                </div>
            );
        },
    };
};

// Replacement content and readonly belong to the live component context. Only
// source/configuration or grouping topology changes require another syntax pass.
const MarkdownSyntax = memo(({ processedContent, replacement,
    renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix, cardSpec,
    extraRehypePlugins, editableTasks, taskSourceContent, components, resourceBaseUrl }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath,
            ...(studyDirectivesEnabled ? [remarkDirective, [remarkStudyDirectives, { idPrefix: studyIdPrefix, spec: cardSpec }]] : []),
            remarkCardReplace, [remarkCollapseExecutionStatuses, {replacement, renderSurface, snapshot}],
            remarkVideoDirective, remarkCwmLinks, rehypeInlineCodeProperty]}
        rehypePlugins={[rehypeKatex, ...extraRehypePlugins,
            ...(editableTasks ? [[rehypeDocumentTasks, { sourceContent: taskSourceContent, normalizeLine: preprocessContent }]] : [])]}
        components={components}
        urlTransform={(uri, key, node) => {
            const safe = allowCustomScheme(uri, key, node);
            if (resourceBaseUrl && safe?.startsWith('assets/')) {
                const relative = safe.slice('assets/'.length);
                if (relative.split('/').some((part) => part === '..' || part === '.')) return '';
                return authorizedResourceUrl(resourceBaseUrl + relative.split('/').map(encodeURIComponent).join('/'));
            }
            return authorizedResourceUrl(safe);
        }}
    >{processedContent}</ReactMarkdown>
), (prev, next) => Object.keys(next).every((key) => key === 'replacement' || prev[key] === next[key]));

const EMPTY_PLUGINS = [];
const EMPTY_REPLACEMENTS = {};

function MarkdownRendererInner({
    resourceBaseUrl = null,
    extraRehypePlugins = EMPTY_PLUGINS,
    contextId = '',
    conversationId = null,
    content,
    replacement: allReplacements = EMPTY_REPLACEMENTS,
    depth = 0,
    maxDepth = 10,
    visitedIds = [],
    msg = null,
    messageContextState: messageContextStateProp = null,
    isStreaming: isStreamingProp = null,
    messageIsLatest: messageIsLatestProp = null,
    copyContentComponentName = MARKDOWN_COPY_CONTENT_COMPONENT_NAME,
    renderSurface = 'conversation',
    snapshot = false,
    onTaskToggle = null,
}) {
    const studyIdPrefix = useId();
    const documentSurface = renderSurface === 'document' || renderSurface === 'document-preview';
    const { spec: cardSpec, loading: cardsLoading, error: cardsError } = useDocumentCardSpec(documentSurface);
    const projectionRef = useRef(null);
    const replacement = useMemo(() => {
        const projected = projectReplacements(content, allReplacements, projectionRef.current, maxDepth);
        projectionRef.current = projected;
        return projected;
    }, [content, allReplacements, maxDepth]);
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

    const visitedKey = getVisitedKey(visitedIds);
    const stableVisitedIds = useMemo(() => visitedKey ? JSON.parse(visitedKey) : [], [visitedKey]);

    const elementRenderers = useMemo(() => {
        return createElementRenderers({
            contextId,
            conversationId,
            replacement,
            depth,
            maxDepth,
            visitedIds: stableVisitedIds,
            isStreaming,
            messageContextState,
            messageReadonly,
            messageIsLatest,
            renderSurface,
            snapshot,
            onTaskToggle,
            sourceContent: taskSourceContent,
            cardSpec,
        });
    }, [
        contextId,
        conversationId,
        replacement,
        depth,
        maxDepth,
        stableVisitedIds,
        isStreaming,
        messageContextState,
        messageReadonly,
        messageIsLatest,
        renderSurface,
        snapshot,
        onTaskToggle,
        taskSourceContent,
        cardSpec,
    ]);

    const rendererNames = Object.keys(elementRenderers).join('|');
    const components = useMemo(() => Object.fromEntries(
        rendererNames.split('|').map((name) => [name, getStableRendererHost(name)]),
    ), [rendererNames]);

    const processedContent = useMemo(() => {
        const preprocessed = preprocessContent(content);

        if (msg?.readonly === true) {
            return stripDanglingStreamingCardToken(preprocessed);
        }

        return preprocessed;
    }, [content, msg?.readonly]);

    const copyContent = useMemo(() => {
        let resolved;
        return () => {
            resolved ??= resolveMarkdownCopyContent(content, replacement, { maxDepth });
            return resolved;
        };
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
    if (documentSurface && cardsLoading && !cardSpec && hasCardSource) {
        return <div className="cwm-document-card-surface" aria-busy="true">正在加载文档卡片…</div>;
    }
    const markdown = (
        <MarkdownRenderersContext.Provider value={elementRenderers}>
            <MarkdownSyntax processedContent={processedContent} replacement={replacement}
                groupingKey={executionGroupingKey(processedContent, replacement)}
                renderSurface={renderSurface} snapshot={snapshot} studyDirectivesEnabled={Boolean(studyDirectivesEnabled)}
                studyIdPrefix={studyIdPrefix} cardSpec={cardSpec} extraRehypePlugins={extraRehypePlugins}
                editableTasks={Boolean(renderSurface === 'document' && onTaskToggle)} taskSourceContent={taskSourceContent}
                components={components} resourceBaseUrl={resourceBaseUrl} />
        </MarkdownRenderersContext.Provider>
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
        prev.conversationId === next.conversationId &&
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
        prev.snapshot === next.snapshot &&
        prev.onTaskToggle === next.onTaskToggle &&
        areVisitedIdsEqual(prev.visitedIds, next.visitedIds)
    );
});

export default MarkdownRenderer;
