import axios from 'axios';
import { BASE_BACKEND_URL } from '@/config.js';
import {
    backendApiUrl, getBackendConnection, getConnectionToken, isCurrentConnection,
    setConnectionToken, setResourceTicket, getResourceTicket, setConnectionUserId, subscribeBackend,
} from '../runtime/backend/connection.js';

const apiClient = axios.create({
    baseURL: BASE_BACKEND_URL,
    withCredentials: true,
});

let authRedirectInProgress = false;
const requests = new Set();
subscribeBackend(() => {
    for (const request of requests) {
        if (!isCurrentConnection(request.scope)) request.controller.abort('Backend changed');
    }
});

export class AuthRedirectError extends Error {
    constructor(message = 'Authentication required') {
        super(message);
        this.name = 'AuthRedirectError';
        this.code = 401;
        this.isAuthRedirect = true;
    }
}

export const isAuthRedirectError = (error) => Boolean(error?.isAuthRedirect || error?.name === 'AuthRedirectError');

const redirectToLogin = () => {
    if (typeof window === 'undefined' || authRedirectInProgress) return;
    if (window.location.pathname === '/login') return;

    authRedirectInProgress = true;
    const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}` || '/';
    const loginUrl = `/login?redirect=${encodeURIComponent(redirect)}`;
    window.location.replace(loginUrl);
};

const rejectUnauthorized = () => {
    setConnectionToken('');
    redirectToLogin();
    return Promise.reject(new AuthRedirectError());
};

// Attach the browser language to every API request.
apiClient.interceptors.request.use(
    (config) => {
        const scope = getBackendConnection();
        const url = backendApiUrl(config.url || '', scope);
        const controller = new AbortController();
        const request = { scope, controller };
        requests.add(request);
        config.__backendRequest = request;
        if (config.signal) {
            if (config.signal.aborted) controller.abort();
            else {
                const signal = config.signal;
                const abort = () => controller.abort();
                signal.addEventListener('abort', abort, { once: true });
                request.unsubscribe = () => signal.removeEventListener('abort', abort);
            }
        }
        config.signal = controller.signal;
        config.baseURL = scope.url;
        config.url = url;
        config.withCredentials = scope.id === 'default';
        const token = getConnectionToken(scope);
        if (token) config.headers.Authorization = `Bearer ${token}`;
        const resourceTicket = getResourceTicket(scope);
        if (resourceTicket) config.headers['X-CWM-Resource-Ticket'] = resourceTicket;
        if (scope.id !== 'default' || token) config.headers['X-CWM-Auth'] = 'bearer';
        config.headers['Accept-Language'] = navigator.language || navigator.languages?.[0] || 'en-US';
        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => {
        const request = response.config.__backendRequest;
        if (request) { requests.delete(request); request.unsubscribe?.(); }
        if (request && !isCurrentConnection(request.scope)) throw new axios.CanceledError('Backend changed');
        if (response.config.rawResponse) return response;
        const { success, code, msg, data = {} } = response.data;
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
        if (data.accessToken) setConnectionToken(data.accessToken, request?.scope);
        if (data.resourceTicket) setResourceTicket(data.resourceTicket, request?.scope);
        if (data.userId != null) setConnectionUserId(data.userId, request?.scope);
        return data;
    },
    (error) => {
        const request = error.config?.__backendRequest;
        if (request) { requests.delete(request); request.unsubscribe?.(); }
        if (request && !isCurrentConnection(request.scope)) return Promise.reject(new axios.CanceledError('Backend changed'));
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
