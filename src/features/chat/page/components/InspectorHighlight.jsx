export default function InspectorHighlight({ text, query = '' }) {
    const value = String(text ?? '');
    const keyword = query.trim();
    if (!keyword) return value;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = value.split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, index) => index % 2
        ? <mark key={index} className="rounded-sm bg-amber-200 px-0.5 text-slate-950">{part}</mark>
        : part);
}
