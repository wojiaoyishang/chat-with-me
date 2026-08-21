维护开发说明书
================================================================================

CWM 前端文档与源码同步维护。开发者应能从文档快速理解 Transport、Protocol、Event Runtime、Store、Surface 和各 Feature 的职责，再进入函数级 API 定位实现。

文档边界
--------------------------------------------------------------------------------

人工章节解释架构和开发流程；完整 JavaScript API 由 TypeScript Compiler 静态分析 ``src/`` 生成。
测试目录、构建产物、Vite 缓存和项目外脚本不会进入函数参考。

.. important::

   只有 ``src/`` 属于前端运行时 API 文档范围。这样测试夹具或临时脚本的语法实验不会污染开发说明书；
   但 ``src/`` 本身存在语法错误时必须修复源码，而不是让文档工具跳过它。

构建文档
--------------------------------------------------------------------------------

构建入口位于 ``docs/make.bat``。在前端项目根目录执行：

.. code-block:: bat

   docs\make.bat

脚本依次执行 JavaScript API 生成、函数覆盖校验、RST 导航校验和 Sphinx 严格构建，最终输出：

``docs/_build/html/index.html``

首次构建若缺少 Sphinx：

.. code-block:: bat

   python -m pip install -r docs/requirements.txt

清理 HTML 构建产物：

.. code-block:: bat

   docs\make.bat clean

.. note::

   文档只维护一个批处理入口 ``docs\make.bat``。如果项目没有安装 TypeScript Compiler，构建会继续使用
   文档包中已经生成好的 JavaScript API 页面；只有在需要根据最新 ``src/`` 重新生成并执行 AST 新鲜度校验时，
   才需要在项目中安装 ``typescript`` 或设置 ``CWM_TYPESCRIPT_PATH``。构建脚本不会自动安装或修改 Node 依赖。

标题和目录规则
--------------------------------------------------------------------------------

章节索引页通过 ``.. title::`` 定义真实标题，``目录索引`` 是普通文字，不是标题。可见 Toctree 统一使用：

.. code-block:: rst

   .. toctree::
      :maxdepth: 1
      :titlesonly:

因此侧栏只展示章节和页面标题，不展开页面内部的二级、三级说明标题。

函数文档要求
--------------------------------------------------------------------------------

``src/`` 中每个 Function-like AST 节点都必须有对应条目，包括函数、组件、Hook、类方法、Effect 回调、事件回调、Promise 回调、集合回调和 JSX Handler。每条至少说明：

* 功能和调用上下文；
* 参数；
* 返回值；
* 状态、网络、DOM、Storage、Audio 等副作用；
* 显式异常；
* 主要协作调用。

.. tip::

   对公共组件、Hook 和运行时函数补充准确 JSDoc，可以显著提高自动 API 页的说明质量；生成器优先采用源码中的 JSDoc，再使用静态语义推断。
