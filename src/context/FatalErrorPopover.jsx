import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {useTranslation} from "react-i18next";

// 全局状态
let currentConfig = null; // 存储当前弹窗配置
let setShowOpen = null;


function FatalErrorPopoverElement() {
    let {t} = useTranslation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setShowOpen = setOpen;
        return () => {
            setShowOpen = null;
        };
    }, []);

    if (!open) return null;

    const config = currentConfig || {
        title: "Error",
        message: "Detail for Error.",
        showCloseButton: true,
        showCancelButton: true,
        onRetry: () => {},
        onClose: () => {}
    };

    const handleRetry = () => {
        setOpen(false);
        if (typeof config.onRetry === "function") {
            config.onRetry();
        }
    };

    const handleClose = () => {
        setOpen(false);
        if (typeof config.onClose === "function") {
            config.onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] transition-opacity duration-300"
            onClick={config.showCancelButton ? handleClose : undefined}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md relative animate-fade-in transform transition-transform duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 右上角关闭按钮 */}
                {config.showCloseButton && (
                    <button
                        className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={handleClose}
                        aria-label={t("close")}
                    >
                        &times;
                    </button>
                )}

                {/* 图标 */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-red-500 dark:text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                {/* 标题 */}
                <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
                    {config.title}
                </h2>

                {/* 消息 */}
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6 px-2 leading-relaxed">
                    {config.message}
                </p>

                {/* 按钮 */}
                <div className="flex flex-col sm:flex-row gap-3 cursor-pointer">
                    {config.showCancelButton && (
                        <button
                            className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2.5 px-4 rounded-lg transition-colors"
                            onClick={handleClose}
                        >
                            {t("cancel")}
                        </button>
                    )}
                    <button
                        className={`cursor-pointer flex-1 font-medium py-2.5 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg ${
                            config.showCancelButton
                                ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                                : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white w-full"
                        }`}
                        onClick={handleRetry}
                    >
                        {t("retry")}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

FatalErrorPopoverElement.show = (options = {}) => {

    if (typeof options === "function") {
        options = { onRetry: options };
    }

    currentConfig = {
        title: options.title ?? "Error",
        message: options.message ?? "Detail for Error",
        showCloseButton: options.showCloseButton ?? true,
        showCancelButton: options.showCancelButton ?? true,
        onRetry: options.onRetry ?? (() => {}),
        onClose: options.onClose ?? (() => {})
    };

    // 触发显示
    if (setShowOpen) {
        setShowOpen(true);
    } else {
        setTimeout(() => {
            if (setShowOpen) setShowOpen(true);
        }, 0);
    }
};

FatalErrorPopoverElement.hide = () => {
    if (setShowOpen) setShowOpen(false);
};

export default FatalErrorPopoverElement;