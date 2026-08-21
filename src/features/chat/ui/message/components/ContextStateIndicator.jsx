import React, {memo} from 'react';

import {apiEndpoint} from '@/config.js';
import {openRemoteUniversalModal} from '@/components/modal/universalModal.js';

/**
 * Lightweight, always-available product status for context transformations.
 *
 * The control stays as a subtle gray icon until hover/focus, then expands into a
 * readable label. Full effective context is fetched lazily only after click and is
 * rendered by the global backend-driven modal host.
 */
const ContextStateIndicator = memo(({
    icon: Icon,
    conversationId,
    messageId,
    replacementId = null,
    label,
    state = 'status',
    className = '',
}) => {
    if (!Icon || !conversationId || !messageId) return null;

    const resolvedLabel = label || '上下文状态';

    return (
        <button
            type="button"
            data-context-state={state}
            data-tts-ignore="true"
            className={`group inline-flex h-6 shrink-0 cursor-pointer items-center overflow-hidden rounded-full border border-transparent px-1 text-gray-400 transition-all duration-200 ease-out hover:border-gray-200 hover:bg-gray-100 hover:px-2 hover:text-gray-600 focus-visible:border-gray-200 focus-visible:bg-gray-100 focus-visible:px-2 focus-visible:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 ${className}`}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                openRemoteUniversalModal(
                    apiEndpoint.CHAT_CONTEXT_STATE_DETAIL_ENDPOINT,
                    {
                        conversationId,
                        messageId,
                        ...(replacementId ? {replacementId} : {}),
                        presentation: 'modal',
                    },
                );
            }}
            title={`${resolvedLabel}，点击查看当前后端保留内容`}
            aria-label={`${resolvedLabel}，点击查看当前后端保留内容`}
        >
            <Icon className="h-3.5 w-3.5 shrink-0"/>
            <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-medium opacity-0 transition-[max-width,opacity,margin] duration-200 ease-out group-hover:ml-1 group-hover:max-w-[10rem] group-hover:opacity-100 group-focus-visible:ml-1 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100">
                {resolvedLabel}
            </span>
        </button>
    );
});

ContextStateIndicator.displayName = 'ContextStateIndicator';
export default ContextStateIndicator;
