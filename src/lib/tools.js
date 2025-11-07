import {useParams} from 'react-router-dom';
import {apiEndpoint} from '@/config.js';
import apiClient from '@/lib/apiClient';

export function getMarkId() {
    const {markId} = useParams();
    return markId;
}

export function processSelectedFiles(files) {
    if (!files) {
        return [];
    }

    if (typeof files[Symbol.iterator] !== 'function' && !Array.isArray(files)) {
        return [];
    }

    const fileArray = Array.from(files).filter(file =>
        file && file.name && file.size > 0
    );

    if (fileArray.length === 0) {
        return [];
    }

    return fileArray.map(file => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        progress: 0,
        serverId: null,
        file: file
    }));
}

/**
 * 真实文件上传函数（调用 FastAPI /upload 接口）
 * @param {Object} uploadFile - 上传文件对象，包含 { id, file, name }
 * @param {Function} onProgressUpdate - 进度更新回调 (uploadId, progress: 0-100)
 * @param {Function} onComplete - 完成回调 (uploadId, attachment)
 * @param {Function} onError - 错误回调 (error)
 * @returns {Function} 取消上传的清理函数
 */
export function fileUpload(uploadFile, onProgressUpdate, onComplete, onError) {
    if (!uploadFile || !uploadFile.file || !onProgressUpdate || !onComplete) {
        console.error('Missing required parameters for fileUpload');
        onError?.(new Error('Invalid parameters'));
        return () => {};
    }

    const formData = new FormData();
    formData.append('file', uploadFile.file);

    // 使用 AbortController 替代 CancelToken
    const abortController = new AbortController();

    apiClient
        .post(apiEndpoint.UPLOAD_ENDPOINT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            signal: abortController.signal, // 传入 signal 用于取消请求
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total > 0) {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    onProgressUpdate(uploadFile.id, progress);
                }
            },
        })
        .then((response) => {
            const data = response; // 假设 apiClient 拦截器已处理并返回业务数据

            const attachment = {
                preview: data.preview,
                previewType: data.previewType,
                name: uploadFile.name,
                size: uploadFile.file.size,
                serverId: data.serverId,
                downloadUrl: data.downloadUrl,
            };

            onComplete(uploadFile.id, attachment);
        })
        .catch((error) => {
            if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
                // 请求被取消，不触发 onError
                console.log('Upload cancelled');
            } else {
                const errorMsg = error.response?.data?.msg || error.message || 'Upload failed';
                onError?.(new Error(errorMsg));
            }
        });

    // 返回取消函数
    return () => {
        abortController.abort(); // 取消请求
    };
}

/**
 * 创建文件选择器
 * @param {string} accept - 接受的文件类型
 * @param {Function} onSelect - 文件选择回调
 * @returns {Function} 文件选择器函数
 */
export function createFilePicker(accept, onSelect) {
    return () => {
        // 创建隐藏的文件输入元素
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;
        input.multiple = true; // 允许多选

        // 监听文件选择事件
        input.onchange = (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                onSelect(files);
            }
        };

        // 触发文件选择对话框
        input.click();
    };
}

/**
 * 检查是否有文件夹被拖拽
 * @param {DataTransferItemList} items - 拖拽的项目列表
 * @returns {boolean} 是否包含文件夹
 */
export function hasFolderInDragItems(items) {
    // 尝试使用 WebKit API (Chrome, Edge 等)
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // WebKit API 检测 (Chrome, Edge)
        if (item.webkitGetAsEntry) {
            const entry = item.webkitGetAsEntry();
            if (entry && entry.isDirectory) {
                return true;
            }
        }

        // 标准 API 检测 (Firefox)
        if (item.kind === 'file') {
            const file = item.getAsFile();
            // 在某些浏览器中，文件夹的 type 为空，但 size 为 0
            if (file && file.type === '' && file.size === 0) {
                return true;
            }
        }
    }

    return false;
}

/*
 * 生成随机 uuid
 */
export function generateUUID() {
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // 生成 16 字节的随机数组
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // 设置版本（4）和变体（RFC 4122）
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant RFC4122

    // 转换为十六进制字符串并格式化
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20)
    ].join('-');
}

export function getLastLine(str) {
    const idx = str.lastIndexOf('\n');
    return idx === -1 ? str : str.slice(idx + 1);
}

// 从 localStorage 保存设置
export function setLocalSetting(key, value) {
    try {
        // 将值转换为 JSON 字符串
        const valueJSON = JSON.stringify(value);

        // 获取当前的 LocalSetting 对象
        let currentSettings = {};
        const existingSettings = localStorage.getItem('LocalSetting');
        if (existingSettings) {
            currentSettings = JSON.parse(existingSettings);
        }

        // 更新指定的键值
        currentSettings[key] = valueJSON;

        // 保存回 localStorage
        localStorage.setItem('LocalSetting', JSON.stringify(currentSettings));

        console.log(`Setting ${key} saved successfully`);
    } catch (error) {
        console.error('Error saving setting:', error);
        throw error;
    }
}

// 从 localStorage 获取设置，如果不存在则返回默认值
export function getLocalSetting(key, defaultValue = null) {
    try {
        // 获取当前的 LocalSetting 对象
        const existingSettings = localStorage.getItem('LocalSetting');
        if (!existingSettings) {
            return defaultValue;
        }

        const currentSettings = JSON.parse(existingSettings);
        const valueJSON = currentSettings[key];

        if (valueJSON === undefined) {
            return defaultValue;
        }

        // 解析 JSON 字符串并返回
        return JSON.parse(valueJSON);
    } catch (error) {
        console.error('Error getting setting:', error);
        return defaultValue;
    }
}