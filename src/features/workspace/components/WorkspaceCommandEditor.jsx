import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function commandRows(profile) {
    return Object.entries(profile?.commands || {}).map(([id, spec]) => ({
        key: crypto.randomUUID(),
        id,
        argv: JSON.stringify(spec.argv || []),
        cwd: spec.cwd || '.',
        timeout: spec.timeoutSeconds || 300,
        extra: !!spec.allowExtraArgs,
    }));
}
export function commandProfileFromRows(rows, profile = {}, invalidMessage = 'Invalid command configuration') {
    const commands = {};
    for (const row of rows) {
        const id = row.id.trim();
        if (!id || Object.hasOwn(commands, id)) throw new Error(invalidMessage);
        let argv;
        try {
            argv = JSON.parse(row.argv);
        } catch {
            throw new Error(invalidMessage);
        }
        commands[id] = {
            argv,
            cwd: row.cwd.trim() || '.',
            timeoutSeconds: Number(row.timeout),
            allowExtraArgs: row.extra,
        };
    }
    return { ...profile, commands };
}
export default function WorkspaceCommandEditor({ rows, onChange }) {
    const { t } = useTranslation();
    const change = (index, patch) => onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    const add = () => {
        let number = rows.length + 1;
        while (rows.some((row) => row.id === `command_${number}`)) number++;
        onChange([
            ...rows,
            {
                key: crypto.randomUUID(),
                id: `command_${number}`,
                argv: '["python", "-m", "pytest"]',
                cwd: '.',
                timeout: 300,
                extra: false,
            },
        ]);
    };
    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium">{t('workspace_custom_commands')}</h4>
                <Button type="button" variant="outline" size="sm" disabled={rows.length >= 100} onClick={add}>
                    <Plus className="mr-1 size-4" />
                    {t('workspace_add_command')}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">{t('workspace_custom_command_hint')}</p>
            {rows.map((row, index) => (
                <div key={row.key} className="space-y-2 rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                        <Input
                            aria-label={t('workspace_command_id')}
                            value={row.id}
                            onChange={(event) => change(index, { id: event.target.value })}
                            placeholder={t('workspace_command_id')}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            aria-label={t('workspace_delete_command')}
                            onClick={() => onChange(rows.filter((_, i) => i !== index))}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                    <label className="block space-y-1 text-xs">
                        <span>{t('workspace_command_argv')}</span>
                        <textarea
                            className="min-h-16 w-full rounded-md border bg-transparent p-2 font-mono text-sm"
                            value={row.argv}
                            onChange={(event) => change(index, { argv: event.target.value })}
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <label className="space-y-1 text-xs">
                            <span>{t('workspace_command_cwd')}</span>
                            <Input value={row.cwd} onChange={(event) => change(index, { cwd: event.target.value })} />
                        </label>
                        <label className="space-y-1 text-xs">
                            <span>{t('workspace_command_timeout')}</span>
                            <Input
                                type="number"
                                min={1}
                                max={3600}
                                value={row.timeout}
                                onChange={(event) => change(index, { timeout: event.target.value })}
                            />
                        </label>
                    </div>
                    <label className="flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            checked={row.extra}
                            onChange={(event) => change(index, { extra: event.target.checked })}
                        />
                        {t('workspace_command_extra')}
                    </label>
                </div>
            ))}
        </section>
    );
}
