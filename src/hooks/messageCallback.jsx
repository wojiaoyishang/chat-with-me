import {dispatchIncomingEvent} from '@/context/useEventStore.jsx';

/** Dispatch one decoded CWM Protocol v1 event envelope. */
export default function globalMessageCallback(envelope) {
    dispatchIncomingEvent(envelope);
}
