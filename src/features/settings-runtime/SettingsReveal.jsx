import { useLayoutEffect, useRef } from "react";

/** Animate presentation without remounting forms, resetting drafts or moving focus. */
export default function SettingsReveal({ children, active = true, revealKey, className = "", ...props }) {
  const host = useRef(null);
  useLayoutEffect(() => {
    const node = host.current;
    if (!active || !node?.animate || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const animation = node.animate(
      [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }],
      { duration: 200, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
    );
    return () => animation.cancel();
  }, [active, revealKey]);
  return <div ref={host} data-settings-transition={active ? "visible" : "pending"} className={className} {...props}>{children}</div>;
}
