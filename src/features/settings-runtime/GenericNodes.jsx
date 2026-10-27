import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Plus, RefreshCw, ExternalLink, Trash2, CircleUserRound, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { cloneData, formatValue, getValue, matchesCondition, pageValues, requestEndpoint, resolveValue, setValue } from './model.js';
import { operationKey } from './useActionExecutor.js';
import { validateSettingsFields, validateSettingsScope } from './validation.js';
import { SettingsIcon, SettingsSection } from './SettingsPresentation.jsx';
const EMPTY_MAP = Object.freeze({});

export function FileNode({ item, value, onChange, context }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [uploadedPreview, setUploadedPreview] = useState(null);
    const preview = uploadedPreview || resolveValue(item.previewValue, { form: context.values, item: context.item, parentItem: context.parentItem });
    const choose = async (event) => {
        const files = [...(event.target.files || [])];
        if (!files.length) return;
        setBusy(true); setError('');
        try {
            const values = [];
            for (const file of files) {
                if (item.upload) {
                    const form = new FormData();
                    form.append(item.upload.field || 'file', file);
                    const result = await context.api.post(requestEndpoint(item.upload.endpoint, { form: context.values, item: context.item }), form);
                    values.push(getValue(result, item.upload.resultPath || '', result));
                    if (item.upload.previewPath) setUploadedPreview(getValue(result, item.upload.previewPath));
                } else {
                    const text = await file.text();
                    values.push(item.readAs === 'json' ? JSON.parse(text) : text);
                }
            }
            onChange(item.multiple ? values : values[0]);
        } catch (cause) { setError(cause.message); }
        finally { setBusy(false); }
    };
    return <div className={`flex min-w-0 flex-col gap-3 rounded-xl border border-border/65 bg-muted/10 p-3 ${preview ? 'sm:flex-row sm:items-center sm:gap-4' : ''}`} data-settings-pending={busy || undefined} data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}>
        {preview && <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background"><img src={resolveResourceUrl(preview)} alt={item.text || '预览'} className="size-full object-contain" /></div>}
        <div className="min-w-0 flex-1 space-y-2">
            <Input type="file" className="min-w-0 rounded-lg bg-background" accept={item.accept} multiple={item.multiple} aria-label={item.text || '选择文件'} disabled={busy || context.disabled || item.disabled} onChange={(event) => { void choose(event); }} />
            {busy && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="size-3.5 animate-spin" />正在读取文件…</p>}
            {value != null && value !== '' && <p className="break-all text-xs text-muted-foreground">{item.valueLabel || '已选择内容'}</p>}
            {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
        </div>
    </div>;
}

export function ActionButton({ action, context, scope = {}, callbacks, disabled = false, variant, showStatus = true }) {
    const actualScope = { form: context.values, item: context.item, parentItem: context.parentItem, ...scope };
    if (!matchesCondition(action.when || action.showWhen, actualScope)) return null;
    const operation = context.operations?.[operationKey(action, actualScope)];
    const isDisabled = disabled || context.disabled || action.disabled === true || (action.disabledWhen && matchesCondition(action.disabledWhen, actualScope));
    return <div className="min-w-0 space-y-2">
        <Button type="button" size="sm" variant={variant || action.variant || 'outline'} disabled={isDisabled || operation?.busy}
            className={`rounded-xl ${action.confirm?.danger ? 'text-destructive hover:bg-destructive/5 hover:text-destructive' : ''}`}
            onClick={() => { void context.execute(action, actualScope, callbacks).catch(() => {}); }}>
            {operation?.busy && <Loader2 className="size-3.5 animate-spin" />}
            {formatValue(action.label || action.text || '执行', actualScope)}
        </Button>
        {showStatus && operation && <OperationStatus operation={operation} context={context} />}
    </div>;
}

export function OperationStatus({ operation, context }) {
    if (!operation?.busy && !operation?.error && !operation?.message) return null;
    const percent = Number(operation.percent);
    return <div className={`space-y-1.5 rounded-lg px-3 py-2 text-xs ${operation.error ? 'border border-destructive/30 bg-destructive/5 text-destructive' : 'bg-muted text-muted-foreground'}`} role={operation.error ? 'alert' : 'status'}>
        <div className="flex flex-wrap items-center gap-2">
            {operation.busy && <Loader2 className="size-3.5 animate-spin" />}
            <span className="break-words">{operation.error || operation.message}</span>
            {operation.readPaused && <button type="button" className="underline" onClick={() => operation.retry?.()}>继续读取进度</button>}
            {operation.taskPage && <button type="button" className="inline-flex items-center gap-1 underline" onClick={() => context.navigate(operation.taskPage)}>查看详情<ExternalLink className="size-3" /></button>}
        </div>
        {operation.busy && operation.percent != null && Number.isFinite(percent) && <progress className="h-1.5 w-full" max="100" value={Math.max(0, Math.min(100, percent))} aria-label="操作进度" />}
        {operation.conflict && <p>服务器版本已变化。当前编辑内容已保留，请重新获取最新数据后核对。</p>}
        {operation.readError && <p>{operation.readError}</p>}
    </div>;
}

export function ActionsNode({ item, context }) {
    return <div className="flex flex-wrap items-start gap-2.5 px-4 py-3 sm:px-5">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />)}</div>;
}

