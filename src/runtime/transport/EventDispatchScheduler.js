const LANE_CONTROL = 'control';
const LANE_INTERACTION = 'interaction';
const LANE_STREAM = 'stream';
const LANE_BACKGROUND = 'background';

const FAIR_SCHEDULE = [
    LANE_CONTROL,
    LANE_STREAM,
    LANE_INTERACTION,
    LANE_STREAM,
    LANE_CONTROL,
    LANE_STREAM,
    LANE_BACKGROUND,
    LANE_STREAM,
];

const queues = new Map([
    [LANE_CONTROL, []],
    [LANE_INTERACTION, []],
    [LANE_STREAM, []],
    [LANE_BACKGROUND, []],
]);

let scheduleIndex = 0;
let scheduled = false;
let pendingCount = 0;
let backlogWarned = false;

const now = () => globalThis.performance?.now?.() ?? Date.now();

const classifyEvent = (event, replyTo = null) => {
    const value = String(event || '');
    if (replyTo || value.startsWith('transport.') || value.startsWith('protocol.') || value.startsWith('turn.') || value === 'composer.status.changed') {
        return LANE_CONTROL;
    }
    if (value.startsWith('message.') || value.startsWith('speech.')) return LANE_STREAM;
    if (value.startsWith('notification.')) return LANE_BACKGROUND;
    return LANE_INTERACTION;
};

const popNext = () => {
    for (let offset = 0; offset < FAIR_SCHEDULE.length; offset += 1) {
        const index = (scheduleIndex + offset) % FAIR_SCHEDULE.length;
        const lane = FAIR_SCHEDULE[index];
        const queue = queues.get(lane);
        if (queue?.length) {
            scheduleIndex = (index + 1) % FAIR_SCHEDULE.length;
            pendingCount -= 1;
            return queue.shift();
        }
    }
    return null;
};

let postFlush;
if (typeof MessageChannel !== 'undefined') {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => flush();
    channel.port1.unref?.();
    channel.port2.unref?.();
    postFlush = () => channel.port2.postMessage(0);
} else {
    postFlush = () => setTimeout(flush, 0);
}

function requestFlush() {
    if (scheduled) return;
    scheduled = true;
    postFlush();
}

function flush() {
    scheduled = false;
    const started = now();
    let processed = 0;
    // Keep inbound bursts cooperative: callbacks progress quickly, but the browser
    // regains a task boundary before one model stream can monopolize the UI thread.
    while (pendingCount > 0 && processed < 64 && now() - started < 8) {
        const job = popNext();
        if (!job) break;
        processed += 1;
        try {
            job();
        } catch (error) {
            console.error('[CWM inbound event job failed]', error);
        }
    }
    if (pendingCount < 500) backlogWarned = false;
    if (pendingCount > 0) requestFlush();
}

/**
 * Schedule one incoming semantic event callback without discarding any lane.
 * FIFO is preserved inside each lane; fair scheduling prevents stream deltas from
 * starving user interactions or control replies.
 */
export const scheduleIncomingEventCallback = ({event, replyTo = null, callback}) => {
    if (typeof callback !== 'function') return;
    const lane = classifyEvent(event, replyTo);
    queues.get(lane).push(callback);
    pendingCount += 1;
    if (pendingCount >= 500 && !backlogWarned) {
        backlogWarned = true;
        console.warn(`[CWM] inbound event backlog is high: ${pendingCount} callbacks pending`);
    }
    requestFlush();
};

export const getIncomingEventSchedulerStats = () => ({
    pending: pendingCount,
    control: queues.get(LANE_CONTROL).length,
    interaction: queues.get(LANE_INTERACTION).length,
    stream: queues.get(LANE_STREAM).length,
    background: queues.get(LANE_BACKGROUND).length,
});

export const IncomingEventLane = Object.freeze({
    CONTROL: LANE_CONTROL,
    INTERACTION: LANE_INTERACTION,
    STREAM: LANE_STREAM,
    BACKGROUND: LANE_BACKGROUND,
});
