import React, { useState } from 'react';
import {useTranslation} from "react-i18next";

/**
 * ToggleSearchButton 组件
 * 用于展示一个可点击的按钮，支持三种图标类型：图标库、SVG 和图片。
 * 按钮的激活状态由内部管理，isActive 仅作为初始状态传入。
 *
 * @param {Function} props.t - i18next 的翻译函数（必需）
 * @param {boolean} [props.isActive=false] - 初始激活状态
 * @param {boolean} [props.disabled=false] - 控制按钮是否禁用
 * @param {Function} [props.onClick] - 点击按钮时的回调函数，参数为 (event, isActive)
 * @param {string} [props.className=''] - 自定义的 CSS 类名
 * @param {string} [props.textKey='search'] - 按钮文本的翻译 key
 * @param {string} [props.bgColor='#4F39F5'] - 按钮的背景颜色
 * @param {string} [props.iconType='library'] - 图标类型，支持 'library'、'svg' 和 'image'
 * @param {Object|string} [props.iconData=null] - 图标数据
 * @returns {JSX.Element} 返回一个按钮组件
 */
function ToggleSearchButton({
                                isActive = false,
                                disabled = false,
                                onClick,
                                className = '',
                                textKey = 'search',
                                bgColor = '#4F39F5',
                                iconType = 'library',
                                iconData = null,
                            }) {
    const {t} = useTranslation();
    const [currentIsActive, setCurrentIsActive] = useState(isActive);

    function handleClick(e) {
        if (disabled) return;
        const newActive = !currentIsActive;
        setCurrentIsActive(newActive);
        onClick?.(e, newActive);
    }

    const baseClasses = `
    px-4 py-1 rounded-full text-sm font-medium transition-colors
    focus:outline-none focus:ring-2 flex items-center gap-2
    ${className}
  `;

    const buttonBgColor = disabled
        ? '#d1d5db'
        : currentIsActive
            ? bgColor
            : '#f3f4f6';

    const stateClasses = disabled
        ? 'cursor-not-allowed opacity-80 text-gray-400'
        : currentIsActive
            ? 'text-white hover:bg-opacity-75 focus:ring-opacity-50 shadow-lg border-1 border-gray-600 cursor-pointer'
            : 'text-gray-700 hover:bg-gray-200 focus:ring-gray-300 cursor-pointer';

    const iconColor = currentIsActive ? 'text-white' : 'text-gray-600';

    function renderIcon() {
        if (iconType === 'library' && iconData) {
            const Icon = iconData;
            return <Icon className={iconColor} />;
        } else if (iconType === 'svg' && iconData) {
            return (
                <span
                    className={`w-5 h-5 ${iconColor}`}
                    dangerouslySetInnerHTML={{
                        __html: typeof iconData === 'string' ? iconData : ''
                    }}
                />
            );
        } else if (iconType === 'image' && iconData) {
            return (
                <img
                    src={iconData}
                    className={`w-5 h-5 ${iconColor}`}
                    width="20"
                    height="20"
                    alt={t(textKey)} // ✅ 国际化 alt 文本
                />
            );
        }
        return null;
    }

    const buttonText = t(textKey); // ✅ 获取翻译文本

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-pressed={currentIsActive}
            aria-label={buttonText} // ✅ 使用翻译后的文本
            className={`${baseClasses} ${stateClasses}`}
            style={{ backgroundColor: buttonBgColor }}
        >
            {renderIcon()}
            {buttonText}
        </button>
    );
}

export default ToggleSearchButton;