/** A backend-authored summary remains presentation data, not an account page. */
export function ProfileSummaryNode({ item, context }) {
    const scope = { form: context.values, item: context.item, parentItem: context.parentItem };
    const title = resolveValue(item.title || item.text, scope);
    const subtitle = resolveValue(item.subtitle, scope);
    const description = resolveValue(item.description, scope);
    const avatar = resolveValue(item.avatar, scope);
    return <SettingsSection className="overflow-visible" bodyClassName="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/10 bg-primary/8 text-2xl font-semibold text-primary shadow-sm">
                {avatar ? <img src={resolveResourceUrl(avatar)} alt="" className="size-full object-cover" /> : title ? String(title).slice(0, 1) : <CircleUserRound className="size-8" />}
            </div>
            <div className="min-w-0 flex-1">
                {title && <h3 className="break-words text-lg font-semibold tracking-tight">{title}</h3>}
                {subtitle && <p className="mt-1 break-words text-sm text-muted-foreground">{subtitle}</p>}
                {description && <p className="mt-2 max-w-prose text-xs leading-5 text-muted-foreground">{description}</p>}
                {item.meta?.length > 0 && <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">{item.meta.map((entry, index) => <div className="flex items-center gap-2" key={entry.id || index}><dt className="text-muted-foreground">{entry.label}</dt><dd className="font-medium">{displayValue(resolveValue(entry.value, scope))}</dd></div>)}</dl>}
            </div>
            {item.actions?.length > 0 && <div className="flex flex-wrap gap-2">{item.actions.map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />)}</div>}
        </div>
    </SettingsSection>;
}

