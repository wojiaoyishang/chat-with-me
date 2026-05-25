// Audio.onplaying 在部分浏览器里会早于用户真正听到声音，
// 但高亮也不能等太久；短句音频可能在 500ms 内已经播放完，
// 因此用更短的启动延迟 + currentTime/RAF 兜底来同步真实播放。
export const TTS_HIGHLIGHT_START_DELAY_MS = 80;
export const TTS_HIGHLIGHT_MIN_CURRENT_TIME = 0.005;
export const TTS_HIGHLIGHT_MAX_SYNC_WAIT_MS = 180;
export const TTS_NEXT_SEGMENT_TAIL_DELAY_MS = 120;
