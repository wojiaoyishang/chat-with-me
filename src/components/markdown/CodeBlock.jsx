import React, { useState, useMemo, memo } from 'react';
import hljs from 'highlight.js';
import './CodeBlock.css';

const CodeBlock = memo(({ codeString, language }) => {
    const [copied, setCopied] = useState(false);

    // 1. 使用 useMemo 处理高亮，避免在渲染路径中进行昂贵的计算
    // 同时也解决了流式传输时 innerHTML 频繁手动更新的问题
    const highlightedHtml = useMemo(() => {
        if (language && hljs.getLanguage(language)) {
            try {
                return hljs.highlight(codeString, {
                    language,
                    ignoreIllegals: true,
                }).value;
            } catch (e) {
                return codeString;
            }
        }
        return hljs.highlightAuto(codeString).value;
    }, [codeString, language]);

    // 2. 优化行号计算
    const lineCount = useMemo(() => {
        const lines = codeString.split('\n');
        if (lines.length > 1 && lines[lines.length - 1] === '') {
            return lines.length - 1;
        }
        return lines.length;
    }, [codeString]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <div className="code-container">
            <div className="code-toolbar">
                <div className="language-badge">{language || 'text'}</div>
                <button
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                >
                    {copied ? '已复制' : '复制'}
                </button>
            </div>
            <div className="code-area">
                <div className="line-numbers">
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <span key={i} className="line-number">{i + 1}</span>
                    ))}
                </div>
                <pre className="code-preview">
                    <code
                        className={`hljs language-${language}`}
                        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                    />
                </pre>
            </div>
        </div>
    );
});

export default CodeBlock;