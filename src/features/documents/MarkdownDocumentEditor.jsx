import { collaboratorPosition } from './collaboratorPosition.js';
import FileUploadProgress from '@/components/files/FileUploadProgress.jsx';
import { insertUploadedImages, DOCUMENT_IMAGE_UPLOAD_POLICY } from './images.js';
import { isUploadAllowed } from '@/components/files/uploadPolicy.js';
import apiClient from '@/lib/apiClient.js';
import FileManager from '@/components/files/FileManager.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { onEvent } from '@/context/useEventStore.jsx';
import { useTranslation } from 'react-i18next';
import { useDeferredValue, useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { yCollab, yUndoManagerKeymap } from 'y-codemirror.next';
import * as Y from 'yjs';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/lib/tools.jsx';
import DocumentCollaborators from './DocumentCollaborators.jsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
    FileText,
    FolderOpen,
    X,
    Upload,
    Code2,
    Columns2,
    Eye,
    Save,
    History,
    Bold,
    Italic,
    Strikethrough,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Code,
    Undo2,
    Redo2,
    Link,
    Image,
} from 'lucide-react';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer.jsx';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import DocumentHistory from './DocumentHistory.jsx';
import { wrapSelection, prefixLines } from './commands.js';
import useCollaborativeDocument from './useCollaborativeDocument.js';

