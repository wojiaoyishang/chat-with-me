const TIMESTAMP = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?(Z|[+-]\d{2}:\d{2})$/;

/** Require an explicit timezone; never guess the timezone of historical data. */
export const parseTimestamp = (value) => {
    if (typeof value !== 'string') return null;
    const match = TIMESTAMP.exec(value);
    if (!match) return null;
    const [, year, month, day, hour, minute, second] = match;
    const maxDay = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate();
    if (
        Number(month) < 1 ||
        Number(month) > 12 ||
        Number(day) < 1 ||
        Number(day) > maxDay ||
        Number(hour) > 23 ||
        Number(minute) > 59 ||
        Number(second) > 59
    )
        return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

export const formatLocalTimestamp = (value, { locale, timeZone, fallback = '—' } = {}) => {
    const date = parseTimestamp(value);
    if (!date) return fallback;
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        ...(timeZone ? { timeZone } : {}),
    }).format(date);
};

/** Explicit opt-in, text-only parsing. This never interprets HTML or Markdown. */
export const resolveClientText = (value, options = {}) => {
    const text = String(value ?? '');
    if (options.useTextFormat !== true) return text;
    return text.replace(/\{\{datetime:([^{}\n]+)\}\}/g, (marker, timestamp) =>
        formatLocalTimestamp(timestamp, { ...options, fallback: marker }),
    );
};
