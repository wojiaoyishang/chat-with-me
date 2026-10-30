/** Project a committed deletion using the server's selected branch, never a guessed sibling. */
export const projectMessageDeletion = (messages, order, messageId, response) => {
    const activeOrder = response?.activeOrder;
    const parentId = response?.parentMessageId;
    const childId = response?.activeChildMessageId;
    if (!Array.isArray(activeOrder) || !parentId || !Object.hasOwn(response, 'activeChildMessageId')
        || activeOrder.some((id) => typeof id !== 'string' || !id)
        || new Set(activeOrder).size !== activeOrder.length || activeOrder.includes(messageId)) {
        throw new Error('删除响应缺少有效的当前分支，请刷新会话后重试。');
    }
    const parentIndex = activeOrder.indexOf(parentId);
    if (parentIndex < 0 || (activeOrder[parentIndex + 1] || null) !== childId) {
        throw new Error('删除响应的分支信息不一致，请刷新会话后重试。');
    }
    const visibleIndex = order.indexOf(messageId);
    if (visibleIndex < 0 || !messages[parentId]) return null;

    const removed = new Set();
    const pending = [messageId];
    while (pending.length) {
        const id = pending.pop();
        if (!id || removed.has(id)) continue;
        removed.add(id);
        const item = messages[id];
        pending.push(item?.nextMessage, ...(item?.messages || []));
    }
    if (activeOrder.some((id) => removed.has(id))) {
        throw new Error('删除响应仍包含已删除的消息，请刷新会话后重试。');
    }
    const nextMessages = {...messages};
    for (const id of removed) delete nextMessages[id];
    for (let index = 0; index < activeOrder.length; index++) {
        const id = activeOrder[index];
        if (nextMessages[id]) nextMessages[id] = {...nextMessages[id], nextMessage: activeOrder[index + 1] || null};
    }
    nextMessages[parentId] = {...nextMessages[parentId],
        messages: (nextMessages[parentId].messages || []).filter((id) => id !== messageId), nextMessage: childId};
    const activeIds = new Set(activeOrder);
    const prefix = order.slice(0, visibleIndex).filter((id) => id === '<PREV_MORE>' || activeIds.has(id));
    return {messages: nextMessages, prefix, parentId, childId};
};
