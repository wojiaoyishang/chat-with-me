Chat Surface 模块
=================

.. js:module:: src/features/chat/ChatPage

``ChatPage`` 当前负责 Conversation 加载、消息树、流式 Event、编辑/重生成、摘要、Context、Story、
Workspace 和语音装配，是后续拆分的重要边界。

关键子目录
----------

``page/components``
   Header、加载页、消息概览、模型预览和导航。

``page/hooks``
   Speech、Window Mode、Upload 等复杂生命周期。

``page/utils``
   消息摘要、网络合并和纯函数。

``ui``
   ChatBox、Message、ToolButtons 和输入交互。

新增代码规则
------------

* 纯数据合并进入 utils；
* 生命周期进入 Hook；
* 视觉组件进入 components；
* 协议逻辑留 Runtime；
* 新领域能力不要继续增加 ChatPage 顶层 state/effect。

完整函数和内部回调见 :doc:`../api/javascript/features/chat/ChatPage` 及
:doc:`../api/javascript/features/index`。
