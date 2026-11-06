import {Fragment, memo, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {jsx, jsxs} from 'react/jsx-runtime';
import {toJsxRuntime} from 'hast-util-to-jsx-runtime';
import {urlAttributes} from 'html-url-attributes';
import {parseMarkdownSyntax} from './markdownParser.js';
import {rehypeReuseMarkdownNodes} from './markdownNodeReuse.js';
import {markdownWorkerQueue} from './markdownWorkerQueue.js';
import {MarkdownRenderBudgetContext} from './markdownRenderBudget.js';

/** Keep one React tree/host identity while expensive full syntax runs off-thread. */
const MarkdownSyntax = memo((props) => {
    const renderStarted = performance.now();
    const reportRenderCost = useContext(MarkdownRenderBudgetContext);
    const {processedContent, replacement, groupingKey, renderSurface, snapshot, studyDirectivesEnabled,
        studyIdPrefix, cardSpec, extraRehypePlugins, editableTasks, taskSourceContent,
        components, nodeReuse, transformUrl} = props;
    const [parsed, setParsed] = useState(null);
    const [failed, setFailed] = useState(false);
    const lease = useRef(null);
    const latest = useRef(null);
    const originalUrls = useRef(new WeakMap());
    const lastTree = useRef(null);
    const eligible = typeof Worker !== 'undefined' && !failed && renderSurface === 'conversation'
        && !studyDirectivesEnabled && !extraRehypePlugins.length;
    // Once a renderer starts using the Worker, keep that path for its lifetime.
    const started = useRef(false);
    if (eligible && processedContent.length >= 8000) started.current = true;
    const offThread = eligible && started.current;
    const input = useMemo(() => ({content: processedContent, groupingKey,
        options: {replacement, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix,
            cardSpec, extraRehypePlugins, editableTasks, taskSourceContent,
            normalizeLine: editableTasks ? props.normalizeLine : undefined}}),
    // Replacement body changes only invalidate syntax through the topology key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [processedContent, groupingKey, renderSurface, snapshot, studyDirectivesEnabled, studyIdPrefix,
        cardSpec, extraRehypePlugins, editableTasks, taskSourceContent, props.normalizeLine, props.resourceBaseUrl]);
    latest.current = input;
    useEffect(() => {
        if (!offThread) return undefined;
        const owner = markdownWorkerQueue.acquire(); lease.current = owner;
        return () => { owner.release(); if (lease.current === owner) lease.current = null; };
    }, [offThread]);
    useEffect(() => {
        if (!offThread) return;
        let retired = false;
        lease.current?.submit(input, (tree, submitted) => {
            const current = latest.current;
            // A completed prefix can advance the visible stream while a newer
            // snapshot waits. Rewrites/topology changes cannot restore old text.
            if (!retired && current.groupingKey === submitted.groupingKey && current.content.startsWith(submitted.content))
                setParsed({tree, input: submitted});
        }, () => { if (!retired) setFailed(true); });
        // Replacing pending work is owned by the queue. Do not retire an active
        // prefix merely because the next streaming snapshot has arrived.
        return () => { if (latest.current === input) retired = true; };
    }, [input, offThread]);
    const synchronous = useMemo(() => offThread ? null : parseMarkdownSyntax(input.content, input.options), [input, offThread]);
    const tree = offThread ? parsed?.tree || lastTree.current : synchronous;
    if (tree) lastTree.current = tree;
    // Unlike timing setState, this includes syntax/JSX work and the DOM commit,
    // and runs in production builds where React Profiler callbacks are disabled.
    useLayoutEffect(() => { reportRenderCost?.(performance.now() - renderStarted); });
    return useMemo(() => {
        if (!tree) return <span className="animate-pulse text-sm text-muted-foreground" role="status">正在排版…</span>;
        rehypeReuseMarkdownNodes({cache: nodeReuse})(tree);
        const walk = node => {
            if (node.type === 'element') {
                let originals = originalUrls.current.get(node);
                if (!originals) { originals = {}; originalUrls.current.set(node, originals); }
                for (const [key, tags] of Object.entries(urlAttributes)) {
                    if (Object.hasOwn(node.properties, key) && (tags === null || tags.includes(node.tagName))) {
                        if (!Object.hasOwn(originals, key)) originals[key] = String(node.properties[key] || '');
                        node.properties[key] = transformUrl(originals[key], key, node);
                    }
                }
            }
            node.children?.forEach(walk);
        };
        walk(tree);
        return toJsxRuntime(tree, {Fragment, jsx, jsxs, components, ignoreInvalidStyle: true, passKeys: true, passNode: true});
    }, [tree, nodeReuse, transformUrl, components]);
}, (previous, next) => Object.keys(next).every(key => key === 'replacement' || previous[key] === next[key]));
MarkdownSyntax.displayName = 'MarkdownSyntax';
export default MarkdownSyntax;
