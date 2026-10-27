import {
    Bell, Cpu, Database, FolderOpen, KeyRound, Palette, Plug, Server,
    Settings2, ShieldCheck, Sparkles, Terminal, UserRound,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { resolveResourceUrl } from '@/lib/virtualUrl.js';

const ICONS = {
    settings: Settings2, palette: Palette, server: Server, bell: Bell,
    user: UserRound, shield: ShieldCheck, database: Database, plug: Plug,
    sparkles: Sparkles, folder: FolderOpen, cpu: Cpu, terminal: Terminal, key: KeyRound,
};

/** Icon names are presentation vocabulary; pages never select a business renderer. */
export function SettingsIcon({ icon = 'settings', className = 'size-4', framed = false }) {
    const Icon = ICONS[icon] || Settings2;
    const content = typeof icon === 'string' && /^(?:cwm:\/\/|https?:\/\/|\/)/.test(icon)
        ? <img src={resolveResourceUrl(icon)} alt="" className={`${className} object-contain`} />
        : <Icon className={className} aria-hidden="true" />;
    return framed ? <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">{content}</span> : content;
}

/** Groups provide structure only. A card surface is an explicit author choice. */
export function SettingsSection({ title, description, icon, actions, children, variant, className = '', bodyClassName = '' }) {
    if (variant !== 'card') return <section className={`min-w-0 ${variant === 'divided' ? 'space-y-1' : 'space-y-3'} ${className}`}>
        {(title || description || actions) && <div className={`flex flex-wrap items-center justify-between gap-3 ${variant === 'divided' ? 'border-b border-border pb-3' : ''}`}>
            <div className="min-w-0 flex-1">{title && <h3 className="text-sm font-semibold">{title}</h3>}{description && <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>}</div>{actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>}
        <div className={bodyClassName}>{children}</div>
    </section>;
    return <Card className={`h-fit min-w-0 gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-none ${className}`}>
        {(title || description || actions) && <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
                {icon && <SettingsIcon icon={icon} className="mt-0.5 size-4 text-muted-foreground" />}
                <div className="min-w-0">
                    {title && <CardTitle className="text-sm leading-5">{title}</CardTitle>}
                    {description && <CardDescription className="mt-1 max-w-prose text-xs leading-[1.6]">{description}</CardDescription>}
                </div>
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </CardHeader>}
        <CardContent className={`min-w-0 px-0 ${bodyClassName}`}>{children}</CardContent>
    </Card>;
}
