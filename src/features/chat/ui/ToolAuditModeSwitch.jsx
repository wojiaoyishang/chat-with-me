import { useState } from 'react';
import { Bot, Check, ShieldCheck, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import MobileSettingsContent from './MobileSettingsContent.jsx';

const MODES = [
    {
        id: 'off',
        icon: ShieldOff,
        label: 'tool_audit_off',
        description: 'tool_audit_off_description',
        color: 'text-slate-500 dark:text-slate-400',
    },
    {
        id: 'semi',
        icon: ShieldCheck,
        label: 'tool_audit_semi',
        description: 'tool_audit_semi_description',
        color: 'text-blue-600 dark:text-blue-400',
    },
    {
        id: 'auto',
        icon: Bot,
        label: 'tool_audit_auto',
        description: 'tool_audit_auto_description',
        color: 'text-violet-600 dark:text-violet-400',
    },
];

export default function ToolAuditModeSwitch({ value = 'off', onChange, t, isMobile = false, layerClass = '' }) {
    const [open, setOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState(value);
    const handleOpenChange = (nextOpen) => {
        if (nextOpen) setDisplayValue(value);
        setOpen(nextOpen);
    };
    const current = MODES.find((mode) => mode.id === value) || MODES[0];
    const selectedOptionId = isMobile ? displayValue : current.id;
    const CurrentIcon = current.icon;
    const options = (
        <div role="group" aria-label={t('tool_audit_policy')}>
            {MODES.map(({ id, icon: Icon, label, description, color }) => (
                <Button
                    key={id}
                    type="button"
                    variant="ghost"
                    aria-pressed={selectedOptionId === id}
                    onClick={() => {
                        onChange(id);
                        setOpen(false);
                    }}
                    className="h-auto w-full cursor-pointer justify-start gap-2.5 whitespace-normal rounded-lg px-3 py-2 text-left text-muted-foreground"
                >
                    <Icon className={`size-5 shrink-0 ${color}`} />
                    <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-medium ${color}`}>{t(label)}</span>
                        <span className="block text-xs font-normal leading-4 text-muted-foreground">
                            {t(description)}
                        </span>
                    </span>
                    <span className="size-4 shrink-0" aria-hidden="true">
                        {selectedOptionId === id && <Check className="size-4" />}
                    </span>
                </Button>
            ))}
        </div>
    );
    const trigger = (
        <Button
            type="button"
            variant="ghost"
            data-tool-audit-trigger
            aria-label={`${t('tool_audit_policy')}：${t(current.label)}`}
            className={`h-7 max-w-30 shrink-0 cursor-pointer gap-1.5 bg-transparent pl-1 pr-0 text-sm font-normal hover:bg-transparent has-[>svg]:pl-1 has-[>svg]:pr-0 dark:hover:bg-transparent ${current.color}`}
        >
            <CurrentIcon className="size-4.5" />
            {!isMobile && <span className="truncate">{t(current.label)}</span>}
        </Button>
    );

    if (isMobile) {
        return (
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <MobileSettingsContent title={t('tool_audit_policy')}>{options}</MobileSettingsContent>
            </Dialog>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
                side="top"
                align="start"
                sideOffset={8}
                collisionPadding={12}
                className={`w-80 max-w-[calc(100vw-1rem)] rounded-2xl p-1.5 shadow-lg ${layerClass}`}
            >
                {options}
            </PopoverContent>
        </Popover>
    );
}
