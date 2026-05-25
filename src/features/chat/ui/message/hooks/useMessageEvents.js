import {useEffect} from 'react';
import {emitEvent, onEvent} from '@/context/useEventStore.jsx';

const useMessageEvents = (markId, setSwitchingMessageId) => {
    useEffect(() => {
        const unsubscribe = onEvent({
            type: 'widget',
            target: 'ChatPage',
            markId,
        }).then(({
                     payload,
                     reply
                 }) => {
            switch (payload.command) {
                case 'Set-SwitchingMessage':
                    setSwitchingMessageId(payload.value);

                    emitEvent({
                        type: 'widget',
                        target: 'ChatBox',
                        payload: {
                            command: 'Set-EditMessage',
                            isEdit: false
                        },
                        markId,
                        fromWebsocket: true,
                        notReplyToWebsocket: true
                    });

                    reply({success: true});
                    break;
                default:
                    break;
            }
        });

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            } else if (typeof unsubscribe?.cancel === 'function') {
                unsubscribe.cancel();
            }
        };
    }, [markId, setSwitchingMessageId]);
};

export default useMessageEvents;
