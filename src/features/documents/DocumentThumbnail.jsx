import { memo, useEffect, useRef, useState } from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { apiEndpoint, BASE_BACKEND_URL } from '@/config.js';

function DocumentThumbnail({ documentId, content }) {
    const host = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!globalThis.IntersectionObserver) {
            setVisible(true);
            return undefined;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '160px' },
        );
        observer.observe(host.current);
        return () => observer.disconnect();
    }, []);
    return (
        <div
            ref={host}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden bg-white select-none"
        >
            {visible && content?.trim() ? (
                <div className="absolute inset-x-4 top-3 bottom-0 overflow-hidden">
                    <div className="w-[200%] origin-top-left scale-50 overflow-hidden text-slate-600 [&_h1]:text-3xl [&_h2]:text-2xl [&_p]:text-base [&_img]:max-h-40 [&_img]:object-cover">
                        <MarkdownRenderer
                            content={content}
                            resourceBaseUrl={`${BASE_BACKEND_URL}${apiEndpoint.DOCUMENT_ENDPOINT}/${encodeURIComponent(documentId)}/assets/`}
                            contextId={`document-thumbnail:${documentId}`}
                            renderSurface="document-preview"
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-2.5 px-5 py-5">
                    <div className="mb-4 h-2.5 w-2/5 rounded bg-slate-200" />
                    {[85, 95, 75, 90, 60].map((width) => (
                        <div key={width} className="h-1.5 rounded bg-slate-100" style={{ width: `${width}%` }} />
                    ))}
                </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
        </div>
    );
}
export default memo(DocumentThumbnail);
