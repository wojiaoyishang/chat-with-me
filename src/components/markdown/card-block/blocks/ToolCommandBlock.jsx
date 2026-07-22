import {
    memo,
    useLayoutEffect,
    useMemo,
    useRef,
} from 'react';

import {
    ensureHighlightLanguage,
    loadHljs,
    normalizeHighlightLanguage,
} from '../highlight.js';
import { toSafeString } from '../utils.js';
import OutputToolbar from './OutputToolbar.jsx';
import useFollowOutputScroll from './useFollowOutputScroll.js';

const TOOL_COMMAND_CODE_RE = /^\s*\[CODE:([^\]]+)]\s*(?:\r?\n|$)/i;

const parseToolCommandContent = (content) => {
    const safeContent = toSafeString(content).replace(/^\uFEFF/, '');
    const match = safeContent.match(TOOL_COMMAND_CODE_RE);

    if (!match) {
        return {
            codeString: safeContent,
            language: 'text',
        };
    }

    const rawLanguage = match[1].trim();
    const language = normalizeHighlightLanguage(rawLanguage) || 'text';

    return {
        codeString: safeContent.slice(match[0].length),
        language,
    };
};

const ToolCommandBlock = memo(({content = '', id}) => {
    const codeRef = useRef(null);

    const {
        codeString,
        language,
    } = useMemo(() => {
        return parseToolCommandContent(content);
    }, [content]);

    const {
        handleScroll,
        handleTouchMove,
        handleWheel,
        isFollowing,
        resumeFollowing,
        scrollContainerRef,
        toggleFollowing,
    } = useFollowOutputScroll({
        contentKey: codeString,
    });

    useLayoutEffect(() => {
        if (!codeString || !codeRef.current || language === 'text') {
            return undefined;
        }

        let isDisposed = false;

        const doHighlight = async () => {
            const hljsInst = await loadHljs();

            if (isDisposed || !codeRef.current) {
                return;
            }

            await ensureHighlightLanguage(hljsInst, language);

            if (isDisposed || !codeRef.current) {
                return;
            }

            if (codeRef.current.dataset.highlighted) {
                delete codeRef.current.dataset.highlighted;
            }

            try {
                hljsInst.highlightElement(codeRef.current);
            } catch (err) {
                console.error('Highlight failed:', err);
            }
        };

        doHighlight();

        return () => {
            isDisposed = true;
        };
    }, [codeString, language]);

    if (!codeString.trim()) {
        return null;
    }

    return (
        <div
            className="card-tool-command-soft-breathe relative my-1.5 overflow-hidden rounded-lg border border-sky-200/80 bg-sky-50/90 text-slate-700 shadow-[0_8px_24px_rgba(14,165,233,0.08)]"
            data-card-block-id={id}
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/65 via-sky-50/20 to-sky-100/45"/>
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-200/30 blur-2xl"/>

            <div className="relative overflow-hidden">
                <OutputToolbar
                    copyContent={codeString}
                    isFollowing={isFollowing}
                    onScrollToBottom={resumeFollowing}
                    onToggleFollowing={toggleFollowing}
                    tone="sky"
                />

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    onTouchMove={handleTouchMove}
                    onWheel={handleWheel}
                    className="pretty-scrollbar relative max-h-[260px] overflow-auto [scrollbar-gutter:stable]"
                >
                    <pre
                        className="m-0 min-w-max bg-transparent px-3 py-2.5 text-[11px] leading-5 text-slate-700"
                        style={{background: 'transparent'}}
                    >
                        <code
                            ref={codeRef}
                            className={`hljs block bg-transparent font-mono text-[11px] leading-5 text-inherit ${language ? `language-${language}` : ''}`}
                            style={{background: 'transparent', color: 'inherit', padding: 0}}
                        >
                            {codeString}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.content === next.content
    );
});

ToolCommandBlock.displayName = 'ToolCommandBlock';

export default ToolCommandBlock;
