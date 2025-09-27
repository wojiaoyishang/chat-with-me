import { StrictMode } from 'react'
import './assets/js/i18n.js'
import './assets/css/index.css'

// import App from './pages/test/App.jsx'
import ChatPage from './pages/chat/ChatPage.jsx'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
    // {
    //     path: "/test/",
    //     element: <StrictMode>< App/></StrictMode>,
    // },
    {
        path: "/chat/",
        element: <StrictMode>< ChatPage/></StrictMode>,
    }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);