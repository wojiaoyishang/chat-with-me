import React, { memo } from 'react';
import { Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const MessageHistoryMapButton = memo(
    ({ conversationId, focusMessageId = '', disabled = false, label = '消息历史地图', listItem = false }) => {
        const navigate = useNavigate();
        const resolvedConversationId = String(conversationId || '').trim();
        const resolvedFocusMessageId = String(focusMessageId || '').trim();
        const isDisabled = disabled || !resolvedConversationId;

        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size={listItem ? 'default' : 'icon'}
                        disabled={isDisabled}
                        onClick={() => {
                            if (isDisabled) return;
                            const focusQuery = resolvedFocusMessageId
                                ? `?focus=${encodeURIComponent(resolvedFocusMessageId)}`
                                : '';
                            navigate(`/chat/${encodeURIComponent(resolvedConversationId)}/message-map${focusQuery}`);
                        }}
                        className={`cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 ${listItem ? 'w-full justify-start gap-3' : ''}`}
                        aria-label={label}
                    >
                        <Map className="h-5 w-5 shrink-0 text-gray-600" />
                        {listItem && <span>{label}</span>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        );
    },
);

MessageHistoryMapButton.displayName = 'MessageHistoryMapButton';

export default MessageHistoryMapButton;
