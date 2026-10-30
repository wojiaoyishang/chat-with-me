import {
    Check, CircleHelp, Copy, Database, Download, ExternalLink, Gauge, KeyRound,
    LogOut, Pause, Pencil, Play, Plug, Plus, QrCode, RefreshCw, Save, Server,
    ShieldCheck, ShieldX, Trash2, Unplug, Upload, UserRound, Users,
} from 'lucide-react';

const ACTION_ICONS = {
    'shield-check': ShieldCheck, 'circle-help': CircleHelp, 'shield-x': ShieldX,
    edit: Pencil, trash: Trash2, refresh: RefreshCw, plug: Plug, unplug: Unplug,
    play: Play, copy: Copy, download: Download, upload: Upload, save: Save,
    'log-out': LogOut, user: UserRound, key: KeyRound, check: Check,
    'external-link': ExternalLink, server: Server, database: Database,
    gauge: Gauge, plus: Plus,
    pause: Pause, 'qr-code': QrCode, users: Users,
};

/** Progress belongs to the floating notice, leaving this label's size stable. */
export function SettingsActionLabel({ action = {}, label }) {
    const Icon = Object.hasOwn(ACTION_ICONS, action.icon) ? ACTION_ICONS[action.icon] : null;
    return <>
        {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" data-slot="action-icon" />}
        {label ?? action.label ?? action.text ?? '执行'}
    </>;
}
