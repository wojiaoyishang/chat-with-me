import {createContext, useContext} from 'react';

export const MessageIgnoringContext = createContext(false);

export function useIgnoringDisabled() {
    return useContext(MessageIgnoringContext);
}
