export default function ThreeDotLoading({ size = 8, color = '#4f46e5' }) {
    return (
        <div className="flex justify-center items-center space-x-1 p-3">
            <div className="rounded-full animate-pulse" style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color }} />
            <div className="rounded-full animate-pulse delay-200" style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color }} />
            <div className="rounded-full animate-pulse delay-400" style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color }} />
        </div>
    );
}