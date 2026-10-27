import { startTransition, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Camera, ChevronDown, Plus, RefreshCw, Trash2, CircleUserRound, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { cloneData, formatValue, getValue, matchesCondition, pageValues, requestEndpoint, resolveValue, setValue } from './model.js';
import { operationKey } from './useActionExecutor.js';
import { validateSettingsFields, validateSettingsScope } from './validation.js';
import { SettingsIcon, SettingsSection } from './SettingsPresentation.jsx';
import { formatSettingsValue as displayValue } from './displayValue.js';
import { ConnectionCard, ProfileCard, SettingsCardGrid } from './SettingsCards.jsx';
import SettingsFormLayout from './SettingsFormLayout.jsx';
import { SettingsActionLabel } from './SettingsActionLabel.jsx';
import { getActionPresentation } from './actionPresentation.js';
import { getSettingsDialogStyle } from './dialogSizing.js';
import { useSettingsLoadingToast } from './loadingToasts.js';
import { settingsResourceCacheKey } from './sessionCache.js';
import { matrixRows, matrixStoredValue, matrixValueMap } from './matrixValues.js';
const EMPTY_MAP = Object.freeze({});

export function FileNode({ item, value, onChange, context }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [uploadedPreview, setUploadedPreview] = useState(null);
    useSettingsLoadingToast(busy, '正在读取附件…');
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
    if (item.appearance === 'avatar') return <div className="shrink-0" data-settings-pending={busy || undefined} data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}>
        <label className={`group relative block size-16 cursor-pointer rounded-full bg-muted focus-within:ring-2 focus-within:ring-ring ${context.disabled || item.disabled ? 'cursor-default opacity-60' : ''}`}>
            <span className="flex size-full items-center justify-center overflow-hidden rounded-full">{preview ? <img src={resolveResourceUrl(preview)} alt={item.text || '头像'} className="size-full object-cover" /> : <CircleUserRound className="size-7 text-muted-foreground" />}</span>
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-0.5 -right-0.5 rounded-full border bg-background p-1 text-muted-foreground"><Camera className="size-3" /></span>
            <Input type="file" className="absolute inset-0 size-full cursor-pointer rounded-full opacity-0" accept={item.accept} aria-label={item.text || '更换头像'} disabled={busy || context.disabled || item.disabled} onChange={(event) => { void choose(event); }} />
        </label>
        {error && <p role="alert" className="mt-1 max-w-40 text-xs text-destructive">{error}</p>}
    </div>;
    return <div className={`flex min-w-0 flex-col gap-3 rounded-xl border border-border/65 bg-muted/10 p-3 ${preview ? 'sm:flex-row sm:items-center sm:gap-4' : ''}`} data-settings-pending={busy || undefined} data-settings-invalid={Boolean(error) || undefined} data-settings-message={error || undefined}>
        {preview && <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background"><img src={resolveResourceUrl(preview)} alt={item.text || '预览'} className="size-full object-contain" /></div>}
        <div className="min-w-0 flex-1 space-y-2">
            <Input type="file" className="min-w-0 rounded-lg bg-background" accept={item.accept} multiple={item.multiple} aria-label={item.text || '选择文件'} disabled={busy || context.disabled || item.disabled} onChange={(event) => { void choose(event); }} />
            {value != null && value !== '' && <p className="break-all text-xs text-muted-foreground">{item.valueLabel || '已选择内容'}</p>}
            {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
        </div>
    </div>;
}

export function ActionButton({ action, context, scope = {}, callbacks, disabled = false, variant }) {
    const actualScope = { form: context.values, item: context.item, parentItem: context.parentItem, ...scope };
    if (!matchesCondition(action.when || action.showWhen, actualScope)) return null;
    const operation = context.operations?.[operationKey(action, actualScope)];
    const isDisabled = disabled || context.disabled || action.disabled === true || (action.disabledWhen && matchesCondition(action.disabledWhen, actualScope));
    const presentation = getActionPresentation(action, variant || 'outline');
    return <Button type="button" size="sm" {...presentation} disabled={isDisabled || operation?.busy} aria-busy={operation?.busy || undefined}
            onClick={() => { void context.execute(action, actualScope, callbacks).catch(() => {}); }}>
            <SettingsActionLabel action={action} label={formatValue(action.label || action.text || '执行', actualScope)} />
        </Button>;
}

export function ActionsNode({ item, context }) {
    return <div className="flex flex-wrap items-start gap-2 py-2">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />)}</div>;
}

