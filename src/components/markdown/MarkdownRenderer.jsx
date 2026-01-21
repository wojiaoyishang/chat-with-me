import React, { useState, useCallback, useMemo, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkDirectiveToComponent from './remarkDirectiveToComponent.js';

import CodeBlock from './CodeBlock.jsx';
import ComponentBlock from './ComponentBlock.jsx';

import 'katex/dist/katex.min.css';
import './CodeBlock.css';

// 预处理函数抽离
const preprocessContent = (text) => {
    if (typeof text !== 'string') return text;
    return text
        .replace(/\\\[/g, '$$$')
        .replace(/\\\]/g, '$$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
};

const MarkdownRenderer = ({ content, index }) => {
    const [expandedMap, setExpandedMap] = useState(new Map());

    // 稳定的切换逻辑
    const handleToggleExpand = useCallback((id) => {
        setExpandedMap((prev) => {
            const next = new Map(prev);
            if (next.has(id)) next.delete(id);
            else next.set(id, true);
            return next;
        });
    }, []);

    // 使用 useMemo 缓存 components，防止流式传输时节点闪烁
    const components = useMemo(() => ({
        p: ({ children }) => <p className="my-2">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
        li: ({ children }) => <li className="my-1">{children}</li>,
        h1: ({ children }) => <h1 className="text-xl font-bold my-3">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold my-2">{children}</h2>,
        hr: () => <hr className="my-4 border-t border-gray-300" />,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600">
                {children}
            </blockquote>
        ),
        a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {children}
            </a>
        ),
        code({ inline, className, children, ...props }) {
            const match = /language-(.+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className || inline;

            if (isInline) {
                return (
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                        {children}
                    </code>
                );
            }

            return (
                <CodeBlock
                    codeString={String(children).replace(/\n$/, '')}
                    language={language}
                    index={index}
                />
            );
        },
        'component-block': (props) => {
            const { type, id, component, children } = props;
            if (component === 'card') {
                const cardContent = React.Children.toArray(children)
                    .map(child => child?.props?.children || '')
                    .join('');
                return (
                    <ComponentBlock
                        key={id}
                        id={id}
                        type={type}
                        content={cardContent}
                        isExpanded={expandedMap.has(id)}
                        onToggleExpand={handleToggleExpand}
                    />
                );
            }
            return null;
        },
    }), [expandedMap, handleToggleExpand, index]); // 仅在这些依赖变化时才重造 components 对象

    return (
        <ReactMarkdown
            remarkPlugins={[
                remarkGfm,
                remarkMath,
                remarkDirective,
                remarkDirectiveToComponent,
            ]}
            rehypePlugins={[rehypeKatex]}
            components={components}
        >
            {preprocessContent(content)}
        </ReactMarkdown>
    );
};

export default memo(MarkdownRenderer);