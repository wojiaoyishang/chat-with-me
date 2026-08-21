import {useEffect} from 'react';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';

const useMessageEvents = (conversationId, setSwitchingMessageId) => {
    useEffect(() => {
        const unsubscribe = onEvent({
            event: 'message.switching.changed',
            conversationId,
        }).then(({payload, reply}) => {
            setSwitchingMessageId(payload.value);

            emitEvent({
                event: 'composer.edit.set',
                payload: {isEdit: false},
                conversationId,
                localOnly: true,
            });

            reply({success: true});
        });

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            } else if (typeof unsubscribe?.cancel === 'function') {
                unsubscribe.cancel();
            }
        };
    }, [conversationId, setSwitchingMessageId]);
};

export default useMessageEvents;
