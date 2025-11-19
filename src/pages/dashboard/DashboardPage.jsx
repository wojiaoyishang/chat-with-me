import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useParams,} from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar.jsx';
import ChatPage from '@/pages/chat/ChatPage.jsx';
import {getMarkId} from "@/lib/tools.js";
import apiClient from "@/lib/apiClient.js";
import {apiEndpoint} from "@/config.js";
import ThreeDotLoading from "@/components/loading/ThreeDotLoading.jsx";
import {useTranslation} from "react-i18next";

const DashboardPage = () => {
    const [markId, setMarkId] = useState(getMarkId());
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        const loadDashboard = async () => {
            setIsLoading(true);
            setIsLoadingError(false);

            try {
                const settings = await apiClient.get(apiEndpoint.DASHBOARD_ENDPOINT);

            } catch (error) {
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const LoadingScreen = () => (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center">
                <ThreeDotLoading/>
                <span className="mt-2 text-sm text-gray-500">{t("loading_dashboard")}</span>
            </div>
        </div>
    );

    const LoadingFailedScreen = () => (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <p className="text-gray-700 text-base font-medium">{t("load_dashboard_error")}</p>
                <p className="text-gray-500 text-sm mt-1">{t("retry_after_network")}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-sm text-blue-600 rounded-md transition-colors cursor-pointer"
                >
                    {t("retry")}
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex full-scree-height bg-white relative">
            {isLoadingError ? (
                <LoadingFailedScreen />
            ) : isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <Sidebar markId={markId} setMarkId={setMarkId}/>
                    <main className="flex-1 overflow-hidden relative">
                        <ChatPage markId={markId} setMarkId={setMarkId}/>
                    </main>
                </>
            )}
        </div>
    );
};

export default DashboardPage;