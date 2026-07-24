import React, {memo, useEffect, useMemo, useRef} from 'react';
import {Bot, ChevronDown, MapPinned, Maximize2, Minimize2, Minus, PanelRight} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx';
import {Button} from '@/components/ui/button.tsx';
import ModelItem from './ModelItem.jsx';
import ModelPreviewCard from './ModelPreviewCard.jsx';
import StorySelectorButton from '@/features/story/StorySelectorButton.jsx';

const ChatHeader = memo(({
                             models,
                             selectedModel,
                             isModelPopoverOpen,
                             previewModel,
                             isMobile,
                             t,
                             handlePopoverOpenChange,
                             handleModelItemClick,
                             handleModelItemMouseEnter,
                             scrollToSelectedItem,
                             handleSidebarToggle,
                             onOpenMessageOverview,
                             messageOverviewDisabled = false,
                             isWindowMode,
                             handleDragMouseDown,
                             handleDragTouchStart,
                             handleDragTouchMove,
                             handleDragTouchEnd,
                             isDragReady,
                             showWindowButton,
                             onToggleWindow,
                             showMinimizeButton = false,
                             onMinimize,
                             conversationMeta,
                             stories = [],
                             onOpenStory,
                         }) => {
    const modelListRef = useRef(null);
    const isAgentSession = conversationMeta?.conversationKind === 'agent_session';
    const agentSessionName = conversationMeta?.agentSession?.name;
    const agentSessionDepth = Number(conversationMeta?.agentSession?.depth || 1);
    const nestedAllowed = conversationMeta?.agentSession?.allowNestedSubagents !== false;

    useEffect(() => {
        if (isModelPopoverOpen) {
            scrollToSelectedItem(modelListRef);
        }
    }, [isModelPopoverOpen, models, scrollToSelectedItem]);

    const modelItems = useMemo(() => {
        if (!models || models.length === 0) {
            return (
                <p className="text-center text-gray-500 py-4">
                    {t('no_models')}
                </p>
            );
        }

        return models.map((model) => {
            const isSelected = model.id === selectedModel?.id;
            const handleClick = () => handleModelItemClick(model);
            const handleMouseEnter = () => handleModelItemMouseEnter(model);

            return (
                <ModelItem
                    key={model.id}
                    model={model}
                    isSelected={isSelected}
                    isMobile={isMobile}
                    onMouseEnter={handleMouseEnter}
                    onClick={handleClick}
                    dataSelected={isSelected ? 'true' : 'false'}
                />
            );
        });
    }, [models, isMobile, handleModelItemClick, handleModelItemMouseEnter, selectedModel, t]);

    return (
        <header className="w-full bg-white flex items-center justify-between p-4 h-14">
            <Popover
                open={isAgentSession ? false : isModelPopoverOpen}
                onOpenChange={isAgentSession ? undefined : handlePopoverOpenChange}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        disabled={isAgentSession}
                        className={`justify-start px-0 hover:bg-transparent text-lg ${
                            isAgentSession ? 'cursor-default disabled:opacity-100' : 'cursor-pointer'
                        }`}
                    >
                        <span className="flex min-w-0 items-center gap-2">
                            <span className="min-w-0">
                                <span className="block truncate">
                                    {isAgentSession
                                        ? (agentSessionName || '复杂子智能体')
                                        : (selectedModel?.name || t('no_models'))}
                                </span>
                                {isAgentSession && (
                                    <span className="block truncate text-left text-[11px] font-normal text-gray-400">
                                        {selectedModel?.name || t('no_models')} · 第 {agentSessionDepth} 层 · {nestedAllowed ? '可创建下级' : '叶子会话'}
                                    </span>
                                )}
                            </span>
                            {isAgentSession && (
                                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600">
                                    <Bot className="h-3 w-3"/>
                                    子智能体
                                </span>
                            )}
                        </span>
                        {!isAgentSession && (
                            <ChevronDown
                                className={`ml-2 h-4 w-4 transition-transform duration-200 ${isModelPopoverOpen ? 'rotate-180' : ''}`}/>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className={isMobile ? 'w-[90vw] max-w-md p-4' : 'w-85'}
                    style={{zIndex: isWindowMode ? 100000 : undefined}}
                >
                    <div className="flex flex-col space-y-4">
                        <div
                            ref={modelListRef}
                            className="space-y-1 max-h-[200px] overflow-y-auto pr-1 pretty-scrollbar"
                        >
                            {modelItems}
                        </div>
                        {(!isMobile || (isMobile && previewModel)) && (
                            <ModelPreviewCard model={previewModel} isMobile={isMobile}/>
                        )}
                    </div>
                </PopoverContent>
            </Popover>

            {isWindowMode && (
                <div
                    className={`flex-1 mx-4 h-full cursor-move active:cursor-grabbing transition-colors rounded-md flex flex-col justify-center items-center ${isDragReady ? 'bg-gray-100/50' : ''}`}
                    onMouseDown={handleDragMouseDown}
                    onTouchStart={handleDragTouchStart}
                    onTouchMove={handleDragTouchMove}
                    onTouchEnd={handleDragTouchEnd}
                    onTouchCancel={handleDragTouchEnd}
                    style={{touchAction: 'none'}}
                >
                    {isMobile && <div className="w-10 h-1 bg-gray-300 rounded-full"/>}
                </div>
            )}

            <div className="flex items-center gap-2">
                <StorySelectorButton
                    stories={stories}
                    onOpenStory={onOpenStory}
                    t={t}
                    isWindowMode={isWindowMode}
                />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onOpenMessageOverview}
                    disabled={messageOverviewDisabled}
                    className="cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={t('message_overview') || '消息概览'}
                    title={t('message_overview') || '消息概览'}
                >
                    <MapPinned className="h-5 w-5 text-gray-600"/>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSidebarToggle}
                    className="cursor-pointer hover:bg-gray-100"
                >
                    <PanelRight className="h-5 w-5 text-gray-600"/>
                </Button>

                {showWindowButton && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleWindow}
                        className="cursor-pointer hover:bg-gray-100"
                    >
                        {isWindowMode ? (
                            <Maximize2 className="h-5 w-5 text-gray-600"/>
                        ) : (
                            <Minimize2 className="h-5 w-5 text-gray-600"/>
                        )}
                    </Button>
                )}

                {showMinimizeButton && onMinimize && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMinimize}
                        className="cursor-pointer hover:bg-gray-100"
                    >
                        <Minus className="h-5 w-5 text-gray-600"/>
                    </Button>
                )}
            </div>
        </header>
    );
});

ChatHeader.displayName = 'ChatHeader';

export default ChatHeader;
