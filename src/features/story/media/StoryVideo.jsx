import {forwardRef} from 'react';

const StoryVideo = forwardRef(function StoryVideo({
    src,
    muted = true,
    aspectRatio = null,
    playbackError = '',
    onEnded,
    onLoadedMetadata,
}, ref) {
    if (!src) return null;

    return (
        <figure
            className="overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-black/5"
            style={aspectRatio ? {aspectRatio: String(aspectRatio)} : undefined}
        >
            <video
                key={src}
                ref={ref}
                src={src}
                className="h-full max-h-[66vh] w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                muted={muted}
                onEnded={onEnded}
                onLoadedMetadata={onLoadedMetadata}
            />
            {playbackError && (
                <figcaption className="bg-amber-50 px-3 py-2 text-center text-xs text-amber-800">
                    {playbackError}
                </figcaption>
            )}
        </figure>
    );
});

StoryVideo.displayName = 'StoryVideo';
export default StoryVideo;