/** A backend-authored summary remains presentation data, not an account page. */
export function ProfileSummaryNode({ item, context }) {
    const scope = { form: context.values, item: context.item, parentItem: context.parentItem };
    const title = resolveValue(item.title || item.text, scope);
    const subtitle = resolveValue(item.subtitle, scope);
    const description = resolveValue(item.description, scope);
    const avatar = resolveValue(item.avatar, scope);
    return <SettingsSection className="overflow-visible" variant={item.variant} bodyClassName={item.variant === 'card' ? 'p-4' : ''}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-lg font-semibold">
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

function presentationActions(actions, context) {
    const scope = { form: context.values, item: context.item, parentItem: context.parentItem };
    const visible = (actions || []).filter((action) => matchesCondition(action.when || action.showWhen, scope));
    return visible.length ? visible.map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />) : null;
}

export function ProfileCardNode({ item, context, avatarControl, children }) {
    return <ProfileCard item={item} context={context} avatarControl={avatarControl} actions={presentationActions(item.actions, context)}>{children}</ProfileCard>;
}

export function ConnectionCardNode({ item, context }) {
    return <ConnectionCard item={item} context={context} actions={presentationActions(item.actions, context)} />;
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
    return <SettingsSection title={item.text} description={item.description} variant={item.variant} bodyClassName={item.variant === 'card' ? 'space-y-3 p-4' : 'space-y-3'}>
        {label && <p className="text-sm">{operation?.error && data === sourceData ? '上次记录：' : ''}{label}</p>}
        {phase && item.phaseLabels?.[phase] && <p className="text-xs text-muted-foreground">{item.phaseLabels[phase]}</p>}
        {submitError && (!operation?.error || operation.error !== submitError) && <p role="alert" className="text-xs text-destructive">{submitError}</p>}
        {unresolved && <p role="alert" className="text-xs text-destructive">暂时无法确认上次提交的结果。请继续读取状态，确认后再发起新操作。</p>}
        {item.summary?.length > 0 && <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">{item.summary.map((field) => <div key={field.path} className="rounded-xl border border-border/50 bg-muted/25 px-3 py-2.5"><dt className="text-xs text-muted-foreground">{field.label}</dt><dd className="mt-1.5 text-lg font-semibold tabular-nums tracking-tight">{displayValue(getValue(data, field.path))}</dd></div>)}</dl>}
        {item.errorsPath && getValue(data, item.errorsPath)?.length > 0 && <TableNode item={{ columns: item.errorColumns || [] }} value={getValue(data, item.errorsPath)} context={context} />}
        <div className="flex flex-wrap items-start gap-2">{(item.actions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={{ ...context, disabled: context.disabled || busy || !ready || unresolved }} callbacks={callbacks} />)}{item.source?.endpoint && <Button type="button" size="sm" variant="outline" disabled={busy} onClick={read}><RefreshCw className="size-3.5" />重新读取状态</Button>}</div>
    </SettingsSection>;
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

export function MatrixNode({ item, value, onChange, context }) {
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(() => new Set(item.groups?.length ? [String(item.groups[0].id)] : []));
    const instanceId = useId();
    const confirming = useRef(false);
    const values = matrixValueMap(item, value);
    const commit = (next) => onChange(matrixStoredValue(item, next, value));
    const allRows = matrixRows(item, resolveValue(item.rows, { form: context.values, item: context.item }) || [], values);
    const columns = item.columns || [];
    const keyword = query.trim().toLowerCase();
    const groupDefinitions = Array.isArray(item.groups) ? item.groups : [];
    const grouped = groupDefinitions.length > 0;
    const groupMap = new Map(groupDefinitions.map((group) => [String(group.id), { ...group, id: String(group.id), rows: [] }]));
    for (const row of allRows) {
        const id = row.group == null ? '' : String(row.group);
        if (!groupMap.has(id)) groupMap.set(id, { id, label: id || '其他', rows: [] });
        groupMap.get(id).rows.push(row);
    }
    const visibleGroups = [...groupMap.values()].map((group) => {
        const matchesGroup = grouped && `${group.label || ''} ${group.description || ''}`.toLowerCase().includes(keyword);
        return { ...group, sourceRows: group.rows, rows: group.rows.filter((row) => !keyword || matchesGroup || `${row.label || ''} ${row.id || ''} ${row.description || ''}`.toLowerCase().includes(keyword)) };
    }).filter((group) => group.rows.length);
    const gridStyle = { gridTemplateColumns: `minmax(0,1fr) repeat(${columns.length}, minmax(2.75rem,4rem))` };
    const setRow = (row, next, current = values) => {
        if (context.disabled || row.disabled || (row.allowedValues && !row.allowedValues.includes(next))) return current;
        return { ...current, [row.id]: next };
    };
    const bulk = async (action, { rows = allRows, applyGlobalSet = true } = {}) => {
        if (context.disabled || confirming.current) return;
        confirming.current = true;
        try {
            if (action.confirm && !(await context.confirm(action.confirm))) return;
            let next = { ...values };
            for (const row of rows) next = setRow(row, action.value, next);
            commit(next);
            // Only the page-level batch may update defaults for future entries.
            // A group batch changes existing row values within that group only.
            if (applyGlobalSet) for (const [path, updated] of Object.entries(action.set || {})) context.update(path.split('.'), resolveValue(updated, { form: context.values, item: context.item, parentItem: context.parentItem }));
        } finally { confirming.current = false; }
    };
    const renderRows = (rows) => <div className="divide-y divide-border/50">
        <div aria-hidden="true" className="grid items-center gap-2 py-2 text-xs text-muted-foreground" style={gridStyle}><span>{item.rowLabel || '项目'}</span>{columns.map((column) => <span className="text-center" key={column.value}>{column.label}</span>)}</div>
        {rows.map((row) => <RadioGroup key={row.id} value={String(values[row.id] ?? row.value ?? item.valueStorage?.unsetValue ?? '')} disabled={context.disabled || row.disabled} aria-label={row.label || row.id} onValueChange={(next) => { const column = columns.find((entry) => String(entry.value) === next); if (column) commit(setRow(row, column.value)); }} className="grid items-center gap-2 py-2.5" style={gridStyle}>
            <div className="min-w-0 pr-2"><div className="text-sm font-medium">{row.label || row.id}</div>{row.description && <p className="mt-0.5 truncate text-xs leading-5 text-muted-foreground" title={row.description}>{row.description}</p>}</div>
            {columns.map((column) => <span className="flex justify-center" key={column.value}><RadioGroupItem value={String(column.value)} aria-label={`${row.label || row.id} ${column.label}`} disabled={context.disabled || row.disabled || (row.allowedValues && !row.allowedValues.includes(column.value))} /></span>)}
        </RadioGroup>)}
    </div>;
    return <SettingsSection title={item.text} description={item.description || item.tips} variant={item.variant} bodyClassName={item.variant === 'card' ? 'space-y-3 p-4' : 'space-y-3'}>
        <div className="flex flex-wrap items-center gap-2"><Input className="h-9 min-w-40 flex-1" aria-label={item.searchLabel || '搜索选项'} placeholder={item.searchPlaceholder || '搜索选项'} value={query} onChange={(event) => setQuery(event.target.value)} />{(item.bulkActions || []).map((action) => <Button type="button" size="sm" {...getActionPresentation(action)} key={action.label} disabled={context.disabled} onClick={() => { void bulk(action); }}><SettingsActionLabel action={action} /></Button>)}</div>
        <div className="min-w-0 space-y-3">
            {!visibleGroups.length ? <p className="py-6 text-center text-sm text-muted-foreground">{item.emptyText || '没有匹配的选项'}</p> : grouped ? visibleGroups.map((group) => {
                const open = Boolean(keyword) || expanded.has(group.id);
                const regionId = `${instanceId}-${encodeURIComponent(group.id)}`;
                return <Card key={group.id} className="min-w-0 gap-0 overflow-hidden rounded-lg py-0 shadow-none" data-matrix-group={group.id}>
                    <div className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-muted/25 px-4 py-2 ${open ? 'border-b' : ''}`}>
                        <Button type="button" variant="ghost" aria-expanded={open} aria-controls={regionId} aria-disabled={Boolean(keyword) || undefined} className="h-auto min-w-0 flex-1 justify-start gap-2 rounded-none px-0 py-1 text-left hover:bg-transparent has-[>svg]:px-0" onClick={() => { if (keyword) return; setExpanded((previous) => { const next = new Set(previous); if (next.has(group.id)) next.delete(group.id); else next.add(group.id); return next; }); }}>
                            <ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? '' : '-rotate-90'}`} />
                            <span className="min-w-0 truncate text-sm font-medium">{group.label || group.id}</span><span className="shrink-0 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[11px] font-normal leading-4 tabular-nums text-muted-foreground">{keyword ? `${group.rows.length} / ${group.sourceRows.length}` : group.rows.length}</span>
                        </Button>
                        {group.bulkActions?.length > 0 && <div className="flex shrink-0 flex-wrap items-center gap-1">{group.bulkActions.map((action, index) => <Button key={action.id || action.value || index} type="button" size="sm" {...getActionPresentation(action)} className={`h-7 px-2 text-xs ${getActionPresentation(action).className}`} aria-label={`${group.label || group.id} ${action.label}`} title={`${action.label}：作用于本组全部 ${group.sourceRows.length} 项，遵循锁定与可选范围`} disabled={context.disabled || !group.sourceRows.some((row) => !row.disabled && (!row.allowedValues || row.allowedValues.includes(action.value)))} onClick={() => { void bulk(action, { rows: group.sourceRows, applyGlobalSet: false }); }}><SettingsActionLabel action={action} /></Button>)}</div>}
                    </div>
                    {open && <CardContent id={regionId} className="px-5 py-2">{renderRows(group.rows)}</CardContent>}
                </Card>;
            }) : renderRows(allRows.filter((row) => !keyword || `${row.label || ''} ${row.id || ''} ${row.description || ''}`.toLowerCase().includes(keyword)))}
        </div>
    </SettingsSection>;
}

export function ResourceNode({ item, context, renderFields }) {
    const cache = context.runtimeContext.settingsCache;
    const cacheKey = settingsResourceCacheKey(item, { form: context.values, item: context.item, parentItem: context.parentItem });
    const [initialCache] = useState(() => cache?.get(cacheKey));
    const [rows, setRows] = useState(initialCache || []);
    const [loading, setLoading] = useState(initialCache === undefined);
    const [error, setError] = useState('');
    const [editor, setEditor] = useState(null);
    // The model outlives visibility so Radix can animate the complete outgoing
    // form. A new opening replaces it; closing never turns an edit into create.
    const editorOpen = editor?.open === true;
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
    const sourceKey = JSON.stringify([source, context.item?.id, cacheKey]);
    const load = useCallback(async ({ silent = false } = {}) => {
        const serial = ++epoch.current;
        requestController.current?.abort();
        const controller = new AbortController();
        requestController.current = controller;
        if (!silent) setLoading(true);
        setError('');
        try {
            const ctx = latestContext.current;
            const scope = { form: ctx.values, item: ctx.item, parentItem: ctx.parentItem };
            const response = source.endpoint?.startsWith('client:')
                ? await ctx.client.read(source.endpoint.slice(7))
                : await ctx.api.get(requestEndpoint(source.endpoint, scope), { params: resolveValue(source.params, scope), signal: controller.signal });
            const data = getValue(response, source.listPath || '', response);
            if (!Array.isArray(data)) throw new Error('资源接口没有返回列表。');
            if (alive.current && serial === epoch.current) { setRows(data); cache?.set(cacheKey, data, item.events); setConflictingActions(new Set()); }
        } catch (cause) { if (alive.current && serial === epoch.current) setError(cause.message); }
        finally { if (alive.current && serial === epoch.current) setLoading(false); }
    // Source descriptors are immutable until the page or parent record changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceKey, cache]);
    const inlineLoading = context.runtimeContext.loadingMode === 'inline' || item.loadingMode !== 'toast';
    const loadingText = `正在加载${item.text || item.title || '列表'}…`;
    useSettingsLoadingToast(!inlineLoading && loading, loadingText, { error: inlineLoading ? '' : error, retry: load });
    useEffect(() => {
        alive.current = true;
        const cached = cache?.get(cacheKey);
        if (cached !== undefined) { setRows(cached); setLoading(false); setError(''); }
        else { setRows([]); void load(); }
        const detail = detailRequest.current;
        return () => { alive.current = false; epoch.current += 1; requestController.current?.abort(); detail.serial += 1; detail.controller?.abort(); };
    // The load callback owns the source/cache identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load]);
    useEffect(() => registerResource(item.id || item.name, load), [registerResource, item.id, item.name, load]);
    useEffect(() => {
        const subscriptions = (item.events || []).map((event) => subscribe(event, () => { void load(); }));
        // Local observations already have their own progress. Reading their
        // updated snapshot must not create a second collection-loading notice.
        const local = source.endpoint?.startsWith('client:') ? client.subscribe(() => { void load({ silent: true }); }) : null;
        return () => { subscriptions.forEach((unsubscribe) => unsubscribe?.()); local?.(); };
    }, [subscribe, client, item.events, source.endpoint, load]);
    useEffect(() => {
        if (!registerDraftGuard || !editorOpen || !editor) return undefined;
        return registerDraftGuard(`${item.id || item.name}:editor`, async () => JSON.stringify(editor.initial) === JSON.stringify(editor.values)
            || confirm({ title: '放弃未保存的更改？', description: '离开后本次编辑内容将被丢弃。', confirmText: '放弃更改' }));
    }, [registerDraftGuard, confirm, editorOpen, editor, item.id, item.name]);
    const openEditor = useCallback(async (record) => {
        if (!item.editor) return;
        const context = latestContext.current;
        detailRequest.current.controller?.abort();
        const controller = new AbortController();
        const serial = ++detailRequest.current.serial;
        detailRequest.current.controller = controller;
        const initial = pageValues(item.editor.options || [], { ...cloneData(item.editor.defaults || {}), ...cloneData(record || {}) });
        // Building a large form must be interruptible instead of blocking the
        // click event and every animation in the parent window.
        startTransition(() => {
            setEditorBusy(Boolean(record && item.editor.load)); setEditorError(''); setFieldErrors({});
            setEditor((current) => detailRequest.current.serial === serial ? { open: true, serial, record, values: initial, initial } : current);
        });
        try {
            if (record && item.editor.load) {
                const result = await context.api.get(requestEndpoint(item.editor.load.endpoint, { item: record, parentItem: context.item, form: initial }), { signal: controller.signal });
                if (!alive.current || controller.signal.aborted || serial !== detailRequest.current.serial) return;
                const values = pageValues(item.editor.options || [], { ...initial, ...cloneData(getValue(result, item.editor.load.valuePath || '', result)) });
                startTransition(() => setEditor((current) => current?.serial === serial && detailRequest.current.serial === serial
                    ? { ...current, values, initial: cloneData(values) } : current));
            }
        } catch (cause) { if (alive.current && !controller.signal.aborted && serial === detailRequest.current.serial) setEditorError(cause.message); }
        finally { if (alive.current && !controller.signal.aborted && serial === detailRequest.current.serial) startTransition(() => setEditorBusy(false)); }
    }, [item.editor]);
    const patchEditor = (patch, target = 'form') => setEditor((current) => current ? {
        ...current, values: target === 'form' ? { ...current.values, ...patch } : setValue(current.values, target.replace(/^form\./, ''), patch),
    } : current);
    const dismissEditor = (serial) => {
        if (detailRequest.current.serial !== serial) return;
        detailRequest.current.serial += 1;
        detailRequest.current.controller?.abort();
        setEditorBusy(false);
        setEditor((current) => current?.serial === serial ? { ...current, open: false } : current);
    };
    const closeEditor = async () => {
        if (!editorOpen) return;
        const serial = detailRequest.current.serial;
        if (editor && JSON.stringify(editor.initial) !== JSON.stringify(editor.values) && !(await context.confirm({ title: '放弃未保存的更改？', description: '关闭后本次编辑内容将被丢弃。', confirmText: '放弃更改' }))) return;
        dismissEditor(serial);
    };
    const editorAction = editor?.record ? item.editor?.update : item.editor?.create;
    const onSave = async () => {
        if (context.disabled || !editorOpen || !editor) return;
        const serial = detailRequest.current.serial;
        try { validateSettingsScope(editorScope.current); }
        catch (cause) { setEditorError(cause.message); return; }
        const errors = validateSettingsFields(editorScope.current, item.editor.options, editor.values, { item: editor.record, parentItem: context.item, isCreate: !editor.record });
        setFieldErrors(errors);
        if (Object.keys(errors).length) return;
        await context.execute(editorAction, { form: editor.values, item: editor.record, parentItem: context.item }, {
            patchForm: (patch, target) => { if (detailRequest.current.serial === serial) patchEditor(patch, target); },
            onSuccess: async () => { dismissEditor(serial); if (!(editorAction.effects || []).some((effect) => effect.type === 'refresh' && (!effect.target || effect.target === item.id))) await load(); },
            onError: (cause) => { if (detailRequest.current.serial !== serial) return; setEditorError(cause.message); if (cause.data?.errors) setFieldErrors(cause.data.errors); },
        });
    };
    // Editor visibility and draft changes do not invalidate the collection.
    const records = useMemo(() => {
        const actionsFor = (record) => {
            const scope = { form: context.values, item: record, parentItem: context.item };
            const visible = (item.actions || []).filter((action) => matchesCondition(action.when || action.showWhen, scope));
            if (!visible.length) return null;
            return <div className="flex flex-wrap items-start gap-2">{visible.map((action, index) => action.kind === 'edit'
                ? <Button key={action.id || index} type="button" size="sm" {...getActionPresentation(action)} disabled={context.disabled || action.disabled === true || (action.disabledWhen && matchesCondition(action.disabledWhen, scope))} onClick={() => { void openEditor(record); }}><SettingsActionLabel action={action} label={action.label || '编辑'} /></Button>
                : <ActionButton key={action.id || index} action={action} context={context} scope={{ item: record, parentItem: context.item }} disabled={conflictingActions.has(operationKey(action, scope))} callbacks={{ onError: (cause) => { if (Number(cause.code) === 409) setConflictingActions((previous) => new Set([...previous, operationKey(action, scope)])); } }} />)}</div>;
        };
        const columns = item.columns || [];
        const valueText = (record, column) => {
            const value = getValue(record, column.key || column.field);
            return Object.hasOwn(column.labels || {}, String(value)) ? column.labels[String(value)] : displayValue(value);
        };
        const renderCards = () => <SettingsCardGrid columns={item.columnsCount}>{rows.map((record, index) => {
            const actions = actionsFor(record);
            if (item.recordView?.type === 'connection-card') return <ConnectionCard key={getValue(record, item.keyField || 'id', index)} item={{ ...item, ...item.recordView }} record={record} context={context} actions={actions} />;
            const title = getValue(record, item.titleField || 'title', getValue(record, item.keyField || 'id'));
            const description = item.descriptionField && getValue(record, item.descriptionField);
            const properties = columns.filter(column => column.key !== (item.titleField || 'title') && column.key !== item.descriptionField);
            return <article className="min-w-0 overflow-hidden rounded-lg border bg-card" key={getValue(record, item.keyField || 'id', index)}>
                <div className="p-4">
                    <div className="flex min-w-0 items-start gap-3">
                        {(item.recordIcon || item.icon) && <SettingsIcon icon={item.recordIcon || item.icon} className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
                        <div className="min-w-0 flex-1">
                            <h4 className="break-words text-sm font-semibold leading-5">{displayValue(title)}</h4>
                            {description && <p className="mt-1 line-clamp-3 whitespace-pre-wrap break-words text-xs leading-5 text-muted-foreground">{displayValue(description)}</p>}
                            {item.badges?.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{item.badges.map((badge) => <Badge key={badge.field} variant="secondary" className="rounded-md text-[11px] font-medium">{badge.label ? `${badge.label}：` : ''}{valueText(record, badge)}</Badge>)}</div>}
                        </div>
                    </div>
                    {properties.length > 0 && <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">{properties.map(column => <div key={column.key} className="min-w-0"><dt className="text-[11px] leading-4 text-muted-foreground">{column.label}</dt><dd className="mt-1 break-words text-xs font-medium leading-5">{valueText(record, column)}</dd></div>)}</dl>}
                </div>
                {actions && <div className="border-t px-4 py-2.5">{actions}</div>}
            </article>;
        })}</SettingsCardGrid>;
        return item.display === 'table' && columns.length ? <div className="overflow-auto rounded-xl border border-border/70"><table className="w-full text-left text-sm"><thead className="bg-muted/40 text-xs text-muted-foreground"><tr>{columns.map(column => <th key={column.key} className="px-4 py-3 font-medium">{column.label}</th>)}<th className="px-4 py-3 font-medium">操作</th></tr></thead><tbody>{rows.map((record, index) => <tr key={getValue(record, item.keyField || 'id', index)} className="border-t border-border/55 transition-colors hover:bg-muted/15">{columns.map(column => <td key={column.key} className="max-w-sm break-words px-4 py-3 text-sm">{valueText(record, column)}</td>)}<td className="px-4 py-3">{actionsFor(record)}</td></tr>)}</tbody></table></div>
                    : renderCards();
    }, [rows, item, context, conflictingActions, openEditor]);
    const editorSerial = editor?.serial;
    const updateEditorValues = useCallback((values) => setEditor((current) => current?.open && current.serial === editorSerial
        ? { ...current, values } : current), [editorSerial]);
    // Keep the complete form during exit without traversing it again just to
    // change visibility. Real value, descriptor or runtime changes still render.
    const editorForm = useMemo(() => editorSerial == null ? null :
        <SettingsFormLayout layout={item.editor.layout || 'stacked'} columns={item.editor.columns}>{renderFields(item.editor.options || [], editor?.values, updateEditorValues, {
            key: `${item.id}:editor:${editorSerial}`, item: editor?.record, disabled: context.disabled || editorBusy,
            runtimeContext: { parentItem: context.item, isCreate: !editor?.record },
        })}</SettingsFormLayout>, [editorSerial, editor?.values, editor?.record, item.editor, item.id, context.disabled, context.item, editorBusy, renderFields, updateEditorValues]);
    const resourceActions = <>
        <Button type="button" variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="刷新列表" aria-busy={loading || undefined} onClick={() => { void load(); }}><RefreshCw className="size-4" /></Button>
        {(item.toolbarActions || []).map((action, index) => <ActionButton key={action.id || index} action={action} context={context} />)}
        {item.create && item.editor && <Button type="button" size="sm" className="rounded-md" disabled={context.disabled} onClick={() => { void openEditor(null); }}><Plus className="size-3.5" />{item.create.label || '添加'}</Button>}
    </>;
    return <SettingsSection title={<span className="flex items-center gap-2">{item.text || item.title}<span className="text-xs font-normal tabular-nums text-muted-foreground">{rows.length} 项</span></span>} description={item.description} variant={item.variant} actions={resourceActions} bodyClassName={item.variant === 'card' ? 'p-4' : ''}>
        <div className={`relative ${inlineLoading && !rows.length && (loading || error) ? 'min-h-28 rounded-lg border bg-card' : ''} ${loading ? '' : 'cwm-settings-reveal'}`} aria-busy={loading || undefined}>
        {!rows.length ? !loading && !error && <div className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center"><Inbox className="size-5 text-muted-foreground" /><p className="text-sm text-muted-foreground">{item.emptyText || '暂无数据'}</p></div>
                : records}
        {inlineLoading && (loading || error) && <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/80 p-4">
            {loading ? <div role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Spinner />{loadingText}</div>
                : <div className="space-y-2 text-center"><p role="alert" className="text-sm text-destructive">{error}</p><Button type="button" variant="outline" size="sm" onClick={() => { void load(); }}><RefreshCw className="size-3.5" />重新加载</Button></div>}
        </div>}
        </div>
        <Dialog open={editorOpen} onOpenChange={(open) => { if (!open) void closeEditor(); }}>
            <DialogContent className="flex max-w-none flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-none" style={getSettingsDialogStyle(item.editor?.dialog, 960)}
                onCloseAutoFocus={() => {
                    // Radix has removed the exiting surface. Release the old
                    // draft now, without a timer or touching a newer opening.
                    setEditor((current) => !current?.open && current?.serial === editor?.serial ? null : current);
                }}>
                <DialogHeader className="shrink-0 border-b px-4 py-4 pr-12"><DialogTitle className="text-base">{formatValue((!editor?.record && item.editor?.createTitle) || item.editor?.title || '编辑', { item: editor?.record, form: editor?.values })}</DialogTitle><DialogDescription className="mt-1.5 text-xs leading-5">{item.editor?.description}</DialogDescription></DialogHeader>
                <div ref={editorScope} className={`relative min-h-0 flex-1 space-y-4 overflow-auto p-5 sm:p-6 ${editorBusy ? '' : 'cwm-settings-reveal'}`} aria-busy={editorBusy || undefined}>
                    {editorError && <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">{editorError}</p>}
                    {Object.entries(fieldErrors).map(([field, message]) => <p className="text-xs text-destructive" key={field}>{field}：{message}</p>)}
                    {editorForm}
                    {editorBusy && <div role="status" className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 p-4 text-sm text-muted-foreground"><Spinner />正在读取详情…</div>}
                </div>
                <DialogFooter className="shrink-0 border-t bg-background px-4 py-3"><Button type="button" variant="outline" className="rounded-md" onClick={() => { void closeEditor(); }}>取消</Button>{editorAction && <Button type="button" className="rounded-md" disabled={context.disabled || editorBusy || context.operations?.[operationKey(editorAction, { item: editor?.record, parentItem: context.item })]?.busy || (editorAction.disabledWhen && matchesCondition(editorAction.disabledWhen, { form: editor?.values, item: editor?.record, parentItem: context.item }))} onClick={() => { void onSave().catch(() => {}); }}>保存</Button>}</DialogFooter>
            </DialogContent>
        </Dialog>
    </SettingsSection>;
}

export function DescriptorDialog({ open, descriptor, context, renderFields, onClose, onExited }) {
    const [values, setValues] = useState(() => pageValues(descriptor?.options || [], descriptor?.defaultOptions || {}));
    useEffect(() => { setValues(pageValues(descriptor?.options || [], descriptor?.defaultOptions || {})); }, [descriptor]);
    const form = useMemo(() => descriptor && <SettingsFormLayout layout={descriptor.layout || 'stacked'} columns={descriptor.columns}>
        {renderFields(descriptor.options || [], values, setValues, { runtimeContext: context.runtimeContext })}
    </SettingsFormLayout>, [descriptor, values, renderFields, context.runtimeContext]);
    return <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
        <DialogContent className="flex max-w-none flex-col gap-0 overflow-hidden rounded-lg p-0 sm:max-w-none" style={getSettingsDialogStyle(descriptor?.dialog)} onCloseAutoFocus={onExited}>
            <DialogHeader className="shrink-0 border-b px-4 py-4 pr-12">
                <DialogTitle className="text-base">{descriptor?.title || '详情'}</DialogTitle>
                <DialogDescription className="mt-1.5 text-xs leading-5">{descriptor?.description}</DialogDescription>
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-auto p-4">{form}</div>
            <DialogFooter className="shrink-0 border-t px-4 py-3"><Button type="button" variant="outline" className="rounded-md" onClick={onClose}>关闭</Button></DialogFooter>
        </DialogContent>
    </Dialog>;
}
