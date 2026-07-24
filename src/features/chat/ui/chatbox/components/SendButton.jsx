import React, {memo, useMemo} from 'react';

const SendButton = memo(({status, messageContent, attachmentsMeta, onClick, taskModeActive = false, taskInterruptPending = false, t}) => {
    const sendButtonStyle = useMemo(() => {
        const isEmpty = !messageContent.trim() && attachmentsMeta.length === 0 && status === 'normal';
        const canSendTaskInterruption = status === 'generating' && taskModeActive && Boolean(messageContent.trim());
        const baseIcon = (
            <svg
                t="1758800079268"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6097"
                width="24"
                height="24"
            >
                <path
                    d="M512 85.333333a42.666667 42.666667 0 0 1 38.144 23.594667l384 768a42.666667 42.666667 0 0 1-47.36 60.714667L512 854.357333l-374.741333 83.285334a42.666667 42.666667 0 0 1-47.402667-60.714667l384-768A42.666667 42.666667 0 0 1 512 85.333333z m42.666667 691.114667l263.082666 58.453333L554.666667 308.736v467.712zM469.333333 308.736L206.250667 834.901333 469.333333 776.448V308.736z"
                    fill={isEmpty ? '#9ca3af' : '#ffffff'}
                    p-id="6098"
                ></path>
            </svg>
        );

        if (taskInterruptPending) {
            return {
                state: 'loading',
                className: 'text-white bg-blue-600 cursor-wait',
                icon: (
                    <div className="relative w-6 h-6">
                        <div className="absolute inset-[-9px] border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded"></div>
                        </div>
                    </div>
                ),
                disabled: true,
            };
        }

        if (isEmpty) {
            return {
                state: 'disabled',
                className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                icon: baseIcon,
                disabled: true,
            };
        }

        switch (status) {
            case 'disabled':
                return {
                    state: 'disabled',
                    className: 'text-gray-400 bg-gray-200 cursor-not-allowed',
                    icon: baseIcon,
                    disabled: true,
                };
            case 'loading':
                return {
                    state: 'loading',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer',
                    icon: (
                        <div className="relative w-6 h-6">
                            <div
                                className="absolute inset-[-9px] border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded"></div>
                            </div>
                        </div>
                    ),
                    disabled: false,
                };
            case 'generating':
                return {
                    state: canSendTaskInterruption ? 'task-interrupt' : 'generating',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer',
                    icon: canSendTaskInterruption ? baseIcon : (
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded"></div>
                            </div>
                        </div>
                    ),
                    disabled: false,
                };
            default:
                return {
                    state: 'normal',
                    className: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer',
                    icon: baseIcon,
                    disabled: false,
                };
        }
    }, [status, messageContent, attachmentsMeta, taskModeActive, taskInterruptPending]);

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={sendButtonStyle.disabled}
            aria-label={status === 'generating' && taskModeActive && messageContent.trim() ? t('task_mode_interrupt_send', '发送任务补充') : t('send_message')}
            className={`p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${sendButtonStyle.className}`}
        >
            {sendButtonStyle.icon}
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.status === nextProps.status &&
        prevProps.messageContent === nextProps.messageContent &&
        prevProps.attachmentsMeta === nextProps.attachmentsMeta &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.taskModeActive === nextProps.taskModeActive &&
        prevProps.taskInterruptPending === nextProps.taskInterruptPending
    );
});

SendButton.displayName = 'SendButton';

export default SendButton;
