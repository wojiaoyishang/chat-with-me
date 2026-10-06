import { useState } from 'react';
import { ArrowLeft, Bot, Check, Shield, ShieldCheck, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

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

export default function ToolAuditModeSwitch({ value = 'auto', onChange, t, isMobile = false, layerClass = '' }) {
    const [open, setOpen] = useState(false);
    const current = MODES.find((mode) => mode.id === value) || MODES[2];
    const options = (
        <div role="group" aria-label={t('tool_audit_policy')}>
            {MODES.map(({ id, icon: Icon, label, description, color }) => (
                <Button
                    key={id}
                    type="button"
                    variant="ghost"
                    aria-pressed={current.id === id}
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
                    {current.id === id && <Check className="size-4 shrink-0" />}
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
            <Shield className="size-4.5" />
            {!isMobile && <span className="truncate">{t(current.label)}</span>}
        </Button>
    );

    if (isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent
                    showCloseButton={false}
                    overlayClassName={layerClass}
                    className={`inset-0 top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 p-0 sm:max-w-none ${layerClass}`}
                >
                    <header className="flex shrink-0 items-center gap-3 border-b px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" aria-label={t('back')} className="cursor-pointer">
                                <ArrowLeft className="size-5" />
                            </Button>
                        </DialogClose>
                        <DialogTitle className="text-base">{t('tool_audit_policy')}</DialogTitle>
                    </header>
                    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
                        <DialogDescription className="sr-only">{t('tool_audit_choose_description')}</DialogDescription>
                        {options}
                    </div>
                </DialogContent>
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
