import axios from 'axios';
import {BASE_BACKEND_URL} from '@/config.js';

const apiClient = axios.create({
    baseURL: BASE_BACKEND_URL,
    withCredentials: true,
});

let authRedirectInProgress = false;

export class AuthRedirectError extends Error {
    constructor(message = 'Authentication required') {
        super(message);
        this.name = 'AuthRedirectError';
        this.code = 401;
        this.isAuthRedirect = true;
    }
}

export const isAuthRedirectError = (error) => Boolean(
    error?.isAuthRedirect || error?.name === 'AuthRedirectError',
);

const redirectToLogin = () => {
    if (typeof window === 'undefined' || authRedirectInProgress) return;
    if (window.location.pathname === '/login') return;

    authRedirectInProgress = true;
    const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}` || '/';
    const loginUrl = `/login?redirect=${encodeURIComponent(redirect)}`;
    window.location.replace(loginUrl);
};

const rejectUnauthorized = () => {
    redirectToLogin();
    return Promise.reject(new AuthRedirectError());
};

// Attach the browser language to every API request.
apiClient.interceptors.request.use(
    (config) => {
        config.headers['Accept-Language'] = navigator.language || navigator.languages?.[0] || 'en-US';
        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => {
        const {success, code, msg, data = {}} = response.data;
        if (!success) {
            if (code === 401 && !response.config.skipAuthCheck) {
                return rejectUnauthorized();
            }

            const error = new Error(msg || 'Request failed.');
            error.code = code;
            error.data = data;
            throw error;
        }

        data._response = response;
        return data;
    },
    (error) => {
        error.code = error.response?.data?.code || error.code;
        error.message = error.response?.data?.msg || error.message;
        error.data = error.response?.data?.data || error.data;
        if (error?.code === 401 && !error.config?.skipAuthCheck) {
            return rejectUnauthorized();
        }
        return Promise.reject(error);
    },
);

export default apiClient;
