import axios from 'axios';
import {BASE_BACKEND_URL, apiEndpoint} from '@/config.js'

const apiClient = axios.create({
    baseURL: BASE_BACKEND_URL, // 你的后端地址
});

apiClient.interceptors.response.use(
    (response) => {
        const { success, code, msg, data } = response.data;

        // 如果你的 API 总是返回 { success, code, msg, data }
        if (!success) {
            // 如果业务逻辑失败（如 success: false），抛出错误，可在 catch 捕获
            const error = new Error(msg || "Request failed.");
            error.code = code;
            throw error;
        }

        return data; // ← 关键：这里返回的是 response.data.data
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;