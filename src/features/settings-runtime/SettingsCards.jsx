import { CircleUserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';
import { getValue, matchesCondition, resolveValue } from './model.js';
import { SettingsIcon } from './SettingsPresentation.jsx';
import { formatSettingsValue } from './displayValue.js';

const STATE_TONES = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    warning: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    danger: 'border-destructive/25 bg-destructive/5 text-destructive',
    info: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
};

/** Resource layout follows available content width, with at most two columns. */
export function SettingsCardGrid({ columns = 1, children }) {
    return <div className="@container/settings-cards min-w-0"><div className={`grid min-w-0 grid-cols-1 gap-3 ${Number(columns) === 2 ? '@2xl/settings-cards:grid-cols-2' : ''}`}>{children}</div></div>;
}

export function ProfileCard({ item, context, avatarControl, actions, children }) {
    const scope = { form: context.values, item: context.item, parentItem: context.parentItem };
    const title = resolveValue(item.title || item.text, scope);
    const subtitle = resolveValue(item.subtitle, scope);
    const avatar = resolveValue(item.avatar, scope);
    return <Card className="min-w-0 gap-0 rounded-lg py-0 shadow-none" data-settings-profile-card={item.id || ''}>
        <div className="flex min-w-0 flex-wrap items-center gap-3 p-4">
            {avatarControl || <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-lg font-semibold">{avatar ? <img alt="" src={resolveResourceUrl(avatar)} className="size-full object-cover" /> : title ? String(title).slice(0, 1) : <CircleUserRound className="size-6" />}</div>}
            <div className="min-w-0 flex-1">
                {title && <h3 className="break-words text-base font-semibold">{title}</h3>}
                {subtitle && <p className="mt-0.5 break-words text-xs text-muted-foreground">{subtitle}</p>}
                {item.meta?.length > 0 && <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">{item.meta.map((entry, index) => <div key={entry.id || index} className="flex items-center gap-1.5"><dt className="text-muted-foreground">{entry.label}</dt><dd>{formatSettingsValue(resolveValue(entry.value, scope))}</dd></div>)}</dl>}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {children && <div className="border-t p-4">{children}</div>}
    </Card>;
}

/** A connection card renders declared data only; no service names select UI. */
export function ConnectionCard({ item, context, record, actions }) {
    const scope = { form: context.values, item: record || context.item, parentItem: context.parentItem };
    const title = record ? getValue(record, item.titleField || 'title', getValue(record, item.keyField || 'id')) : resolveValue(item.title || item.text, scope);
    const description = record ? item.descriptionField && getValue(record, item.descriptionField) : resolveValue(item.description, scope);
    const stateValue = record ? getValue(record, item.state?.field) : resolveValue(item.state?.value, scope);
    const stateText = item.state && (Object.hasOwn(item.state.labels || {}, String(stateValue)) ? item.state.labels[String(stateValue)] : formatSettingsValue(stateValue));
    const stateTone = item.state?.tones?.[String(stateValue)];
    const columns = record ? item.columns || [] : item.fields || [];
    const properties = (record ? columns.filter((column) => (column.key || column.field) !== item.titleField && (column.key || column.field) !== item.descriptionField && (!item.state?.field || (column.key || column.field) !== item.state.field)) : columns).filter((column) => matchesCondition(column.when, scope));
    return <Card className="min-w-0 gap-0 overflow-hidden rounded-lg py-0 shadow-none" data-settings-connection-card="true">
        <div className="min-w-0 flex-1 space-y-3 p-4">
            <div className="flex min-w-0 flex-wrap items-start gap-2">
                {(item.recordIcon || item.icon) && <SettingsIcon icon={item.recordIcon || item.icon} className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
                <div className="min-w-0 flex-1"><h4 className="break-words text-sm font-semibold">{formatSettingsValue(title)}</h4>{description && <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">{formatSettingsValue(description)}</p>}</div>
                {stateText && <span className={`inline-flex max-w-full items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs leading-5 ${Object.hasOwn(STATE_TONES, stateTone) ? STATE_TONES[stateTone] : 'border-border bg-muted text-muted-foreground'}`} title={String(stateText)}>{item.state.busyValues?.includes(stateValue) && <Spinner className="size-3" />}{stateText}</span>}
            </div>
            {properties.length > 0 && <dl className="space-y-2">{properties.map((column, index) => {
                const value = record ? getValue(record, column.key || column.field) : resolveValue(column.value, scope);
                const text = Object.hasOwn(column.labels || {}, String(value)) ? column.labels[String(value)] : formatSettingsValue(value);
                return <div key={column.key || column.field || index} className="flex min-w-0 items-start gap-3 text-xs leading-5"><dt className="w-20 shrink-0 text-muted-foreground">{column.label}</dt><dd className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">{text}</dd></div>;
            })}</dl>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3">{actions}</div>}
    </Card>;
}