/** A persisted operation can be inspected again after the settings page reopens. */
export function AsyncOperationNode({ item, context }) {
    const latest = useRef(context);
    latest.current = context;
    const alive = useRef(true);
    const [uncertain, setUncertain] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const [reading, setReading] = useState(false);
    const descriptorKey = JSON.stringify([item.id, item.source, item.watch]);
    const readAction = { id: `read:${item.id}`, endpoint: item.source?.endpoint, method: 'GET', params: item.source?.params, timeoutMs: item.watch?.timeoutMs || 15000, watch: item.watch, validate: false };
    const read = () => {
        if (reading) return;
        setReading(true);
        void latest.current.execute(readAction).catch(() => {}).finally(() => { if (alive.current) setReading(false); });
    };
    useEffect(() => {
        alive.current = true;
        if (item.source?.endpoint) read();
        return () => { alive.current = false; };
    // The descriptor is immutable, while operation progress changes every read.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [descriptorKey]);
    const keys = [readAction, ...(item.actions || [])].map((action) => operationKey(action, { item: context.item, parentItem: context.parentItem }));
    const readOperation = context.operations[keys[0]];
    const operation = keys.map((key) => context.operations[key]).filter(Boolean).sort((a, b) => b.sequence - a.sequence)[0];
    const sourceData = readOperation?.progress || readOperation?.response;
    const data = operation?.progress || operation?.response || sourceData || {};
    const identityPath = item.source?.identityPath || item.watch?.taskIdPath || 'taskId';
    const sourceIdentity = getValue(sourceData, identityPath);
    const unresolved = uncertain && (!sourceIdentity || sourceIdentity === uncertain.previousId);
    const ready = !item.source?.endpoint || Boolean(sourceData) && (!readOperation?.error || readOperation?.terminal);
    const busy = operation?.busy || reading;
    const callbacks = {
        onSuccess: () => { setSubmitError(''); setUncertain(null); },
        onError: (cause) => {
            if (!alive.current) return;
            setSubmitError(cause.message);
            const statusCode = Number(cause.code || cause.status || cause.response?.status);
            if (!statusCode || statusCode >= 500 || statusCode === 408) {
                setUncertain({ previousId: sourceIdentity });
                read();
            }
        },
    };
    const status = getValue(data, item.watch?.statusPath || 'status');
    const phase = getValue(data, item.phasePath || 'phase');
    const label = item.statusLabels?.[status] || item.phaseLabels?.[phase];
    return <SettingsSection title={item.text} description={item.description} icon={item.icon || 'settings'} bodyClassName="space-y-4 p-4 sm:p-5">
        {label && <p className="text-sm">{operation?.error && data === sourceData ? '上次记录：' : ''}{label}</p>}
        {phase && item.phaseLabels?.[phase] && <p className="text-xs text-muted-foreground">{item.phaseLabels[phase]}</p>}
        {operation && <OperationStatus operation={operation} context={context} />}
        {submitError && (!operation?.error || operation.error !== submitError) && <p role="alert" className="text-xs text-destructive">{submitError}</p>}
        {unresolved && <p role="alert" className="text-xs text-destructive">暂时无法确认上次提交的结果。请继续读取状态，确认后再发起新操作。</p>}
        {item.summary?.length > 0 && <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">{item.summary.map((field) => <div key={field.path} className="rounded-xl border border-border/50 bg-muted/25 px-3 py-2.5"><dt className="text-xs text-muted-foreground">{field.label}</dt><dd className="mt-1.5 text-lg font-semibold tabular-nums tracking-tight">{displayValue(getValue(data, field.path))}</dd></div>)}</dl>}
        {item.errorsPath && getValue(data, item.errorsPath)?.length > 0 && <TableNode item={{ columns: item.errorColumns || [] }} value={getValue(data, item.errorsPath)} context={context} />}
        <div className="flex flex-wrap items-start gap-2">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={{ ...context, disabled: context.disabled || busy || !ready || unresolved }} callbacks={callbacks} showStatus={false} />)}{item.source?.endpoint && <Button type="button" size="sm" variant="outline" disabled={busy} onClick={read}><RefreshCw className="size-3.5" />重新读取状态</Button>}</div>
    </SettingsSection>;
}

function displayValue(value) {
    if (value == null) return '—';
    if (typeof value === 'boolean') return value ? '是' : '否';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}

export function TableNode({ item, value, context }) {
    const rows = resolveValue(item.rows, { form: context.values, item: context.item }) || value || [];
    if (!Array.isArray(rows)) return <p role="alert" className="text-sm text-destructive">表格数据必须是列表。</p>;
    return <div className="max-w-full overflow-auto rounded-xl border border-border/70 bg-card"><table className="w-full text-left text-sm"><thead className="bg-muted/35 text-xs text-muted-foreground"><tr>{(item.columns || []).map((column) => <th className="px-3 py-2 font-medium" key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={getValue(row, item.keyField || 'id', index)} className="border-t">{(item.columns || []).map((column) => <td key={column.key} className="max-w-96 break-words px-3 py-2">{displayValue(getValue(row, column.key))}</td>)}</tr>)}</tbody></table>{!rows.length && <p className="p-5 text-center text-sm text-muted-foreground">{item.emptyText || '暂无数据'}</p>}</div>;
}

export function DiffNode({ item, value, context }) {
    const data = resolveValue(item.value, { form: context.values, item: context.item }) || value || {};
    const columns = item.columns || Object.keys(data).map((key) => ({ key, label: key }));
    return <div className="grid gap-3 rounded-xl border p-4 sm:grid-cols-3">{columns.map((column) => <section className="min-w-0 space-y-2" key={column.key}><h4 className="text-sm font-medium">{column.label}</h4><ul className="space-y-1 text-xs text-muted-foreground">{(Array.isArray(data[column.key]) ? data[column.key] : []).map((entry, index) => <li key={index} className="break-all">{displayValue(entry)}</li>)}</ul></section>)}</div>;
}

export function SecretMapNode({ item, value = EMPTY_MAP, onChange, context }) {
    const [rows, setRows] = useState(() => Object.entries(value || {}).map(([key, content]) => ({ id: crypto.randomUUID(), key, value: content })));
    const external = useRef(value);
    useEffect(() => {
        if (value === external.current) return;
        external.current = value;
        setRows(Object.entries(value || {}).map(([key, content]) => ({ id: crypto.randomUUID(), key, value: content })));
    }, [value]);
    const [error, setError] = useState('');
    const commit = (next) => {
        setRows(next);
        const keys = next.map((row) => row.key).filter(Boolean);
        if (next.some((row) => !row.key.trim())) { setError('请填写每行的键名，或删除空白行。'); return; }
        if (new Set(keys).size !== keys.length) { setError('键名不能重复。'); return; }
        setError('');
        const result = Object.fromEntries(next.filter((row) => row.key).map((row) => [row.key, row.value]));
        external.current = result;
        onChange(result);
    };
    return <div className="space-y-3 rounded-xl border border-border/70 bg-muted/15 p-3" data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}>
        {rows.map((row, index) => <div className="flex items-center gap-2" key={row.id}>
            <Input aria-label={`${item.text || '密钥'}名称 ${index + 1}`} placeholder={item.keyPlaceholder || '名称'} value={row.key} disabled={context.disabled || item.disabled} onChange={(event) => commit(rows.map((entry) => entry.id === row.id ? { ...entry, key: event.target.value } : entry))} />
            <Input type={item.masked === false ? 'text' : 'password'} autoComplete="new-password" aria-label={`${item.text || '密钥'}内容 ${index + 1}`} placeholder={item.valuePlaceholder || '留空保留已有值'} value={row.value ?? ''} disabled={context.disabled || item.disabled} onChange={(event) => commit(rows.map((entry) => entry.id === row.id ? { ...entry, value: event.target.value } : entry))} />
            <Button type="button" variant="ghost" size="icon" aria-label="删除键" disabled={context.disabled || item.disabled} onClick={() => commit(rows.filter((entry) => entry.id !== row.id))}><Trash2 className="size-4" /></Button>
        </div>)}
        {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
        <Button type="button" variant="outline" size="sm" disabled={context.disabled || item.disabled} onClick={() => { setRows([...rows, { id: crypto.randomUUID(), key: '', value: '' }]); setError('请填写每行的键名，或删除空白行。'); }}><Plus className="size-3.5" />{item.addLabel || '添加键值'}</Button>
    </div>;
}

export function MatrixNode({ item, value = {}, onChange, context }) {
    const [query, setQuery] = useState('');
    const confirming = useRef(false);
    const allRows = resolveValue(item.rows, { form: context.values, item: context.item }) || [];
    const columns = item.columns || [];
    const rows = allRows.filter((row) => `${row.label || ''} ${row.id || ''} ${row.description || ''}`.toLowerCase().includes(query.toLowerCase()));
    const setRow = (row, next, current = value) => {
        if (row.disabled || (row.allowedValues && !row.allowedValues.includes(next))) return current;
        return { ...current, [row.id]: next };
    };
    const bulk = async (action) => {
        if (context.disabled || confirming.current) return;
        confirming.current = true;
        try {
            if (action.confirm && !(await context.confirm(action.confirm))) return;
            let next = { ...value };
            for (const row of allRows) next = setRow(row, action.value, next);
            onChange(next);
            for (const [path, updated] of Object.entries(action.set || {})) context.update(path.split('.'), resolveValue(updated, { form: context.values, item: context.item, parentItem: context.parentItem }));
        } finally { confirming.current = false; }
    };
    return <SettingsSection title={item.text} description={item.description || item.tips} icon={item.icon || 'shield'} bodyClassName="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2"><Input className="min-w-40 flex-1 rounded-xl bg-muted/15" aria-label={item.searchLabel || '搜索选项'} placeholder={item.searchPlaceholder || '搜索选项'} value={query} onChange={(event) => setQuery(event.target.value)} />{(item.bulkActions || []).map((action) => <Button type="button" size="sm" variant="outline" key={action.label} disabled={context.disabled} onClick={() => { void bulk(action); }}>{action.label}</Button>)}</div>
        <div className="max-h-96 overflow-auto rounded-xl border border-border/60"><table className="w-full text-sm"><thead className="sticky top-0 z-10 bg-muted/90 text-xs text-muted-foreground backdrop-blur"><tr><th className="p-2 text-left">{item.rowLabel || '项目'}</th>{columns.map((column) => <th key={column.value} className="px-2 py-2 text-center font-medium">{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-t"><td className="max-w-96 p-2"><div className="font-medium">{row.label || row.id}</div>{row.description && <p className="text-xs text-muted-foreground">{row.description}</p>}</td>{columns.map((column) => <td className="p-2 text-center" key={column.value}><Checkbox aria-label={`${row.label || row.id} ${column.label}`} checked={(value[row.id] ?? row.value) === column.value} disabled={context.disabled || row.disabled || (row.allowedValues && !row.allowedValues.includes(column.value))} onCheckedChange={() => onChange(setRow(row, column.value))} /></td>)}</tr>)}</tbody></table></div>
    </SettingsSection>;
}

export function ResourceNode({ item, context, renderFields }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editor, setEditor] = useState(null);
    const [editorBusy, setEditorBusy] = useState(false);
    const [editorError, setEditorError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [conflictingActions, setConflictingActions] = useState(() => new Set());
    const epoch = useRef(0);
    const requestController = useRef(null);
    const detailRequest = useRef({ serial: 0, controller: null });
    const editorScope = useRef(null);
    const alive = useRef(true);
    const latestContext = useRef(context);
    latestContext.current = context;
    const source = item.source || {};
    const { registerResource, subscribe, client } = context;
    const confirm = context.confirm;
    const registerDraftGuard = context.runtimeContext.registerDraftGuard;
    const sourceKey = JSON.stringify([source, context.item?.id]);
    const load = useCallback(async () => {
        const serial = ++epoch.current;
        requestController.current?.abort();
        const controller = new AbortController();
        requestController.current = controller;
        setLoading(true); setError('');
        try {
            const ctx = latestContext.current;
            const scope = { form: ctx.values, item: ctx.item, parentItem: ctx.parentItem };
            const response = source.endpoint?.startsWith('client:')
                ? await ctx.client.read(source.endpoint.slice(7))
                : await ctx.api.get(requestEndpoint(source.endpoint, scope), { params: resolveValue(source.params, scope), signal: controller.signal });
            const data = getValue(response, source.listPath || '', response);
            if (!Array.isArray(data)) throw new Error('资源接口没有返回列表。');
            if (alive.current && serial === epoch.current) { setRows(data); setConflictingActions(new Set()); }
        } catch (cause) { if (alive.current && serial === epoch.current) setError(cause.message); }
        finally { if (alive.current && serial === epoch.current) setLoading(false); }
    // Source descriptors are immutable until the page or parent record changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceKey]);
    useEffect(() => { alive.current = true; void load(); const detail = detailRequest.current; return () => { alive.current = false; epoch.current += 1; requestController.current?.abort(); detail.serial += 1; detail.controller?.abort(); }; }, [load]);
    useEffect(() => registerResource(item.id || item.name, load), [registerResource, item.id, item.name, load]);
    useEffect(() => {
        const subscriptions = (item.events || []).map((event) => subscribe(event, () => { void load(); }));
        const local = source.endpoint?.startsWith('client:') ? client.subscribe(() => { void load(); }) : null;
        return () => { subscriptions.forEach((unsubscribe) => unsubscribe?.()); local?.(); };
    }, [subscribe, client, item.events, source.endpoint, load]);
    useEffect(() => {
        if (!registerDraftGuard || !editor) return undefined;
        return registerDraftGuard(`${item.id || item.name}:editor`, async () => JSON.stringify(editor.initial) === JSON.stringify(editor.values)
            || confirm({ title: '放弃未保存的更改？', description: '离开后本次编辑内容将被丢弃。', confirmText: '放弃更改' }));
    }, [registerDraftGuard, confirm, editor, item.id, item.name]);
    const openEditor = async (record) => {
        if (!item.editor) return;
        detailRequest.current.controller?.abort();
        const controller = new AbortController();
        const serial = ++detailRequest.current.serial;
        detailRequest.current.controller = controller;
        setEditorBusy(true); setEditorError(''); setFieldErrors({});
        const initial = pageValues(item.editor.options || [], { ...cloneData(item.editor.defaults || {}), ...cloneData(record || {}) });
        setEditor({ record, values: initial, initial });
        try {
            if (record && item.editor.load) {
                const result = await context.api.get(requestEndpoint(item.editor.load.endpoint, { item: record, parentItem: context.item, form: initial }), { signal: controller.signal });
                if (!alive.current || controller.signal.aborted || serial !== detailRequest.current.serial) return;
                const values = pageValues(item.editor.options || [], { ...initial, ...cloneData(getValue(result, item.editor.load.valuePath || '', result)) });
                setEditor((current) => current?.record === record ? { record, values, initial: cloneData(values) } : current);
            }
        } catch (cause) { if (alive.current && !controller.signal.aborted && serial === detailRequest.current.serial) setEditorError(cause.message); }
        finally { if (alive.current && !controller.signal.aborted && serial === detailRequest.current.serial) setEditorBusy(false); }
    };
    const patchEditor = (patch, target = 'form') => setEditor((current) => current ? {
        ...current, values: target === 'form' ? { ...current.values, ...patch } : setValue(current.values, target.replace(/^form\./, ''), patch),
    } : current);
    const closeEditor = async () => {
        if (editor && JSON.stringify(editor.initial) !== JSON.stringify(editor.values) && !(await context.confirm({ title: '放弃未保存的更改？', description: '关闭后本次编辑内容将被丢弃。', confirmText: '放弃更改' }))) return;
        detailRequest.current.serial += 1;
        detailRequest.current.controller?.abort();
        setEditor(null);
    };
    const editorAction = editor?.record ? item.editor?.update : item.editor?.create;
    const onSave = async () => {
        if (context.disabled) return;
        try { validateSettingsScope(editorScope.current); }
        catch (cause) { setEditorError(cause.message); return; }
        const errors = validateSettingsFields(editorScope.current, item.editor.options, editor.values, { item: editor.record, parentItem: context.item, isCreate: !editor.record });
        setFieldErrors(errors);
        if (Object.keys(errors).length) return;
        await context.execute(editorAction, { form: editor.values, item: editor.record, parentItem: context.item }, {
            patchForm: patchEditor,
            onSuccess: async () => { setEditor(null); if (!(editorAction.effects || []).some((effect) => effect.type === 'refresh' && (!effect.target || effect.target === item.id))) await load(); },
            onError: (cause) => { setEditorError(cause.message); if (cause.data?.errors) setFieldErrors(cause.data.errors); },
        });
    };
    const actionsFor = (record) => <div className="flex flex-wrap items-start gap-2">{(item.actions || []).map((action, index) => {
        const scope = { form: context.values, item: record, parentItem: context.item };
        if (!matchesCondition(action.when || action.showWhen, scope)) return null;
        return action.kind === 'edit'
            ? <Button key={action.id || index} type="button" size="sm" variant="outline" className="rounded-xl" disabled={context.disabled || (action.disabledWhen && matchesCondition(action.disabledWhen, scope))} onClick={() => { void openEditor(record); }}>{action.label || '编辑'}</Button>
            : <ActionButton key={action.id || index} action={action} context={context} scope={{ item: record, parentItem: context.item }} disabled={conflictingActions.has(operationKey(action, scope))} callbacks={{ onError: (cause) => { if (Number(cause.code) === 409) setConflictingActions((previous) => new Set([...previous, operationKey(action, scope)])); } }} />;
    })}</div>;
    const columns = item.columns || [];
    const valueText = (record, column) => {
        const value = getValue(record, column.key || column.field);
        return Object.hasOwn(column.labels || {}, String(value)) ? column.labels[String(value)] : displayValue(value);
    };
    const renderCards = () => <div className={`grid gap-3 ${item.columnsCount === 2 ? 'xl:grid-cols-2' : ''}`}>{rows.map((record, index) => {
        const title = getValue(record, item.titleField || 'title', getValue(record, item.keyField || 'id'));
        const description = item.descriptionField && getValue(record, item.descriptionField);
        const properties = columns.filter(column => column.key !== (item.titleField || 'title') && column.key !== item.descriptionField);
        return <article className="min-w-0 overflow-hidden rounded-xl border border-border/70 bg-background transition-shadow hover:shadow-sm" key={getValue(record, item.keyField || 'id', index)}>
            <div className="p-4">
                <div className="flex min-w-0 items-start gap-3">
                    <SettingsIcon icon={item.recordIcon || item.icon || 'folder'} />
                    <div className="min-w-0 flex-1">
                        <h4 className="break-words text-sm font-semibold leading-5">{displayValue(title)}</h4>
                        {description && <p className="mt-1 line-clamp-3 whitespace-pre-wrap break-words text-xs leading-5 text-muted-foreground">{displayValue(description)}</p>}
                        {item.badges?.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{item.badges.map((badge) => <Badge key={badge.field} variant="secondary" className="rounded-md text-[11px] font-medium">{badge.label ? `${badge.label}：` : ''}{valueText(record, badge)}</Badge>)}</div>}
                    </div>
                </div>
                {properties.length > 0 && <dl className="mt-4 grid grid-cols-1 gap-x-5 gap-y-3 rounded-xl bg-muted/35 px-3 py-3 sm:grid-cols-2">{properties.map(column => <div key={column.key} className="min-w-0"><dt className="text-[11px] leading-4 text-muted-foreground">{column.label}</dt><dd className="mt-1 break-words text-xs font-medium leading-5">{valueText(record, column)}</dd></div>)}</dl>}
            </div>
            {item.actions?.length > 0 && <div className="border-t border-border/55 bg-muted/10 px-4 py-3">{actionsFor(record)}</div>}
        </article>;
    })}</div>;
    const resourceActions = <>
        <Button type="button" variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label="刷新列表" onClick={() => { void load(); }}><RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} /></Button>
        {item.create && item.editor && <Button type="button" size="sm" className="rounded-xl" disabled={context.disabled} onClick={() => { void openEditor(null); }}><Plus className="size-3.5" />{item.create.label || '添加'}</Button>}
    </>;
    return <SettingsSection title={<span className="flex items-center gap-2.5">{item.text || item.title}<Badge variant="secondary" className="rounded-md px-1.5 text-[10px] tabular-nums">{rows.length}</Badge></span>} description={item.description} icon={item.icon || 'folder'} actions={resourceActions} bodyClassName="p-3 sm:p-4">
        {error && <p role="alert" className="mb-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
        {loading && !rows.length ? <div className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl bg-muted/20 py-8 text-sm text-muted-foreground"><Loader2 className="size-5 animate-spin" />正在加载…</div>
            : !rows.length ? <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/15 p-6 text-center"><span className="rounded-2xl bg-muted p-3 text-muted-foreground/70"><Inbox className="size-6" /></span><p className="text-sm text-muted-foreground">{item.emptyText || '暂无数据'}</p></div>
                : item.display === 'table' && columns.length ? <div className="overflow-auto rounded-xl border border-border/70"><table className="w-full text-left text-sm"><thead className="bg-muted/40 text-xs text-muted-foreground"><tr>{columns.map(column => <th key={column.key} className="px-4 py-3 font-medium">{column.label}</th>)}<th className="px-4 py-3 font-medium">操作</th></tr></thead><tbody>{rows.map((record, index) => <tr key={getValue(record, item.keyField || 'id', index)} className="border-t border-border/55 transition-colors hover:bg-muted/15">{columns.map(column => <td key={column.key} className="max-w-sm break-words px-4 py-3 text-sm">{valueText(record, column)}</td>)}<td className="px-4 py-3">{actionsFor(record)}</td></tr>)}</tbody></table></div>
                    : renderCards()}
        <Dialog open={Boolean(editor)} onOpenChange={(open) => { if (!open) void closeEditor(); }}>
            <DialogContent className="flex max-h-[90dvh] w-[min(60rem,95vw)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-[60rem]">
                <DialogHeader className="shrink-0 border-b border-border/60 bg-muted/20 px-5 py-5 pr-14 sm:px-6"><DialogTitle className="text-base">{formatValue((!editor?.record && item.editor?.createTitle) || item.editor?.title || '编辑', { item: editor?.record, form: editor?.values })}</DialogTitle><DialogDescription className="mt-1.5 text-xs leading-5">{item.editor?.description || '修改后保存，配置由当前后端提供。'}</DialogDescription></DialogHeader>
                <div ref={editorScope} className="min-h-0 flex-1 space-y-4 overflow-auto bg-muted/15 px-4 py-5 sm:px-6">
                    {editorError && <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">{editorError}</p>}
                    {Object.entries(fieldErrors).map(([field, message]) => <p className="text-xs text-destructive" key={field}>{field}：{message}</p>)}
                    {editorBusy ? <p className="flex min-h-28 items-center justify-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" />正在读取详情…</p> : editor && renderFields(item.editor.options || [], editor.values, (values) => setEditor((current) => current ? { ...current, values } : current), { key: `${item.id}:editor`, item: editor.record, disabled: context.disabled, runtimeContext: { parentItem: context.item, isCreate: !editor.record } })}
                </div>
                <DialogFooter className="shrink-0 border-t border-border/60 bg-background px-5 py-4 sm:px-6"><Button type="button" variant="outline" className="rounded-xl" onClick={() => { void closeEditor(); }}>取消</Button>{editorAction && <Button type="button" className="rounded-xl" disabled={context.disabled || editorBusy || context.operations?.[operationKey(editorAction, { item: editor?.record, parentItem: context.item })]?.busy || (editorAction.disabledWhen && matchesCondition(editorAction.disabledWhen, { form: editor?.values, item: editor?.record, parentItem: context.item }))} onClick={() => { void onSave().catch((cause) => setEditorError(cause.message)); }}>保存</Button>}</DialogFooter>
            </DialogContent>
        </Dialog>
    </SettingsSection>;
}

export function DescriptorDialog({ descriptor, context, renderFields, onClose }) {
    const [values, setValues] = useState(() => pageValues(descriptor?.options || [], descriptor?.defaultOptions || {}));
    useEffect(() => { setValues(pageValues(descriptor?.options || [], descriptor?.defaultOptions || {})); }, [descriptor]);
    return <Dialog open={Boolean(descriptor)} onOpenChange={(open) => { if (!open) onClose(); }}><DialogContent className="flex max-h-[90dvh] w-[min(50rem,95vw)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-[50rem]"><DialogHeader className="shrink-0 border-b border-border/60 bg-muted/20 px-5 py-5 pr-14"><DialogTitle className="text-base">{descriptor?.title || '详情'}</DialogTitle><DialogDescription className="mt-1.5 text-xs leading-5">{descriptor?.description || '服务器提供的内容'}</DialogDescription></DialogHeader><div className="min-h-0 flex-1 overflow-auto bg-muted/15 p-5">{descriptor && renderFields(descriptor.options || [], values, setValues, { runtimeContext: context.runtimeContext })}</div><DialogFooter className="shrink-0 border-t border-border/60 px-5 py-4"><Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>关闭</Button></DialogFooter></DialogContent></Dialog>;
}
