import React, {memo} from 'react';
import {ExternalLink, Loader2} from 'lucide-react';

import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
    openUniversalModalLink,
    useUniversalModalStore,
} from './universalModal.js';

const SIZE_STYLE = {
    sm: {width: 'min(92vw, 30rem)'},
    md: {width: 'min(94vw, 42rem)'},
    lg: {width: 'min(94vw, 54rem)'},
    xl: {width: 'min(96vw, 72rem)'},
    full: {width: 'min(98vw, 96rem)'},
};

const normalizeItems = (value) => Array.isArray(value) ? value : [];

const BackendLink = ({href, children, className = ''}) => {
    const modalLink = typeof href === 'string' && href.startsWith('cwm://modal/');
    return (
        <a
            href={href || '#'}
            target={modalLink ? undefined : '_blank'}
            rel={modalLink ? undefined : 'noopener noreferrer'}
            className={`inline-flex items-center gap-1 text-blue-600 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-700 ${className}`}
            onClick={modalLink ? (event) => {
                event.preventDefault();
                event.stopPropagation();
                openUniversalModalLink(href);
            } : undefined}
        >
            {children}
            {!modalLink && <ExternalLink className="h-3 w-3"/>}
        </a>
    );
};

const KeyValueBlock = ({block}) => (
    <section className="space-y-2">
        {block.title && <h3 className="text-sm font-medium">{block.title}</h3>}
        <div className="overflow-hidden rounded-lg border bg-muted/10">
            {normalizeItems(block.items).map((item, index) => (
                <div
                    key={`${item?.label || 'item'}-${index}`}
                    className="grid grid-cols-[minmax(7rem,auto)_minmax(0,1fr)] gap-4 border-b px-3 py-2 text-xs last:border-b-0"
                >
                    <span className="text-muted-foreground">{item?.label || ''}</span>
                    <span className={`min-w-0 break-words text-right ${item?.mono ? 'font-mono' : ''}`}>
                        {item?.href ? (
                            <BackendLink href={item.href}>{String(item?.value ?? '')}</BackendLink>
                        ) : String(item?.value ?? '')}
                    </span>
                </div>
            ))}
        </div>
    </section>
);

const CodeBlock = ({block}) => (
    <section className="space-y-2">
        <div className="flex items-center justify-between gap-3">
            {block.title && <h3 className="text-sm font-medium">{block.title}</h3>}
            {block.language && <span className="text-[10px] uppercase text-muted-foreground">{block.language}</span>}
        </div>
        <pre
            className="pretty-scrollbar overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-muted/20 p-3 font-mono text-xs leading-relaxed"
            style={{maxHeight: block.maxHeight || '22rem'}}
        >
            {String(block.content ?? '') || '(empty)'}
        </pre>
    </section>
);

const BadgeBlock = ({block}) => (
    <div className="flex flex-wrap items-center gap-2">
        {normalizeItems(block.items).map((item, index) => (
            <Badge key={`${item?.label || 'badge'}-${index}`} variant={item?.variant || 'secondary'}>
                {item?.label || ''}
            </Badge>
        ))}
    </div>
);

const ListBlock = ({block}) => (
    <section className="space-y-2">
        {block.title && <h3 className="text-sm font-medium">{block.title}</h3>}
        <ul className="space-y-1.5 text-sm">
            {normalizeItems(block.items).map((item, index) => (
                <li key={`${index}-${String(item?.text ?? item ?? '').slice(0, 24)}`} className="flex gap-2">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-current opacity-40"/>
                    <span className="min-w-0 break-words">
                        {item?.href ? <BackendLink href={item.href}>{item?.text ?? item?.label ?? ''}</BackendLink> : String(item?.text ?? item ?? '')}
                    </span>
                </li>
            ))}
        </ul>
    </section>
);

const ModalBlock = memo(({block}) => {
    if (!block || typeof block !== 'object') return null;
    switch (block.type) {
        case 'markdown':
            return (
                <section className="min-w-0">
                    {block.title && <h3 className="mb-2 text-sm font-medium">{block.title}</h3>}
                    <MarkdownRenderer content={String(block.content || '')}/>
                </section>
            );
        case 'text':
            return (
                <section className="space-y-2">
                    {block.title && <h3 className="text-sm font-medium">{block.title}</h3>}
                    <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">{String(block.content || '')}</div>
                </section>
            );
        case 'code':
            return <CodeBlock block={block}/>;
        case 'keyValue':
            return <KeyValueBlock block={block}/>;
        case 'badges':
            return <BadgeBlock block={block}/>;
        case 'list':
            return <ListBlock block={block}/>;
        case 'divider':
            return <hr className="border-border"/>;
        default:
            return (
                <CodeBlock block={{
                    title: block.title || `未知弹窗块：${block.type || 'unknown'}`,
                    language: 'json',
                    content: JSON.stringify(block, null, 2),
                }}/>
            );
    }
});
ModalBlock.displayName = 'ModalBlock';

const UniversalModalHost = () => {
    const open = useUniversalModalStore(state => state.open);
    const loading = useUniversalModalStore(state => state.loading);
    const descriptor = useUniversalModalStore(state => state.descriptor);
    const error = useUniversalModalStore(state => state.error);
    const close = useUniversalModalStore(state => state.close);

    const blocks = normalizeItems(descriptor?.blocks);
    const actions = normalizeItems(descriptor?.actions);
    const size = descriptor?.size && SIZE_STYLE[descriptor.size] ? descriptor.size : 'lg';

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => {
            if (!nextOpen) close();
        }}>
            <DialogContent
                className="z-[11010] flex max-h-[90vh] max-w-none flex-col overflow-hidden"
                style={SIZE_STYLE[size]}
                showCloseButton={descriptor?.dismissible !== false}
                onEscapeKeyDown={descriptor?.dismissible === false ? (event) => event.preventDefault() : undefined}
                onPointerDownOutside={descriptor?.dismissible === false ? (event) => event.preventDefault() : undefined}
            >
                <DialogHeader className="shrink-0">
                    <DialogTitle>{descriptor?.title || (loading ? '正在加载' : '信息')}</DialogTitle>
                    {descriptor?.description ? (
                        <DialogDescription className="whitespace-pre-wrap">{descriptor.description}</DialogDescription>
                    ) : (
                        <DialogDescription className="sr-only">后端提供的弹窗内容</DialogDescription>
                    )}
                </DialogHeader>

                <div className="pretty-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
                    {loading ? (
                        <div className="flex min-h-44 items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin"/> 正在按需加载服务器内容…
                        </div>
                    ) : error ? (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-4 text-sm text-destructive">
                            {error}
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {blocks.map((block, index) => (
                                <ModalBlock key={`${block?.type || 'block'}-${index}`} block={block}/>
                            ))}
                        </div>
                    )}
                </div>

                {!loading && !error && actions.length > 0 && (
                    <DialogFooter className="shrink-0 border-t pt-4">
                        {actions.map((action, index) => {
                            if (action?.type === 'close') {
                                return (
                                    <Button key={`${action.label || 'close'}-${index}`} variant={action.variant || 'outline'} onClick={close}>
                                        {action.label || '关闭'}
                                    </Button>
                                );
                            }
                            if (action?.type === 'link' && action.href) {
                                return (
                                    <Button
                                        key={`${action.label || 'link'}-${index}`}
                                        variant={action.variant || 'default'}
                                        onClick={() => {
                                            if (!openUniversalModalLink(action.href)) {
                                                window.open(action.href, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                    >
                                        {action.label || '打开'}
                                    </Button>
                                );
                            }
                            return null;
                        })}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UniversalModalHost;
