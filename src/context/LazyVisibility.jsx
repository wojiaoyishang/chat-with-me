import React, {useEffect, useRef, useState} from 'react';

const LazyVisibility = ({
                            children,
                            rootMargin = '100px',
                            placeholder = null,
                            className = '',
                            align = 'left',
                            hideOnExit = true,
                            fade = true,              // 新增：是否启用淡入 + 淡出动画（默认开启）
                        }) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting;

                if (inView) {
                    setHasEntered(true);
                    setIsVisible(true);
                } else if (hideOnExit && hasEntered) {
                    setIsVisible(false);
                }
            },
            {rootMargin, threshold: 0.01}
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [rootMargin, hideOnExit, hasEntered]);

    return (
        <div ref={containerRef} className={`min-h-[1px] ${className}`}>
            <div
                className={`
                  relative
                  ${fade ? 'transition-opacity duration-500 ease-in-out' : 'transition-none'}
                  ${align === 'right' ? 'flex justify-end' : ''}
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
            >
                {hasEntered ? children : placeholder}
            </div>
        </div>
    );
};

export default LazyVisibility;