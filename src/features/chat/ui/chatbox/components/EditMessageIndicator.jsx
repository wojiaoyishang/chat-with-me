import React, {memo, useCallback} from 'react';
import {Transition} from '@headlessui/react';
import {GitBranch, PenLine, Trash2, X} from 'lucide-react';

const EditMessageIndicator = memo((
    {
        isEditMessage,
        isForkMode,
        onCancel,
        onClear,
        t
    }) => {
    const handleCancel = useCallback(() => {
        onCancel?.();
    }, [onCancel]);

    const handleClear = useCallback(() => {
        onClear?.();
    }, [onClear]);

    if (!isEditMessage) return null;

    return (
        <Transition
            show={isEditMessage}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className="bg-gray-100 text-gray-800 text-sm font-medium py-3 px-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center">
                    {
                        (isForkMode) ? (
                            <>
                                <GitBranch className="w-4 h-4 mr-2"/>
                                <span>{t('forking_message')}</span>
                            </>
                        ) : (
                            <>
                                <PenLine className="w-4 h-4 mr-2"/>
                                <span>{t('editing_message')}</span>
                            </>)
                    }
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-800 focus:rounded-full p-0.5 cursor-pointer"
                        aria-label={t('cancel_editing')}
                    >
                        <X className="w-4 h-4"/>
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-gray-600 hover:text-gray-800 focus:rounded-full p-0.5 cursor-pointer"
                        aria-label={t('cancel_editing')}
                    >
                        <Trash2 className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </Transition>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isEditMessage === nextProps.isEditMessage &&
        prevProps.isForkMode === nextProps.isForkMode &&
        prevProps.t === nextProps.t &&
        prevProps.onCancel === nextProps.onCancel &&
        prevProps.onClear === nextProps.onClear
    );
});

EditMessageIndicator.displayName = 'EditMessageIndicator';

export default EditMessageIndicator;
