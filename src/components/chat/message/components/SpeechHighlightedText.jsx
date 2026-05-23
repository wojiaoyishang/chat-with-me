import React, {memo, useMemo} from 'react';
import {getSpeakableContent, splitSpeakableSegments} from '../utils/speechContent.js';

const SpeechHighlightedText = memo(({msg, msgId, speechState}) => {
    const content = useMemo(() => getSpeakableContent(msg), [msg]);
    const segments = useMemo(() => splitSpeakableSegments(content, msgId), [content, msgId]);
    const currentSegmentId = speechState?.messageId === msgId ? speechState?.currentSegmentId : null;

    if (!segments.length) return null;

    return (
        <>
            {segments.map((segment, index) => (
                <React.Fragment key={segment.id}>
                    {index > 0 ? ' ' : ''}
                    <span
                        data-tts-segment-id={segment.id}
                        className={currentSegmentId === segment.id
                            ? 'bg-yellow-200/80 rounded px-0.5 transition-colors duration-200'
                            : 'transition-colors duration-200'}
                    >
                        {segment.text}
                    </span>
                </React.Fragment>
            ))}
        </>
    );
});

SpeechHighlightedText.displayName = 'SpeechHighlightedText';

export default SpeechHighlightedText;
