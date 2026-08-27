import {resolveResourceUrl} from '@/lib/virtualUrl.js';

export default function StoryMediaDeck({part, layout, videoElement}) {
    if (!part?.imageUrl || !videoElement || layout?.mode !== 'media_pair') return null;

    const imageGrow = Number(layout.imageFraction || 0.4);
    const videoGrow = Number(layout.videoFraction || 0.6);
    const imageRatio = Number(layout.imageAspectRatio || 1.3);

    return (
        <div
            className="mx-auto flex w-full max-w-6xl flex-col gap-5 md:flex-row md:items-start md:gap-6"
            data-story-media-layout="media_pair"
            data-story-media-image-fraction={imageGrow.toFixed(4)}
            data-story-media-video-fraction={videoGrow.toFixed(4)}
        >
            <figure
                className="min-w-0 overflow-hidden rounded-3xl bg-amber-100 shadow-lg"
                style={layout.stacked ? {aspectRatio: String(imageRatio)} : {flexGrow: imageGrow, flexBasis: 0, aspectRatio: String(imageRatio)}}
            >
                <img
                    src={resolveResourceUrl(part.imageUrl)}
                    alt={part.imageAlt || ''}
                    className="h-full max-h-[64vh] w-full object-contain"
                />
            </figure>
            <div className="min-w-0" style={layout.stacked ? undefined : {flexGrow: videoGrow, flexBasis: 0}}>
                {videoElement}
            </div>
        </div>
    );
}
