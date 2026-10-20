import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Database, Loader2, Pencil, Plus, RefreshCw, Trash2, Zap } from 'lucide-react';
import apiClient from '@/lib/apiClient.js';
import DynamicSettings from '@/components/setting/DynamicSettings.jsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const errorMessage = (error) => error?.message || '操作失败，请稍后重试。';

const formValues = (options, source) => Object.fromEntries(
    (Array.isArray(options) ? options : [])
        .filter((option) => option?.name && Object.hasOwn(source, option.name))
        .map((option) => [option.name, source[option.name]]),
);

const formPayload = (values, record) => {
    const payload = { ...values };
    if ('allowedUserIds' in payload && !Array.isArray(payload.allowedUserIds)) payload.allowedUserIds = [];
    if (record) {
        payload.revision = record.revision;
        if (!payload.password) delete payload.password;
    }
    return payload;
};

export default function KnowledgeDatabaseSettings({ config }) {
    const endpoint = config?.endpoint || '/knowledge/databases';
    const [databases, setDatabases] = useState(() => config?.databases || []);
    const [loading, setLoading] = useState(false);
    const [listError, setListError] = useState('');
    const [editor, setEditor] = useState(null);
    const [editorLoading, setEditorLoading] = useState(false);
    const [editorError, setEditorError] = useState('');
    const [conflicted, setConflicted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteError, setDeleteError] = useState('');
    const [verifyingId, setVerifyingId] = useState(null);
    const [verifyResults, setVerifyResults] = useState({});
    const editorVersion = useRef(0);
    const editorRequest = useRef(0);
    const refreshEpoch = useRef(0);
    const defaultDatabase = databases.find((record) => record.id === 'default' || record.name === 'default')
        || databases.find((record) => record.legacyDefault);

    useEffect(() => {
        setDatabases(Array.isArray(config?.databases) ? config.databases : []);
    }, [config?.databases]);

    const refresh = useCallback(async () => {
        const epoch = ++refreshEpoch.current;
        setLoading(true);
        setListError('');
        try {
            const response = await apiClient.get(endpoint);
            if (epoch === refreshEpoch.current) {
                setDatabases(Array.isArray(response?.databases) ? response.databases : []);
            }
            return epoch === refreshEpoch.current;
        } catch (error) {
            if (epoch === refreshEpoch.current) setListError(errorMessage(error));
            return false;
        } finally {
            if (epoch === refreshEpoch.current) setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const beginCreate = () => {
        editorRequest.current += 1;
        editorVersion.current += 1;
        setEditorLoading(false);
        setEditor({
            record: null,
            values: formValues(config?.formOptions, { ...(config?.formDefaults || {}), password: '' }),
            key: editorVersion.current,
        });
        setEditorError('');
        setConflicted(false);
    };

    const beginEdit = async (record) => {
        const requestId = ++editorRequest.current;
        setEditorLoading(true);
        setListError('');
        try {
            const latest = await apiClient.get(`${endpoint}/${encodeURIComponent(record.id)}`);
            if (requestId !== editorRequest.current) return;
            editorVersion.current += 1;
            setEditor({
                record: latest,
                values: formValues(config?.formOptions, { ...latest, password: '' }),
                key: editorVersion.current,
            });
            setEditorError('');
            setConflicted(false);
        } catch (error) {
            if (requestId === editorRequest.current) setListError(errorMessage(error));
        } finally {
            if (requestId === editorRequest.current) setEditorLoading(false);
        }
    };

    const closeEditor = () => {
        if (saving) return;
        editorRequest.current += 1;
        setEditor(null);
        setEditorError('');
        setConflicted(false);
    };

    const reloadConflictedRecord = async () => {
        if (!editor?.record) return;
        const requestId = ++editorRequest.current;
        const current = editor.record;
        setEditorLoading(true);
        try {
            const latest = await apiClient.get(`${endpoint}/${encodeURIComponent(current.id)}`);
            if (requestId !== editorRequest.current) return;
            editorVersion.current += 1;
            setEditor({
                record: latest,
                values: formValues(config?.formOptions, { ...latest, password: '' }),
                key: editorVersion.current,
            });
            setEditorError('');
            setConflicted(false);
            await refresh();
        } catch (error) {
            if (requestId === editorRequest.current) setEditorError(errorMessage(error));
        } finally {
            if (requestId === editorRequest.current) setEditorLoading(false);
        }
    };

    const save = async () => {
        if (!editor || saving) return;
        refreshEpoch.current += 1;
        setLoading(false);
        setSaving(true);
        setEditorError('');
        const { record, values } = editor;
        try {
            const payload = formPayload(values, record);
            const saved = record
                ? await apiClient.put(`${endpoint}/${encodeURIComponent(record.id)}`, payload)
                : await apiClient.post(endpoint, payload);
            setDatabases((previous) => record
                ? previous.map((item) => item.id === record.id ? saved : item)
                : [...previous, saved]);
            setEditor(null);
            await refresh();
        } catch (error) {
            setEditorError(errorMessage(error));
            setConflicted(error?.code === 409 && Boolean(record));
        } finally {
            setSaving(false);
        }
    };

    const verify = async (record) => {
        if (verifyingId) return;
        setVerifyingId(record.id);
        setVerifyResults((previous) => ({ ...previous, [record.id]: null }));
        try {
            await apiClient.post(`${endpoint}/${encodeURIComponent(record.id)}/verify`);
            setVerifyResults((previous) => ({ ...previous, [record.id]: { ok: true, text: '连接成功' } }));
        } catch (error) {
            setVerifyResults((previous) => ({ ...previous, [record.id]: { ok: false, text: errorMessage(error) } }));
        } finally {
            setVerifyingId(null);
        }
    };

    const remove = async () => {
        if (!deleteTarget || deleting) return;
        refreshEpoch.current += 1;
        setLoading(false);
        setDeleting(true);
        setDeleteError('');
        try {
            await apiClient.delete(`${endpoint}/${encodeURIComponent(deleteTarget.id)}`, {
                params: { revision: deleteTarget.revision },
            });
            setDatabases((previous) => previous.filter((item) => item.id !== deleteTarget.id));
            setDeleteTarget(null);
            await refresh();
        } catch (error) {
            setDeleteError(error?.code === 409
                ? '连接配置已在其他页面更新。请刷新列表后重新确认删除。'
                : errorMessage(error));
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-4" data-testid="knowledge-database-settings">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Database className="size-5" />知识库连接
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        每个连接对应一个独立图数据库。修改连接后，新任务使用最新配置。
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={refresh} disabled={loading} aria-label="刷新知识库连接">
                        <RefreshCw className={loading ? 'animate-spin' : ''} />刷新
                    </Button>
                    <Button size="sm" onClick={beginCreate}><Plus />新增连接</Button>
                </div>
            </div>

            {listError && <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{listError}</p>}
            {loading && databases.length === 0 && <p role="status" className="text-sm text-muted-foreground">正在加载知识库连接…</p>}
            {databases.length === 0 && !loading && !listError && (
                <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">还没有知识库连接。请新增一个连接。</CardContent></Card>
            )}
            <div className="grid gap-3">
                {databases.map((record) => (
                    <Card key={record.id} className="gap-3 py-4">
                        <CardHeader className="gap-2 px-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                                        <span className="break-words">{record.title || record.name}</span>
                                        {record.id === defaultDatabase?.id && <Badge variant="secondary">默认</Badge>}
                                        {!record.enabled && <Badge variant="outline">已停用</Badge>}
                                        {record.readOnly && <Badge variant="outline">只读</Badge>}
                                    </CardTitle>
                                    <CardDescription className="mt-1 break-all">
                                        {record.name} · {record.database || 'neo4j'} · 配置版本 {record.revision}
                                    </CardDescription>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" disabled={Boolean(verifyingId)} onClick={() => verify(record)} aria-label={`测试连接 ${record.title || record.name}`}>
                                        {verifyingId === record.id ? <Loader2 className="animate-spin" /> : <Zap />}测试连接
                                    </Button>
                                    <Button variant="outline" size="sm" disabled={editorLoading} onClick={() => beginEdit(record)} aria-label={`编辑连接 ${record.title || record.name}`}>
                                        <Pencil />编辑
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => { setDeleteError(''); setDeleteTarget(record); }} aria-label={`删除连接 ${record.title || record.name}`}>
                                        <Trash2 />删除
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        {(record.description || record.uri || verifyResults[record.id]) && (
                            <CardContent className="space-y-2 px-4 text-sm text-muted-foreground">
                                {record.description && <p className="break-words">{record.description}</p>}
                                {record.uri && <p className="break-all">{record.uri}</p>}
                                {verifyResults[record.id] && (
                                    <p role="status" className={verifyResults[record.id].ok ? 'text-emerald-700' : 'text-destructive'}>
                                        {verifyResults[record.id].text}
                                    </p>
                                )}
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>

            {editorLoading && !editor && <p role="status" className="text-sm text-muted-foreground">正在读取连接配置…</p>}
            <Dialog open={Boolean(editor)} onOpenChange={(open) => { if (!open) closeEditor(); }}>
                <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editor?.record ? '编辑知识库连接' : '新增知识库连接'}</DialogTitle>
                        <DialogDescription>
                            {editor?.record ? '留空密码可保留现有凭据。修改标识不会改变这个连接的内部 ID。' : '填写 Neo4j 地址和凭据，每个连接独立保存。'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="pretty-scrollbar min-h-0 flex-1 overflow-y-auto py-1">
                        {editor && (
                            <DynamicSettings
                                key={editor.key}
                                config={config?.formOptions || []}
                                initialValues={editor.values}
                                onChange={(values) => setEditor((current) => current ? { ...current, values } : current)}
                            />
                        )}
                    </div>
                    {editorError && (
                        <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                            {editorError}
                            {conflicted && (
                                <Button className="ml-2" variant="outline" size="sm" disabled={editorLoading} onClick={reloadConflictedRecord}>
                                    读取最新配置
                                </Button>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" disabled={saving} onClick={closeEditor}>取消</Button>
                        <Button disabled={saving || editorLoading} onClick={save}>
                            {saving && <Loader2 className="animate-spin" />}保存连接
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open && !deleting) setDeleteTarget(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>删除知识库连接？</AlertDialogTitle>
                        <AlertDialogDescription>
                            仅删除“{deleteTarget?.title || deleteTarget?.name}”在本项目中的连接配置，不删除 Neo4j 数据库及其中的数据。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {deleteError && <p role="alert" className="text-sm text-destructive">{deleteError}</p>}
                    <AlertDialogFooter>
                        {deleteError && (
                            <Button variant="outline" size="sm" disabled={loading} onClick={async () => { if (await refresh()) setDeleteTarget(null); }}>
                                刷新列表
                            </Button>
                        )}
                        <AlertDialogCancel disabled={deleting}>取消</AlertDialogCancel>
                        <AlertDialogAction disabled={deleting || Boolean(deleteError)} onClick={(event) => { event.preventDefault(); remove(); }}>
                            {deleting ? '正在删除…' : '仅删除连接'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
