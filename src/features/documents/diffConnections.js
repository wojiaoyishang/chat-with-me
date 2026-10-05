// Both panes share the scroll container. MergeView aligns unchanged lines with
// spacers; the SVG only connects the boundaries of each changed block.
export function connectDiffBlocks(view, scrollHost) {
    const namespace = 'http://www.w3.org/2000/svg';
    const overlay = document.createElementNS(namespace, 'svg');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.add('pointer-events-none', 'absolute', 'inset-0', 'hidden', 'h-full', 'w-full', 'md:block');
    scrollHost.parentElement.append(overlay);
    let frame = 0;
    let disposed = false;
    const boundary = (editor, from, to, top) => {
        const start = editor.lineBlockAt(Math.min(from, editor.state.doc.length));
        const end = editor.lineBlockAt(Math.min(Math.max(from, to - 1), editor.state.doc.length));
        const offset = editor.documentTop - top;
        const startCoords = editor.coordsAtPos(Math.min(from, editor.state.doc.length));
        const endCoords = editor.coordsAtPos(Math.min(Math.max(from, to - 1), editor.state.doc.length));
        // Block heights can include MergeView's alignment spacer. Anchor to the
        // actual text line instead, so an insertion connects to a thin edge.
        const y1 = startCoords ? startCoords.top - top : offset + start.top;
        const y2 = endCoords ? endCoords.bottom - top : offset + end.top + editor.defaultLineHeight;
        return [y1, to > from ? y2 : y1];
    };
    const schedule = () => {
        if (disposed || frame) return;
        frame = requestAnimationFrame(() => {
            frame = 0;
            if (disposed) return;
            view.a.requestMeasure({
                key: overlay,
                read: () => {
                    const rect = scrollHost.getBoundingClientRect();
                    const left = view.a.dom.getBoundingClientRect();
                    const right = view.b.dom.getBoundingClientRect();
                    if (right.left <= left.left) return [];
                    return view.chunks
                        .map((chunk) => ({
                            a: boundary(
                                view.a,
                                chunk.fromA,
                                chunk.changes.every((change) => change.fromA === change.toA) ? chunk.fromA : chunk.toA,
                                rect.top,
                            ),
                            b: boundary(
                                view.b,
                                chunk.fromB,
                                chunk.changes.every((change) => change.fromB === change.toB) ? chunk.fromB : chunk.toB,
                                rect.top,
                            ),
                            x1: left.right - rect.left,
                            x2: right.left - rect.left,
                            leftEdge: Math.max(0, left.left - rect.left),
                            rightEdge: Math.min(rect.width, right.right - rect.left),
                            emptyA: chunk.changes.every((change) => change.fromA === change.toA),
                            emptyB: chunk.changes.every((change) => change.fromB === change.toB),
                        }))
                        .filter(({ a, b }) => Math.max(a[1], b[1]) >= 0 && Math.min(a[0], b[0]) <= rect.height);
                },
                write: (blocks) => {
                    if (disposed) return;
                    const paths = blocks.flatMap(({ a, b, x1, x2, leftEdge, rightEdge, emptyA, emptyB }) => {
                        const path = document.createElementNS(namespace, 'path');
                        path.setAttribute('d', `M ${x1} ${a[0]} L ${x2} ${b[0]} L ${x2} ${b[1]} L ${x1} ${a[1]} Z`);
                        path.setAttribute('fill', 'rgb(59 130 246 / 24%)');
                        path.setAttribute('stroke', 'rgb(59 130 246 / 50%)');
                        path.setAttribute('stroke-width', '1');
                        const elements = [path];
                        for (const [empty, start, end, y] of [
                            [emptyA, leftEdge, x1, a[0]],
                            [emptyB, x2, rightEdge, b[0]],
                        ]) {
                            if (!empty) continue;
                            const line = document.createElementNS(namespace, 'line');
                            line.setAttribute('x1', String(start));
                            line.setAttribute('x2', String(end));
                            line.setAttribute('y1', String(y));
                            line.setAttribute('y2', String(y));
                            line.setAttribute('stroke', 'rgb(59 130 246 / 75%)');
                            line.setAttribute('stroke-width', '2');
                            line.setAttribute('vector-effect', 'non-scaling-stroke');
                            elements.push(line);
                        }
                        return elements;
                    });
                    overlay.replaceChildren(...paths);
                },
            });
        });
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(scrollHost);
    resize.observe(view.dom);
    const mutations = new MutationObserver(schedule);
    mutations.observe(view.dom, { childList: true, subtree: true });
    scrollHost.addEventListener('scroll', schedule, { passive: true });
    view.a.scrollDOM.addEventListener('scroll', schedule, { passive: true });
    view.b.scrollDOM.addEventListener('scroll', schedule, { passive: true });
    schedule();
    return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        resize.disconnect();
        mutations.disconnect();
        scrollHost.removeEventListener('scroll', schedule);
        view.a.scrollDOM.removeEventListener('scroll', schedule);
        view.b.scrollDOM.removeEventListener('scroll', schedule);
        overlay.remove();
    };
}
