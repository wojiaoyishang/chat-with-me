import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { normalizeBuiltinToolValue } from './builtinToolValue.js';

const chargeColors = ['#94a3b8', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

export default function BuiltinSliderButton({ tool, value, onChange }) {
    const { t } = useTranslation();
    const items = tool.items || [];
    if (!items.length) return null;
    const id = normalizeBuiltinToolValue(tool, value);
    const index = items.findIndex((item) => item.id === id);
    const name = (item) => item.name || item.id;
    const progress = items.length > 1 ? index / (items.length - 1) : 0;
    const chargeColor = chargeColors[Math.round(progress * (chargeColors.length - 1))];
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    disabled={tool.disabled}
                    className="h-9 max-w-36 cursor-pointer gap-1.5 bg-transparent px-2 text-sm disabled:cursor-not-allowed text-muted-foreground hover:bg-transparent hover:text-foreground data-[state=open]:text-foreground"
                    title={`${t(tool.text)} · ${name(items[index])}`}
                >
                    <span className="truncate">{name(items[index])}</span>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-64 max-w-[calc(100vw-2rem)] space-y-4 rounded-2xl border-border/50 bg-background/95 px-4 py-4 shadow-sm"
                align="start"
                sideOffset={8}
                aria-label={t(tool.text)}
            >
                <div
                    className="text-center text-base font-medium"
                    style={{ color: index > 0 ? chargeColor : undefined }}
                >
                    {name(items[index])}
                </div>
                <div className="relative h-8 rounded-full bg-muted">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width,opacity] duration-200"
                        style={{
                            width: `calc(36px + (100% - 36px) * ${progress})`,
                            opacity: index > 0 ? 1 : 0,
                            background: `linear-gradient(100deg, #3730a3 0%, ${chargeColor} 100%)`,
                            boxShadow: `inset 0 1px 8px ${chargeColor}55`,
                        }}
                    />
                    <div className="pointer-events-none absolute inset-x-[18px] inset-y-0 flex items-center justify-between">
                        {items.map((item, tickIndex) => (
                            <span
                                key={item.id}
                                className={`size-1 rounded-full ${tickIndex <= index && index > 0 ? 'bg-white/60' : 'bg-muted-foreground/30'}`}
                            />
                        ))}
                    </div>
                    <Slider
                        className="relative h-8 cursor-pointer data-[disabled]:cursor-not-allowed [&_[data-slot=slider-thumb]]:cursor-pointer [&_[data-slot=slider-thumb]]:hover:ring-0 [&_[data-slot=slider-thumb]]:focus-visible:ring-2 [&_[data-slot=slider-track]]:h-8 [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-track]]:overflow-visible [&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-thumb]]:size-9 [&_[data-slot=slider-thumb]]:border-border/70 [&_[data-slot=slider-thumb]]:shadow-sm"
                        min={0}
                        max={Math.max(1, items.length - 1)}
                        step={1}
                        value={[index]}
                        disabled={tool.disabled || items.length < 2}
                        thumbProps={{ 'aria-label': t(tool.text), 'aria-valuetext': name(items[index]) }}
                        onValueChange={([number]) => onChange(items[number]?.id || id)}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
