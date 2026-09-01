import { toSafeString } from './utils.js';

// highlight.js v11 publishes language modules under lib/languages. Keeping one
// Vite glob here avoids separate, drifting loaders in Markdown and Tool cards.
const languageModules = import.meta.glob('/node_modules/highlight.js/lib/languages/*.js');

if (typeof window !== 'undefined' && !window.hljsFailedLanguages) {
    window.hljsFailedLanguages = new Set();
}

let hljs = null;
let loadingPromise = null;

const NO_HIGHLIGHT_LANGS = new Set([
    'text',
    'txt',
    'plain',
    'plaintext',
    'none',
    'nohighlight',
    'no-highlight',
]);

const HIGHLIGHT_LANGUAGE_ALIASES = {
    'c#': 'csharp',
    'c++': 'cpp',
    cjs: 'javascript',
    cs: 'csharp',
    html: 'xml',
    htm: 'xml',
    js: 'javascript',
    jsx: 'javascript',
    mjs: 'javascript',
    md: 'markdown',
    py: 'python',
    py3: 'python',
    python3: 'python',
    rb: 'ruby',
    rs: 'rust',
    shell: 'bash',
    sh: 'bash',
    zsh: 'bash',
    ts: 'typescript',
    tsx: 'typescript',
    vue: 'xml',
    svg: 'xml',
    yml: 'yaml',
};

export const loadHljs = () => {
    if (hljs) {
        return Promise.resolve(hljs);
    }

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

export const normalizeHighlightLanguage = (language) => {
    const normalized = toSafeString(language).trim().toLowerCase();
    if (!normalized || NO_HIGHLIGHT_LANGS.has(normalized)) {
        return '';
    }
    return HIGHLIGHT_LANGUAGE_ALIASES[normalized] || normalized;
};

export const ensureHighlightLanguage = async (hljsInst, language) => {
    const normalized = normalizeHighlightLanguage(language);
    if (!normalized || hljsInst.getLanguage(normalized)) {
        return normalized;
    }

    const failedLanguages = typeof window !== 'undefined'
        ? window.hljsFailedLanguages
        : null;
    if (failedLanguages?.has(normalized)) {
        return '';
    }

    const langPath = `/node_modules/highlight.js/lib/languages/${normalized}.js`;
    const loadModule = languageModules[langPath];

    if (!loadModule) {
        failedLanguages?.add(normalized);
        return '';
    }

    try {
        const mod = await loadModule();
        hljsInst.registerLanguage(normalized, mod.default);
        return normalized;
    } catch (err) {
        console.error(`Failed to load language module for: ${normalized}`, err);
        failedLanguages?.add(normalized);
        return '';
    }
};
