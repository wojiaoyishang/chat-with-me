import React, { useState, useMemo, useEffect, memo } from 'react';
import './CodeBlock.css';

// 使用 import.meta.glob 静态收集所有语言模块（Vite 会将其转为实际 import）
const languageModules = import.meta.glob('/node_modules/highlight.js/es/languages/*.js');

const CodeBlock = memo(({ codeString, language }) => {
    const [copied, setCopied] = useState(false);
    const [highlightedHtml, setHighlightedHtml] = useState(codeString);
    const [hljsInstance, setHljsInstance] = useState(null);

    // 加载 highlight.js 核心
    useEffect(() => {
        import('highlight.js/lib/core')
            .then((module) => {
                setHljsInstance(module.default);
            })
            .catch((err) => {
                console.error('Failed to load highlight.js core:', err);
            });
    }, []);

    // 高亮逻辑
    useEffect(() => {
        if (!hljsInstance || !codeString) return;

        const highlightCode = async () => {
            if (language) {
                if (!hljsInstance.getLanguage(language)) {
                    const langPath = `/node_modules/highlight.js/es/languages/${language}.js`;
                    const loadModule = languageModules[langPath];

                    if (loadModule) {
                        try {
                            const mod = await loadModule();
                            hljsInstance.registerLanguage(language, mod.default);
                        } catch (err) {
                            console.error(`Failed to load language module for: ${language}`, err);
                            setHighlightedHtml(codeString);
                            return;
                        }
                    } else {
                        console.warn(`Language not supported or not found in glob: ${language}`);
                        setHighlightedHtml(codeString);
                        return;
                    }
                }

                try {
                    const result = hljsInstance.highlight(codeString, {
                        language,
                        ignoreIllegals: true,
                    });
                    setHighlightedHtml(result.value);
                } catch (err) {
                    console.error('Highlighting failed:', err);
                    setHighlightedHtml(codeString);
                }
            } else {
                // 自动检测语言
                try {
                    const result = hljsInstance.highlightAuto(codeString);
                    setHighlightedHtml(result.value);
                } catch (err) {
                    console.error('Auto-highlight failed:', err);
                    setHighlightedHtml(codeString);
                }
            }
        };

        highlightCode();
    }, [hljsInstance, codeString, language]);

    // 计算行数
    const lineCount = useMemo(() => {
        const lines = codeString.split('\n');
        if (lines.length > 1 && lines[lines.length - 1] === '') {
            return lines.length - 1;
        }
        return lines.length;
    }, [codeString]);

    // 复制逻辑
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
                        className={`hljs language-${language || ''}`}
                        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                    />
                </pre>
            </div>
        </div>
    );
});

export default CodeBlock;