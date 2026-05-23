import React, { useState, useMemo, useLayoutEffect, useRef, memo } from 'react';
import './CodeBlock.css';

// 使用 import.meta.glob 静态收集所有语言模块
const languageModules = import.meta.glob('/node_modules/highlight.js/es/languages/*.js');

// 全局失败语言缓存（使用 window 以确保跨组件共享）
if (!window.hljsFailedLanguages) {
    window.hljsFailedLanguages = new Set();
}

// 全局 hljs 实例和加载 promise
let hljs = null;
let loadingPromise = null;

const loadHljs = () => {
    if (hljs) {
        return Promise.resolve(hljs);
    }

    if (!loadingPromise) {
        loadingPromise = import('highlight.js/lib/core')
            .then((module) => {
                hljs = module.default;

                // 兜底：即使外部传入了 nohighlight / language-text，也跳过高亮
                hljs.configure({
                    noHighlightRe: /\b(?:no-?highlight|language-text|language-plain|language-plaintext|language-txt|language-none)\b/i
                });

                return hljs;
            })
            .finally(() => {
                loadingPromise = null;
            });
    }

    return loadingPromise;
};

// 这些语言视为纯文本，不进行 highlight.js 高亮
const NO_HIGHLIGHT_LANGS = new Set([
    'text',
    'txt',
    'plain',
    'plaintext',
    'none'
]);

const normalizeLanguage = (language) => {
    const lang = language?.toLowerCase?.().trim();

    if (!lang || NO_HIGHLIGHT_LANGS.has(lang)) {
        return '';
    }

    return lang;
};

const CodeBlock = memo(({ codeString = '', language }) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef(null);

    const normalizedLanguage = useMemo(() => {
        return normalizeLanguage(language);
    }, [language]);

    // 高亮逻辑，使用 useLayoutEffect 以在绘制前尽可能同步高亮
    useLayoutEffect(() => {
        if (!codeString || !codeRef.current || !normalizedLanguage) {
            return;
        }

        let cancelled = false;

        const doHighlight = async () => {
            const hljsInst = await loadHljs();

            if (cancelled || !codeRef.current) {
                return;
            }

            if (
                !hljsInst.getLanguage(normalizedLanguage) &&
                !window.hljsFailedLanguages.has(normalizedLanguage)
            ) {
                // 映射语言表
                const mapping_language = {
                    html: 'xml'
                };

                const realLanguage = mapping_language[normalizedLanguage] || normalizedLanguage;
                const langPath = `/node_modules/highlight.js/es/languages/${realLanguage}.js`;
                const loadModule = languageModules[langPath];

                if (loadModule) {
                    try {
                        const mod = await loadModule();

                        if (cancelled || !codeRef.current) {
                            return;
                        }

                        hljsInst.registerLanguage(normalizedLanguage, mod.default);
                    } catch (err) {
                        console.error(`Failed to load language module for: ${normalizedLanguage}`, err);
                        window.hljsFailedLanguages.add(normalizedLanguage);
                        return;
                    }
                } else {
                    window.hljsFailedLanguages.add(normalizedLanguage);
                    return;
                }
            }

            // 如果语言已经记录为加载失败，则不要继续 highlightElement
            // 否则 highlight.js 仍然会因为找不到语言而输出 WARN
            if (window.hljsFailedLanguages.has(normalizedLanguage)) {
                return;
            }

            // 在高亮前重置高亮状态，以允许重新高亮
            if (codeRef.current?.dataset?.highlighted) {
                delete codeRef.current.dataset.highlighted;
            }

            // 高亮元素
            try {
                hljsInst.highlightElement(codeRef.current);
            } catch (err) {
                console.error('Highlight failed:', err);
            }
        };

        doHighlight();

        return () => {
            cancelled = true;
        };
    }, [codeString, normalizedLanguage]);

    // 计算行数
    const lineCount = useMemo(() => {
        if (!codeString) return 0;

        const lines = codeString.split('\n');

        if (lines.length > 1 && lines[lines.length - 1] === '') {
            return lines.length - 1;
        }

        return lines.length;
    }, [codeString]);

    const handleCopy = async () => {
        if (!codeString) return;

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
                    className={`copy-button rounded-md ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    disabled={!codeString}
                >
                    {copied ? '已复制' : '复制'}
                </button>
            </div>

            <div className="code-area">
                {lineCount > 0 && (
                    <div className="line-numbers">
                        {Array.from({ length: lineCount }).map((_, i) => (
                            <span key={i} className="line-number">
                                {i + 1}
                            </span>
                        ))}
                    </div>
                )}

                <pre className="code-preview pretty-scrollbar">
                    <code
                        ref={codeRef}
                        className={
                            normalizedLanguage
                                ? `hljs language-${normalizedLanguage}`
                                : 'hljs nohighlight'
                        }
                    >
                        {codeString}
                    </code>
                </pre>
            </div>
        </div>
    );
});

export default CodeBlock;