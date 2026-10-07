/** Decode card transport metadata without exposing internal markers as Markdown. */
export const parseAgentContent = (content) => {
    let text = String(content ?? '').replace(/\r\n?/g, '\n');
    let modelName = '';
    let modelId = '';
    text = text.replace(/^\[AGENT-META\] (.*)$/gm, (_line, value) => {
        try {
            const metadata = JSON.parse(value);
            modelName = String(metadata.modelName || '');
            modelId = String(metadata.modelId || '');
        } catch {
            /* Incomplete streaming metadata stays hidden. */
        }
        return '';
    });
    text = text.replace(/^\s*\[markdown\]\s*/, '');
    const isFailed = /\[AGENT-FAILED\]/.test(text);
    const isDone = !isFailed && /\[AGENT-DONE\]/.test(text);
    text = text.replace(/\[AGENT-(?:DONE|FAILED)\]/g, '').trim();
    return { cleanContent: text, isFailed, isDone, modelName, modelId };
};
