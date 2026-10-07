import { memo } from 'react';
import { Transition } from '@headlessui/react';
import { ArrowDown } from 'lucide-react';

const ScrollToBottomButton = memo(({ isVisible, onClick }) => (
    <Transition
        show={isVisible}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95 translate-y-2"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="absolute bottom-4 right-4 z-30"
    >
        <button
            onClick={onClick}
            className="cursor-pointer w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            aria-label="Scroll to bottom"
        >
            <ArrowDown className="text-gray-600 w-5 h-5" />
        </button>
    </Transition>
));

ScrollToBottomButton.displayName = 'ScrollToBottomButton';
export default ScrollToBottomButton;
