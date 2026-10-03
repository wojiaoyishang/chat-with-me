import {useEffect, useRef, useState} from 'react';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';

export const PAGE_SIZE = 50;
const SEARCH_DELAY_MS = 260;

export function useMessageMapSearch({conversationId, query, page, append, enabled}) {
    const [state, setState] = useState({items: [], total: 0, loading: false, error: ''});
    const requestRef = useRef(null);
    useEffect(() => {
        const controller = new AbortController();
        requestRef.current = controller;
        const normalized = query.trim();
        if (!enabled || normalized.length < 2) {
            setState({items: [], total: 0, loading: false, error: ''});
            return () => controller.abort();
        }
        setState(previous => ({items: append && page > 0 ? previous.items : [], total: previous.total, loading: true, error: ''}));
        const timer = window.setTimeout(async () => {
            try {
                const data = await apiClient.get(apiEndpoint.CHAT_MESSAGE_MAP_SEARCH_ENDPOINT, {
                    params: {conversationId, q: normalized, limit: PAGE_SIZE, offset: page * PAGE_SIZE}, signal: controller.signal,
                });
                if (controller.signal.aborted || requestRef.current !== controller) return;
                setState(previous => ({
                    items: append && page > 0 ? [...new Map([...previous.items, ...(data.items || [])].map(item => [item.messageId, item])).values()] : data.items || [],
                    total: Number(data.total || 0), loading: false, error: '',
                }));
            } catch (error) {
                if (controller.signal.aborted || requestRef.current !== controller) return;
                setState(previous => ({...previous, loading: false, error: error?.message || '搜索消息失败'}));
            }
        }, page === 0 ? SEARCH_DELAY_MS : 0);
        return () => { window.clearTimeout(timer); controller.abort(); };
    }, [conversationId, query, page, append, enabled]);
    return state;
}

