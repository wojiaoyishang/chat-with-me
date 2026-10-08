import { useState } from 'react';
import './BuiltinSliderButton.css';
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/lib/tools.jsx';
import MobileSettingsContent from './MobileSettingsContent.jsx';
import ThinkingGauge from './ThinkingGauge.jsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { normalizeBuiltinToolValue } from './builtinToolValue.js';

const chargeColors = ['#94a3b8', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

export default function BuiltinSliderButton({ tool, value, onChange, onCommit, compact = false, fixedWidth = false }) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const [particles] = useState(() =>
        Array.from({ length: 18 }, () => ({
            y: 12 + Math.random() * 76,
            size: 1 + Math.random() * 2,
            opacity: 0.25 + Math.random() * 0.55,
            speed: 0.7 + Math.random() * 1.7,
            delay: -Math.random() * 8,
            drift: (Math.random() - 0.5) * 9,
            restingX: Math.random() * 100,
        })),
    );

    const items = tool.items || [];
    if (!items.length) return null;
    const id = normalizeBuiltinToolValue({ ...tool, mode: 'slider' }, value);
    const index = items.findIndex((item) => item.id === id);
    const name = (item) => (item.labelKey ? t(item.labelKey) : item.name || item.id);
    const progress = items.length > 1 ? index / (items.length - 1) : 0;
    const chargeColor = chargeColors[Math.round(progress * (chargeColors.length - 1))];
    const isHighest = items.length > 1 && index === items.length - 1 && id !== 'none';
    const gaugeColor = isHighest ? '#a855f7' : '#3b82f6';
    const Root = isMobile ? Dialog : Popover;
    const Trigger = isMobile ? DialogTrigger : PopoverTrigger;
    const Content = isMobile ? MobileSettingsContent : PopoverContent;
    return (
        <Root>
            <Trigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    disabled={tool.disabled}
                    className={`h-9 shrink-0 cursor-pointer gap-1.5 text-sm disabled:cursor-not-allowed text-muted-foreground hover:text-foreground data-[state=open]:text-foreground ${
                        fixedWidth
                            ? 'rounded-full bg-transparent hover:bg-muted/60 data-[state=open]:bg-muted/60 ' +
                              (compact ? 'size-9 p-1 has-[>svg]:px-1' : 'w-auto max-w-[min(16rem,30vw)] px-3')
                            : 'max-w-36 bg-transparent px-2 hover:bg-transparent ' +
                              (compact ? 'size-9 p-1 has-[>svg]:px-1' : '')
                    }`}
                    title={`${t(tool.text)} · ${name(items[index])}`}
                    aria-label={`${t(tool.text)} · ${name(items[index])}`}
                >
                    {compact ? (
                        <ThinkingGauge progress={progress} color={gaugeColor} bubbles={isHighest} />
                    ) : (
                        <>
                            {fixedWidth ? (
                                <span className="inline-grid min-w-0">
                                    {items.map((item) => (
                                        <span
                                            key={item.id}
                                            aria-hidden={item.id !== id}
                                            className={`col-start-1 row-start-1 truncate text-center ${item.id !== id ? 'invisible' : ''}`}
                                        >
                                            {name(item)}
                                        </span>
                                    ))}
                                </span>
                            ) : (
                                <span className="min-w-0 truncate">{name(items[index])}</span>
                            )}
                            <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                        </>
                    )}
                </Button>
            </Trigger>
            <Content
                className={
                    isMobile
                        ? 'space-y-7 overflow-visible border-0 bg-transparent p-2 shadow-none'
                        : 'w-64 max-w-[calc(100vw-2rem)] space-y-4 rounded-2xl border-border/50 bg-background/95 px-4 py-4 shadow-sm'
                }
                {...(isMobile ? { title: t(tool.text) } : { align: 'start', sideOffset: 8 })}
                aria-label={t(tool.text)}
            >
                <div
                    className={`truncate text-center font-medium ${isMobile ? 'text-2xl' : 'text-base'}`}
                    title={name(items[index])}
                    style={{ color: index > 0 ? chargeColor : undefined }}
                >
                    {name(items[index])}
                </div>
                <div
                    className={`relative h-8 rounded-full bg-muted ${isMobile ? 'ring-8 ring-background shadow-lg' : ''}`}
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden rounded-full transition-[width,opacity] duration-200"
                        style={{
                            width: `calc(36px + (100% - 36px) * ${progress})`,
                            opacity: index > 0 ? 1 : 0,
                            background: `linear-gradient(100deg, #3730a3 0%, ${chargeColor} 100%)`,
                            boxShadow: `inset 0 1px 8px ${chargeColor}55`,
                        }}
                    >
                        {index > 0 && (
                            <span className="builtin-slider-particles absolute inset-0">
                                {particles.map((particle, particleIndex) => (
                                    <i
                                        key={particleIndex}
                                        className="builtin-slider-particle"
                                        style={{
                                            top: `${particle.y}%`,
                                            width: particle.size,
                                            height: particle.size,
                                            '--particle-opacity': particle.opacity,
                                            '--particle-duration': `${(3.6 - 2.8 * progress) * particle.speed}s`,
                                            '--particle-delay': `${particle.delay}s`,
                                            '--particle-drift': `${particle.drift}px`,
                                            '--particle-resting-x': `${particle.restingX}%`,
                                        }}
                                    />
                                ))}
                            </span>
                        )}
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
                        onValueCommit={onCommit ? ([number]) => onCommit(items[number]?.id || id) : undefined}
                    />
                </div>
            </Content>
        </Root>
    );
}
