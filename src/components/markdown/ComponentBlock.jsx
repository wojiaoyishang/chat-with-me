import React from 'react';
import { getLastLine } from "@/lib/tools.js";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";

const ComponentBlock = ({ type, content, id, isExpanded, onToggleExpand }) => {
    switch (type) {
        case 'processing':
            const rawLastLine = getLastLine(content);
            const lastLine = rawLastLine.trim();
            const isDone = lastLine === '[DONE]';

            const allLines = content.split('\n').filter(line => line.trim());

            const displayContent = isDone
                ? content
                .split('\n')
                .slice(0, -1)
                .join('\n')
                .trim() || ''
                : content;

            const hasLogContent = isDone
                ? displayContent.length > 0
                : allLines.length > 1;

            return (
                <div className="w-full relative">
                    {isDone ? (
                        <div className="bg-green-50/30 border border-green-100 rounded p-2">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-green-600 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span className="text-green-700 font-medium text-[0.75rem]">
                                    Processing completed
                                </span>

                                {hasLogContent && (
                                    <button
                                        onClick={() => onToggleExpand(id)}
                                        className="ml-auto cursor-pointer text-[0.75rem] text-green-600 hover:text-green-800 px-1.5 py-0.5 rounded border border-green-100 hover:border-green-200 bg-white/50 transition-colors whitespace-nowrap flex items-center gap-1"
                                        aria-label={isExpanded ? "Collapse logs" : "Expand logs"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>({displayContent.split('\n').filter(l => l.trim()).length})</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-blue-50/30 border border-blue-100 rounded p-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 flex-1 min-w-0 text-[0.75rem] leading-none">
                                    <div className="flex space-x-0.5 flex-shrink-0">
                                        <ThreeDotLoading size={5} color="#2B7FFF"/>
                                    </div>
                                    <span className="text-blue-600 font-medium uppercase tracking-wider">
                                        processing
                                    </span>

                                    <div className="flex-1 min-w-0 ml-1">
                                        <div className="font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                                            <span
                                                className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 animate-gradient-x">
                                                {rawLastLine}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {hasLogContent && (
                                    <button
                                        onClick={() => onToggleExpand(id)}
                                        className="cursor-pointer text-[0.75rem] text-blue-500 hover:text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 hover:border-blue-200 bg-white/50 transition-colors whitespace-nowrap flex items-center gap-1"
                                        aria-label={isExpanded ? "Collapse logs" : "Expand logs"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>({allLines.length})</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {isExpanded && (
                        <div
                            className="mt-2 ml-0 bg-white border border-gray-200 rounded-lg p-3 shadow-sm transition-all duration-200 ease-in-out animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    logs
                                </span>
                                <button
                                    onClick={() => onToggleExpand(id)}
                                    className="cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors duration-150"
                                    aria-label="Close logs"
                                    title="Close logs"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="relative">
                                <pre
                                    className="text-xs text-gray-800 font-mono whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded">
                                    {isDone ? displayContent : content}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            );

        case 'invisible':
            return null;

        case 'thinking':
            const thinkingRawLastLine = getLastLine(content);
            const thinkingLastLine = thinkingRawLastLine.trim();
            const thinkingIsDone = thinkingLastLine === '[DONE]';

            const thinkingAllLines = content.split('\n').filter(line => line.trim());

            const thinkingDisplayContent = thinkingIsDone
                ? content
                .split('\n')
                .slice(0, -1)
                .join('\n')
                .trim() || ''
                : content;

            const thinkingHasLogContent = thinkingIsDone
                ? thinkingDisplayContent.length > 0
                : thinkingAllLines.length > 1;

            return (
                <div className="w-full relative">
                    {thinkingIsDone ? (
                        <div className="bg-gray-100 border border-gray-200 rounded p-2">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 mb-0.5 text-gray-600 flex-shrink-0 inline-block align-middle"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <span className="text-gray-700 font-medium text-[0.75rem] align-middle">
                                    Thinking completed
                                </span>

                                {thinkingHasLogContent && (
                                    <button
                                        onClick={() => onToggleExpand(id)}
                                        className="ml-auto cursor-pointer text-[0.75rem] text-gray-600 hover:text-gray-800 px-1.5 py-0.5 rounded border border-gray-200 hover:border-gray-300 bg-white transition-colors whitespace-nowrap flex items-center gap-1"
                                        aria-label={isExpanded ? "Collapse logs" : "Expand logs"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>({thinkingDisplayContent.split('\n').filter(l => l.trim()).length})</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-100 border border-gray-200 rounded p-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5 flex-1 min-w-0 text-[0.75rem] leading-none">
                                    <div className="flex space-x-0.5 flex-shrink-0">
                                        <ThreeDotLoading size={5} color="#6B7280"/>
                                    </div>
                                    <span className="text-gray-700 font-medium uppercase tracking-wider">
                                        thinking
                                    </span>

                                    <div className="flex-1 min-w-0 ml-1">
                                        <div className="font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                                            <span className="font-bold text-gray-800">
                                                {thinkingRawLastLine}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {thinkingHasLogContent && (
                                    <button
                                        onClick={() => onToggleExpand(id)}
                                        className="cursor-pointer text-[0.75rem] text-gray-600 hover:text-gray-800 px-1.5 py-0.5 rounded border border-gray-200 hover:border-gray-300 bg-white transition-colors whitespace-nowrap flex items-center gap-1"
                                        aria-label={isExpanded ? "Collapse logs" : "Expand logs"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>({thinkingAllLines.length})</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {isExpanded && (
                        <div
                            className="mt-2 ml-0 bg-white border border-gray-200 rounded-lg p-3 shadow-sm transition-all duration-200 ease-in-out animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    mind
                                </span>
                                <button
                                    onClick={() => onToggleExpand(id)}
                                    className="cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors duration-150"
                                    aria-label="Close logs"
                                    title="Close logs"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="relative">
                                <pre
                                    className="text-xs text-gray-800 font-mono whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded">
                                    {thinkingIsDone ? thinkingDisplayContent : content}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            );

        default:
            return (
                <div className="bg-red-50/30 border border-red-100 p-2 my-2 rounded">
                    <div className="text-red-700 text-[0.75rem] mb-1 flex items-center gap-1">
                        <span className="bg-red-200 text-red-800 px-1 rounded">!</span>
                        <strong>Unknown widget:</strong> {type}
                    </div>
                    <pre className="text-[0.7rem] bg-red-50/50 p-1.5 rounded overflow-x-auto whitespace-pre-wrap">
                        {content}
                    </pre>
                </div>
            );
    }
};

export default ComponentBlock;