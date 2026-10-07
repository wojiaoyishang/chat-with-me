import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Layers3, Wrench } from 'lucide-react';

/** Display backend descriptors; visibility, measurements and peaks remain server owned. */
export default function MessageIndicators({ indicators }) {
    const reduceMotion = useReducedMotion();
    const items = Array.isArray(indicators) ? indicators.filter((item) => item && item.visible !== false) : [];
    return (
        <AnimatePresence mode="popLayout">
            {items.map((item) => {
                const speed = item.id === 'output_speed';
                const tool = item.id === 'tool_calls';
                const model = item.id === 'llm_requests';
                const value =
                    typeof item.value === 'number'
                        ? item.value.toLocaleString(undefined, { maximumFractionDigits: 1 })
                        : String(item.value ?? '');
                const ratio = Math.max(0, Math.min(1, Number(item.relativeSpeed) || 0));
                const color = speed ? `hsl(158 ${20 + 65 * ratio}% ${43 - 12 * ratio}%)` : undefined;
                const backgroundColor = speed ? `hsl(158 ${20 + 65 * ratio}% ${97 - 6 * ratio}%)` : undefined;
                const title = `${item.label || ''} ${value}${item.unit ? ` ${item.unit}` : ''}${item.approximate ? '（估算）' : ''}${item.description ? ` · ${item.description}` : ''}`;
                return (
                    <motion.span
                        key={item.id}
                        layout="position"
                        initial={{ opacity: 0, scale: 0.9, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0, ...(speed ? { color, backgroundColor } : {}) }}
                        exit={{ opacity: 0, scale: 0.9, y: -4 }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : {
                                      duration: 0.22,
                                      ease: 'easeOut',
                                      color: { duration: 0.4 },
                                      backgroundColor: { duration: 0.4 },
                                  }
                        }
                        title={title}
                        aria-label={title}
                        className={`inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-[11px] tabular-nums ${
                            speed
                                ? 'rounded-full font-medium'
                                : tool
                                  ? 'rounded-md bg-amber-50 text-amber-600'
                                  : model
                                    ? 'rounded-full border border-indigo-200/70 text-indigo-500'
                                    : 'rounded-full bg-slate-100 text-slate-500'
                        }`}
                    >
                        {tool && <Wrench className="size-3" aria-hidden="true" />}
                        {model && <Layers3 className="size-3" aria-hidden="true" />}
                        <span>
                            {speed
                                ? `${value} tokens/s`
                                : tool || model
                                  ? `${value}次`
                                  : `${item.label || ''} ${value}${item.unit ? ` ${item.unit}` : ''}`}
                        </span>
                    </motion.span>
                );
            })}
        </AnimatePresence>
    );
}
