import { isUploadAllowed } from './uploadPolicy.js';
import FileUploadProgress from './FileUploadProgress.jsx';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    File,
    Image,
    Pencil,
    RefreshCw,
    Upload,
    Loader2,
    Folder,
    FolderPlus,
    ArrowUp,
    ChevronRight,
    Home,
    Trash2,
    FolderInput,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Adapters own authorization, paths and transport; this shell only renders files.
export default function FileManager({
    adapter,
    onOpen,
    onUpload,
    accept,
    uploadPolicy = {},
    refreshToken = 0,
    uploads = [],
    showTitle = true,
    headerAction,
}) {
    const { t } = useTranslation();
    const [pendingDelete, setPendingDelete] = useState(null);
    const [moving, setMoving] = useState(null);
    const [destination, setDestination] = useState('assets');
    const [targetFolders, setTargetFolders] = useState([]);
    const [directory, setDirectory] = useState('');
    const [creating, setCreating] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(null);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const input = useRef(null);
    const epoch = useRef(0);
    const targetRequest = useRef(0);
    const reload = useCallback(async () => {
        const current = ++epoch.current;
        setLoading(true);
        setError('');
        try {
            const data = await adapter.list(directory);
            if (current === epoch.current) setFiles(data.files);
        } catch (cause) {
            if (current === epoch.current) setError(cause.message);
        } finally {
            if (current === epoch.current) setLoading(false);
        }
    }, [adapter, directory]);
    const invalidate = useCallback(() => {
        epoch.current += 1;
    }, []);
    useEffect(() => {
        setEditing(null);
        void reload();
        return invalidate;
    }, [reload, refreshToken, invalidate]);
    const rename = async () => {
        setBusy(true);
        try {
            if (creating) await adapter.mkdir(directory, name);
            else await adapter.rename(editing, name);
            setCreating(false);
            setEditing(null);
            await reload();
        } catch (cause) {
            toast.error(cause.message);
        } finally {
            setBusy(false);
        }
    };
    const browseTarget = async (path) => {
        const request = ++targetRequest.current;
        try {
            const data = await adapter.list(path);
            if (request !== targetRequest.current) return;
            setTargetFolders(data.files.filter((file) => file.kind === 'directory'));
            setDestination(path);
        } catch (cause) {
            toast.error(cause.message);
        }
    };
    const prepareDelete = async (file) => {
        setBusy(true);
        try {
            const data = await adapter.prepareDelete(file.path);
            setPendingDelete({ file, ...data });
        } catch (cause) {
            toast.error(cause.message);
        } finally {
            setBusy(false);
        }
    };
    const remove = async () => {
        setBusy(true);
        try {
            await adapter.remove(pendingDelete.file.path, pendingDelete);
            setPendingDelete(null);
            await reload();
        } catch (cause) {
            toast.error(cause.message);
            setPendingDelete(null);
        } finally {
            setBusy(false);
        }
    };
    const move = async () => {
        setBusy(true);
        try {
            await adapter.move(moving.path, destination);
            setMoving(null);
            await reload();
        } catch (cause) {
            toast.error(cause.message);
        } finally {
            setBusy(false);
        }
    };
    return (
        <div className="flex min-h-0 flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                {showTitle && <span className="text-sm font-medium">{t('document_files')}</span>}
                <div className="flex gap-1">
                    {adapter.mkdir && (
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={busy || !directory}
                            aria-label={t('file_manager_new_folder')}
                            title={t('file_manager_new_folder')}
                            onClick={() => {
                                setCreating(true);
                                setEditing(null);
                                setName('');
                            }}
                        >
                            <FolderPlus className="size-4" />
                        </Button>
                    )}
                    {onUpload && (
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t('document_upload_image')}
                            disabled={busy}
                            onClick={() => input.current?.click()}
                        >
                            <Upload className="size-4" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t('refresh')}
                        disabled={loading}
                        onClick={() => void reload()}
                    >
                        <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                    {headerAction}
                </div>
            </div>
            <FileUploadProgress uploads={uploads} />
            <nav
                className="flex items-center gap-1 overflow-x-auto rounded-lg border bg-muted/30 p-1"
                aria-label={t('file_manager_path')}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={!directory || busy}
                    aria-label={t('file_manager_up')}
                    onClick={() => setDirectory(directory.split('/').slice(0, -1).join('/'))}
                >
                    <ArrowUp className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={busy}
                    aria-label={t('file_manager_root')}
                    onClick={() => setDirectory('')}
                >
                    <Home className="size-4" />
                </Button>
                {directory
                    .split('/')
                    .filter(Boolean)
                    .map((part, index, parts) => (
                        <span key={index} className="flex shrink-0 items-center">
                            <ChevronRight className="size-3 text-muted-foreground" />
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={busy}
                                onClick={() => setDirectory(parts.slice(0, index + 1).join('/'))}
                            >
                                {part}
                            </Button>
                        </span>
                    ))}
            </nav>
            <input
                ref={input}
                type="file"
                accept={uploadPolicy.accept || accept}
                multiple
                hidden
                onChange={async (event) => {
                    const selected = [...event.target.files];
                    event.target.value = '';
                    if (selected.some((file) => !isUploadAllowed(file, uploadPolicy))) {
                        toast.error(t('file_upload_not_allowed'));
                        return;
                    }
                    setBusy(true);
                    try {
                        await onUpload(selected, directory);
                        await reload();
                    } catch (cause) {
                        toast.error(cause.message);
                    } finally {
                        setBusy(false);
                    }
                }}
            />
            {error && (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}
            {loading && !files.length && <Loader2 className="size-5 animate-spin" />}
            <div className="max-h-[60dvh] space-y-1 overflow-auto">
                {files.map((file) => (
                    <div key={file.path} className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted">
                        {file.kind === 'directory' ? (
                            <Folder className="size-4 shrink-0 text-primary" />
                        ) : /\.(png|jpe?g|webp|gif)$/i.test(file.name) ? (
                            <Image className="size-4 shrink-0 text-muted-foreground" />
                        ) : (
                            <File className="size-4 shrink-0 text-muted-foreground" />
                        )}
                        <button
                            className="min-w-0 flex-1 text-left"
                            title={file.path}
                            onClick={() => {
                                if (file.kind === 'directory') setDirectory(file.path);
                                else onOpen?.(file);
                            }}
                            disabled={busy || (file.kind !== 'directory' && !onOpen)}
                        >
                            <span className="block truncate text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {file.kind === 'directory'
                                    ? t('file_manager_folder')
                                    : `${(file.size / 1024).toFixed(1)} KB`}
                            </span>
                        </button>
                        {adapter.move && !file.readOnly && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                disabled={busy}
                                aria-label={t('file_manager_move')}
                                title={t('file_manager_move')}
                                onClick={() => {
                                    setMoving(file);
                                    void browseTarget(directory || 'assets');
                                }}
                            >
                                <FolderInput className="size-4" />
                            </Button>
                        )}
                        {adapter.remove && !file.readOnly && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                disabled={busy}
                                aria-label={t('file_manager_delete')}
                                title={t('file_manager_delete')}
                                onClick={() => void prepareDelete(file)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        )}
                        {adapter.rename && !file.readOnly && (
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={busy}
                                aria-label={t('document_rename_file')}
                                onClick={() => {
                                    setCreating(false);
                                    setEditing(file.path);
                                    setName(file.name);
                                }}
                            >
                                <Pencil className="size-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            {!loading && !files.length && !error && (
                <p className="py-8 text-center text-sm text-muted-foreground">{t('file_manager_empty')}</p>
            )}
            {(editing || creating) && (
                <form
                    className="flex gap-2 border-t pt-3"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void rename();
                    }}
                >
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        aria-label={t('document_file_name')}
                        disabled={busy}
                    />
                    <Button type="submit" disabled={busy || !name.trim()}>
                        {t(creating ? 'file_manager_create' : 'document_rename_file')}
                    </Button>
                    <Button
                        variant="ghost"
                        type="button"
                        disabled={busy}
                        onClick={() => {
                            setCreating(false);
                            setEditing(null);
                        }}
                    >
                        {t('cancel')}
                    </Button>
                </form>
            )}
            <Dialog
                open={Boolean(pendingDelete)}
                onOpenChange={(open) => {
                    if (!open && !busy) setPendingDelete(null);
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('file_manager_delete')}</DialogTitle>
                        <DialogDescription>
                            {pendingDelete?.references
                                ? t('file_manager_delete_referenced', { count: pendingDelete.references })
                                : t('file_manager_delete_confirm')}
                        </DialogDescription>
                    </DialogHeader>
                    <p className="break-all text-sm">{pendingDelete?.file.path}</p>
                    <DialogFooter>
                        <Button variant="outline" disabled={busy} onClick={() => setPendingDelete(null)}>
                            {t('cancel')}
                        </Button>
                        <Button variant="destructive" disabled={busy} onClick={() => void remove()}>
                            {t('file_manager_delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog
                open={Boolean(moving)}
                onOpenChange={(open) => {
                    if (!open && !busy) setMoving(null);
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('file_manager_move')}</DialogTitle>
                        <DialogDescription>{t('file_manager_choose_destination')}</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            disabled={destination === 'assets' || busy}
                            onClick={() => void browseTarget(destination.split('/').slice(0, -1).join('/'))}
                        >
                            <ArrowUp className="size-4" />
                        </Button>
                        <span className="break-all text-sm">{destination}</span>
                    </div>
                    <div className="max-h-60 overflow-auto">
                        {targetFolders.map((folder) => (
                            <Button
                                key={folder.path}
                                variant="ghost"
                                className="w-full justify-start"
                                disabled={
                                    busy || folder.path === moving?.path || folder.path.startsWith(`${moving?.path}/`)
                                }
                                onClick={() => void browseTarget(folder.path)}
                            >
                                <Folder className="size-4" />
                                {folder.name}
                            </Button>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" disabled={busy} onClick={() => setMoving(null)}>
                            {t('cancel')}
                        </Button>
                        <Button disabled={busy} onClick={() => void move()}>
                            {t('file_manager_move_here')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
