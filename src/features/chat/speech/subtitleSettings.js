import {getLocalSetting, setLocalSetting, TTS_LOCAL_SETTING_KEYS} from '@/lib/tools.jsx';

export const SUBTITLE_POSITION_CHANGE_EVENT = 'chat-speech-subtitle-position-change';
export const SUBTITLE_STYLE_CHANGE_EVENT = 'chat-speech-subtitle-style-change';
export const SUBTITLE_PREVIEW_EVENT = 'chat-speech-subtitle-preview';

export const DEFAULT_SUBTITLE_POSITION = Object.freeze({x: 0.5, y: 0.84});
export const DEFAULT_SUBTITLE_STYLE = Object.freeze({
    maxWidthVw: 90,
    maxHeightVh: 42,
    fontSizePx: 18,
    backgroundOpacity: 70,
    lineHeight: 1.65,
});

export const SUBTITLE_STYLE_LIMITS = Object.freeze({
    maxWidthVw: {min: 20, max: 100, step: 5},
    maxHeightVh: {min: 10, max: 100, step: 5},
    fontSizePx: {min: 12, max: 48, step: 1},
    backgroundOpacity: {min: 0, max: 95, step: 5},
    lineHeight: {min: 1.1, max: 2.4, step: 0.05},
});

export const SUBTITLE_QUICK_POSITIONS = Object.freeze([
    {id: 'top-left', x: 0, y: 0, row: 0, column: 0},
    {id: 'top-center', x: 0.5, y: 0, row: 0, column: 1},
    {id: 'top-right', x: 1, y: 0, row: 0, column: 2},
    {id: 'middle-left', x: 0, y: 0.5, row: 1, column: 0},
    {id: 'center', x: 0.5, y: 0.5, row: 1, column: 1},
    {id: 'middle-right', x: 1, y: 0.5, row: 1, column: 2},
    {id: 'bottom-left', x: 0, y: 1, row: 2, column: 0},
    {id: 'bottom-center', x: 0.5, y: 1, row: 2, column: 1},
    {id: 'bottom-right', x: 1, y: 1, row: 2, column: 2},
]);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const round = (value, digits = 2) => {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
};

export const normalizeSubtitlePosition = (value) => {
    const x = Number(value?.x);
    const y = Number(value?.y);
    return {
        x: Number.isFinite(x) ? clamp(x, 0, 1) : DEFAULT_SUBTITLE_POSITION.x,
        y: Number.isFinite(y) ? clamp(y, 0, 1) : DEFAULT_SUBTITLE_POSITION.y,
    };
};

export const normalizeSubtitleStyle = (value) => {
    const source = value && typeof value === 'object' ? value : {};
    const normalizeNumber = (key, digits = 0) => {
        const limits = SUBTITLE_STYLE_LIMITS[key];
        const parsed = Number(source[key]);
        const fallback = DEFAULT_SUBTITLE_STYLE[key];
        return round(clamp(Number.isFinite(parsed) ? parsed : fallback, limits.min, limits.max), digits);
    };

    return {
        maxWidthVw: normalizeNumber('maxWidthVw'),
        maxHeightVh: normalizeNumber('maxHeightVh'),
        fontSizePx: normalizeNumber('fontSizePx'),
        backgroundOpacity: normalizeNumber('backgroundOpacity'),
        lineHeight: normalizeNumber('lineHeight', 2),
    };
};

export const readSubtitlePosition = () => normalizeSubtitlePosition(
    getLocalSetting(TTS_LOCAL_SETTING_KEYS.subtitlePosition, DEFAULT_SUBTITLE_POSITION),
);

export const readSubtitleStyle = () => normalizeSubtitleStyle(
    getLocalSetting(TTS_LOCAL_SETTING_KEYS.subtitleStyle, DEFAULT_SUBTITLE_STYLE),
);

export const saveSubtitlePosition = (value, {notify = true} = {}) => {
    const normalized = normalizeSubtitlePosition(value);
    setLocalSetting(TTS_LOCAL_SETTING_KEYS.subtitlePosition, normalized);

    if (notify && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(SUBTITLE_POSITION_CHANGE_EVENT, {detail: normalized}));
    }

    return normalized;
};

export const saveSubtitleStyle = (value, {notify = true} = {}) => {
    const normalized = normalizeSubtitleStyle(value);
    setLocalSetting(TTS_LOCAL_SETTING_KEYS.subtitleStyle, normalized);

    if (notify && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(SUBTITLE_STYLE_CHANGE_EVENT, {detail: normalized}));
    }

    return normalized;
};

export const resetSubtitleAppearance = ({notify = true} = {}) => {
    const position = saveSubtitlePosition(DEFAULT_SUBTITLE_POSITION, {notify});
    const style = saveSubtitleStyle(DEFAULT_SUBTITLE_STYLE, {notify});
    return {position, style};
};

export const showSubtitlePreview = (visible) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent(SUBTITLE_PREVIEW_EVENT, {
        detail: {visible: Boolean(visible)},
    }));
};
