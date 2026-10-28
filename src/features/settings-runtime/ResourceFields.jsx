import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Folder, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import FolderBrowserDialog from '@/features/workspace/components/FolderBrowserDialog.jsx';
import WorkspaceCommandEditor from '@/features/workspace/components/WorkspaceCommandEditor.jsx';
import { commandRows, commandProfileFromRows } from '@/features/workspace/components/commandProfile.js';
import { requestEndpoint, resolveValue } from './model.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function FieldBlock({ item, children, invalid }) {
    return <section className="min-w-0 space-y-2 border-b border-border/50 py-4 last:border-0" data-settings-invalid={Boolean(invalid) || undefined} data-settings-message={invalid || undefined}>
        <div className="text-sm font-medium">{item.text}{item.required && <span className="ml-1 text-destructive">*</span>}</div>
        {item.description && <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>}
        {children}
        {invalid && <p role="alert" className="text-xs text-destructive">{invalid}</p>}
    </section>;
}

function RuleSelect({ label, value, onChange, options, disabled, className = '' }) {
    return <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger aria-label={label} className={`h-8 w-auto shrink-0 gap-2 text-xs ${className}`}><SelectValue /></SelectTrigger>
        <SelectContent>{options.map(([id, text]) => <SelectItem key={id} value={id}>{text}</SelectItem>)}</SelectContent>
    </Select>;
}

