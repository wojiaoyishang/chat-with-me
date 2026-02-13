import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [react(), tailwindcss(), visualizer({open: true})],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        DEBUG_MODE: false
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/ws': {
                target: 'ws://127.0.0.1:8000',
                ws: true,
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // React 核心
                    if (id.includes('node_modules/react-dom')) {
                        return 'react-dom';
                    }
                    if (id.includes('node_modules/react')) {
                        return 'react';
                    }

                    // Zustand 状态管理
                    if (id.includes('node_modules/zustand')) {
                        return 'store';
                    }

                    // Radix UI
                    if (id.includes('node_modules/@radix-ui')) {
                        return 'radix-ui';
                    }

                    // Headless UI
                    if (id.includes('node_modules/@headlessui/react')) {
                        return 'headlessui';
                    }

                    // Lucide 图标库
                    if (id.includes('node_modules/lucide-react')) {
                        return 'icons';
                    }

                    // Sonner
                    if (id.includes('node_modules/sonner')) {
                        return 'sonner';
                    }

                    // 加密
                    if (id.includes('node_modules/crypto-js')) {
                        return 'crypto-js';
                    }

                    // 国际化
                    if (id.includes('node_modules/i18next')) {
                        return 'i18next';
                    }

                    if (id.includes('highlight.js/es/languages/')) {
                        return 'highlight/hljs/' + id.split('/').pop().replace('.js', '');
                    }

                    if (id.includes('node_modules/refractor/lang')) {
                        return 'highlight/refractor/lang-' + id.split('/').pop().replace('.js', '');
                    }

                    // 代码高亮（highlight.js / refractor）
                    if (id.includes('node_modules/highlight.js')) {
                        return 'highlight/highlight';
                    }

                    // 数学公式（KaTeX）
                    if (id.includes('node_modules/katex')) {
                        return 'math';
                    }

                    // 其他 Markdown 相关
                    if (
                        id.includes('node_modules/react-markdown') ||
                        id.includes('node_modules/remark-') ||
                        id.includes('node_modules/rehype-')
                    ) {
                        return 'markdown';
                    }

                    // 外置 UI
                    if (id.includes('src/components/ui')) {
                        return 'ui';
                    }

                    return undefined;
                },
                assetFileNames: (assetInfo) => {
                    // 判断是否是字体文件
                    if (assetInfo.names[0].endsWith('.woff') || assetInfo.names[0].endsWith('.woff2') || assetInfo.names[0].endsWith('.ttf')) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }
                    // 其他静态资源（如图片、CSS 等）保持默认或自定义
                    return 'assets/[name]-[hash][extname]';
                },
            }
        },
    }
})

