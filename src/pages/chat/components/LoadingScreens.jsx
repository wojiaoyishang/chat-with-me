import React from 'react';
import {UnifiedErrorScreen, UnifiedLoadingScreen} from '@/lib/tools.jsx';

export const LoadingScreen = ({t}) => (
    <UnifiedLoadingScreen
        text={t('loading_messages')}
        zIndex="z-20"
    />
);

export const LoadingFailedScreen = ({t}) => (
    <UnifiedErrorScreen
        title={t('load_error')}
        subtitle={t('retry_after_network')}
        zIndex="z-20"
    />
);
