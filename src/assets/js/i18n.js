import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '/src/assets/locales/en.json';
import zhTranslations from '/src/assets/locales/zh.json';

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
        fallbackLng: 'zh',
        resources: {
            en: {
                translation: enTranslations
            },
            zh: {
                translation: zhTranslations
            }
        }
    });

export default i18n;