import React, {createContext, useContext, useMemo} from 'react';

const WidgetPresentationContext = createContext({
    chatBoxHostElement: null,
});

export const WidgetPresentationProvider = ({
    chatBoxHostElement = null,
    children,
}) => {
    const value = useMemo(() => ({
        chatBoxHostElement,
    }), [chatBoxHostElement]);

    return (
        <WidgetPresentationContext.Provider value={value}>
            {children}
        </WidgetPresentationContext.Provider>
    );
};

export const useWidgetPresentation = () => useContext(WidgetPresentationContext);
