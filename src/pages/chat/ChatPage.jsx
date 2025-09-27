import React, {useState, useRef, useEffect} from 'react';
import ChatBox from "@/components/chat/chatbox.jsx";

function ChatPage() {

    const [message, setMessage] = useState("");
    const [toolsStatus, setToolsStatus] = useState({});

    const handleSendMessage = (message, t) => {
        console.log('发送消息:', message, t);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-end pb-8">
            < ChatBox messageState={[message, setMessage]} toolsStatusState={[toolsStatus, setToolsStatus]} onSendMessage={handleSendMessage} />
        </div>
    );
}

export default ChatPage;
