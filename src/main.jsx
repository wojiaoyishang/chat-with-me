import {StrictMode} from 'react';
import './assets/js/i18n.js';
import './assets/css/index.css';
import ChatPage from './pages/chat/ChatPage.jsx';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import {WebSocketProvider} from './context/WebSocketContext.jsx';
import MyToaster from "@/context/MyToaster.jsx";
import FatalErrorPopoverElement from "@/context/FatalErrorPopover.jsx";

const router = createBrowserRouter([
    {
        path: "/chat",
        element: <ChatPage/>,
    },
    {
        path: "/chat/:markId",
        element: <ChatPage/>,
    },
    {
        path: "/",
        element: <Navigate to="/chat" replace/>,
    }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <StrictMode>
        <MyToaster/>  {/* 跨页面的吐司组件 */}
        <FatalErrorPopoverElement/>  {/* 错误提示 */}
        <WebSocketProvider>
            <RouterProvider router={router}/>
        </WebSocketProvider>
    </StrictMode>
);