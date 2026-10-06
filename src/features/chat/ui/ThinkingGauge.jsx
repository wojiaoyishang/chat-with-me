export default function ThinkingGauge({ progress, color, bubbles = false }) {
    const level = Math.max(0, Math.min(1, progress));
    const angle = ((-225 + level * 270) * Math.PI) / 180;
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-6 overflow-visible text-foreground"
            fill="none"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5.64 18.36a9 9 0 1 1 12.72 0" stroke="#e5e7eb" />
            <path
                d="M5.64 18.36a9 9 0 1 1 12.72 0"
                stroke={color}
                pathLength="100"
                strokeDasharray={`${Math.max(4, level * 100)} 100`}
                style={{ transition: 'stroke-dasharray 180ms ease, stroke 180ms ease' }}
            />
            <path d={`M12 12L${12 + Math.cos(angle) * 6} ${12 + Math.sin(angle) * 6}`} stroke="currentColor" />
            <circle cx="12" cy="12" r="2.5" fill="var(--background)" stroke="currentColor" />
            {bubbles &&
                [
                    { x: 6, y: 8, duration: '1.8s', delay: '-0.3s', drift: '-2px' },
                    { x: 12, y: 5, duration: '2.3s', delay: '-1.4s', drift: '1px' },
                    { x: 17, y: 8, duration: '2s', delay: '-0.9s', drift: '2px' },
                ].map((bubble, index) => (
                    <circle
                        key={index}
                        className="thinking-gauge-bubble"
                        cx={bubble.x}
                        cy={bubble.y}
                        r={index === 1 ? 0.9 : 0.7}
                        fill={color}
                        stroke="none"
                        style={{
                            '--bubble-drift': bubble.drift,
                            animationDuration: bubble.duration,
                            animationDelay: bubble.delay,
                        }}
                    />
                ))}
        </svg>
    );
}
