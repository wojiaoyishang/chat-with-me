import React, {useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import {useTranslation} from "react-i18next";
import {UnifiedErrorScreen, UnifiedLoadingScreen} from "@/lib/tools.jsx";

// --- Main DocEditor Component ---
const CollaboraOnlineEditor = forwardRef(({iframeUrliframeUrl}, ref) => {
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const {t} = useTranslation();

    // 处理 iframe 加载成功
    const handleIframeLoad = () => {
        setIframeLoaded(true);
        setStatus('success');
    };

    // 处理 iframe 加载错误
    const handleIframeError = () => {
        setStatus('error');
    };

    // 重试加载
    const handleRetry = () => {
        setStatus('loading');
        setIframeLoaded(false);
        // 强制重新加载 iframe
        const iframe = document.getElementById('collabora-editor-iframe');
        if (iframe) {
            iframe.src = iframeUrl;
        }
    };

    const LoadingScreen = () => (
        <UnifiedLoadingScreen
            text={t("loading_editor")}
            zIndex="z-20"
        />
    );

    const LoadingFailedScreen = ({onRetry}) => (
        <UnifiedErrorScreen
            title={t("load_error")}
            subtitle={t("retry_after_network")}
            retryText={t("retry")}
            onRetry={onRetry}
            zIndex="z-51"
        />
    );

    return (
        <div className="relative w-full h-full">
            {/* 加载中状态 */}
            {status === 'loading' && !iframeLoaded && <LoadingScreen />}

            {/* 加载失败状态 */}
            {status === 'error' && <LoadingFailedScreen onRetry={handleRetry} />}

            {/* 始终渲染 iframe，但只在加载完成后通过 CSS 显示 */}
            <iframe
                id="collabora-editor-iframe"
                src={iframeUrl}
                title="Document Editor"
                width="100%"
                height="100%"
                style={{
                    border: 'none',
                    minHeight: '600px',
                    opacity: iframeLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
            />
        </div>
    );
});

export default CollaboraOnlineEditor;