import React from 'react';

const ResizeHandles = ({onResizeMouseDown, onResizeTouchStart}) => {
    const bind = (direction) => ({
        onMouseDown: (event) => onResizeMouseDown(event, direction),
        onTouchStart: (event) => onResizeTouchStart(event, direction),
        style: {touchAction: 'none'},
    });

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-2 cursor-n-resize z-[10000]" {...bind('n')}/>
            <div className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-[10000]" {...bind('s')}/>
            <div className="absolute top-0 left-0 w-2 h-full cursor-w-resize z-[10000]" {...bind('w')}/>
            <div className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-[10000]" {...bind('e')}/>

            <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-[10001]" {...bind('nw')}/>
            <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-[10001]" {...bind('ne')}/>
            <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-[10001]" {...bind('sw')}/>
            <div
                className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-[10001] flex items-end justify-end p-1"
                {...bind('se')}
            >
                <svg
                    className="w-3 h-3 text-gray-400 opacity-60 hover:opacity-100 transition-opacity"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <path d="M21 15l-6 6 M21 9l-12 12 M21 3l-18 18"/>
                </svg>
            </div>
        </>
    );
};

export default ResizeHandles;
