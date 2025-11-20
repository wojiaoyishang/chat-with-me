import axios from 'axios';
import { BASE_BACKEND_URL, apiEndpoint } from '@/config.js';
import { toast } from "sonner";

const apiClient = axios.create({
    baseURL: BASE_BACKEND_URL, // 你的后端地址
    withCredentials: true
});

// 添加请求拦截器，在每次请求时设置 Accept-Language 头部为浏览器语言
apiClient.interceptors.request.use(
    (config) => {
        config.headers['Accept-Language'] = navigator.language || navigator.languages[0] || 'en-US'; // 使用浏览器语言，fallback 到 en-US
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        const { success, code, msg, data = null } = response.data;
        if (!success) {
            if (code === 401 && !response.config.skipAuthCheck) {
                toast.error(msg);
                const currentUrl = window.location.href;
                setTimeout(() => {
                    window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
                }, 1000)
                return Promise.reject(new Error("Unauthorized - Redirecting to login"));
            } else {
                // 如果业务逻辑失败（如 success: false），抛出错误，可在 catch 捕获
                const error = new Error(msg || "Request failed.");
                error.code = code;
                error.message = msg;
                throw error;
            }
        }
        return data;
    },
    (error) => {
        error.code = error.response?.data?.code || error.code;
        error.message = error.response?.data?.msg || error.message;
        if (error?.code === 401 && !error.config.skipAuthCheck) {
            const currentUrl = window.location.href;
            setTimeout(() => {
                window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
            }, 1000)
            return Promise.reject(new Error("Unauthorized - Redirecting to login"));
        }
        return Promise.reject(error);
    }
);

export default apiClient;