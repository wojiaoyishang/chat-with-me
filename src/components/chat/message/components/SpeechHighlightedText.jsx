import React, {memo, useMemo} from 'react';
import {getSpeakableContent, splitSpeakableSegments} from '../utils/speechContent.js';

const resolveCurrentSegment = (segments = [], speechState, msgId) => {
    if (speechState?.messageId !== msgId) return null;

    const currentSegmentId = speechState?.currentSegmentId;
    if (currentSegmentId !== undefined && currentSegmentId !== null) {
        const byId = segments.find(item => String(item.id) === String(currentSegmentId));
        if (byId) return byId;
    }

    const position = Number(speechState?.currentSegmentPosition);
    if (Number.isInteger(position) && position >= 0 && position < segments.length) return segments[position];

    const index = Number(speechState?.currentSegmentIndex);
    if (Number.isInteger(index) && index >= 0 && index < segments.length) return segments[index];

    return null;
};

const SpeechHighlightedText = memo(({msg, msgId, speechState}) => {
    const content = useMemo(() => getSpeakableContent(msg), [msg]);
    const segments = useMemo(() => splitSpeakableSegments(content, msgId), [content, msgId]);
    const currentSegment = useMemo(
        () => resolveCurrentSegment(segments, speechState, msgId),
        [segments, speechState, msgId]
    );

    if (!segments.length) return null;

    return (
        <>
            {segments.map((segment, index) => (
                <React.Fragment key={segment.id}>
                    {index > 0 ? ' ' : ''}
                    <span
                        data-tts-segment-id={segment.id}
                        data-tts-segment-index={segment.index}
                        data-tts-segment-occurrence={segment.occurrenceIndex}
                        className={currentSegment?.id === segment.id
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
