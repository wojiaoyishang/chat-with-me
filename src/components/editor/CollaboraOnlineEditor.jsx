import React, {useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import {useTranslation} from "react-i18next";
import {UnifiedErrorScreen, UnifiedLoadingScreen} from "@/lib/tools.jsx";

// --- Main DocEditor Component ---
const CollaboraOnlineEditor = forwardRef(({config = {}}, ref) => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const {t} = useTranslation();

    const fetchDocumentUrl = async () => {
        if (!config.fileId) {
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            const data = await apiClient.get(`${apiEndpoint.REDIRECT_VIEW_ENDPOINT}/${config.fileId}`);
            if (data?.url) {
                setIframeUrl(data.url);
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Failed to load document:', err);
            setStatus('error');
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

    // Expose reload method via ref
    useImperativeHandle(ref, () => ({
        reload: fetchDocumentUrl
    }));

    // Fetch on mount or when fileId changes
    useEffect(() => {
        fetchDocumentUrl();
    }, [config.fileId]);

    const handleRetry = () => {
        fetchDocumentUrl();
    };

    return (
        <div className="relative w-full h-full">
            {/* Render iframe when ready */}
            {status === 'success' && (
                <iframe
                    src={iframeUrl}
                    title="Document Editor"
                    width="100%"
                    height="100%"
                    style={{border: 'none', minHeight: '600px'}}
                />
            )}

            {/* Overlay: Loading or Error */}
            {status === 'loading' && <LoadingScreen/>}
            {status === 'error' && <LoadingFailedScreen onRetry={handleRetry}/>}
        </div>
    );
});

export default CollaboraOnlineEditor;