import {useCallback, useEffect, useRef, useState} from 'react';

const useMessageAnimation = (messagesOrder) => {
    const [enteringMessages, setEnteringMessages] = useState(new Set());
    const [leavingMessages, setLeavingMessages] = useState(new Set());
    const [fadeMessages, setFadeMessages] = useState(new Set());
    const prevMessagesOrderRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const prevOrder = prevMessagesOrderRef.current;
        const newOrder = messagesOrder;

        const normalNewMessages = newOrder.filter(msgId =>
            !prevOrder.includes(msgId) &&
            msgId !== '<PREV_MORE>' &&
            !fadeMessages.has(msgId)
        );

        normalNewMessages.forEach(msgId => {
            setEnteringMessages(prev => new Set([...prev, msgId]));
        });

        const removedMessages = prevOrder.filter(msgId => !newOrder.includes(msgId));
        removedMessages.forEach(msgId => {
            setLeavingMessages(prev => new Set([...prev, msgId]));
        });

        if (normalNewMessages.length > 0 || removedMessages.length > 0 || fadeMessages.size > 0) {
            animationFrameRef.current = requestAnimationFrame(() => {
                setTimeout(() => {
                    setEnteringMessages(new Set());
                    setLeavingMessages(new Set());
                    setFadeMessages(new Set());
                }, 300);
            });
        }

        prevMessagesOrderRef.current = newOrder;

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [messagesOrder, fadeMessages]);

    const getMessageAnimationClass = useCallback((msgId, isFading) => {
        if (leavingMessages.has(msgId)) {
            return 'opacity-0 -translate-y-2 pointer-events-none';
        }
        if (isFading) {
            return 'opacity-100 animate-fade-in';
        }
        if (enteringMessages.has(msgId)) {
            return 'opacity-100 translate-y-0 animate-fade-in-up';
        }
        return 'opacity-100';
    }, [leavingMessages, enteringMessages]);

    return {
        enteringMessages,
        leavingMessages,
        fadeMessages,
        setFadeMessages,
        getMessageAnimationClass
    };
};

export default useMessageAnimation;
