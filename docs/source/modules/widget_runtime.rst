Widget 与 Markdown 模块
======================

.. js:module:: src/components/markdown/card-block/widget/WidgetHost

``WidgetHost`` 选择 Widget Renderer、处理状态和 Action，并与消息 Replacement 关联。

.. js:module:: src/components/markdown/card-block/widget/CanvasCardDeck

``CanvasCardDeck`` 实现卡片布局、左右滑、撤回、分类、全屏和提交。

.. js:module:: src/components/markdown/replacementProtocol

解析/生成 ``cardReplace`` 占位和 Replacement ID。修改协议时要兼容已有持久消息或提供迁移。

.. js:module:: src/components/markdown/MarkdownRenderer

装配 Markdown Plugin、代码高亮、Math、Directive 和 Card Block。

.. warning::

   Widget 渲染器只接受受控 Schema。禁止 ``dangerouslySetInnerHTML`` 执行模型生成脚本。

完整函数和匿名交互回调见 :doc:`../api/javascript/components/index`。
