import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';

export default function CodeBlock({ codeString, language, index }) {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (codeRef.current && language) {
            try {
                const highlighted = hljs.highlight(codeString, {
                    language,
                    ignoreIllegals: true,
                }).value;
                codeRef.current.innerHTML = highlighted;
            } catch (e) {
                codeRef.current.textContent = codeString;
            }
        } else if (codeRef.current) {
            codeRef.current.textContent = codeString;
        }
    }, [codeString, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('复制失败:', err);
        }
    };

    const lines = codeString.split('\n');

    return (
        <div className="code-container">
            <div className="code-toolbar">
                <div className="language-badge">
                    {language || 'text'}
                </div>
                <button
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                >
                    {copied ? (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            已复制
                        </>
                    ) : (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            复制
                        </>
                    )}
                </button>
            </div>

            <div className="code-area">
                <div className="line-numbers">
                    {lines.map((_, i) => (
                        <span key={i} className="line-number">
              {i + 1}
            </span>
                    ))}
                </div>
                <pre className="code-preview pretty-scrollbar">
                  <code ref={codeRef} className={`language-${language}`} />
                </pre>
            </div>
        </div>
    );
}