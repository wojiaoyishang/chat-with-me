import {useParams} from 'react-router-dom';
import {apiEndpoint} from '@/config.js';

export function getMarkId() {
    const {markId} = useParams();
    return markId;
}

export function processSelectedFiles(files) {
    // 转换为数组并过滤空文件
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
        console.error('Missing required parameters for simulateUpload');
        onError?.(new Error('Invalid parameters'));
        return () => {
        };
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', uploadFile.file);

    // 假设 UPLOAD_ENDPOINT 已在项目中定义，例如：
    // const UPLOAD_ENDPOINT = 'http://127.0.0.1:8000/upload';
    const UPLOAD_ENDPOINT = apiUrl.UPLOAD_ENDPOINT;

    xhr.open('POST', UPLOAD_ENDPOINT);

    // 监听上传进度
    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgressUpdate(uploadFile.id, progress);
        }
    };

    // 上传完成
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            let response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                onError?.(new Error('Invalid JSON response'));
                return;
            }

            if (response.success) {
                const data = response.data;
                const attachment = {
                    // preview: uploadFile.file.type.startsWith('image/')
                    //     ? URL.createObjectURL(uploadFile.file)
                    //     : '/src/assets/icon/TXT.png', // 或根据 MIME 类型动态选择图标
                    preview: data.preview,
                    // previewType: uploadFile.file.type.startsWith('image/') ? 'image' : 'svg',
                    previewType: data.previewType,
                    name: uploadFile.name,
                    size: uploadFile.file.size,
                    serverId: data.serverId,      // 来自后端
                    downloadUrl: data.downloadUrl // 来自后端
                };
                onComplete(uploadFile.id, attachment);
            } else {
                onError?.(new Error(response.msg || 'Upload failed'));
            }
        } else {
            onError?.(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
        }
    };

    // 网络错误
    xhr.onerror = () => {
        onError?.(new Error('Network error during upload'));
    };

    // 发送请求
    xhr.send(formData);

    // 返回取消函数（可中止上传）
    return () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            xhr.abort();
        }
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