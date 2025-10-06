import React, { useRef, useEffect, useState } from 'react';
import hljs from 'highlight.js';

export default function CodeBlock({ codeString, language, index }) {
    const preRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (preRef.current && language) {
            try {
                const highlighted = hljs.highlight(codeString, {
                    language,
                    ignoreIllegals: true,
                }).value;
                preRef.current.innerHTML = highlighted;
            } catch (e) {
                preRef.current.textContent = codeString;
            }
        } else {
            preRef.current.textContent = codeString;
        }
    }, [codeString, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative my-6 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            {/* 语言标签 */}
            {language && (
                <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 border-b border-gray-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="text-gray-700 capitalize">{language}</span>
                </div>
            )}

            {/* 代码区域 */}
            <pre
                ref={preRef}
                className="p-5 text-sm leading-relaxed overflow-x-auto max-h-[480px] font-['JetBrains_Mono','Fira_Code','ui-monospace','SFMono-Regular',Monaco,monospace] text-gray-800"
            >
                <code className={`language-${language} hljs`} />
            </pre>

            {/* 优化尺寸的复制按钮 */}
            <button
                onClick={handleCopy}
                className={`
                    absolute top-1/35 right-3 p-1.5 rounded-md text-xs transition-all duration-200 
                    flex items-center gap-1 backdrop-blur-sm cursor-pointer
                    ${copied
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-white/90 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }
                `}
                title={copied ? "已复制" : "复制代码"}
                aria-label={copied ? "已复制" : "复制代码"}
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg t="1759766378004" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4752" width="16" height="16">
                        <path
                            d="M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z"
                            fill="#8a8a8a" p-id="4753"></path>
                    </svg>
                )}
            </button>
        </div>
    );
}