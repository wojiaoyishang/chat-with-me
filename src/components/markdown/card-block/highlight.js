import {toSafeString} from './utils.js';

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
        // Load Highlight.js through its public package entry. The previous Vite
        // node_modules glob could resolve to an empty language-module map in a
        // production build, leaving every code block monochrome even though the
        // Highlight.js core itself loaded successfully.
        loadingPromise = import('highlight.js')
            .then((module) => {
                hljs = module.default || module;
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
    if (!normalized) {
        return '';
    }
    return hljsInst.getLanguage(normalized) ? normalized : '';
};

export const highlightCode = async (code, language, {autoDetectUnknown = true} = {}) => {
    const codeString = toSafeString(code);
    const normalizedLanguage = normalizeHighlightLanguage(language);

    if (!codeString || !normalizedLanguage) {
        return {
            html: '',
            language: normalizedLanguage,
            highlighted: false,
        };
    }

    const hljsInst = await loadHljs();
    const loadedLanguage = await ensureHighlightLanguage(hljsInst, normalizedLanguage);

    try {
        if (loadedLanguage) {
            const result = hljsInst.highlight(codeString, {
                language: loadedLanguage,
                ignoreIllegals: true,
            });
            return {
                html: result.value,
                language: loadedLanguage,
                highlighted: true,
            };
        }

        if (autoDetectUnknown) {
            const result = hljsInst.highlightAuto(codeString);
            return {
                html: result.value,
                language: result.language || normalizedLanguage,
                highlighted: true,
            };
        }
    } catch (error) {
        console.error('Highlight failed:', error);
    }

    return {
        html: '',
        language: normalizedLanguage,
        highlighted: false,
    };
};
