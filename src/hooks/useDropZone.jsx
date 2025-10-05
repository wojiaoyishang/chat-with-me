import { useState, useCallback, useRef } from 'react';
import { hasFolderInDragItems } from '@/lib/tools';

export function useDropZone(onDrop, onFolderDetected) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const dragCounter = useRef(0);

    const preventDefault = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragEnter = useCallback(
        (e) => {
            preventDefault(e);
            dragCounter.current += 1;

            if (hasFolderInDragItems(e.dataTransfer.items)) {
                setIsDraggingOver(false);
                onFolderDetected?.();
                return;
            }

            const hasFiles = Array.from(e.dataTransfer.items).some(
                (item) => item.kind === 'file'
            );

            setIsDraggingOver(hasFiles);
        },
        [preventDefault, onFolderDetected]
    );

    const handleDragOver = useCallback((e) => {
        preventDefault(e);
    }, [preventDefault]);

    const handleDragLeave = useCallback((e) => {
        preventDefault(e);
        dragCounter.current -= 1;
        if (dragCounter.current === 0) {
            setIsDraggingOver(false);
        }
    }, [preventDefault]);

    const handleDrop = useCallback(
        (e) => {
            preventDefault(e);
            dragCounter.current = 0;
            setIsDraggingOver(false);

            if (hasFolderInDragItems(e.dataTransfer.items)) {
                onFolderDetected?.();
                return;
            }

            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                onDrop(files);
            }
        },
        [preventDefault, onDrop, onFolderDetected]
    );

    return {
        isDraggingOver,
        dragEvents: {
            onDragEnter: handleDragEnter,
            onDragOver: handleDragOver,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
        },
    };
}