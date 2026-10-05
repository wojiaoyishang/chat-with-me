import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function OrderedOptionsEditor({ value = [], options = [], onChange }) {
    const { t } = useTranslation();
    const entries = Array.isArray(value) ? value : [];
    const change = (index, patch) =>
        onChange(entries.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)));
    const move = (index, offset) => {
        const next = [...entries];
        [next[index], next[index + offset]] = [next[index + offset], next[index]];
        onChange(next);
    };
    const unused = options.filter((option) => !entries.some((entry) => entry.id === option.id));
    return (
        <div className="space-y-2">
            {entries.map((entry, index) => (
                <div key={index} className="flex flex-wrap items-center gap-2 rounded-md border p-2">
                    <span className="w-4 text-xs text-muted-foreground">{index + 1}</span>
                    <Select value={entry.id} onValueChange={(id) => change(index, { id })}>
                        <SelectTrigger className="w-28" aria-label={t('orderedOptions.id')}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {options
                                .filter(
                                    (option) =>
                                        option.id === entry.id || !entries.some((item) => item.id === option.id),
                                )
                                .map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.id}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <Input
                        value={entry.name || ''}
                        className="min-w-24 flex-1"
                        aria-label={t('orderedOptions.name')}
                        onChange={(event) => change(index, { name: event.target.value })}
                    />
                    <div className="flex gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            disabled={index === 0}
                            title={t('orderedOptions.up')}
                            onClick={() => move(index, -1)}
                        >
                            <ArrowUp className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            disabled={index === entries.length - 1}
                            title={t('orderedOptions.down')}
                            onClick={() => move(index, 1)}
                        >
                            <ArrowDown className="size-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            title={t('orderedOptions.remove')}
                            onClick={() => onChange(entries.filter((_, i) => i !== index))}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!unused.length}
                onClick={() => onChange([...entries, unused[0]])}
            >
                <Plus className="mr-1 size-4" />
                {t('orderedOptions.add')}
            </Button>
        </div>
    );
}
