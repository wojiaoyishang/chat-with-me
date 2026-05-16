import React, {memo, useMemo} from 'react';
import ReactMarkdown, {defaultUrlTransform} from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import {
    rehypeInlineCodeProperty,
    remarkCardReplace,
} from './remarkDirectiveToComponent.js';

import CodeBlock from './CodeBlock.jsx';
import CardBlock from './CardBlock.jsx';

import 'katex/dist/katex.min.css';
import './CodeBlock.css';

import {BASE_BACKEND_URL} from '@/config';

const MAX_COMPONENT_CACHE_SIZE = 200;

const componentCache = new Map();
const replacementObjectIds = new WeakMap();

let replacementObjectSeq = 0;

const TYPE_MARKER_RE = /^\[([a-zA-Z][\w-]*)\]$/;

const getReplacementCacheId = (replacement) => {
    if (!replacement || typeof replacement !== 'object') {
        return 'none';
    }

    if (!replacementObjectIds.has(replacement)) {
        replacementObjectSeq += 1;
        replacementObjectIds.set(replacement, replacementObjectSeq);
    }

    return replacementObjectIds.get(replacement);
};

const getVisitedKey = (visitedIds) => {
    if (!Array.isArray(visitedIds) || visitedIds.length === 0) {
        return '';
    }

    return visitedIds.join('>');
};

const setComponentCache = (key, value) => {
    if (componentCache.size >= MAX_COMPONENT_CACHE_SIZE) {
        const firstKey = componentCache.keys().next().value;

        if (firstKey) {
            componentCache.delete(firstKey);
        }
    }

    componentCache.set(key, value);
};

const allowCustomScheme = (uri, key, node) => {
    if (typeof uri === 'string' && uri.startsWith('backend://')) {
        return uri.replace('backend://', BASE_BACKEND_URL);
    }

    return defaultUrlTransform(uri, key, node);
};

const preprocessContent = (text) => {
    if (typeof text !== 'string') return text;

    return text
        .replace(/\\\[/g, '$$$')
        .replace(/\\\]/g, '$$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
};

const toSafeString = (value) => {
    return typeof value === 'string' ? value : String(value ?? '');
};

const normalizeLineBreaks = (content) => {
    return toSafeString(content).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
};

const inferTypeFromFirstNonEmptyLine = (content) => {
    const normalizedContent = normalizeLineBreaks(content);
    const lines = normalizedContent.split('\n');

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        // 严格空行才跳过；包含空格的行不算空行，不会被跳过
        if (line === '') {
            continue;
        }

        const match = TYPE_MARKER_RE.exec(line);

        if (!match) {
            return {
                type: 'markdown',
                content: normalizedContent,
                inferred: false,
            };
        }

        const nextLines = [...lines];
        nextLines.splice(i, 1);

        return {
            type: match[1],
            content: nextLines.join('\n'),
            inferred: true,
        };
    }

    return {
        type: 'markdown',
        content: normalizedContent,
        inferred: false,
    };
};

const normalizeReplacementEntry = (replacement, id, tokenType) => {
    const normalizedId = String(id || '');
    const explicitTokenType = typeof tokenType === 'string' && tokenType.length > 0
        ? tokenType
        : '';

    if (!replacement || typeof replacement !== 'object') {
        return {
            exists: false,
            id: normalizedId,
            type: explicitTokenType || 'markdown',
            content: '',
        };
    }

    const entry = replacement[normalizedId];

    if (entry == null) {
        return {
            exists: false,
            id: normalizedId,
            type: explicitTokenType || 'markdown',
            content: '',
        };
    }

    let rawContent = '';
    let entryType = '';

    if (typeof entry === 'string') {
        rawContent = entry;
    } else if (typeof entry === 'object') {
        rawContent = entry.content ?? entry.frontend ?? entry.value ?? '';
        entryType = entry.type || '';
    } else {
        rawContent = String(entry);
    }

    if (explicitTokenType) {
        return {
            exists: true,
            id: normalizedId,
            type: explicitTokenType,
            content: toSafeString(rawContent),
            inferredType: false,
        };
    }

    if (entryType) {
        return {
            exists: true,
            id: normalizedId,
            type: entryType,
            content: toSafeString(rawContent),
            inferredType: false,
        };
    }

    const inferred = inferTypeFromFirstNonEmptyLine(rawContent);

    return {
        exists: true,
        id: normalizedId,
        type: inferred.type,
        content: inferred.content,
        inferredType: inferred.inferred,
    };
};

