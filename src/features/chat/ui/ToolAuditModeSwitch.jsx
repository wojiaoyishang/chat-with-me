import { Bot, ShieldCheck, ShieldOff } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const MODES = [
    { id: 'off', icon: ShieldOff, label: 'tool_audit_off', description: 'tool_audit_off_description' },
    { id: 'semi', icon: ShieldCheck, label: 'tool_audit_semi', description: 'tool_audit_semi_description' },
    { id: 'auto', icon: Bot, label: 'tool_audit_auto', description: 'tool_audit_auto_description' },
];

export default function ToolAuditModeSwitch({ value = 'off', onChange, t }) {
    const current = MODES.find((mode) => mode.id === value) || MODES[0];
    return (
        <div className="shrink-0 border-b border-gray-100 bg-white px-3 pb-3 pt-3">
            <div className="mb-2 text-xs font-medium text-gray-500">{t('tool_audit_policy')}</div>
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-gray-100/80 p-1">
                {MODES.map(({ id, icon: Icon, label }) => (
                    <DropdownMenuItem
                        key={id}
                        role="menuitemradio"
                        aria-checked={current.id === id}
                        onSelect={(event) => event.preventDefault()}
                        onClick={() => onChange(id)}
                        className={`flex min-h-16 cursor-pointer flex-col justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors focus:bg-blue-50 ${
                            current.id === id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:bg-white/70 hover:text-gray-800'
                        }`}
                    >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        <span className="whitespace-nowrap">{t(label)}</span>
                    </DropdownMenuItem>
                ))}
            </div>
            <div className="mt-2 min-h-8 text-[11px] leading-4 text-gray-500" aria-live="polite">
                {t(current.description)}
            </div>
        </div>
    );
}
