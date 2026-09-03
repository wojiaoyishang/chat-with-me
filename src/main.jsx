import {StrictMode} from 'react';
import './assets/js/i18n.js';
import './assets/css/index.css';

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
import MessageHistoryMapPage from '@/features/message-map/MessageHistoryMapPage.jsx';
import UniversalModalHost from '@/components/modal/UniversalModalHost.jsx';
import {subscribeBrowserRoutePop} from '@/lib/browserHistoryLayers.js';

const router = createBrowserRouter([
    {
        path: "/chat",
        element: <DashboardPage/>,
    },
    {
        path: "/chat/:conversationId/message-map",
        element: <MessageHistoryMapPage/>,
    },
    {
        path: "/chat/:conversationId",
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
        path: "/doc/:documentId/:conversationId",
        element: <DashboardPage type={"doc"}/>
    },
    {
        path: "/doc/:documentId",
        element: <DashboardPage type={"doc"}/>
    },
]);

const root = document.getElementById("root");

const HistorySynchronizedRouter = () => {
    React.useEffect(() => subscribeBrowserRoutePop(({url}) => {
        const target = String(url || `${window.location.pathname}${window.location.search}${window.location.hash}`);
        const routerLocation = router.state.location;
        const routerTarget = `${routerLocation?.pathname || ''}${routerLocation?.search || ''}${routerLocation?.hash || ''}`;

        // Legacy page navigation still has a few direct history.pushState paths.
        // If a POP exposes a browser URL the Router did not observe, reconcile it
        // without reloading/remounting the whole dashboard. DashboardPage also
        // mirrors native POP location into its local chat/doc selection state.
        if (routerTarget !== target) {
            void Promise.resolve(router.navigate(target, {replace: true}))
                .catch((error) => console.error('Failed to synchronize browser history with router', error));
        }
    }), []);

    return <RouterProvider router={router}/>;
};

ReactDOM.createRoot(root).render(
    <StrictMode>
        <ContextEvent />  {/* 跨页面事件 */}
        <MyToaster/>  {/* 跨页面的吐司组件 */}
        <FatalErrorPopoverElement/>  {/* 错误提示 */}
        <UniversalModalHost/>  {/* 后端驱动的通用弹窗 */}
        <WebSocketProvider>
            <HistorySynchronizedRouter/>
        </WebSocketProvider>
    </StrictMode>
);