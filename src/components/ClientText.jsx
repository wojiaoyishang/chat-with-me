import { resolveClientText } from '@/lib/clientText.js';

/** Shared opt-in backend text renderer, escaped by React. */
export default function ClientText({ text, locale, timeZone, ...props }) {
    return <span {...props}>{resolveClientText(text, { locale, timeZone })}</span>;
}
