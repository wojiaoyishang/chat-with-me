import {StrictMode} from 'react';
import './assets/js/i18n.js';
import './assets/css/index.css';
import './assets/css/code-block.css';
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
import ContextEvent from "@/context/ContextEvent.jsx";
import DashboardPage from "@/pages/dashboard/DashboardPage.jsx";

const router = createBrowserRouter([
    {
        path: "/chat",
        element: <DashboardPage/>,
    },
    {
        path: "/chat/:markId",
        element: <DashboardPage/>,
    },
    {
        path: "/",
        element: <Navigate to="/chat" replace/>
    }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <StrictMode>
        <ContextEvent />  {/* 跨页面事件 */}
        <MyToaster/>  {/* 跨页面的吐司组件 */}
        <FatalErrorPopoverElement/>  {/* 错误提示 */}
        <WebSocketProvider>
            <RouterProvider router={router}/>
        </WebSocketProvider>
    </StrictMode>
);