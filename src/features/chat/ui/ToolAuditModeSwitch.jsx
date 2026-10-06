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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MODES = [
    { id: 'off', icon: ShieldOff, label: 'tool_audit_off', description: 'tool_audit_off_description' },
    { id: 'semi', icon: ShieldCheck, label: 'tool_audit_semi', description: 'tool_audit_semi_description' },
    { id: 'auto', icon: Bot, label: 'tool_audit_auto', description: 'tool_audit_auto_description' },
];

export default function ToolAuditModeSwitch({ value = 'off', onChange, t, isMobile = false, layerClass = '' }) {
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const current = MODES.find((mode) => mode.id === value) || MODES[0];
    const options = (
        <div className="space-y-1" role="group" aria-label={t('tool_audit_policy')}>
            {MODES.map(({ id, icon: Icon, label, description }) => (
                <Button
                    key={id}
                    type="button"
                    variant="ghost"
                    aria-pressed={current.id === id}
                    onClick={() => {
                        onChange(id);
                        setOpen(false);
                    }}
                    className={`h-auto w-full cursor-pointer justify-start gap-3 whitespace-normal rounded-xl px-3 py-3 text-left ${
                        current.id === id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                    }`}
                >
                    <Icon className="size-5 shrink-0" />
                    <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground">{t(label)}</span>
                        <span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground">
                            {t(description)}
                        </span>
                    </span>
                    {current.id === id && <Check className="size-4 shrink-0 text-primary" />}
                </Button>
            ))}
        </div>
    );
    const trigger = (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`${t('tool_audit_policy')}：${t(current.label)}`}
            className={`size-7 shrink-0 cursor-pointer rounded-full p-0 ${
                current.id === 'off' ? 'text-muted-foreground' : 'text-primary'
            }`}
        >
            <Shield className="size-4.5" />
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
                        <DialogDescription className="mb-4">{t('tool_audit_choose_description')}</DialogDescription>
                        {options}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                setTooltipOpen(false);
            }}
        >
            <TooltipProvider delayDuration={300}>
                <Tooltip open={!open && tooltipOpen} onOpenChange={setTooltipOpen}>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8} className={`max-w-64 ${layerClass}`}>
                        <div className="font-medium">{t(current.label)}</div>
                        <div className="mt-1 leading-4">{t(current.description)}</div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent
                side="top"
                align="start"
                sideOffset={8}
                collisionPadding={12}
                className={`w-80 max-w-[calc(100vw-1rem)] rounded-xl p-2 ${layerClass}`}
            >
                <div className="px-3 pt-2 pb-2 text-xs font-medium text-muted-foreground">{t('tool_audit_policy')}</div>
                {options}
            </PopoverContent>
        </Popover>
    );
}
