import React, {useEffect, useState, useRef, useCallback} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import CodeBlock from './CodeBlock.jsx';
import ComponentBlock from './ComponentBlock.jsx';

import remarkDirective from 'remark-directive';
import remarkDirectiveToComponent from './remarkDirectiveToComponent.js'

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

const MarkdownRenderer = ({content, index}) => {
    const [expandedMap, setExpandedMap] = useState(new Map());

    const handleToggleExpand = useCallback((id) => {
        console.log(id);
        setExpandedMap(prev => {
            const next = new Map(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.set(id, true);
            }
            return next;
        });
    }, []);

    return (
        <ReactMarkdown
            remarkPlugins={[
                remarkGfm,
                remarkMath,
                remarkDirective,
                remarkDirectiveToComponent
            ]}
            rehypePlugins={[rehypeKatex]}
            components={{

                // 原有组件保持不变
                p: ({children}) => <p className="my-2">{children}</p>,
                ul: ({children}) => <ul className="list-disc pl-5 my-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
                li: ({children}) => <li className="my-1">{children}</li>,
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
                h1: ({children}) => <h1 className="text-xl font-bold my-3">{children}</h1>,
                h2: ({children}) => <h2 className="text-lg font-semibold my-2">{children}</h2>,
                blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600">
                        {children}
                    </blockquote>
                ),
                code({inline, className, children, ...props}) {
                    if (inline) {
                        return (
                            <code
                                className="bg-gray-100 px-1.5 py-0.5 rounded-md text-sm font-mono"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }

                    const match = /language-(.+)/.exec(className || '');
                    const language = match?.[1] || '';
                    const codeString = String(children).replace(/\n$/, '');

                    // if (language.startsWith('custom:')) {
                    //     const type = language.slice('custom:'.length);
                    //     return <ComponentBlock type={type} content={codeString}/>;
                    // }

                    return <CodeBlock codeString={codeString} language={language} index={index}/>;
                },

                'component-block': ({ 'type': type, 'id': id, children, ...props }) => {
                    if (props.component === 'card') {
                        let content = React.Children.toArray(children)
                            .map(child => child.props?.children || '')
                            .join('');

                        if (id === undefined) {
                            type = 'error';
                            content = 'Undefined ID.'
                        }

                        return (
                            <ComponentBlock
                                key={id}
                                id={id}
                                type={type}
                                content={content}
                                isExpanded={expandedMap.has(id)}
                                onToggleExpand={handleToggleExpand}
                            />
                        );
                    }
                    return null;
                },

            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;