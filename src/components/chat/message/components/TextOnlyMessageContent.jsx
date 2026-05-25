import React, {memo, useRef} from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import KnowledgeGraphViewer from './KnowledgeGraphViewer.jsx';
import SpeechOverlayHighlighter from './SpeechOverlayHighlighter.jsx';

const TextOnlyMessageContent = memo(({msg, msgId, isLeaving, speechState, onSpeechTextClick, avatarClickProps = {}}) => {
    const isRight = msg.position === 'right';
    const displayName = msg.name || 'U';
    const contentRef = useRef(null);
    const {className: avatarClickClassName = '', ...restAvatarClickProps} = avatarClickProps || {};
    const isSpeechSeekActive = speechState?.messageId === msgId && ['loading', 'playing', 'paused'].includes(speechState?.status);

    if (isRight) {
        return (
            <>
                <KnowledgeGraphViewer key={msgId} msg={msg} className="w-[80%] mr-13" align="right"/>
                <div className="flex justify-end items-center gap-3 max-w-[80%] ml-auto">
                    <div
                        ref={contentRef}
                        data-tts-message-id={msgId}
                        data-speech-seek-active={isSpeechSeekActive ? 'true' : undefined}
                        onClickCapture={onSpeechTextClick ? (event) => onSpeechTextClick(event, msgId) : undefined}
                        className={`relative max-w-[100%] bg-white rounded-2xl px-4 py-2.5 shadow-sm text-gray-800 break-words whitespace-pre-wrap border border-gray-100 transition-opacity duration-300 ${isSpeechSeekActive ? 'cursor-pointer' : ''} ${isLeaving ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        <div className="relative z-[2]">{msg.content}</div>
                        <SpeechOverlayHighlighter containerRef={contentRef} msgId={msgId} speechState={speechState}/>
                    </div>
                    <Avatar
                        {...restAvatarClickProps}
                        className={`h-10 w-10 cursor-pointer select-none touch-manipulation ${avatarClickClassName}`}
                    >
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
                <div
                    ref={contentRef}
                    data-tts-message-id={msgId}
                    data-speech-seek-active={isSpeechSeekActive ? 'true' : undefined}
                    onClickCapture={onSpeechTextClick ? (event) => onSpeechTextClick(event, msgId) : undefined}
                    className={`relative ${isSpeechSeekActive ? 'cursor-pointer' : ''}`}
                >
                    <div className="relative z-[2]">
                        <MarkdownRenderer
                            contextId={msgId}
                            content={msg.content}
                            replacement={msg?.extraInfo?.replace}
                            msg={msg}
                        />
                    </div>
                    <SpeechOverlayHighlighter containerRef={contentRef} msgId={msgId} speechState={speechState}/>
                </div>
            </div>
        </div>
    );
});

TextOnlyMessageContent.displayName = 'TextOnlyMessageContent';

export default TextOnlyMessageContent;
