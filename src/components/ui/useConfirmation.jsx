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
  const [options, setOptions] = useState(null);
  const pending = useRef(null);
  useEffect(
    () => () => {
      pending.current?.(false);
      pending.current = null;
    },
    [],
  );
  const finish = useCallback((accepted) => {
    const resolve = pending.current;
    pending.current = null;
    setOptions(null);
    resolve?.(accepted);
  }, []);
  const confirm = useCallback(
    (next) =>
      new Promise((resolve) => {
        pending.current?.(false);
        pending.current = resolve;
        setOptions(next);
      }),
    [],
  );
  return [
    confirm,
    <AlertDialog
      open={Boolean(options)}
      onOpenChange={(open) => {
        if (!open) finish(false);
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
          <AlertDialogCancel className="rounded-xl" onClick={() => finish(false)}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            className={`rounded-xl ${options?.danger ? 'bg-destructive text-white hover:bg-destructive/90' : ''}`}
            onClick={() => finish(true)}
          >
            {options?.confirmText || "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  ];
}
