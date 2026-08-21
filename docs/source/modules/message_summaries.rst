消息概览缓存模块
================

.. js:module:: src/features/chat/page/utils/messageSummaries

.. js:data:: MESSAGE_SUMMARY_APPEND_OVERLAP

   增量加载时重新读取尾部数量，默认覆盖最新 User 和 Assistant 占位。

.. js:function:: getMessageSummaryAppendCursor(existingItems, overlap)

   根据最后 orderIndex 计算带重叠的后端 Cursor。

.. js:function:: mergeMessageSummaryItems(existingItems, incomingItems, options)

   追加模式下从入站页最小 orderIndex 替换旧尾部，再按 messageId 去重和排序；全量模式直接校准。

该算法解决 AI 最终正文覆盖空占位、编辑分支删除旧尾部和重复摘要。

完整函数见 :doc:`../api/javascript/features/chat/page/utils/messageSummaries`。
