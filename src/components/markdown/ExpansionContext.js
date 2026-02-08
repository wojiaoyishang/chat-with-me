import React, { createContext, useContext } from 'react';

const ExpansionContext = createContext({
    expandedMap: new Map(),
    onToggleExpand: () => {},
});

export const useExpansion = () => useContext(ExpansionContext);
export default ExpansionContext;