import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function SpeechVolumeControl({
    volume = 1,
    onChange,
    onOpenChange,
    open,
    contentRef,
    popoverZIndex = 10030,
    triggerClassName = '',
}) {
    const percent = Math.round(volume * 100);
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="TTS 播放音量"
                    title="TTS 播放音量"
                    className={`shrink-0 rounded-full ${triggerClassName}`}
                >
                    {percent === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                ref={contentRef}
                side="top"
                align="end"
                className="w-56 space-y-3"
                style={{ zIndex: popoverZIndex }}
            >
                <div className="flex justify-between text-sm">
                    <span>播放音量</span>
                    <span>{percent}%</span>
                </div>
                <Slider
                    aria-label="TTS 播放音量"
                    min={0}
                    max={100}
                    step={1}
                    value={[percent]}
                    onValueChange={([value]) => onChange?.(value / 100)}
                />
            </PopoverContent>
        </Popover>
    );
}
