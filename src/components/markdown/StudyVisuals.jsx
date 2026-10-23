function timeRange(start, end) {
    return [start, end].filter(Boolean).join(' – ');
}

export function StudyOutline({ items }) {
    let sessions = [];
    try {
        const parsed = JSON.parse(items || '[]');
        if (Array.isArray(parsed)) sessions = parsed;
    } catch {
        return null;
    }
    if (!sessions.length) return null;

    return (
        <nav className="cwm-study-outline" aria-label="学习大纲">
            <h2 className="cwm-study-outline-heading">学习大纲</h2>
            <ol className="cwm-study-outline-list">
                {sessions.map(({ id, title, start, end }) => (
                    <li key={id}>
                        <a href={`#${id}`} className="cwm-study-outline-link">
                            <span className="cwm-study-outline-title">{title}</span>
                            {(start || end) && <span className="cwm-study-outline-time">{timeRange(start, end)}</span>}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export function StudySession({ id, title, start, end, children }) {
    const range = timeRange(start, end);
    return (
        <section id={id} className="cwm-study-session" aria-label={title}>
            <header className="cwm-study-session-header">
                {range && <span className="cwm-study-session-time">{range}</span>}
                <h2>{title}</h2>
            </header>
            <div className="cwm-study-session-body">{children}</div>
        </section>
    );
}

export function StudySection({ number, title, children }) {
    return (
        <section className="cwm-study-section" aria-label={title}>
            <h3 className="cwm-study-section-heading">
                {number && <span className="cwm-study-section-number">{number}</span>}
                {title}
            </h3>
            <div className="cwm-study-section-body">{children}</div>
        </section>
    );
}

export function StudyCard({ title, tone = 'info', icon = 'book', kind = 'card', iconSymbols = {}, children }) {
    return (
        <aside className={`cwm-study-card cwm-study-card-${kind} cwm-study-card-${tone}`} data-card-kind={kind} aria-label={title}>
            <h4 className="cwm-study-card-heading"><span className="cwm-study-card-icon" data-icon={icon} aria-hidden="true">{iconSymbols[icon] || ''}</span>{title}</h4>
            <div className="cwm-study-card-body">{children}</div>
        </aside>
    );
}
