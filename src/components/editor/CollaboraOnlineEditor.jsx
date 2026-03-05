import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useCallback,
    useMemo
} from 'react';
import { useTranslation } from "react-i18next";
import { UnifiedErrorScreen, UnifiedLoadingScreen } from "@/lib/tools.jsx";

// --- Main DocEditor Component ---
const CollaboraOnlineEditor = forwardRef(({
                                              iframeUrl,
                                              postmessageReady = true,
                                              onMessageReceived
                                          }, ref) => {
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const { t } = useTranslation();
    const iframeRef = useRef(null);

    // 使用 useMemo 让 targetOrigin 稳定，避免不必要的重新创建
    const targetOrigin = useMemo(() => {
        try {
            return new URL(iframeUrl).origin;
        } catch {
            console.warn('Invalid iframeUrl:', iframeUrl);
            return '*'; // 兜底（生产环境建议严格校验）
        }
    }, [iframeUrl]);

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
        const iframe = document.getElementById('collabora-editor-iframe');
        if (iframe) iframe.src = iframeUrl;
    };

    // 统一的 postMessage 方法（已添加安全检查）
    const post = useCallback((data) => {
        if (!iframeRef.current?.contentWindow) {
            console.warn('Collabora iframe not ready yet for postMessage');
            return false;
        }
        try {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify(data),
                targetOrigin
            );
            return true;
        } catch (err) {
            console.error('postMessage failed:', err);
            return false;
        }
    }, [targetOrigin]);

    useImperativeHandle(ref, () => ({
        post,
    }), [post]);

    // 消息监听（只在需要时启用）
    useEffect(() => {
        if (!postmessageReady || !iframeLoaded || !iframeRef.current) return;

        const handleMessage = (event) => {
            if (event.origin !== targetOrigin) return;

            try {
                const msg = JSON.parse(event.data);

                if (msg.MessageId === 'App_LoadingStatus' &&
                    msg.Values?.Status === 'Document_Loaded') {
                    post({ MessageId: 'Host_PostmessageReady' });
                }

                if (onMessageReceived) onMessageReceived(msg);
            } catch (e) {
                console.error('Invalid message from Collabora:', e);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [postmessageReady, iframeLoaded, targetOrigin, postMessage, onMessageReceived]);

    const LoadingScreen = () => (
        <UnifiedLoadingScreen
            text={t("loading_editor")}
            zIndex="z-20"
        />
    );

    const LoadingFailedScreen = ({ onRetry }) => (
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

            {/* iframe */}
            <iframe
                ref={iframeRef}
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