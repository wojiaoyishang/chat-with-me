import React, {memo} from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {resolveMessageCopyContent} from '../utils/copyContent.js';
import KnowledgeGraphViewer from './KnowledgeGraphViewer.jsx';

const TextOnlyMessageContent = memo(({msg, msgId, isLeaving}) => {
    const isRight = msg.position === 'right';
    const displayName = msg.name || 'U';

    if (isRight) {
        const content = resolveMessageCopyContent(msg.content, msg.extraInfo);

        return (
            <>
                <KnowledgeGraphViewer key={msgId} msg={msg} className="w-[80%] mr-13" align="right"/>
                <div className="flex justify-end items-center gap-3 max-w-[80%] ml-auto">
                    <div
                        className={`max-w-[100%] bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100 transition-opacity duration-300 ${isLeaving ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        {content}
                    </div>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={msg.avatar} alt={displayName}/>
                        <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                </div>
            </>
        );
    }

    return (
        <div className="w-full pl-2 pr-2 lg:pl-10 lg:pr-10">
            <div className="text-gray-800 break-words max-w-none">
                <KnowledgeGraphViewer key={msgId} msg={msg}/>
                <MarkdownRenderer
                    contextId={msgId}
                    content={msg.content}
                    replacement={msg?.extraInfo?.replace}
                    msg={msg}
                />
            </div>
        </div>
    );
});

TextOnlyMessageContent.displayName = 'TextOnlyMessageContent';

export default TextOnlyMessageContent;
