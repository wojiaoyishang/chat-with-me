const LEGACY_LABELS = {
    'study-session': 'documents_study_session',
    'study-section': 'documents_study_section',
    'study-card': 'documents_study_card',
};

export function localizeCardDirective(directive, language, translate) {
    const locale = String(language || 'zh').split('-')[0];
    const translated = directive.i18n?.[locale] || {};
    const legacyLabel = locale === 'en' ? LEGACY_LABELS[directive.name] : null;
    return {
        ...directive,
        label: translated.label || (legacyLabel ? translate(legacyLabel) : directive.label),
        description: translated.description || (locale === 'en' && directive.name === 'study-session'
            ? translate('documents_study_session_hint') : directive.description),
        insert: translated.insert ? { ...directive.insert, ...translated.insert } : directive.insert,
    };
}
