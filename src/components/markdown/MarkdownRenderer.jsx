import React, {memo, useMemo} from 'react';
import ReactMarkdown, {defaultUrlTransform} from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import {componentBlockDirective, rehypeInlineCodeProperty} from './remarkDirectiveToComponent.js';
import CodeBlock from './CodeBlock.jsx';
import ComponentBlock from './ComponentBlock.jsx';
import 'katex/dist/katex.min.css';
import './CodeBlock.css';

import {BASE_BACKEND_URL} from '@/config';

import LazyVisibility from "./LazyVisibility.jsx";

// 链接处理
const allowCustomScheme = (uri, key, node) => {
    if (uri.startsWith('backend://')) {
        return uri.replace('backend://', BASE_BACKEND_URL + '/');
    }
    return defaultUrlTransform(uri, key, node);
};

// 预处理函数抽离
const preprocessContent = (text) => {
    if (typeof text !== 'string') return text;
    return text
        .replace(/\\\[/g, '$$$')
        .replace(/\\\]/g, '$$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
};

const MarkdownRenderer = ({
                              content,
                              withCustomComponent = true
                          }) => {
    // 使用 useMemo 缓存 components，防止流式传输时节点闪烁
    const components = useMemo(() => {
        return {
            p: ({children}) => <p className="my-2">{children}</p>,
            ul: ({children}) => <ul className="list-disc pl-5 my-2">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
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
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {children}
                </a>
            ),

            code({className, children, isCodeBlock, ...props}) {
                const match = /language-(.+)/.exec(className || '');
                const language = match ? match[1] : '';
                if (!isCodeBlock) {
                    return (
                        <code className="bg-gray-100 px-1 py-0.5 rounded-md text-xs font-mono text-gray-800" {...props}>
                            {children}
                        </code>
                    );
                }
                return (
                    <LazyVisibility>
                        <CodeBlock
                            codeString={String(children || '').replace(/\n$/, '')}
                            language={language}
                        />
                    </LazyVisibility>
                );
            },
            table: ({children}) => (
                <div className="my-4 w-full overflow-hidden rounded-xl border border-gray-200">
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
                return <img src={src} alt={alt} {...props} />;
            },
            'component-block': (props) => {
                const {type, id, component, rawContent, children} = props;

                if (withCustomComponent && component === 'card') {

                    return (
                        <ComponentBlock
                            key={id}
                            id={id}
                            type={type}
                            content={rawContent}
                        />
                    );
                }
                return null;
            }
        };
    }, [withCustomComponent]);

    const processedContent = useMemo(() =>
            preprocessContent(content),
        [content]
    );

    return (
        <ReactMarkdown
            remarkPlugins={[
                remarkGfm,
                remarkMath,
                remarkDirective,
                ...(withCustomComponent ? [componentBlockDirective] : []),
                rehypeInlineCodeProperty
            ]}
            rehypePlugins={[rehypeKatex]}
            components={components}
            urlTransform={allowCustomScheme}
        >
            {processedContent}
        </ReactMarkdown>
    );
};
export default memo(MarkdownRenderer, (prev, next) => {
    return (
        prev.content === next.content &&
        prev.index === next.index &&
        prev.withCustomComponent === next.withCustomComponent
    );
});