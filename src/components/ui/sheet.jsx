import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { cn } from '@/lib/utils';
export const Sheet = Dialog;
export const SheetHeader = DialogHeader;
export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;
export function SheetContent({ className, ...props }) {
    return (
        <DialogContent
            {...props}
            overlayClassName="z-[100099]"
            className={cn(
                'fixed left-auto right-0 top-0 h-dvh w-full max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-r-0 z-[100100] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100',
                className,
            )}
        />
    );
}
