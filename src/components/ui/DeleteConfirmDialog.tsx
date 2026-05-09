import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ButtonContentWrapper} from "@/components/ui/ButtonContentWrapper";
import React from "react";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isDeleting?: boolean;
    title: string;
    description: string;
    cancelText: string;
    confirmText: string;
    onConfirm: () => void;
}

export function DeleteConfirmDialog({
                                        open,
                                        onOpenChange,
                                        isDeleting = false,
                                        title,
                                        description,
                                        cancelText,
                                        confirmText,
                                        onConfirm,
                                    }: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                        className="cursor-pointer"
                    >
                        {cancelText}
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="cursor-pointer"
                    >
                        <ButtonContentWrapper isLoading={isDeleting}>
                            {confirmText}
                        </ButtonContentWrapper>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}