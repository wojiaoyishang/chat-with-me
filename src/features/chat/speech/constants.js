// ChatPage 只保留编排逻辑；朗读相关的纯工具收敛到 feature/speech。
export const SPEECH_AUTO_HIGHLIGHT_CLASS = 'chat-speech-auto-highlight';
export const SPEECH_AUTO_HIGHLIGHT_ATTR = 'data-chat-speech-auto-highlight';
export const SPEECH_SEGMENT_BINDING_ATTR = 'data-chat-speech-segment-binding';
export const SPEECH_SEGMENT_BOUND_ID_ATTR = 'data-chat-speech-segment-id';
export const SPEECH_SEGMENT_BOUND_IDS_ATTR = 'data-chat-speech-segment-ids';
export const SPEECH_SEGMENT_BOUND_INDEX_ATTR = 'data-chat-speech-segment-index';
export const SPEECH_SEGMENT_BOUND_INDEXES_ATTR = 'data-chat-speech-segment-indexes';
export const SPEECH_BOUNDARY_TOKEN = '\u001F';
export const SPEECH_TEXT_CANDIDATE_SELECTOR = [
    'li',
    '[role="listitem"]',
    'p',
    'blockquote',
    'pre',
    'code',
    'td',
    'th',
    'figcaption',
    'summary',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
].join(',');

// 朗读紫框必须落在一个稳定的边界元素上。列表、表格、标题等非段落结构
// 不一定有 p 包裹，所以这里显式把它们纳入紫框候选。
export const SPEECH_HIGHLIGHT_BOUNDARY_SELECTOR = [
    'li',
    '[role="listitem"]',
    'p',
    'blockquote',
    'pre',
    'td',
    'th',
    'figcaption',
    'summary',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
].join(',');

export const SPEECH_HIGHLIGHT_INLINE_SELECTOR = 'a, span, strong, em, b, i, code, mark, small';


export const DEFAULT_BACKEND_PCM_SAMPLE_RATE = 24000;
export const DEFAULT_BACKEND_PCM_CHANNELS = 1;
export const DEFAULT_BACKEND_PCM_BITS_PER_SAMPLE = 16;