const createComponents = ({
                              contextId = '',
                              replacement = {},
                              depth = 0,
                              maxDepth = 10,
                              visitedIds = [],
                          }) => {
    const renderNestedMarkdown = (nestedContent, extra = {}) => {
        return (
            <MarkdownRendererInner
                contextId={contextId}
                content={nestedContent}
                replacement={replacement}
                depth={extra.depth ?? depth + 1}
                maxDepth={maxDepth}
                visitedIds={extra.visitedIds ?? visitedIds}
            />
        );
    };

    return {
        p: ({children}) => <p className="my-2">{children}</p>,

        ul: ({children}) => (
            <ul className="list-disc pl-5 my-2">{children}</ul>
        ),

        ol: ({children}) => (
            <ol className="list-decimal pl-5 my-2">{children}</ol>
        ),

        li: ({children}) => <li className="my-1">{children}</li>,

        h1: ({children}) => (
            <h1 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-100 text-gray-900">
                {children}
            </h1>
        ),

        h2: ({children}) => (
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
                {children}
            </h2>
        ),

        h3: ({children}) => (
            <h3 className="text-lg font-medium mt-5 mb-2 text-gray-800">
                {children}
            </h3>
        ),

        hr: () => <hr className="my-4 border-t border-gray-300"/>,

        blockquote: ({children}) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600">
                {children}
            </blockquote>
        ),

        a: ({href, children}) => (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
                {children}
            </a>
        ),

        code({className, children, isCodeBlock, ...props}) {
            const match = /language-(.+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (!isCodeBlock) {
                return (
                    <code
                        className="bg-gray-100 px-1 py-0.5 rounded-md text-xs font-mono text-gray-800"
                        {...props}
                    >
                        {children}
                    </code>
                );
            }

            return (
                <CodeBlock
                    codeString={String(children || '').replace(/\n$/, '')}
                    language={language}
                />
            );
        },

        table: ({children}) => (
            <div className="my-4 w-full overflow-x-auto rounded-xl border border-gray-200 pretty-scrollbar">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    {children}
                </table>
            </div>
        ),

        thead: ({children}) => (
            <thead className="bg-gray-50">
            {children}
            </thead>
        ),

        tbody: ({children}) => (
            <tbody className="divide-y divide-gray-200 bg-white">
            {children}
            </tbody>
        ),

        tr: ({children}) => (
            <tr className="transition-colors hover:bg-gray-50/50">
                {children}
            </tr>
        ),

        th: ({children}) => (
            <th className="px-4 py-3 text-left font-bold text-gray-900 border-r border-gray-200 last:border-r-0 whitespace-nowrap">
                {children}
            </th>
        ),

        td: ({children}) => (
            <td className="px-4 py-3 text-gray-700 border-r border-gray-200 last:border-r-0">
                {children}
            </td>
        ),

        img: ({src, alt, ...props}) => {
            return <img src={src} alt={alt} {...props}/>;
        },

        'card-replace': ({id, type, node}) => {
            const finalId = String(id || node?.properties?.id || '');
            const tokenType = String(type || node?.properties?.type || '');

            // 情况 1：没有 id，但提供了 type
            // 允许渲染，正文为空
            if (!finalId && tokenType) {
                return (
                    <CardBlock
                        id=""
                        type={tokenType}
                        content=""
                        contextId={contextId}
                        replacement={replacement}
                        renderMarkdown={(markdownContent) => {
                            return renderNestedMarkdown(markdownContent, {
                                depth: depth + 1,
                                visitedIds,
                            });
                        }}
                    />
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
                    <CardBlock
                        id={finalId}
                        type="error"
                        content={`cardReplace 出现循环引用，id: ${finalId}`}
                        contextId={contextId}
                        replacement={replacement}
                        renderMarkdown={(markdownContent) => {
                            return renderNestedMarkdown(markdownContent, {
                                depth: depth + 1,
                                visitedIds,
                            });
                        }}
                    />
                );
            }

            // 情况 4：嵌套过深
            // 也用 error 卡片展示
            if (depth >= maxDepth) {
                console.error(`[MarkdownRenderer] cardReplace 嵌套过深，id: ${finalId}`);

                return (
                    <CardBlock
                        id={finalId}
                        type="error"
                        content={`cardReplace 嵌套过深，id: ${finalId}`}
                        contextId={contextId}
                        replacement={replacement}
                        renderMarkdown={(markdownContent) => {
                            return renderNestedMarkdown(markdownContent, {
                                depth: depth + 1,
                                visitedIds,
                            });
                        }}
                    />
                );
            }

            const normalized = normalizeReplacementEntry(
                replacement,
                finalId,
                tokenType,
            );

            // 情况 5：有 id，但 replacement 找不到
            // 按你的要求：只 console.warn，不渲染组件
            if (!normalized.exists) {
                return null;
            }

            const nextVisitedIds = [...visitedIds, finalId];

            return (
                <CardBlock
                    id={finalId}
                    type={normalized.type}
                    content={normalized.content}
                    contextId={contextId}
                    replacement={replacement}
                    renderMarkdown={(markdownContent) => {
                        return renderNestedMarkdown(markdownContent, {
                            depth: depth + 1,
                            visitedIds: nextVisitedIds,
                        });
                    }}
                />
            );
        },
    };
};

