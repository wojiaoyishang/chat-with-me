import React, {useState, useRef, useEffect} from 'react';
import ChatBox from "@/components/chat/chatbox.jsx";

function ChatPage() {


    const handleSendMessage = (message, toolsStatus, sendButtonState) => {
        console.log('发送消息:', message, toolsStatus, sendButtonState);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-end pb-8">
            < ChatBox onSendMessage={handleSendMessage}/>
        </div>
    );
}

export default ChatPage;
