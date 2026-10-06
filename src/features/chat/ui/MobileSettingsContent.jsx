import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function MobileSettingsContent({ title, children, className, ...props }) {
    return (
        <DialogContent
            {...props}
            aria-describedby={undefined}
            overlayClassName="z-[2147483299] bg-black/40 backdrop-blur-sm"
            className={cn(
                'z-[2147483300] w-80 max-h-[80dvh] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl bg-background/95 p-4 pt-10 shadow-xl',
                className,
            )}
        >
            <DialogTitle className="sr-only">{title}</DialogTitle>
            {children}
        </DialogContent>
    );
}
