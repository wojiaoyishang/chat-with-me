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
    const ratio = Number(aspectRatio);
    const frameRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9;

    return (
        <figure className="m-0 min-w-0 w-full overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-black/5">
            <div
                className="relative w-full overflow-hidden"
                style={{aspectRatio: String(frameRatio), maxHeight: '66vh'}}
                data-story-video-frame=""
            >
                <video
                    key={src}
                    ref={ref}
                    src={src}
                    className="absolute inset-0 block h-full w-full bg-black object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    muted={muted}
                    onEnded={onEnded}
                    onLoadedMetadata={onLoadedMetadata}
                />
            </div>
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
