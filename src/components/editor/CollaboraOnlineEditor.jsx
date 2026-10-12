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
    const spellcheckInitialized = useRef(false);
    const pendingSave = useRef(null);

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
        spellcheckInitialized.current = false;
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
            iframeRef.current?.contentWindow.postMessage(
                JSON.stringify(data),
                targetOrigin
            );
            return true;
        } catch (err) {
            console.error('postMessage failed:', err);
            return false;
        }
    }, [targetOrigin]);

    const save = useCallback(() => {
        if (pendingSave.current) return pendingSave.current.promise;
        if (!iframeLoaded || status !== 'success') return Promise.reject(new Error('文档编辑器尚未就绪。'));
        let resolve, reject;
        const promise = new Promise((done, fail) => { resolve = done; reject = fail; });
        const timer = setTimeout(() => {
            pendingSave.current = null;
            reject(new Error('等待文档保存超时，请确认保存后重试。'));
        }, 20000);
        pendingSave.current = { promise, resolve, reject, timer };
        if (!post({ MessageId: 'Action_Save', Values: { DontTerminateEdit: false, DontSaveIfUnmodified: false, Notify: true } })) {
            clearTimeout(timer);
            pendingSave.current = null;
            reject(new Error('无法请求文档保存。'));
        }
        return promise;
    }, [iframeLoaded, status, post]);

    useEffect(() => () => {
        if (pendingSave.current) {
            clearTimeout(pendingSave.current.timer);
            pendingSave.current.reject(new Error('文档编辑器已关闭。'));
            pendingSave.current = null;
        }
    }, [iframeUrl]);

    useImperativeHandle(ref, () => ({ post, save }), [post, save]);

    // 消息监听（只在需要时启用）
    useEffect(() => {
        if (!postmessageReady || !iframeLoaded || !iframeRef.current) return;

        const handleMessage = (event) => {
            if (event.origin !== targetOrigin || event.source !== iframeRef.current?.contentWindow) return;

            try {
                const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

                if (msg.MessageId === 'Action_Save_Resp' && pendingSave.current) {
                    const operation = pendingSave.current;
                    clearTimeout(operation.timer);
                    pendingSave.current = null;
                    if (msg.Values?.success === true) operation.resolve();
                    else operation.reject(new Error(msg.Values?.errorMsg || '文档保存失败。'));
                }

                if (msg.MessageId === 'App_LoadingStatus' &&
                    msg.Values?.Status === 'Document_Loaded') {
                    post({ MessageId: 'Host_PostmessageReady' });
                    if (!spellcheckInitialized.current) {
                        post({ MessageId: 'Send_UNO_Command', Values: {
                            Command: '.uno:SpellOnline', Args: { SpellOnline: { type: 'boolean', value: false } },
                        } });
                        spellcheckInitialized.current = true;
                    }
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
    }, [postmessageReady, iframeLoaded, targetOrigin, post, onMessageReceived]);

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
                allow="clipboard-read; clipboard-write"
            />
        </div>
    );
});

export default CollaboraOnlineEditor;
