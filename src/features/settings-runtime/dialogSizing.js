const boundedPixels = (value, fallback, minimum) => typeof value === 'number' && Number.isFinite(value) && value > 0
    ? Math.max(minimum, Math.min(1600, Math.round(value))) : fallback;

/** Backend dimensions are bounded pixel values, never arbitrary CSS. */
export function getSettingsDialogStyle(dialog, fallbackWidth = 800) {
    const width = boundedPixels(dialog?.width, fallbackWidth, 320);
    const maxHeight = boundedPixels(dialog?.maxHeight, null, 240);
    return {
        width: `${width}px`,
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: maxHeight ? `min(${maxHeight}px, calc(100dvh - 2rem))` : '90dvh',
    };
}
