import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Check, Copy} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {copyTextToClipboard} from '@/lib/tools.jsx';
import './CodeBlock.css';

// 使用 import.meta.glob 静态收集所有语言模块。
const languageModules = import.meta.glob('/node_modules/highlight.js/es/languages/*.js');

const MAX_HIGHLIGHT_CHARACTERS = 120_000;
const MAX_HIGHLIGHT_LINES = 2_500;
const MAX_LINE_NUMBER_COUNT = 5_000;
const COPY_RESET_DELAY_MS = 1_800;

// 全局失败语言缓存（跨 CodeBlock 复用，避免重复加载失败模块）。
if (!window.hljsFailedLanguages) {
    window.hljsFailedLanguages = new Set();
}

let hljs = null;
let loadingPromise = null;

const loadHljs = () => {
    if (hljs) return Promise.resolve(hljs);

    if (!loadingPromise) {
        loadingPromise = import('highlight.js/lib/core')
            .then((module) => {
                hljs = module.default;
                hljs.configure({
                    noHighlightRe: /\b(?:no-?highlight|language-text|language-plain|language-plaintext|language-txt|language-none)\b/i,
                });
                return hljs;
            })
            .finally(() => {
                loadingPromise = null;
            });
    }

    return loadingPromise;
};

const NO_HIGHLIGHT_LANGS = new Set([
    'text',
    'txt',
    'plain',
    'plaintext',
    'none',
]);

const normalizeLanguage = (language) => {
    const lang = language?.toLowerCase?.().trim();
    if (!lang || NO_HIGHLIGHT_LANGS.has(lang)) return '';
    return lang;
};

const scheduleIdleWork = (callback) => {
    if (typeof window.requestIdleCallback === 'function') {
        const handle = window.requestIdleCallback(callback, {timeout: 280});
        return () => window.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(callback, 32);
    return () => window.clearTimeout(handle);
};

const CodeBlock = memo(({codeString = '', language}) => {
    const {t} = useTranslation();
    const [copied, setCopied] = useState(false);
    const codeRef = useRef(null);
    const copyResetTimerRef = useRef(null);

    const normalizedLanguage = useMemo(() => normalizeLanguage(language), [language]);
    const displayLanguage = useMemo(
        () => String(language || 'text').trim().toLowerCase() || 'text',
        [language],
    );

    const lineCount = useMemo(() => {
        if (!codeString) return 0;

        let count = 1;
        let cursor = -1;
        while ((cursor = codeString.indexOf('\n', cursor + 1)) !== -1) {
            count += 1;
        }
        return codeString.endsWith('\n') ? Math.max(0, count - 1) : count;
    }, [codeString]);

    const showLineNumbers = lineCount > 0 && lineCount <= MAX_LINE_NUMBER_COUNT;

    // 单个文本节点替代逐行 React 节点，超长代码则省略行号栏。
    const lineNumbersText = useMemo(() => {
        if (!showLineNumbers) return '';
        return Array.from({length: lineCount}, (_, index) => index + 1).join('\n');
    }, [lineCount, showLineNumbers]);

    const shouldHighlight = Boolean(
        normalizedLanguage
        && codeString.length <= MAX_HIGHLIGHT_CHARACTERS
        && lineCount <= MAX_HIGHLIGHT_LINES,
    );

    // 高亮延后到浏览器空闲时执行；流式代码更新会取消旧任务，只处理最新内容。
    useEffect(() => {
        const codeElement = codeRef.current;
        if (!codeElement) return undefined;

        // highlight.js 会改写 innerHTML；每次先恢复最新纯文本，避免语言切换或流式更新残留旧节点。
        if (codeElement.dataset.highlighted) {
            delete codeElement.dataset.highlighted;
        }
        codeElement.textContent = codeString;

        if (!codeString || !shouldHighlight) return undefined;

        let cancelled = false;
        const cancelIdleWork = scheduleIdleWork(async () => {
            const hljsInst = await loadHljs();
            if (cancelled || !codeRef.current) return;

            if (
                !hljsInst.getLanguage(normalizedLanguage)
                && !window.hljsFailedLanguages.has(normalizedLanguage)
            ) {
                const mappedLanguage = normalizedLanguage === 'html' ? 'xml' : normalizedLanguage;
                const languagePath = `/node_modules/highlight.js/es/languages/${mappedLanguage}.js`;
                const loadModule = languageModules[languagePath];

                if (!loadModule) {
                    window.hljsFailedLanguages.add(normalizedLanguage);
                    return;
                }

                try {
                    const module = await loadModule();
                    if (cancelled || !codeRef.current) return;
                    hljsInst.registerLanguage(normalizedLanguage, module.default);
                } catch (error) {
                    console.error(`Failed to load language module for: ${normalizedLanguage}`, error);
                    window.hljsFailedLanguages.add(normalizedLanguage);
                    return;
                }
            }

            if (window.hljsFailedLanguages.has(normalizedLanguage) || !codeRef.current) return;

            if (codeRef.current.dataset.highlighted) {
                delete codeRef.current.dataset.highlighted;
            }

            try {
                hljsInst.highlightElement(codeRef.current);
            } catch (error) {
                console.error('Highlight failed:', error);
            }
        });

        return () => {
            cancelled = true;
            cancelIdleWork();
        };
    }, [codeString, normalizedLanguage, shouldHighlight]);

    useEffect(() => () => {
        if (copyResetTimerRef.current) {
            window.clearTimeout(copyResetTimerRef.current);
        }
    }, []);

    const handleCopy = useCallback(async () => {
        if (!codeString) return;

        try {
            await copyTextToClipboard(codeString);
            setCopied(true);
            if (copyResetTimerRef.current) {
                window.clearTimeout(copyResetTimerRef.current);
            }
            copyResetTimerRef.current = window.setTimeout(() => {
                setCopied(false);
                copyResetTimerRef.current = null;
            }, COPY_RESET_DELAY_MS);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    }, [codeString]);

    const copyLabel = copied
        ? t('code_block_copied', '已复制')
        : t('code_block_copy', '复制代码');
    const codeBlockLabel = `${displayLanguage} ${t('code_block_label', '代码块')}`;

    return (
        <section className="code-container" aria-label={codeBlockLabel}>
            <header className="code-toolbar">
                <span className="language-badge" title={displayLanguage}>
                    {displayLanguage}
                </span>
                <button
                    type="button"
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    disabled={!codeString}
                    aria-label={copyLabel}
                    title={copyLabel}
                >
                    {copied
                        ? <Check size={15} strokeWidth={2} aria-hidden="true"/>
                        : <Copy size={15} strokeWidth={1.8} aria-hidden="true"/>}
                </button>
            </header>

            <div className="code-area">
                {showLineNumbers && (
                    <div className="line-numbers" aria-hidden="true">
                        {lineNumbersText}
                    </div>
                )}

                <pre className="code-preview pretty-scrollbar">
                    <code
                        ref={codeRef}
                        className={
                            shouldHighlight
                                ? `hljs language-${normalizedLanguage}`
                                : 'hljs nohighlight'
                        }
                    >
                        {codeString}
                    </code>
                </pre>
            </div>
        </section>
    );
});

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
