import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {format, isToday, isYesterday, subDays, subMonths, isWithinInterval} from 'date-fns';
import {FaBars, FaTimes, FaHome, FaCog, FaSearch} from 'react-icons/fa';
import {updateURL} from "@/lib/tools.js";

const Sidebar = ({
                     markId, setMarkId
                 }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    // Simulated conversation data (replace with real data from API or props in future)
    const conversations = [
        {date: new Date(), title: 'Today\'s Chat', markId: 'mark1'},
        {date: subDays(new Date(), 1), title: 'Yesterday\'s Discussion', markId: 'mark2'},
        {date: subDays(new Date(), 5), title: 'Weekly Review', markId: 'mark3'},
        {date: subDays(new Date(), 20), title: 'Monthly Plan', markId: 'mark4'},
        {date: subMonths(new Date(), 2), title: 'Old Project', markId: 'mark5'},
    ];

    // Group conversations by date categories
    const groupConversations = () => {
        const groups = {
            Today: [],
            Yesterday: [],
            'Past 7 Days': [],
            'Past Month': [],
            Earlier: [],
        };

        conversations.forEach((conv) => {
            const convDate = new Date(conv.date);
            if (isToday(convDate)) {
                groups.Today.push(conv);
            } else if (isYesterday(convDate)) {
                groups.Yesterday.push(conv);
            } else if (isWithinInterval(convDate, {start: subDays(new Date(), 7), end: subDays(new Date(), 1)})) {
                groups['Past 7 Days'].push(conv);
            } else if (isWithinInterval(convDate, {start: subMonths(new Date(), 1), end: subDays(new Date(), 7)})) {
                groups['Past Month'].push(conv);
            } else {
                groups.Earlier.push(conv);
            }
        });

        return groups;
    };

    const groupedConvs = groupConversations();

    const handleSelectConversation = (markId) => {
        updateURL(`/chat/${markId}`);
        setMarkId(markId);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Open Sidebar"
            >
                <FaBars className="w-5 h-5"/>
            </button>
        );
    }

    return (
        <div
            className="fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-lg z-40 flex flex-col overflow-y-auto md:translate-x-0 transition-transform duration-300 ease-in-out">
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-bold text-gray-800">Logo</h1>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                    aria-label="Close Sidebar"
                >
                    <FaTimes className="w-5 h-5"/>
                </button>
            </div>

            {/* Functional Buttons (placeholders) */}
            <div className="flex flex-col p-4 space-y-2">
                <button className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaHome className="w-5 h-5 mr-2"/>
                    Home
                </button>
                <button className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaSearch className="w-5 h-5 mr-2"/>
                    Search
                </button>
                <button className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaCog className="w-5 h-5 mr-2"/>
                    Settings
                </button>
            </div>

            {/* Conversation List */}
            <div className="flex-1 p-4">
                {Object.entries(groupedConvs).map(([group, convs]) => (
                    convs.length > 0 && (
                        <div key={group} className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-500 mb-2">{group}</h3>
                            <ul className="space-y-1">
                                {convs.map((conv) => (
                                    <li key={conv.markId}>
                                        <button
                                            onClick={() => handleSelectConversation(conv.markId)}
                                            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg transition-colors flex flex-col"
                                        >
                                            <span className="font-medium text-gray-800">{conv.title}</span>
                                            <span
                                                className="text-xs text-gray-500">{format(new Date(conv.date), 'PPP')}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Sidebar;