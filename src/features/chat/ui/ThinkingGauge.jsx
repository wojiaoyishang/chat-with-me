export default function ThinkingGauge({ progress, color }) {
    const angle = ((-140 + Math.max(0, Math.min(1, progress)) * 100) * Math.PI) / 180;
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {/* Outline follows the project's Lucide Gauge (ISC) icon geometry. */}
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            <path d={`M12 14L${12 + Math.cos(angle) * 5.6} ${14 + Math.sin(angle) * 5.6}`} />
        </svg>
    );
}
