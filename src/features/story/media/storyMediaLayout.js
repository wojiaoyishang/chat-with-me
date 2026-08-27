const VIDEO_POSITIONS = new Set(['auto', 'top', 'bottom', 'left', 'right']);
const VIDEO_TIMINGS = new Set(['before', 'alongside', 'after']);

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
const finitePositive = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const normalizeVideoPosition = (value) => VIDEO_POSITIONS.has(String(value || '').trim())
    ? String(value).trim()
    : 'auto';

export const normalizeVideoTiming = (value) => VIDEO_TIMINGS.has(String(value || '').trim())
    ? String(value).trim()
    : 'alongside';

export const resolveImageAspectRatio = (part) => {
    const width = finitePositive(part?.imageWidth, 0);
    const height = finitePositive(part?.imageHeight, 0);
    return width && height ? width / height : 1.3;
};

export const resolveImageLayout = (part, fontScale, {viewportWidth, forceStacked = false, renderImage = true} = {}) => {
    if (!part?.imageUrl || !renderImage) return 'text_only';
    if (forceStacked) return 'image_top';
    if (finitePositive(viewportWidth, 1024) < 768) return 'image_top';
    if (fontScale >= 1.15) return 'image_top';
    if (part.layoutHint && part.layoutHint !== 'auto') return part.layoutHint;
    const ratio = resolveImageAspectRatio(part);
    if (finitePositive(viewportWidth, 1024) >= 1024 && ratio >= 1.15 && String(part.bodyMarkdown || '').length <= 900) {
        return part.sequence % 2 === 0 ? 'image_right' : 'image_left';
    }
    return 'image_top';
};

export const resolveStoryMediaLayout = ({part, fontScale = 1, viewportWidth = 1024, videoAspectRatio = null} = {}) => {
    const hasImage = Boolean(part?.imageUrl);
    const hasVideo = Boolean(part?.videoUrl);
    const narrow = finitePositive(viewportWidth, 1024) < 768;
    const explicitVideoPosition = normalizeVideoPosition(part?.videoPosition);

    if (!hasVideo) {
        return {
            mode: hasImage ? 'image_only' : 'text_only',
            videoPosition: null,
            imageLayout: resolveImageLayout(part, fontScale, {viewportWidth}),
            renderImageInArticle: hasImage,
        };
    }

    if (hasImage && explicitVideoPosition === 'auto') {
        const imageRatio = resolveImageAspectRatio(part);
        const resolvedVideoRatio = finitePositive(videoAspectRatio, 16 / 9);
        // Equal visual height means widths should be proportional to aspect ratios.
        // Clamp keeps portrait images visible without allowing either media item to dominate.
        const imageFraction = clamp(imageRatio / (imageRatio + resolvedVideoRatio), 0.30, 0.55);
        return {
            mode: 'media_pair',
            videoPosition: 'auto',
            imageLayout: 'text_only',
            renderImageInArticle: false,
            stacked: narrow,
            imageAspectRatio: imageRatio,
            videoAspectRatio: resolvedVideoRatio,
            imageFraction,
            videoFraction: 1 - imageFraction,
            imageFirst: true,
        };
    }

    const videoPosition = narrow ? 'top' : (explicitVideoPosition === 'auto' ? 'top' : explicitVideoPosition);
    const sideVideo = videoPosition === 'left' || videoPosition === 'right';
    return {
        mode: sideVideo ? 'video_side' : 'video_stacked',
        videoPosition,
        imageLayout: resolveImageLayout(part, fontScale, {viewportWidth, forceStacked: sideVideo}),
        renderImageInArticle: hasImage,
    };
};
