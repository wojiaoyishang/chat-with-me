// Tool arguments remain server-owned. Both trigger paths submit only locators.
export const parseFrontendFeedback = (content = '') =>
    [
        ...String(content).matchAll(
            /\[FRONTEND_FEEDBACK ID:([a-f0-9-]{36}) ONCE:(true|false) TRIGGER:(next_speech_start|manual)\]/g,
        ),
    ].map((match) => ({ toolid: match[1], once: match[2] === 'true', trigger: match[3] }));

export const stripFrontendFeedback = (content = '') =>
    String(content).replace(
        /\[FRONTEND_FEEDBACK ID:[a-f0-9-]{36} ONCE:(?:true|false) TRIGGER:(?:next_speech_start|manual)\]/g,
        '',
    );

export const createSpeechFeedbackDispatcher = (send) => {
    const triggered = new Set();
    return ({ conversationId, messageId, requestId, segment }) => {
        for (const toolid of segment?.feedbackToolIds || []) {
            const key = `${conversationId}:${messageId}:${requestId}:${toolid}`;
            if (triggered.has(key)) continue;
            triggered.add(key);
            // A playback retry/resume must not issue the same automatic trigger again.
            // Keep a bounded history; the server still enforces once and concurrency.
            if (triggered.size > 1000) triggered.delete(triggered.values().next().value);
            Promise.resolve(
                send({
                    event: 'frontend.feedback.speech',
                    conversationId,
                    payload: { msgid: messageId, toolid },
                }),
            ).catch(() => {});
        }
    };
};
