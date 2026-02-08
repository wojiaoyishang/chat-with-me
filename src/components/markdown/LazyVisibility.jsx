import React, { useEffect, useRef, useState } from 'react';

/**
 * 只有当组件进入视口时才渲染 children
 */
const LazyVisibility = ({ children, rootMargin = '100px', placeholder = null }) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin]);

    return (
        <div ref={containerRef} style={{ minHeight: '1px' }}>
            {isVisible ? children : placeholder}
        </div>
    );
};

export default LazyVisibility;