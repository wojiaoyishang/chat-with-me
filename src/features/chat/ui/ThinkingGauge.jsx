export default function ThinkingGauge({ progress, color }) {
    const level = Math.max(0, Math.min(1, progress));
    const angle = ((-225 + level * 270) * Math.PI) / 180;
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-5 text-foreground"
            fill="none"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5.64 18.36a9 9 0 1 1 12.72 0" stroke="#e5e7eb" />
            <path
                d="M5.64 18.36a9 9 0 1 1 12.72 0"
                stroke={level === 0 ? '#94a3b8' : color}
                pathLength="100"
                strokeDasharray={`${Math.max(4, level * 100)} 100`}
                style={{ transition: 'stroke-dasharray 180ms ease, stroke 180ms ease' }}
            />
            <path d={`M12 12L${12 + Math.cos(angle) * 6} ${12 + Math.sin(angle) * 6}`} stroke="currentColor" />
            <circle cx="12" cy="12" r="2.5" fill="var(--background)" stroke="currentColor" />
        </svg>
    );
}
