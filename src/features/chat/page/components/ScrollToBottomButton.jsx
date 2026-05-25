import React, {memo, useMemo} from 'react';
import {Transition} from '@headlessui/react';
import {ArrowDown} from 'lucide-react';

const ScrollToBottomButton = memo(({
                                       isVisible,
                                       chatBoxHeight,
                                       onClick
                                   }) => {
    const buttonStyle = useMemo(() => {
        return {
            bottom: `${(chatBoxHeight || 60) + 60}px`,
            right: '16px',
        };
    }, [chatBoxHeight]);

    return (
        <>
            <Transition
                show={isVisible}
                enter="transition-all duration-200 ease-out"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="xl:hidden"
            >
                <button
                    onClick={onClick}
                    className="cursor-pointer fixed z-40 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                    style={buttonStyle}
                    aria-label="Scroll to bottom"
                >
                    <ArrowDown className="text-gray-600 w-5 h-5"/>
                </button>
            </Transition>
            <Transition
                show={isVisible}
                enter="transition-all duration-200 ease-out"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="hidden xl:block"
            >
                <button
                    onClick={onClick}
                    className="cursor-pointer fixed z-40 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                    style={{
                        bottom: '50px',
                        right: '20px',
                    }}
                    aria-label="Scroll to bottom"
                >
                    <ArrowDown className="text-gray-600 w-5 h-5 mx-auto"/>
                </button>
            </Transition>
        </>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isVisible === nextProps.isVisible &&
        prevProps.chatBoxHeight === nextProps.chatBoxHeight &&
        prevProps.onClick === nextProps.onClick
    );
});

ScrollToBottomButton.displayName = 'ScrollToBottomButton';

export default ScrollToBottomButton;
