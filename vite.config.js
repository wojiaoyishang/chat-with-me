import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        DEBUG_MODE: true,
        CHATBOX_API: JSON.stringify('/api/chatbox.json'),
        UPLOAD_ENDPOINT: JSON.stringify("http://127.0.0.1:8000/upload"),
    },
})

