import React from 'react';
import {Bell, ChevronRight, ShieldAlert, X} from 'lucide-react';

const icons = {
    'tool.approval.required': ShieldAlert,
};

const NotificationToast = ({notification, onOpen, onDismiss, mobile = false}) => {
    const Icon = icons[notification.typeId] || Bell;
    const isWarning = notification.level === 'warning';
    const isError = notification.level === 'error';
    const iconClass = isError ? 'text-red-600 bg-red-50' : isWarning ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50';

    return (
        <div className={`${mobile ? 'w-[calc(100vw-16px)] rounded-xl p-3' : 'w-[340px] max-w-[calc(100vw-24px)] rounded-2xl p-3.5'} border border-gray-200 bg-white shadow-xl`}>
            <div className="flex items-start gap-3">
                <div className={`${mobile ? 'rounded-lg p-1.5' : 'mt-0.5 rounded-xl p-2'} ${iconClass}`}>
                    <Icon className="h-5 w-5"/>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                            {notification.body && (
                                <p className={`mt-1 text-xs leading-5 text-gray-500 ${mobile ? 'line-clamp-2' : 'line-clamp-3'}`}>{notification.body}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            aria-label="关闭通知"
                        >
                            <X className="h-4 w-4"/>
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={onOpen}
                        className={`${mobile ? 'mt-2 h-10 w-full justify-center rounded-lg bg-blue-50' : 'mt-3'} flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700`}
                    >
                        {mobile ? '立即处理' : '查看'}
                        <ChevronRight className="h-3.5 w-3.5"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationToast;
