import {emitEvent} from "@/store/useEventStore.jsx"
/*
* 全局 websocket 事件处理
*/
export default function globalMessageCallback(message) {
    const {type, target, payload, markId, id, isReply} = message;  // 解构

    emitEvent({
        type: type,
        target: target,
        payload: payload,
        markId: markId,
        id: id,
        isReply: isReply,
        fromWebsocket: true  // 标记是否从 Websocket 来的
    });

}