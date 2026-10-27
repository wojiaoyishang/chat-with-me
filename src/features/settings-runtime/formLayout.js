import { createContext, useContext } from 'react';

export const SettingsFieldLayoutContext = createContext('rows');

export function useSettingsFieldLayout() {
    return useContext(SettingsFieldLayoutContext);
}
