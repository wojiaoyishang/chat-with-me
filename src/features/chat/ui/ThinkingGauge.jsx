export default function ThinkingGauge({ progress, color }) {
    const angle = ((-150 + Math.max(0, Math.min(1, progress)) * 120) * Math.PI) / 180;
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-4.5"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="M3.35 17a10 10 0 1 1 17.3 0" opacity="0.6" />
            <path d="M4.6 10.5l1.2.7M12 4v1.5M19.4 10.5l-1.2.7" />
            <path d={`M12 14L${12 + Math.cos(angle) * 6} ${14 + Math.sin(angle) * 6}`} />
            <circle cx="12" cy="14" r="1.4" fill={color} stroke="none" />
        </svg>
    );
}
