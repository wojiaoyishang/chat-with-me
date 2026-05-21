import { toSafeString } from './utils.js';

// 使用 import.meta.glob 静态收集所有语言模块，供 toolCommand 按需加载高亮语言。
const languageModules = import.meta.glob('/node_modules/highlight.js/es/languages/*.js');

if (typeof window !== 'undefined' && !window.hljsFailedLanguages) {
    window.hljsFailedLanguages = new Set();
}

let hljs = null;
let loadingPromise = null;

export const loadHljs = () => {
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

const HIGHLIGHT_LANGUAGE_ALIASES = {
    csharp: 'csharp',
    'c#': 'csharp',
    cpp: 'cpp',
    'c++': 'cpp',
    html: 'xml',
    js: 'javascript',
    md: 'markdown',
    py: 'python',
    python3: 'python',
    shell: 'bash',
    sh: 'bash',
    ts: 'typescript',
};

export const normalizeHighlightLanguage = (language) => {
    const normalized = toSafeString(language).trim().toLowerCase();

    if (!normalized) {
        return '';
    }

    return HIGHLIGHT_LANGUAGE_ALIASES[normalized] || normalized;
};

export const ensureHighlightLanguage = async (hljsInst, language) => {
    const failedLanguages = typeof window !== 'undefined'
        ? window.hljsFailedLanguages
        : null;

    if (
        !language ||
        hljsInst.getLanguage(language) ||
        (failedLanguages && failedLanguages.has(language))
    ) {
        return;
    }

    const langPath = `/node_modules/highlight.js/es/languages/${language}.js`;
    const loadModule = languageModules[langPath];

    if (!loadModule) {
        failedLanguages?.add(language);
        return;
    }

    try {
        const mod = await loadModule();
        hljsInst.registerLanguage(language, mod.default);
    } catch (err) {
        console.error(`Failed to load language module for: ${language}`, err);
        failedLanguages?.add(language);
    }
};
