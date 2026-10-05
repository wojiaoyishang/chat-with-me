import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { normalizeBuiltinToolValue } from './builtinToolValue.js';

export default function BuiltinSliderButton({ tool, value, onChange, icon }) {
    const { t } = useTranslation();
    const items = tool.items || [];
    if (!items.length) return null;
    const id = normalizeBuiltinToolValue(tool, value);
    const index = items.findIndex((item) => item.id === id);
    const name = (item) => t(item.name);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    disabled={tool.disabled}
                    className="h-8 max-w-40 gap-1.5 rounded-full bg-muted px-2.5 text-xs"
                    title={`${t(tool.text)} · ${name(items[index])}`}
                >
                    {icon}
                    <span className="truncate">
                        {t(tool.text)} · {name(items[index])}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 max-w-[calc(100vw-2rem)] space-y-4" align="start">
                <div className="flex justify-between gap-2 text-sm">
                    <span>{t(tool.text)}</span>
                    <span className="font-medium">{name(items[index])}</span>
                </div>
                <div className="relative mx-1 h-10 rounded-full bg-muted px-5">
                    <div className="pointer-events-none absolute inset-x-5 inset-y-0 flex items-center justify-between">
                        {items.map((item) => (
                            <span key={item.id} className="size-1.5 rounded-full bg-muted-foreground/40" />
                        ))}
                    </div>
                    <Slider
                        className="relative h-10 [&_[data-slot=slider-track]]:h-10 [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-track]]:overflow-visible [&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-thumb]]:size-10 [&_[data-slot=slider-thumb]]:border-border"
                        min={0}
                        max={Math.max(1, items.length - 1)}
                        step={1}
                        value={[index]}
                        disabled={tool.disabled || items.length < 2}
                        thumbProps={{ 'aria-label': t(tool.text), 'aria-valuetext': name(items[index]) }}
                        onValueChange={([number]) => onChange(items[number]?.id || id)}
                    />
                </div>
                <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                    <span>{name(items[0])}</span>
                    <span>{name(items.at(-1))}</span>
                </div>
            </PopoverContent>
        </Popover>
    );
}
