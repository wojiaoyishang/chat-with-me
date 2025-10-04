import {useParams} from 'react-router-dom';

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
 * 模拟文件上传过程
 * @param {Object} uploadFile - 上传文件对象
 * @param {Function} onProgressUpdate - 进度更新回调
 * @param {Function} onComplete - 完成回调
 * @param {Function} onError - 错误回调
 * @returns {Function} 清理函数
 */
export function simulateUpload(uploadFile, onProgressUpdate, onComplete, onError) {
    // 验证参数
    if (!uploadFile || !onProgressUpdate || !onComplete) {
        console.error('Missing required parameters for simulateUpload');
        return () => {};
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
        // 随机增加进度（模拟网络波动）
        const increment = Math.floor(Math.random() * 3) + 2;
        currentProgress = Math.min(currentProgress + increment, 100);

        // 调用进度更新回调
        onProgressUpdate(uploadFile.id, currentProgress);

        if (currentProgress >= 100) {
            clearInterval(interval);

            // 创建附件对象
            const attachment = {
                preview: uploadFile.file.type.startsWith('image/') ?
                    URL.createObjectURL(uploadFile.file) :
                    '/src/assets/icon/TXT.png',
                previewType: uploadFile.file.type.startsWith('image/') ? 'image' : 'svg',
                name: uploadFile.name,
                size: uploadFile.file.size,
                serverId: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                downloadUrl: `https://example.com/files/${Date.now()}`
            };

            // 调用完成回调
            onComplete(uploadFile.id, attachment);
        }
    }, 100 + Math.random() * 200); // 随机间隔，模拟不同网速

    // 返回清理函数
    return () => clearInterval(interval);
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