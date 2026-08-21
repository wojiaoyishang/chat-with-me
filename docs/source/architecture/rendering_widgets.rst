Markdown、Replacement 与 Widget
===============================

Markdown
--------

``MarkdownRenderer`` 负责 GFM、Math、Highlight 和自定义 Directive。模型文本不能直接执行任意
HTML/脚本，渲染扩展要经过白名单组件。

Replacement
-----------

现有消息使用 ``{{cardReplace ...}}`` 把正文占位与 Tool/Thinking/Widget 的前后端表示关联。它是
兼容现有持久消息的协议，后续可逐步迁移为 Structured Message Parts。

Widget
------

``WidgetHost`` 根据 Widget 类型选择渲染器。Card Deck 支持滑动、撤回、分类和提交。Widget State
通过语义事件进入 Agent，而不是直接修改后端页面状态。

新增 Widget 的要求
------------------

#. 定义稳定 Schema、版本和默认值；
#. 提供空状态、Loading、Error、只读态；
#. 键盘、触摸和语音都能操作；
#. 事件包含 Widget ID、Action 和 Value；
#. 不在模型文本中嵌入可执行 JS；
#. 增加快照/交互测试和模块文档。

.. important::

   “生成式 UI”不是让模型输出任意 HTML，而是让模型从受控组件协议中选择并填充数据。
