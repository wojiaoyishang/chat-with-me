import {createContext, useContext} from 'react';

export const ConversationFreezeContext = createContext(null);
const available = {blocked: false, frozen: false, canMutate: () => true};

// Mutation controls share the containing conversation's lease, including portals.
// A separate page must own useConversationFreeze and provide its own boundary.
export function useConversationMutationGuard(conversationId) {
    const freeze = useContext(ConversationFreezeContext);
    return freeze && freeze.conversationId === conversationId ? freeze : available;
}
