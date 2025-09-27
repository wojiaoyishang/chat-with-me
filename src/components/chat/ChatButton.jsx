import React, { useState } from 'react';

/**
 * ToggleSearchButton 组件
 * 用于展示一个可点击的按钮，支持三种图标类型：图标库、SVG 和图片。
 * 按钮的激活状态由内部管理，isActive 仅作为初始状态传入。
 *
 * @param {boolean} [props.isActive=false] - 初始激活状态
 * @param {boolean} [props.disabled=false] - 控制按钮是否禁用
 * @param {Function} [props.onClick] - 点击按钮时的回调函数，参数为 (event, isActive)
 * @param {string} [props.className=''] - 自定义的 CSS 类名
 * @param {string} [props.text='搜索'] - 按钮文本内容
 * @param {string} [props.bgColor='#4F39F5'] - 按钮的背景颜色
 * @param {string} [props.iconType='library'] - 图标类型，支持 'library'、'svg' 和 'image'
 * @param {Object|string} [props.iconData=null] - 图标数据（组件、SVG 字符串或图片路径）
 * @returns {JSX.Element} 返回一个按钮组件
 */
function ToggleSearchButton({
                                isActive = false,
                                disabled = false,
                                onClick,
                                className = '',
                                text = '搜索',
                                bgColor = '#4F39F5',
                                iconType = 'library',
                                iconData = null,
                            }) {
    // 使用传入的 isActive 作为初始状态
    const [currentIsActive, setCurrentIsActive] = useState(isActive);

    /**
     * 处理按钮点击事件
     * @param {React.MouseEvent} e - 点击事件
     */
    function handleClick(e) {
        if (disabled) return;

        const newActive = !currentIsActive;
        setCurrentIsActive(newActive);
        onClick?.(e, newActive); // 通知父组件状态已改变
    }

    const baseClasses = `
    px-4 py-1 rounded-full text-sm font-medium transition-colors
    focus:outline-none focus:ring-2 flex items-center gap-2
    ${className}
  `;

    // 根据是否激活设置背景颜色
    const buttonBgColor = disabled
        ? '#d1d5db' // 禁用时的颜色
        : currentIsActive
            ? bgColor // 激活时使用传入的 bgColor
            : '#f3f4f6'; // 未激活时的灰色

    // 文本和交互样式
    const stateClasses = disabled
        ? 'cursor-not-allowed opacity-80 text-gray-400'
        : currentIsActive
            ? 'text-white hover:bg-opacity-75 focus:ring-opacity-50 shadow-lg border-1 border-gray-600 cursor-pointer'
            : 'text-gray-700 hover:bg-gray-200 focus:ring-gray-300 cursor-pointer';

    const iconColor = currentIsActive ? 'text-white' : 'text-gray-600';

    /**
     * 渲染不同类型的图标
     * @returns {JSX.Element|null}
     */
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
                    alt={text}
                />
            );
        }
        return null;
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-pressed={currentIsActive}
            aria-label={typeof text === 'string' ? text : '搜索'}
            className={`${baseClasses} ${stateClasses}`}
            style={{ backgroundColor: buttonBgColor }}
        >
            {renderIcon()}
            {text}
        </button>
    );
}

export default ToggleSearchButton;