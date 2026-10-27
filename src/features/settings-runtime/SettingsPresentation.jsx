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
export function SettingsIcon({ icon = 'settings', className = 'size-4', framed = true }) {
    const Icon = ICONS[icon] || Settings2;
    const content = typeof icon === 'string' && /^(?:cwm:\/\/|https?:\/\/|\/)/.test(icon)
        ? <img src={resolveResourceUrl(icon)} alt="" className={`${className} object-contain`} />
        : <Icon className={className} aria-hidden="true" />;
    return framed ? <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary ring-1 ring-inset ring-primary/5">{content}</span> : content;
}

/** Shared visual shell for local preferences and backend-authored settings. */
export function SettingsSection({ title, description, icon, actions, children, variant, className = '', bodyClassName = '' }) {
    if (variant === 'plain') return <section className={`space-y-3 ${className}`}>
        {(title || description || actions) && <div className="flex flex-wrap items-center justify-between gap-3">
            <div>{title && <h3 className="text-xs font-semibold tracking-wide text-muted-foreground">{title}</h3>}{description && <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>}</div>{actions}
        </div>}
        <div className={bodyClassName}>{children}</div>
    </section>;
    return <Card className={`h-fit min-w-0 gap-0 overflow-hidden rounded-2xl border-border/75 bg-card py-0 shadow-sm shadow-black/[0.02] ${className}`}>
        {(title || description || actions) && <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/15 px-4 py-3.5 sm:px-5">
            <div className="flex min-w-0 flex-1 items-start gap-3">
                {icon && <SettingsIcon icon={icon} />}
                <div className="min-w-0 py-0.5">
                    {title && <CardTitle className="text-sm leading-5 sm:text-[15px]">{title}</CardTitle>}
                    {description && <CardDescription className="mt-1 max-w-prose text-xs leading-[1.6]">{description}</CardDescription>}
                </div>
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </CardHeader>}
        <CardContent className={`min-w-0 px-0 ${bodyClassName}`}>{children}</CardContent>
    </Card>;
}
