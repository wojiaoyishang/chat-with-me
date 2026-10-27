import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

/** Each owner cancels pending requests on unmount; no browser-global dialogs. */
export function useConfirmation() {
  const [dialog, setDialog] = useState({ id: 0, open: false, options: null });
  const sequence = useRef(0);
  const pending = useRef(null);
  useEffect(
    () => () => {
      pending.current?.resolve(false);
      pending.current = null;
    },
    [],
  );
  const finish = useCallback((accepted, id) => {
    if (pending.current?.id !== id) return;
    const { resolve } = pending.current;
    pending.current = null;
    // Radix keeps the portal mounted during its exit animation. Retain the
    // closing request's content until that animation unmounts the surface.
    setDialog((current) => current.id === id ? { ...current, open: false } : current);
    resolve(accepted);
  }, []);
  const confirm = useCallback(
    (next) =>
      new Promise((resolve) => {
        const previous = pending.current;
        const id = ++sequence.current;
        pending.current = { id, resolve };
        setDialog({ id, open: true, options: next });
        previous?.resolve(false);
      }),
    [],
  );
  const { options } = dialog;
  return [
    confirm,
    <AlertDialog
      open={dialog.open}
      onOpenChange={(open) => {
        if (!open) finish(false, dialog.id);
      }}
    >
      <AlertDialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-[460px]">
        <AlertDialogHeader className="min-h-0 overflow-auto px-5 py-5 text-left sm:px-6">
          <AlertDialogTitle className="text-base leading-6">{options?.title}</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 whitespace-pre-line text-sm leading-6">
            {options?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="shrink-0 border-t border-border/60 bg-muted/20 px-5 py-4 sm:px-6">
          <AlertDialogCancel className="rounded-xl" onClick={() => finish(false, dialog.id)}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            className={`rounded-xl ${options?.danger ? 'bg-destructive text-white hover:bg-destructive/90' : ''}`}
            onClick={() => finish(true, dialog.id)}
          >
            {options?.confirmText || "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  ];
}
