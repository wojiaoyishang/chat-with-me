import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const isDangerous = (action) => action.tone === 'danger' || action.variant === 'destructive' || action.confirm?.danger;

/** Resource authors choose placement; all controls retain their original executor. */
export function ResourceActions({ actions, view, disabled, renderAction }) {
    const [open, setOpen] = useState(false);
    if (view?.actionLayout !== 'split-menu') {
        return <div className="flex flex-wrap items-start gap-2">{actions.map((action, index) => renderAction(action, index, false))}</div>;
    }
    const inline = actions.filter((action) => action.placement !== 'menu');
    const menu = actions.filter((action) => action.placement === 'menu');
    const regular = menu.filter((action) => !isDangerous(action));
    const dangerous = menu.filter(isDangerous);
    return <div className="flex min-w-0 flex-1 items-center gap-2" data-settings-action-layout="split-menu">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{inline.map((action, index) => renderAction(action, index, false))}</div>
        {menu.length > 0 && <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground" aria-label={view.moreLabel || '更多操作'} disabled={disabled}>
                    <MoreHorizontal className="size-4" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
                {regular.map((action, index) => renderAction(action, index, true))}
                {regular.length > 0 && dangerous.length > 0 && <DropdownMenuSeparator />}
                {dangerous.map((action, index) => renderAction(action, index, true))}
            </DropdownMenuContent>
        </DropdownMenu>}
    </div>;
}
