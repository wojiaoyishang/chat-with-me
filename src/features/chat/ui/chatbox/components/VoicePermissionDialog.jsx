import React, {memo} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const VoicePermissionDialog = memo(({
                                        dialog,
                                        onConfirm,
                                        onCancel,
                                    }) => {
    const isOpen = Boolean(dialog?.open);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                // 只处理用户导致的关闭；受控 open 已经是 false 时不重复触发取消逻辑。
                if (!open && isOpen) onCancel?.();
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{dialog?.title || 'Voice input'}</DialogTitle>
                    <DialogDescription className="leading-6">
                        {dialog?.description || ''}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:justify-end">
                    {dialog?.showCancel && (
                        <button
                            type="button"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
                            onClick={onCancel}
                        >
                            {dialog?.cancelText || 'Cancel'}
                        </button>
                    )}
                    <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer"
                        onClick={onConfirm}
                    >
                        {dialog?.confirmText || 'Got it'}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

VoicePermissionDialog.displayName = 'VoicePermissionDialog';

export default VoicePermissionDialog;