export default function MarkdownDocumentEditor({ documentId, onStatus, headerContainer }) {
    const { t } = useTranslation();
    const [filesOpen, setFilesOpen] = useState(false);
    const [filesRevision, setFilesRevision] = useState(0);
    const [uploads, setUploads] = useState([]);
    const [uploading, setUploading] = useState(false);
    const uploadInput = useRef(null);
    const pasteImages = useRef(null);
    const host = useRef(null);
    const editorRef = useRef(null);
    const undoRef = useRef(null);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [linkOpen, setLinkOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [imageLink, setImageLink] = useState(false);
    const { resource, status, error, participants, lastActor, save, restore, saving } = useCollaborativeDocument(
        documentId,
        onStatus,
    );
    const [content, setContent] = useState('');
    const [pane, setPane] = useState('split');
    const isMobile = useIsMobile();
    const activePane = isMobile && pane === 'split' ? 'edit' : pane;
    const preview = useDeferredValue(content);
    const uploadImages = async (files, directory = 'assets') => {
        const text = resource?.text;
        const editor = editorRef.current;
        if (!text || !editor) return;
        setUploading(true);
        try {
            await insertUploadedImages({
                files,
                text,
                doc: resource.doc,
                editor,
                isCurrent: () => editorRef.current === editor,
                upload: async (file) => {
                    if (!isUploadAllowed(file, DOCUMENT_IMAGE_UPLOAD_POLICY))
                        throw new Error(t('document_image_limits'));
                    const id = crypto.randomUUID();
                    const started = performance.now();
                    setUploads((previous) => [
                        ...previous.slice(-19),
                        { id, name: file.name, percent: 0, speed: 0, status: 'uploading' },
                    ]);
                    const update = (patch) =>
                        setUploads((previous) =>
                            previous.map((item) => (item.id === id ? { ...item, ...patch } : item)),
                        );
                    const form = new FormData();
                    form.append('file', file);
                    form.append('directory', directory || 'assets');
                    try {
                        const data = await apiClient.post(`/document/${documentId}/files/images`, form, {
                            onUploadProgress: (progress) => {
                                const total = progress.total || file.size;
                                update({
                                    percent: Math.min(100, (progress.loaded / total) * 100),
                                    speed:
                                        progress.rate ||
                                        progress.loaded / Math.max((performance.now() - started) / 1000, 0.001),
                                });
                            },
                        });
                        update({ percent: 100, status: 'done' });
                        return data;
                    } catch (cause) {
                        update({ status: 'error' });
                        throw cause;
                    }
                },
            });
            setFilesRevision((value) => value + 1);
        } catch (cause) {
            toast.error(cause.message);
        } finally {
            setUploading(false);
        }
    };
    pasteImages.current = uploadImages;
    const fileAdapter = useMemo(
        () => ({
            list: (path) => apiClient.get(`/document/${documentId}/files`, { params: { path } }),
            prepareDelete: async (path) => {
                await save();
                return apiClient.get(`/document/${documentId}/files/references`, { params: { path } });
            },
            remove: (path, prepared) =>
                apiClient.delete(`/document/${documentId}/files`, {
                    data: { path, revision: prepared.revision, confirm_referenced: prepared.references > 0 },
                }),
            move: async (path, destination) => {
                await save();
                const current = await apiClient.get(`/document/${documentId}/files`);
                return apiClient.post(`/document/${documentId}/files/move`, {
                    path,
                    destination,
                    revision: current.revision,
                });
            },
            mkdir: (parent, name) => apiClient.post(`/document/${documentId}/files/folders`, { parent, name }),
            rename: async (path, name) => {
                // Flush local CRDT edits before obtaining the server revision.
                await save();
                const current = await apiClient.get(`/document/${documentId}/files`);
                return apiClient.patch(`/document/${documentId}/files/rename`, {
                    path,
                    name,
                    revision: current.revision,
                });
            },
        }),
        [documentId, save],
    );
    useEffect(
        () =>
            onEvent({ event: 'document.files.changed', documentId, direction: 'incoming' }).then(() =>
                setFilesRevision((value) => value + 1),
            ),
        [documentId],
    );
    useEffect(() => {
        if (!resource || !host.current) return;
        const { text } = resource;
        const undoManager = new Y.UndoManager(text);
        const update = () => setContent(text.toString());
        text.observe(update);
        update();
        const editor = new EditorView({
            parent: host.current,
            state: EditorState.create({
                doc: text.toString(),
                extensions: [
                    EditorView.domEventHandlers({
                        paste(event) {
                            const files = [...(event.clipboardData?.files || [])].filter((file) =>
                                file.type.startsWith('image/'),
                            );
                            if (!files.length) return false;
                            event.preventDefault();
                            void pasteImages.current(files);
                            return true;
                        },
                    }),
                    lineNumbers(),
                    highlightActiveLine(),
                    drawSelection(),
                    markdown(),
                    syntaxHighlighting(defaultHighlightStyle),
                    EditorView.lineWrapping,
                    keymap.of([...yUndoManagerKeymap, ...defaultKeymap]),
                    yCollab(text, resource.awareness, { undoManager }),
                    EditorView.theme({
                        '&': { height: '100%', background: 'transparent', color: 'inherit' },
                        '.cm-scroller': {
                            overflow: 'auto',
                            fontFamily: 'ui-monospace, Consolas, "Microsoft YaHei", monospace',
                        },
                        '.cm-content': {
                            padding: '20px 12px',
                            minHeight: '100%',
                            caretColor: 'var(--collaborator-color, currentColor)',
                        },
                        '.cm-cursor, .cm-dropCursor': {
                            borderLeftColor: 'var(--collaborator-color, currentColor) !important',
                        },
                        '.cm-selectionBackground': {
                            backgroundColor:
                                'color-mix(in srgb, var(--collaborator-color, currentColor) 22%, transparent) !important',
                        },
                        '.cm-content ::selection': {
                            backgroundColor:
                                'color-mix(in srgb, var(--collaborator-color, currentColor) 22%, transparent)',
                        },
                        '.cm-line': { padding: '0 4px', lineHeight: '1.8' },
                        '.cm-activeLine': { background: 'color-mix(in srgb, var(--muted) 45%, transparent)' },
                        '.cm-activeLineGutter': { background: 'transparent' },
                        '.cm-ySelectionInfo': {
                            borderRadius: '4px 4px 4px 0',
                            padding: '2px 6px',
                            fontFamily: 'inherit',
                        },
                        '.cm-gutters': {
                            background: 'transparent',
                            color: 'var(--muted-foreground)',
                            borderRight: 'none',
                            fontSize: '11px',
                            padding: '0 4px',
                        },
                        '&.cm-focused': { outline: 'none' },
                    }),
                ],
            }),
        });
        const syncLocalColor = () => {
            const color = resource.awareness.getLocalState()?.user?.color;
            if (color) editor.dom.style.setProperty('--collaborator-color', color);
        };
        syncLocalColor();
        resource.awareness.on('update', syncLocalColor);
        editorRef.current = editor;
        undoRef.current = undoManager;
        return () => {
            editorRef.current = null;
            undoRef.current = null;
            resource.awareness.off('update', syncLocalColor);
            editor.destroy();
            undoManager.destroy();
            text.unobserve(update);
        };
    }, [resource]);
    const locateCollaborator = (person) => {
        const position = collaboratorPosition(resource, person.clientId);
        if (position === null || !editorRef.current) {
            toast.info(t('documentCollaborators.noCursor'));
            return false;
        }
        if (activePane === 'preview') setPane('edit');
        requestAnimationFrame(() => {
            // Popover closes before scrolling; avoid changing the local selection or cursor.
            const currentPosition = collaboratorPosition(resource, person.clientId);
            if (currentPosition !== null && editorRef.current) {
                editorRef.current.dispatch({ effects: EditorView.scrollIntoView(currentPosition, { y: 'center' }) });
            }
        });
        return true;
    };
    const handleSave = async () => {
        try {
            await save();
            toast.success(t('documents_version_saved'));
        } catch (cause) {
            toast.error(cause.message);
        }
    };
    useEffect(() => {
        const interceptSave = (event) => {
            if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 's') {
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat)
                    void save()
                        .then(() => toast.success(t('documents_version_saved')))
                        .catch((cause) => toast.error(cause.message));
            }
        };
        window.addEventListener('keydown', interceptSave, true);
        return () => window.removeEventListener('keydown', interceptSave, true);
    }, [save, t]);
    const command = (callback) => {
        if (!editorRef.current) return;
        if (activePane === 'preview') setPane('edit');
        undoRef.current.stopCapturing();
        callback(editorRef.current);
        undoRef.current.stopCapturing();
    };
    const tools = [
        { label: t('documents_undo'), icon: <Undo2 />, run: () => undoRef.current.undo() },
        { label: t('documents_redo'), icon: <Redo2 />, run: () => undoRef.current.redo() },
        { label: t('documents_heading'), icon: <Heading2 />, run: (view) => prefixLines(view, '## ') },
        {
            label: t('documents_bold'),
            icon: <Bold />,
            run: (view) => wrapSelection(view, '**', '**', t('documents_text')),
        },
        {
            label: t('documents_italic'),
            icon: <Italic />,
            run: (view) => wrapSelection(view, '*', '*', t('documents_text')),
        },
        {
            label: t('documents_strikethrough'),
            icon: <Strikethrough />,
            run: (view) => wrapSelection(view, '~~', '~~', t('documents_text')),
        },
        { label: t('documents_bullet_list'), icon: <List />, run: (view) => prefixLines(view, '- ') },
        { label: t('documents_numbered_list'), icon: <ListOrdered />, run: (view) => prefixLines(view, '1. ') },
        { label: t('documents_quote'), icon: <Quote />, run: (view) => prefixLines(view, '> ') },
        {
            label: t('documents_code_block'),
            icon: <Code />,
            run: (view) => wrapSelection(view, '```\n', '\n```', t('documents_code')),
        },
    ];
    const insertLink = (event) => {
        event.preventDefault();
        const url = linkUrl.trim();
        if (!url || /[<>\s]/.test(url) || /^(?!https?:)[a-z][a-z0-9+.-]*:/i.test(url)) {
            toast.error(t('documents_enter_a_url_or_a_relative_path_within_the_document'));
            return;
        }
        command((view) =>
            wrapSelection(
                view,
                imageLink ? '![' : '[',
                `](${url.replaceAll('(', '%28').replaceAll(')', '%29')})`,
                imageLink ? t('documents_image_description') : t('documents_link_text'),
            ),
        );
        setLinkOpen(false);
        setLinkUrl('');
    };
    const statusLabel = t(
        {
            正在连接: 'documents_connecting',
            已同步: 'documents_synced',
            '离线 · 已保存在本机': 'documents_offline_saved_on_this_device',
            正在同步: 'documents_syncing',
            '同步失败 · 已保存在本机': 'documents_sync_failed_saved_on_this_device',
            加载失败: 'documents_failed_to_load',
        }[status] || 'documents_connecting',
    );
    const documentControls = (
        <div className="flex shrink-0 items-center gap-3">
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"
                        aria-label={statusLabel}
                    >
                        <span
                            className={`size-1.5 rounded-full ${status === '已同步' ? 'bg-emerald-500' : status.includes('离线') || error ? 'bg-amber-500' : 'animate-pulse bg-muted-foreground'}`}
                        />
                        <span className="hidden sm:inline">
                            {status === '已同步' ? t('documents_saved') : statusLabel}
                        </span>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    {statusLabel}
                    {lastActor?.kind === 'ai' ? t('documents_last_edited_by_ai') : ''}
                </TooltipContent>
            </Tooltip>
            <DocumentCollaborators participants={participants} onLocate={locateCollaborator} />
            <div className="flex shrink-0 items-center gap-0.5 rounded-lg bg-muted/60 p-0.5">
                {[
                    { value: 'edit', label: t('documents_edit'), icon: <Code2 className="size-3.5" /> },
                    { value: 'split', label: t('documents_split_view'), icon: <Columns2 className="size-3.5" /> },
                    { value: 'preview', label: t('documents_preview'), icon: <Eye className="size-3.5" /> },
                ].map(({ value, label, icon }) => (
                    <Tooltip key={value}>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                aria-label={label}
                                aria-pressed={activePane === value}
                                className={`size-7 rounded-md ${value === 'split' ? 'hidden md:inline-flex' : ''} ${activePane === value ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                                onClick={() => setPane(value)}
                            >
                                {icon}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
    const documentHeader = (
        <header className="flex h-14 shrink-0 items-center gap-3 px-3 md:px-4">
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {resource?.metadata.title || 'Markdown'}
            </span>
        </header>
    );
    const fileManager = (
        <FileManager
            showTitle={!isMobile}
            uploadPolicy={DOCUMENT_IMAGE_UPLOAD_POLICY}
            uploads={uploads}
            headerAction={
                !isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={t('documents_close')}
                        onClick={() => setFilesOpen(false)}
                    >
                        <X className="size-4" />
                    </Button>
                )
            }
            adapter={fileAdapter}
            refreshToken={filesRevision}
            onUpload={uploadImages}
            accept={DOCUMENT_IMAGE_UPLOAD_POLICY.accept}
            onOpen={(file) => {
                if (file.path.startsWith('assets/')) {
                    command((view) => wrapSelection(view, '![', `](${encodeURI(file.path)})`, file.name));
                    if (isMobile) setFilesOpen(false);
                }
            }}
        />
    );
    return (
        <div className="flex h-full min-h-0 flex-col bg-background font-sans text-foreground">
            {headerContainer ? createPortal(documentHeader, headerContainer) : documentHeader}
            <div className="flex shrink-0 flex-wrap items-center gap-1 gap-y-2 border-b px-3 py-1.5">
                <div className="flex min-w-0 flex-1 basis-72 items-center gap-0.5 overflow-x-auto">
                    {tools.map(({ label, icon, run }) => (
                        <Tooltip key={label}>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="size-8 shrink-0 text-muted-foreground"
                                    aria-label={label}
                                    disabled={!resource}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => command(run)}
                                >
                                    {icon}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{label}</TooltipContent>
                        </Tooltip>
                    ))}
                    <Popover open={linkOpen} onOpenChange={setLinkOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="size-8 shrink-0 text-muted-foreground"
                                aria-label={t('documents_insert_a_link_or_image')}
                                disabled={!resource}
                            >
                                <Link className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-72">
                            <form onSubmit={insertLink} className="space-y-3">
                                <div className="flex gap-1">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={imageLink ? 'ghost' : 'secondary'}
                                        onClick={() => setImageLink(false)}
                                    >
                                        <Link />
                                        {t('documents_link')}
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={imageLink ? 'secondary' : 'ghost'}
                                        onClick={() => setImageLink(true)}
                                    >
                                        <Image />
                                        {t('documents_image')}
                                    </Button>
                                </div>
                                <Input
                                    aria-label={t('documents_resource_url')}
                                    placeholder={
                                        imageLink ? t('documents_assets_image_png_or_an_image_url') : 'https://…'
                                    }
                                    value={linkUrl}
                                    onChange={(event) => setLinkUrl(event.target.value)}
                                />
                                <Button type="submit" size="sm" className="w-full">
                                    {t('documents_insert')}
                                </Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="ml-auto flex max-w-full items-center gap-2 overflow-x-auto">
                    {documentControls}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                        disabled={uploading || !resource}
                        aria-label={t('document_upload_image')}
                        title={t('document_upload_image')}
                        onClick={() => uploadInput.current?.click()}
                    >
                        <Upload className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                        aria-label={t('document_files')}
                        title={t('document_files')}
                        onClick={() => setFilesOpen(true)}
                    >
                        <FolderOpen className="size-4" />
                    </Button>
                    <div className="flex shrink-0 gap-0.5 border-l pl-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="size-8"
                                    aria-label={t('documents_save_version')}
                                    disabled={!resource || saving}
                                    onClick={() => void handleSave()}
                                >
                                    <Save className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('documents_save_version_ctrl_s')}</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="size-8"
                                    aria-label={t('documents_version_history')}
                                    disabled={!resource}
                                    onClick={() => setHistoryOpen(true)}
                                >
                                    <History className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('documents_version_history')}</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <input
                ref={uploadInput}
                type="file"
                accept={DOCUMENT_IMAGE_UPLOAD_POLICY.accept}
                multiple
                hidden
                onChange={(event) => {
                    const files = [...event.target.files];
                    event.target.value = '';
                    void uploadImages(files);
                }}
            />
            {isMobile && (
                <Dialog open={filesOpen} onOpenChange={setFilesOpen}>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>{t('document_files')}</DialogTitle>
                            <DialogDescription>{t('document_files_description')}</DialogDescription>
                        </DialogHeader>
                        {fileManager}
                    </DialogContent>
                </Dialog>
            )}
            {!filesOpen && uploads.length > 0 && (
                <div className="shrink-0 border-b px-3 py-2">
                    <FileUploadProgress uploads={uploads} />
                </div>
            )}
            <DocumentHistory
                documentId={documentId}
                open={historyOpen}
                onOpenChange={setHistoryOpen}
                restore={restore}
                saving={saving}
                currentContent={content}
            />
            {error && <p className="border-b px-4 py-2 text-xs text-destructive">{error}</p>}
            <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className={`grid h-full min-h-0 ${pane === 'split' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                    <div
                        className={`min-h-0 min-w-0 ${pane === 'split' ? 'md:border-r' : ''} ${pane === 'preview' ? 'hidden' : 'block'}`}
                    >
                        <div ref={host} className="h-full" />
                    </div>
                    <div
                        className={`pretty-scrollbar min-h-0 min-w-0 overflow-auto bg-muted/10 px-6 py-5 md:px-8 ${pane === 'edit' ? 'hidden' : pane === 'split' ? 'hidden md:block' : 'block'}`}
                    >
                        <div className="mx-auto max-w-3xl">
                            <MarkdownRenderer
                                resourceBaseUrl={`/api/document/${documentId}/assets/`}
                                content={preview}
                                contextId={`document:${documentId}`}
                            />
                        </div>
                    </div>
                </div>
                {!isMobile && (
                    <aside
                        className={`absolute inset-y-0 left-0 z-20 flex w-[min(22rem,100%)] flex-col border-r bg-background shadow-[8px_0_24px_-8px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out ${filesOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'}`}
                        aria-label={t('document_files')}
                        aria-hidden={!filesOpen}
                        inert={!filesOpen ? true : undefined}
                    >
                        <div className="min-h-0 flex-1 overflow-auto p-4">{fileManager}</div>
                    </aside>
                )}
            </div>
        </div>
    );
}
