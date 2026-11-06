import {createContext} from 'react';

// UI cost feedback only; no message/run state and no transport dependency.
export const MarkdownRenderBudgetContext = createContext(null);
