import { SettingsFieldLayoutContext } from './formLayout.js';

/** A visual form layout never creates a new values object or field path. */
export default function SettingsFormLayout({ layout = 'stacked', columns = 1, children }) {
    return <SettingsFieldLayoutContext.Provider value={layout === 'compact' ? 'compact' : 'stacked'}>
        <div className="@container/settings-form min-w-0" data-settings-form-layout={layout}>
            <div className={`grid min-w-0 grid-cols-1 gap-x-6 gap-y-2 ${Number(columns) === 2 ? '@2xl/settings-form:grid-cols-2' : ''}`}>{children}</div>
        </div>
    </SettingsFieldLayoutContext.Provider>;
}
