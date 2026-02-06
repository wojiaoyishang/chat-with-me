import React, { useState, useMemo, useEffect, useLayoutEffect, useRef, memo } from 'react';
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
                return hljs;
            })
            .finally(() => {
                loadingPromise = null;
            });
    }
    return loadingPromise;
};

const CodeBlock = memo(({ codeString = '', language }) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef(null);

    // 高亮逻辑，使用 useLayoutEffect 以在绘制前尽可能同步高亮
    useLayoutEffect(() => {
        if (!codeString || !codeRef.current) {
            return;
        }

        const doHighlight = async () => {
            const hljsInst = await loadHljs();

            if (language && !hljsInst.getLanguage(language) && !window.hljsFailedLanguages.has(language)) {
                const langPath = `/node_modules/highlight.js/es/languages/${language}.js`;
                const loadModule = languageModules[langPath];

                if (loadModule) {
                    try {
                        const mod = await loadModule();
                        hljsInst.registerLanguage(language, mod.default);
                    } catch (err) {
                        console.error(`Failed to load language module for: ${language}`, err);
                        window.hljsFailedLanguages.add(language);
                    }
                } else {
                    console.warn(`Language not supported: ${language}`);
                    window.hljsFailedLanguages.add(language);
                }
            }

            // 高亮元素
            try {
                hljsInst.highlightElement(codeRef.current);
            } catch (err) {
                console.error('Highlight failed:', err);
            }
        };

        doHighlight();
    }, [codeString, language]);

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
                            <span key={i} className="line-number">{i + 1}</span>
                        ))}
                    </div>
                )}
                <pre className="code-preview">
                    <code
                        ref={codeRef}
                        className={`hljs ${language ? `language-${language}` : ''}`}
                    >
                        {codeString}
                    </code>
                </pre>
            </div>
        </div>
    );
});

export default CodeBlock;