export function MemberPermissionsField({ item, value, onChange, context }) {
    const list = Array.isArray(value) ? value : [];
    const excluded = resolveValue(item.excludeUser, { form: context.values });
    const users = (item.users || []).filter((user) => user.value !== excluded);
    const roles = item.permissions || [];
    const invalid = list.some((row) => !row.userId || !roles.some((role) => role.value === row.permission))
        ? '请选择成员与权限，或删除未完成的行。'
        : new Set(list.map((row) => row.userId)).size !== list.length ? '同一成员只能授权一次。' : '';
    const change = (index, patch) => onChange(list.map((row, i) => i === index ? { ...row, ...patch } : row));
    return <FieldBlock item={item} invalid={invalid}>
        <div className="divide-y rounded-lg border">
            {!!list.length && <div className="grid grid-cols-[minmax(0,1fr)_8rem_2rem] gap-2 bg-muted/30 px-3 py-2 text-xs text-muted-foreground"><span>用户</span><span>权限</span><span /></div>}
            {list.map((row, index) => <div key={index} className="grid grid-cols-[minmax(0,1fr)_8rem_2rem] items-center gap-2 px-3 py-2.5">
                <Select value={row.userId ? String(row.userId) : ''} onValueChange={(id) => change(index, { userId: users.find((user) => String(user.value) === id)?.value })} disabled={context.disabled}>
                    <SelectTrigger aria-label={`成员 ${index + 1}`}><SelectValue placeholder="选择用户" /></SelectTrigger><SelectContent>{users.map((user) => <SelectItem key={user.value} value={String(user.value)} disabled={list.some((entry, i) => i !== index && entry.userId === user.value)}>{user.label}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={row.permission || ''} onValueChange={(permission) => change(index, { permission })} disabled={context.disabled}><SelectTrigger aria-label={`成员权限 ${index + 1}`}><SelectValue placeholder="选择权限" /></SelectTrigger><SelectContent>{roles.map((role) => <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>)}</SelectContent></Select>
                <Button type="button" variant="ghost" size="icon" className="size-8" aria-label={`移除成员 ${index + 1}`} disabled={context.disabled} onClick={() => onChange(list.filter((_, i) => i !== index))}><Trash2 className="size-3.5" /></Button>
            </div>)}
            {!list.length && <p className="px-3 py-4 text-sm text-muted-foreground">尚未分配成员，当前仅所有者与管理员可访问。</p>}
        </div>
        <Button type="button" variant="outline" size="sm" disabled={context.disabled || list.length >= users.length} onClick={() => onChange([...list, { userId: null, permission: roles[0]?.value || '' }])}><Plus className="size-4" />添加成员</Button>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">{roles.map((role) => <span key={role.value}>{role.label}：{role.description}</span>)}</div>
    </FieldBlock>;
}

export function DirectoryListField({ item, value, onChange, context }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const list = Array.isArray(value) ? value : [];
    const aliases = list.map((entry) => entry.alias);
    const inheritedReadOnly = Boolean(resolveValue(item.readOnlySource, { form: context.values }));
    const invalidAlias = list.some((entry) => !/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(entry.alias || '')) || new Set(aliases.map((alias) => String(alias).toLowerCase())).size !== aliases.length;
    const overlap = list.some((entry, index) => list.slice(0, index).some((other) => entry.rootId === other.rootId && (entry.relativePath === other.relativePath || entry.relativePath === '.' || other.relativePath === '.' || entry.relativePath?.startsWith(other.relativePath + '/') || other.relativePath?.startsWith(entry.relativePath + '/'))));
    const add = (folder) => {
        if (list.some((entry) => entry.rootId === folder.rootId && entry.relativePath === folder.relativePath)) return;
        const stem = folder.name?.normalize('NFKD').replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'workspace';
        let alias = stem, counter = 2;
        const unavailable = (candidate) => {
            const previous = item.aliasHistory?.[candidate.toLowerCase()];
            return aliases.some((current) => current.toLowerCase() === candidate.toLowerCase()) || (previous && (previous[0] !== folder.rootId || previous[1] !== folder.relativePath));
        };
        while (unavailable(alias)) alias = `${stem}-${counter++}`;
        onChange([...list, { ...folder, alias }]);
    };
    return <FieldBlock item={item} invalid={invalidAlias ? '虚拟目录名需以字母或数字开头，最多 64 个字符，且不能重复。' : overlap ? '不能选择重复或相互包含的目录。' : ''}>
        <div className="divide-y rounded-lg border">
            {list.map((entry, index) => <div key={entry.id || `${entry.rootId}:${entry.relativePath}`} className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-3" data-settings-directory-row="true">
                <Folder className="size-4 shrink-0 text-amber-600" />
                <div className="min-w-0 flex-1 space-y-2">
                    <p className="break-all text-sm">{entry.displayPath || entry.relativePath}</p>
                    <label className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span>{entry.rootName || '目录'} · 虚拟目录 /</span><Input aria-label={`虚拟目录名 ${index + 1}`} className="h-7 w-40 max-w-full text-xs" value={entry.alias} disabled={context.disabled || item.browseDisabled} onChange={(event) => onChange(list.map((row, i) => i === index ? { ...row, alias: event.target.value } : row))} /></label>
                </div>
                <div className="ml-auto flex min-h-8 shrink-0 items-center gap-3">
                    <label className="inline-flex min-h-8 items-center gap-2 whitespace-nowrap text-xs leading-none"><Checkbox aria-label={`目录 ${index + 1} 只读`} checked={Boolean(entry.readOnly || inheritedReadOnly || entry.inheritedReadOnly || item.roots?.find((root) => root.id === entry.rootId)?.readOnly)} disabled={context.disabled || item.browseDisabled || inheritedReadOnly || entry.inheritedReadOnly || item.roots?.find((root) => root.id === entry.rootId)?.readOnly} onCheckedChange={(readOnly) => onChange(list.map((row, i) => i === index ? { ...row, readOnly } : row))} />{inheritedReadOnly ? '工作区只读' : entry.inheritedReadOnly ? '设备只读' : '只读'}</label>
                    <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0" aria-label={`移除目录 ${index + 1}`} disabled={context.disabled || item.browseDisabled} onClick={() => onChange(list.filter((_, i) => i !== index))}><Trash2 className="size-3.5" /></Button>
                </div>
            </div>)}
            {!list.length && <p className="p-3 text-sm text-muted-foreground">尚未选择目录</p>}
        </div>
        <Button type="button" variant="outline" size="sm" disabled={context.disabled || item.browseDisabled || !item.roots?.length} onClick={() => setOpen(true)}><Plus className="size-4" />选择目录</Button>
        {!item.roots?.length && <p className="text-xs text-muted-foreground">没有可浏览且有权配置的根目录。</p>}
        {open && <FolderBrowserDialog open onOpenChange={setOpen} roots={item.roots} onSelect={add} disabled={context.disabled} t={t} browseEndpoint={item.browseEndpoint} title={item.browseTitle} description={item.browseDescription} />}
    </FieldBlock>;
}

export function PolicyRulesField({ item, value, onChange, context }) {
    const visibility = item.mode === 'visibility';
    const key = visibility ? 'ignoredRules' : 'rules';
    const rules = value?.[key] || [];
    const update = (next) => onChange({ ...value, version: visibility ? 1 : 2, [key]: next });
    const change = (index, patch) => update(rules.map((row, i) => i === index ? { ...row, ...patch } : row));
    const invalid = rules.some((rule) => !rule.matcher?.pattern?.trim());
    return <FieldBlock item={item} invalid={invalid ? '请填写规则的匹配内容，或删除空白规则。' : ''}>
        {!visibility && <div className="flex items-center gap-3 py-2 text-sm">未匹配规则时<RuleSelect label="默认访问规则" value={value?.defaultEffect || 'allow'} disabled={context.disabled} onChange={(defaultEffect) => onChange({ ...value, defaultEffect })} options={[["allow", "允许"], ["deny", "拒绝"]]} /></div>}
        <div className="divide-y rounded-lg border">
            {rules.map((rule, index) => <div key={rule.id || index} className="space-y-2 p-3">
                <div className="flex items-center gap-2">
                    <Switch aria-label={`启用规则 ${index + 1}`} checked={rule.enabled !== false} disabled={context.disabled} onCheckedChange={(enabled) => change(index, { enabled })} />
                    {!visibility && <RuleSelect label="规则效果" value={rule.effect || 'deny'} disabled={context.disabled} onChange={(effect) => change(index, { effect })} options={[["deny", "拒绝"], ["allow", "允许"]]} />}
                    <RuleSelect label="匹配方式" value={rule.matcher?.type || 'path'} disabled={context.disabled} onChange={(type) => change(index, { matcher: { ...rule.matcher, type } })} options={[["path", "目录路径"], ["glob", "Glob"], ["regex", "正则"], ["exact", "精确匹配"]]} />
                    <Input aria-label={`匹配内容 ${index + 1}`} className="h-8 min-w-0 flex-1 text-sm" value={rule.matcher?.pattern || ''} placeholder="例如：**/.env*" disabled={context.disabled} onChange={(event) => change(index, { matcher: { ...rule.matcher, pattern: event.target.value } })} />
                    <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0" aria-label="删除规则" disabled={context.disabled} onClick={() => update(rules.filter((_, i) => i !== index))}><Trash2 className="size-3.5" /></Button>
                </div>
                <details className="text-xs text-muted-foreground"><summary className="w-fit cursor-pointer py-1">{visibility ? '限定目录' : '操作范围与优先级'}</summary><div className="space-y-2 pt-2">
                    <Input aria-label="规则说明" placeholder="规则说明（可选）" value={rule.name || ''} disabled={context.disabled} onChange={(event) => change(index, { name: event.target.value })} />
                    {!!item.operations?.length && <div className="flex flex-wrap gap-x-4 gap-y-2">{item.operations.map((operation) => <label key={operation.value} className="flex items-center gap-1.5"><Checkbox checked={!rule.operations || rule.operations.includes(operation.value)} disabled={context.disabled} onCheckedChange={(checked) => change(index, { operations: checked ? [...new Set([...(rule.operations || item.operations.map((op) => op.value)), operation.value])] : (rule.operations || item.operations.map((op) => op.value)).filter((op) => op !== operation.value) })} />{operation.label}</label>)}</div>}
                    <label className="flex items-center gap-3">限定虚拟目录<Input className="h-8" placeholder="留空为全部；多个目录用逗号分隔" value={(rule.mounts || []).join(', ')} disabled={context.disabled} onChange={(event) => change(index, { mounts: event.target.value.split(',').map((mount) => mount.trim()).filter(Boolean) })} /></label>
                    {!visibility && <label className="flex items-center gap-3">优先级<Input className="h-8 max-w-28" type="number" value={rule.priority || 0} disabled={context.disabled} onChange={(event) => change(index, { priority: Number(event.target.value) })} /></label>}
                </div></details>
            </div>)}
            {!rules.length && <p className="p-3 text-xs text-muted-foreground">没有额外规则</p>}
        </div>
        <Button type="button" variant="outline" size="sm" disabled={context.disabled} onClick={() => update([...rules, { id: crypto.randomUUID(), enabled: true, effect: 'deny', matcher: { type: 'glob', pattern: '' }, mounts: [], ...(item.operations?.length ? { operations: item.operations.map((op) => op.value) } : {}) }])}><Plus className="size-4" />添加规则</Button>
    </FieldBlock>;
}

export function CommandPermissionsField({ item, value, onChange, context }) {
    const [rows, setRows] = useState(() => commandRows(value?.profile));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const previousProfile = useRef(value?.profile);
    useEffect(() => {
        if (previousProfile.current !== value?.profile) { previousProfile.current = value?.profile; setRows(commandRows(value?.profile)); setError(''); }
    }, [value?.profile]);
    const ids = [...new Set([...rows.map((row) => row.id.trim()).filter(Boolean), ...(value?.availableCommands || item.availableCommands || [])])];
    const allowed = value?.allowed || ids.filter((id) => value?.policy?.rules?.some((rule) => rule.enabled !== false && rule.effect === 'allow' && rule.matcher?.type === 'exact' && rule.matcher.pattern === id));
    const policy = (next) => ({ version: 1, defaultEffect: 'deny', rules: next.map((id) => ({ id: `allow-${id}`, enabled: true, effect: 'allow', matcher: { type: 'exact', pattern: id }, priority: 0 })) });
    const edit = (next) => {
        setRows(next);
        try {
            const profile = commandProfileFromRows(next, value?.profile, '命令名称不能重复，参数必须是有效的非空数组。');
            previousProfile.current = profile;
            setError('');
            onChange({ ...value, invalid: false, profile });
        } catch (cause) {
            setError(cause.message);
            onChange({ ...value, invalid: true });
        }
    };
    const detect = async () => {
        setLoading(true); setError('');
        try {
            const result = await context.api.post(requestEndpoint(item.detectEndpoint, {}), context.values);
            setRows(commandRows(result.profile)); onChange(result);
        } catch (cause) { setError(cause.message); }
        finally { setLoading(false); }
    };
    return <FieldBlock item={item} invalid={error}>
        <div className="divide-y rounded-lg border">{ids.map((id) => <label key={id} className="flex items-center gap-3 px-3 py-2.5 text-sm"><Checkbox checked={allowed.includes(id)} disabled={context.disabled} onCheckedChange={(checked) => { const next = checked ? [...allowed, id] : allowed.filter((entry) => entry !== id); onChange({ ...value, allowed: next, policy: policy(next) }); }} /><span className="min-w-0 flex-1 break-all">{id}{(value?.commandCatalog?.[id]?.description || value?.commandCatalog?.[id]?.cwd) && <span className="mt-0.5 block text-xs text-muted-foreground">{value.commandCatalog[id].description || value.commandCatalog[id].cwd}</span>}</span><code className="max-w-[55%] truncate text-xs text-muted-foreground">{value?.profile?.commands?.[id]?.argv?.join(' ')}</code></label>)}{!ids.length && <p className="p-3 text-xs text-muted-foreground">尚无预设命令，可先检测项目或手动添加。</p>}</div>
        {item.detectEndpoint && <Button type="button" variant="outline" size="sm" disabled={loading || context.disabled} onClick={detect}><Search className={`size-4 ${loading ? 'animate-pulse' : ''}`} />{loading ? '正在检测…' : '检测项目命令'}</Button>}
        <details className="pt-1 text-sm"><summary className="w-fit cursor-pointer text-muted-foreground">自定义命令</summary><fieldset disabled={context.disabled} className="min-w-0 pt-3"><WorkspaceCommandEditor rows={rows} onChange={edit} onSave={context.onSave} /></fieldset></details>
    </FieldBlock>;
}
