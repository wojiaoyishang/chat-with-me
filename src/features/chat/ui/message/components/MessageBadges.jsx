import {Bookmark, Check, Clock3, EyeOff, Info, LockKeyhole, Pin, ShieldCheck, Tag, TriangleAlert} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {normalizeMessageBadges} from '../utils/messageBadgesModel.js';

const ICONS = Object.freeze({
    'shield-check': ShieldCheck,
    info: Info,
    'alert-triangle': TriangleAlert,
    lock: LockKeyhole,
    pin: Pin,
    bookmark: Bookmark,
    check: Check,
    clock: Clock3,
    'eye-off': EyeOff,
    tag: Tag,
});
const TONES = Object.freeze({
    neutral: 'border-border bg-muted/40 text-muted-foreground',
    info: 'border-sky-200/80 bg-sky-50 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300',
    success: 'border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300',
    warning: 'border-amber-200/80 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300',
    danger: 'border-red-200/80 bg-red-50 text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300',
});

export default function MessageBadges({badges}) {
    const items = normalizeMessageBadges(badges);
    if (!items.length) return null;
    return (
        <span data-message-badges="true" className="flex min-w-0 max-w-full flex-wrap items-center gap-1">
            {items.map((badge) => {
                const icon = Object.hasOwn(ICONS, badge.icon) ? badge.icon : 'info';
                const tone = Object.hasOwn(TONES, badge.tone) ? badge.tone : 'neutral';
                const Icon = ICONS[icon];
                return (
                    <Badge key={badge.id} variant="outline" data-message-badge={badge.id} data-badge-icon={icon} data-badge-tone={tone}
                        className={`min-h-5 max-w-full cursor-default whitespace-normal px-2 py-0.5 ${TONES[tone]}`}>
                        <Icon size={12} className="shrink-0" aria-hidden="true"/>
                        <span className="min-w-0 whitespace-normal [overflow-wrap:anywhere]">{badge.label}</span>
                    </Badge>
                );
            })}
        </span>
    );
}
