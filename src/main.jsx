import {StrictMode} from 'react';
import './assets/js/i18n.js';
import './assets/css/index.css';
import './assets/css/code-block.css';

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
import DashboardPage from "@/pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ChatWithEditor from "@/pages/ChatWithEditor.jsx";

const router = createBrowserRouter([
    {
        path: "/chat",
        element: <DashboardPage/>,
    },
    {
        path: "/chat/:chatMarkId",
        element: <DashboardPage type={"chat"}/>,
    },
    {
        path: "/",
        element: <Navigate to="/chat" replace/>
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/doc",
        element: <DashboardPage type={"doc"} />
    },
    {
        path: "/doc/:documentMarkId/:chatMarkId",
        element: <DashboardPage type={"doc"}/>
    },
    {
        path: "/doc/:documentMarkId",
        element: <DashboardPage type={"doc"}/>
    },
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