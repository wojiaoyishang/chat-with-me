import React, {useEffect, useMemo, useState} from 'react';
import {Bell, Search} from 'lucide-react';
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';
import {Switch} from '@/components/ui/switch';
import {useNotificationStore} from './useNotificationStore.js';

const NotificationSettings = () => {
    const types = useNotificationStore((state) => state.types);
    const subscriptions = useNotificationStore((state) => state.subscriptions);
    const setTypes = useNotificationStore((state) => state.setTypes);
    const setSubscription = useNotificationStore((state) => state.setSubscription);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(types.length === 0);

    useEffect(() => {
        if (types.length > 0) return;
        let active = true;
        setLoading(true);
        apiClient.get(apiEndpoint.NOTIFICATION_TYPES_ENDPOINT)
            .then((response) => {
                if (active) setTypes(response?.types || []);
            })
            .catch((error) => console.warn('Failed to load notification types:', error))
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [setTypes, types.length]);

    const groups = useMemo(() => {
        const keyword = query.trim().toLowerCase();
        const grouped = {};
        for (const item of types) {
            const haystack = `${item.name || ''} ${item.typeId || ''} ${item.description || ''}`.toLowerCase();
            if (keyword && !haystack.includes(keyword)) continue;
            const category = item.category || 'other';
            if (!grouped[category]) grouped[category] = [];
            grouped[category].push(item);
        }
        return grouped;
    }, [query, types]);

    const isEnabled = (item) => {
        const value = subscriptions[item.typeId]?.toast;
        return typeof value === 'boolean' ? value : item.defaultSubscribed !== false;
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-5">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Bell className="h-5 w-5 text-blue-600"/>
                    通知
                </div>
                <p className="mt-1 text-sm text-gray-500">选择哪些后端消息类型需要提示。桌面端显示在右下角，移动端显示为顶部操作条；关闭提示不会改变对应业务行为。</p>
            </div>
            <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="搜索消息名称、类型或说明"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
            </div>
            {loading ? (
                <div className="py-10 text-center text-sm text-gray-400">正在加载通知类型…</div>
            ) : Object.keys(groups).length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">没有匹配的通知类型</div>
            ) : (
                <div className="space-y-5">
                    {Object.entries(groups).map(([category, items]) => (
                        <section key={category}>
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{category}</h3>
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                {items.map((item, index) => (
                                    <div key={item.typeId} className={`flex items-center gap-4 p-4 ${index ? 'border-t border-gray-100' : ''}`}>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">{item.name || item.typeId}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">{item.description || item.typeId}</p>
                                            <p className="mt-1 truncate font-mono text-[10px] text-gray-400">{item.typeId}</p>
                                        </div>
                                        <Switch
                                            checked={isEnabled(item)}
                                            onCheckedChange={(checked) => setSubscription(item.typeId, {toast: checked})}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationSettings;
