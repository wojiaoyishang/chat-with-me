import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useParams,} from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/chat/ChatPage.jsx';
import {getMarkId} from "@/lib/tools.js";

const DashboardPage = () => {
    const [markId, setMarkId] = useState(getMarkId());

    return (
        <div className="flex h-screen bg-white">
            <Sidebar markId={markId} setMarkId={setMarkId}/>
            <main className="flex-1 overflow-hidden relative">
                <ChatPage key={markId} markId={markId}/>
            </main>
        </div>
    );
};

export default DashboardPage;