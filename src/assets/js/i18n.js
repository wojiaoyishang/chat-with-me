import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // 检测用户当前使用的语言
    // 文档: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // 注入 react-i18next 实例
    .use(initReactI18next)
    // 初始化 i18next
    // 配置参数的文档: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    "拓展工具": "Extra Tools",
                    "重试加载工具": "Reload Tools",
                    "放大输入框": "Zoom in Input Box",
                    "发送消息": "Send Message",
                    "关闭": "Close",
                    "输入你的消息...": "Input your message...",
                    "搜索": "Search",
                    "基础功能": "Basic Functions",
                    "自动翻译": "Auto Translate"
                }
            }
        }
    });

export default i18n;