const getComponents = ({
                           contextId,
                           replacement,
                           depth,
                           maxDepth,
                           visitedIds,
                       }) => {
    const replacementCacheId = getReplacementCacheId(replacement);
    const visitedKey = getVisitedKey(visitedIds);

    const cacheKey = [
        'components',
        contextId || '',
        replacementCacheId,
        depth,
        maxDepth,
        visitedKey,
    ].join('__');

    if (componentCache.has(cacheKey)) {
        return componentCache.get(cacheKey);
    }

    const components = createComponents({
        contextId,
        replacement,
        depth,
        maxDepth,
        visitedIds,
    });

    setComponentCache(cacheKey, components);

    return components;
};

function MarkdownRendererInner({
                                   contextId = '',
                                   content,
                                   replacement = {},
                                   depth = 0,
                                   maxDepth = 10,
                                   visitedIds = [],
                               }) {
    const components = useMemo(() => {
        return getComponents({
            contextId,
            replacement,
            depth,
            maxDepth,
            visitedIds,
        });
    }, [
        contextId,
        replacement,
        depth,
        maxDepth,
        visitedIds,
    ]);

    const processedContent = useMemo(() => {
        return preprocessContent(content);
    }, [content]);

    return (
        <ReactMarkdown
            remarkPlugins={[
                remarkGfm,
                remarkMath,
                remarkCardReplace,
                rehypeInlineCodeProperty,
            ]}
            rehypePlugins={[rehypeKatex]}
            components={components}
            urlTransform={allowCustomScheme}
        >
            {processedContent}
        </ReactMarkdown>
    );
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
        prev.contextId === next.contextId &&
        prev.content === next.content &&
        prev.replacement === next.replacement &&
        prev.depth === next.depth &&
        prev.maxDepth === next.maxDepth &&
        areVisitedIdsEqual(prev.visitedIds, next.visitedIds)
    );
});

export default MarkdownRenderer;