import {
    memo,
    useCallback,
    useSyncExternalStore,
} from 'react';
import { ChevronDown } from 'lucide-react';

import {
    getExpandedValue,
    subscribeExpanded,
    toggleExpandedValue,
} from '../expandedStore.js';

const StableStepsButton = memo(({
    expandedKey,
}) => {
    const subscribe = useCallback((listener) => {
        return subscribeExpanded(expandedKey, listener);
    }, [expandedKey]);

    const getSnapshot = useCallback(() => {
        return getExpandedValue(expandedKey);
    }, [expandedKey]);

    const isExpanded = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getSnapshot,
    );

    const handlePointerDownCapture = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleExpandedValue(expandedKey, {isUserAction: true});
    }, [expandedKey]);

    const handleClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        toggleExpandedValue(expandedKey, {isUserAction: true});
    }, [expandedKey]);

    return (
        <button
            type="button"
            className="cursor-pointer flex items-center justify-center rounded hover:opacity-80 text-gray-600 border border-transparent hover:border-gray-300 whitespace-nowrap flex-shrink-0 ml-2 pointer-events-auto select-none touch-manipulation"
            onPointerDownCapture={handlePointerDownCapture}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={isExpanded ? 'Collapse steps' : 'Expand steps'}
            style={{
                position: 'relative',
                zIndex: 10,
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                width: '28px',
                minWidth: '28px',
                height: '22px',
                minHeight: '22px',
            }}
        >
            <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
            />
        </button>
    );
}, (prev, next) => {
    return prev.expandedKey === next.expandedKey;
});

StableStepsButton.displayName = 'StableStepsButton';

export default StableStepsButton;
