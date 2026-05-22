import {useCallback, useRef, useState} from 'react';
import {toast} from 'sonner';
import {createFilePicker, fileUpload, processSelectedFiles} from '@/lib/tools.jsx';
import {emitEvent} from '@/context/useEventStore.jsx';

const useFileUpload = ({chatMarkId, t}) => {
    const isProcessingRef = useRef(false);
    const uploadIntervals = useRef(new Map());
    const [uploadFiles, setUploadFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);

    const handleFolderDetected = useCallback(() => {
        toast.error(t('folder_upload_not_supported'));
    }, [t]);

    const handleSelectedFiles = useCallback((files, items = []) => {
        // 处理拖拽/粘贴时的纯文本插入（items 可能存在）
        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.kind === 'string' && item.type === 'text/plain') {
                    item.getAsString(function (text) {
                        emitEvent({
                            type: 'widget',
                            target: 'ChatBox',
                            payload: {command: 'Get-MessageContent'},
                            markId: chatMarkId,
                            fromWebsocket: true,
                            notReplyToWebsocket: true
                        }).then(payload => {
                            emitEvent({
                                type: 'widget',
                                target: 'ChatBox',
                                payload: {
                                    command: 'Set-MessageContent',
                                    value: payload.value + text
                                },
                                markId: chatMarkId,
                                fromWebsocket: true
                            });
                        });
                    });
                }
            }
        }

        if (!(files && files.length > 0)) {
            return;
        }

        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        const newUploadFiles = processSelectedFiles(files);
        if (newUploadFiles.length === 0) {
            isProcessingRef.current = false;
            return;
        }

        setUploadFiles(prev => [...prev, ...newUploadFiles]);

        newUploadFiles.forEach(uploadFile => {
            const handleProgressUpdate = (uploadId, progress) => {
                setUploadFiles(prev => {
                    const idx = prev.findIndex(f => f.id === uploadId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    updated[idx].progress = progress;
                    return updated;
                });
            };

            const handleComplete = (uploadId, attachment) => {
                setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
                setAttachments(prev => [...prev, attachment]);
            };

            const cleanup = fileUpload(
                uploadFile,
                handleProgressUpdate,
                handleComplete,
                (error) => {
                    toast.error(t('file_upload.error', {message: error?.message || 'Upload failed'}));
                    setUploadFiles(prev =>
                        prev.map(f => f.id === uploadFile.id ? {...f, error: true, progress: 0} : f)
                    );
                }
            );

            uploadIntervals.current.set(uploadFile.id, cleanup);
        });

        setTimeout(() => {
            isProcessingRef.current = false;
        }, 500);
    }, [chatMarkId, t]);

    const onAttachmentRemove = useCallback((attachment) => {
        setAttachments(prev => prev.filter(att => att.serverId !== attachment.serverId));
    }, []);

    const handleImagePaste = useCallback((file) => {
        const fileList = {
            0: file,
            length: 1,
            item: (index) => (index === 0 ? file : null),
            [Symbol.iterator]: function* () {
                yield file;
            }
        };
        handleSelectedFiles(fileList, fileList);
    }, [handleSelectedFiles]);

    const handleRetryUpload = useCallback((uploadId) => {
        setUploadFiles(prev => {
            const fileToRetry = prev.find(f => f.id === uploadId);
            if (!fileToRetry || !fileToRetry.file) return prev;

            const updatedFile = {
                ...fileToRetry,
                progress: 0,
                error: null
            };

            const handleProgressUpdate = (id, progress) => {
                setUploadFiles(p => p.map(f => f.id === id ? {...f, progress} : f));
            };
            const handleComplete = (id, attachment) => {
                setUploadFiles(p => p.filter(f => f.id !== id));
                setAttachments(p => [...p, attachment]);
            };
            const handleError = (error) => {
                toast.error(t('file_upload.error', {message: error?.message || t('unknown_error')}));
                setUploadFiles(p => p.map(f => f.id === uploadId ? {...f, error: true, progress: 0} : f));
            };

            const cleanup = fileUpload(
                updatedFile,
                handleProgressUpdate,
                handleComplete,
                handleError
            );
            uploadIntervals.current.set(uploadId, cleanup);
            return prev.map(f => f.id === uploadId ? updatedFile : f);
        });
    }, [t]);

    const handleCancelUpload = useCallback((uploadId) => {
        if (uploadIntervals.current.has(uploadId)) {
            uploadIntervals.current.get(uploadId)();
            uploadIntervals.current.delete(uploadId);
        }
        setUploadFiles(prev => prev.filter(f => f.id !== uploadId));
    }, []);

    const handleFilePicker = useCallback(() => {
        return createFilePicker('*', handleSelectedFiles)();
    }, [handleSelectedFiles]);

    const handlePicPicker = useCallback(() => {
        return createFilePicker('image/*', handleSelectedFiles)();
    }, [handleSelectedFiles]);

    return {
        uploadFiles,
        attachments,
        setAttachments,
        handleFolderDetected,
        onAttachmentRemove,
        handleImagePaste,
        handleRetryUpload,
        handleCancelUpload,
        handleFilePicker,
        handlePicPicker,
        handleSelectedFiles,
    };
};

export default useFileUpload;
