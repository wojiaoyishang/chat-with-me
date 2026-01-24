import React, {useState, useCallback, useMemo, memo} from 'react';
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

// 函数用于将 React 元素序列化为 Markdown 字符串
const serializeToMarkdown = (node) => {
    if (node == null) return '';
    if (typeof node === 'string' || typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(serializeToMarkdown).join('');
    const childrenText = serializeToMarkdown(node.props?.children);
    const type = typeof node.type === 'string' ? node.type : (node.type?.name || '');
    switch (type) {
        case 'p':
            return childrenText + '\n\n';
        case 'h1':
            return '# ' + childrenText + '\n\n';
        case 'h2':
            return '## ' + childrenText + '\n\n';
        case 'ul':
            return childrenText + '\n\n';
        case 'ol':
            return childrenText + '\n\n';
        case 'li':
            return '- ' + childrenText + '\n';
        case 'blockquote':
            return '> ' + childrenText.replace(/\n/g, '\n> ') + '\n\n';
        case 'a':
            return '[' + childrenText + '](' + (node.props.href || '') + ')';
        case 'strong':
            return '**' + childrenText + '**';
        case 'em':
            return '*' + childrenText + '*';
        case 'code':
            if (node.props.inline) {
                return '`' + childrenText + '`';
            }
            return '```' + (node.props.className?.replace('language-', '') || '') + '\n' + childrenText + '\n```\n';
        case 'CodeBlock':
            return '```' + (node.props.language || '') + '\n' + (node.props.codeString || '') + '\n```\n';
        case 'hr':
            return '---\n\n';
        default:
            return childrenText;
    }
};

const MarkdownRenderer = ({
                              content,
                              index,
                              expandedMap: externalExpandedMap,
                              onToggleExpand: externalOnToggleExpand
                          }) => {
    // 内部状态作为后备，支持独立使用
    const [internalExpandedMap, setInternalExpandedMap] = useState(new Map());
    // 内部切换函数
    const internalToggleExpand = useCallback((id) => {
        setInternalExpandedMap((prev) => {
            const next = new Map(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.set(id, true);
            }
            return next;
        });
    }, []);
    // 使用外部传入的或内部的状态
    const expandedMap = externalExpandedMap || internalExpandedMap;
    const onToggleExpand = externalOnToggleExpand || internalToggleExpand;
    // 使用 useMemo 缓存 components，防止流式传输时节点闪烁
    const components = useMemo(() => ({
        p: ({children}) => <p className="my-2">{children}</p>,
        ul: ({children}) => <ul className="list-disc pl-5 my-2">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
        li: ({children}) => <li className="my-1">{children}</li>,
        h1: ({children}) => <h1 className="text-xl font-bold my-3">{children}</h1>,
        h2: ({children}) => <h2 className="text-lg font-semibold my-2">{children}</h2>,
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
        code: ({children, ...props}) => {

            const firstLine = children.split('\n')[0];

            const match = firstLine.match(/^```([a-zA-Z0-9_+-]+)$/);
            const language = match ? match[1] : '';

            if (match) {
                return (
                    <CodeBlock
                        codeString={children.trim().split('\n').slice(1, -1).join('\n')}
                        language={language}
                        index={index}
                    />
                );
            } else {
                return (
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                        {children}
                    </code>
                );
            }
        },
        'component-block': (props) => {
            const {type, id, component, children} = props;
            if (component === 'card') {
                const cardContent = serializeToMarkdown(children);
                return (
                    <ComponentBlock
                        key={id}
                        id={id}
                        type={type}
                        content={cardContent}
                        isExpanded={expandedMap?.has(id) ?? false}
                        onToggleExpand={onToggleExpand}
                    />
                );
            }
            return null;
        },
    }), [expandedMap, onToggleExpand, index]);
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
                remarkDirectiveToComponent,
            ]}
            rehypePlugins={[rehypeKatex]}
            components={components}
        >
            {processedContent}
        </ReactMarkdown>
    );
};
export default memo(MarkdownRenderer, (prev, next) => {
    // 只在 content 或 expandedMap 真正变化时才重新渲染
    return (
        prev.content === next.content &&
        prev.index === next.index &&
        prev.expandedMap === next.expandedMap
    );
});