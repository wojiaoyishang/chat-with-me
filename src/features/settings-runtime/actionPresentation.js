const TONES = {
    success: 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300',
    warning: 'text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/40 dark:hover:text-amber-300',
    danger: 'text-destructive hover:bg-destructive/10 hover:text-destructive',
    info: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-300',
};

/** Presentation is explicit metadata, independent of permission values or IDs. */
export function getActionPresentation(action = {}, defaultVariant = 'outline') {
    const tone = Object.hasOwn(TONES, action.tone) ? action.tone
        : action.confirm?.danger ? 'danger' : null;
    return {
        variant: action.variant || (tone ? 'ghost' : defaultVariant),
        className: tone ? TONES[tone] : '',
    };
}
