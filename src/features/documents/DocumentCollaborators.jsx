import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

function PersonAvatar({ person }) {
    return (
        <Avatar className="size-7 shrink-0 border-2 border-background">
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback className="text-xs" style={{ color: person.color, backgroundColor: `${person.color}18` }}>
                {(person.name || '?').slice(0, 1)}
            </AvatarFallback>
        </Avatar>
    );
}

export default function DocumentCollaborators({ participants, onLocate }) {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 shrink-0 gap-2 px-1.5"
                    aria-label={t('documents_online_count', { count: participants.length })}
                >
                    <span className="flex -space-x-1.5">
                        {participants.slice(0, 3).map((person) => (
                            <PersonAvatar key={person.participantId} person={person} />
                        ))}
                    </span>
                    <span className="hidden text-xs text-muted-foreground lg:inline">
                        {t('documents_online_count', { count: participants.length })}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 max-w-[calc(100vw-2rem)] p-0">
                <div className="border-b px-4 py-3 text-sm font-medium">{t('documentCollaborators.title')}</div>
                <div className="max-h-80 overflow-y-auto p-2">
                    {participants.length ? (
                        participants.map((person) => (
                            <button
                                type="button"
                                key={person.participantId}
                                className="flex w-full gap-3 rounded-md p-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                title={t('documentCollaborators.locate')}
                                onClick={() => {
                                    if (onLocate?.(person)) setOpen(false);
                                }}
                            >
                                <PersonAvatar person={person} />
                                <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span
                                            className="h-3.5 w-1 shrink-0 rounded-full"
                                            style={{ backgroundColor: person.color }}
                                            title={person.color}
                                            aria-label={t('documentCollaborators.cursorColor') + ': ' + person.color}
                                        />
                                        <span className="truncate" title={person.name}>
                                            {person.name}
                                        </span>
                                        {person.isSelf && (
                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {t('documentCollaborators.self')}
                                            </span>
                                        )}
                                        <span className="shrink-0 text-xs text-muted-foreground">
                                            {person.kind === 'ai'
                                                ? 'AI'
                                                : t('documentCollaborators.session', { number: person.sessionNumber })}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {t('documentCollaborators.joined', {
                                            time: person.joinedAt
                                                ? new Date(person.joinedAt).toLocaleString(i18n.language)
                                                : '—',
                                        })}
                                    </div>
                                    {person.kind !== 'ai' && (
                                        <div className="break-all text-xs text-muted-foreground">
                                            IP: {person.ip || '—'}
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="p-3 text-sm text-muted-foreground">
                            {t('documents_collaboration_is_not_connected')}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
