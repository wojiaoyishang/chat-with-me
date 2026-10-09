/** Color expresses acceleration, not absolute throughput. */
export function tokenSpeedColor(value) {
    const trend = Math.max(-1, Math.min(1, Number(value) || 0));
    if (!trend) return { color: 'hsl(215 12% 45%)', backgroundColor: 'hsl(215 20% 96%)' };
    const intensity = Math.abs(trend);
    const hue = trend > 0 ? 135 : 6;
    return {
        color: `hsl(${hue} ${30 + 45 * intensity}% ${42 - 10 * intensity}%)`,
        backgroundColor: `hsl(${hue} ${40 + 25 * intensity}% ${97 - 4 * intensity}%)`,
    };
}

export function settledTokenSpeedColor(relativeSpeed) {
    const ratio = Math.max(0, Math.min(1, Number(relativeSpeed) || 0));
    const hue = 6 + 129 * ratio;
    return {
        color: `hsl(${hue} 65% 35%)`,
        backgroundColor: `hsl(${hue} 55% 95%)`,
    };
}
