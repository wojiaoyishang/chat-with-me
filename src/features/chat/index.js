// Public entry for the chat feature. Keep page files importing from here
// so route components do not depend on internal feature folders.
export {default as ChatBox} from './ui/ChatBox.jsx';
export {default as MessageContainer} from './ui/MessageContainer.jsx';
export {getSpeakableSegments} from './ui/message/utils/speechContent.js';

export {default as ChatHeader} from './page/components/ChatHeader.jsx';
export {default as RightSidebar} from './page/components/RightSidebar.jsx';
export {default as ScrollToBottomButton} from './page/components/ScrollToBottomButton.jsx';
export {default as SpeechPlayer} from './page/components/SpeechPlayer.jsx';
export {default as ResizeHandles} from './page/components/ResizeHandles.jsx';
export {LoadingFailedScreen, LoadingScreen} from './page/components/LoadingScreens.jsx';

export {default as useChatWindowMode} from './page/hooks/useChatWindowMode.js';
export {default as useChatScroll} from './page/hooks/useChatScroll.js';
export {default as useFileUpload} from './page/hooks/useFileUpload.js';
export {default as useChatSpeech} from './page/hooks/useChatSpeech.js';

export * from './page/utils/networkMerge.js';
export * from './page/utils/messageMountPoints.js';
export * from './speech/speechRuntime.js';
export * from './ui/chatbox/utils/voiceRecorder.js';
