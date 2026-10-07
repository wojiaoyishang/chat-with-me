import { resolveClientText } from '@/lib/clientText.js';

/** Shared opt-in backend text renderer, escaped by React. */
export default function ClientText({ text, useTextFormat = false, locale, timeZone, ...props }) {
    return <span {...props}>{resolveClientText(text, { useTextFormat, locale, timeZone })}</span>;
}
