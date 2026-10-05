src/lib/resourceDownload 模块
================================================================================

.. js:module:: src/lib/resourceDownload

该模块提供跨 Feature 复用的浏览器或业务辅助函数。

.. note::

   本页由 ``docs/tools/generate_javascript_api.mjs`` 通过 TypeScript AST 静态生成。
   它不会启动 Vite、React、WebSocket 或浏览器 API；人工架构章节优先于自动推断。

源码与职责
--------------------------------------------------------------------------------

* **源码文件**：``src/lib/resourceDownload.js``
* **模块标识**：``src/lib/resourceDownload``
* **顶层函数/组件/Hook**：2
* **类**：0
* **局部函数与匿名回调**：1

主要依赖
--------------------------------------------------------------------------------

``./apiClient.js``、``@/config.js``。

顶层函数、组件与 Hook
--------------------------------------------------------------------------------

.. CWM-AST-FUNCTION src/lib/resourceDownload.js:87:618:FUNCTION

.. js:function:: isDocumentDownloadUrl(value)

   判断与 ``Document Download Url`` 相关的数据或状态。

   **性质**：同步函数；导出 API；源码第 ``4``—``17`` 行。

   **参数**

   ``value``
      待读取、转换或校验的值。

   **返回值**

   根据执行分支返回结果；代表性返回表达式为 ``( url.origin === base.origin && url.pathname.startsWith(\x60${prefix}/document/\x60) && /^\/document\/[A-Za-z0-9._-]+\/files\/download$/.test(url.pathname.slice(prefix.length)) )``、``false``。

   **副作用**

   * 读取或修改浏览器全局对象、页面或历史状态。

   **主要协作调用**：``base.pathname.replace``、``url.pathname.startsWith``、``/^\/document\/[A-Za-z0-9._-]+\/files\/download$/.test``、``url.pathname.slice``。

.. CWM-AST-FUNCTION src/lib/resourceDownload.js:618:1824:FUNCTION

.. js:function:: downloadDocumentResource(url)

   实现 ``downloadDocumentResource`` 对应的前端处理。

   **性质**：异步函数；导出 API；源码第 ``19``—``47`` 行。

   **参数**

   ``url``
      目标 HTTP、WebSocket 或虚拟资源地址。

   **返回值**

   无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

   **副作用**

   * 发起 HTTP 请求或访问外部服务。
   * 读取或修改浏览器全局对象、页面或历史状态。
   * 创建、使用或释放浏览器二进制资源。

   **显式抛出**：``new Error('Invalid document download URL')``、``error``。

   **主要协作调用**：``isDocumentDownloadUrl``、``apiClient.get``、``JSON.parse``、``error.response.data.text``、``/filename\*=UTF-8''([^;]+)/i.exec``、``/filename="([^"]+)"/i.exec``、``decodeURIComponent``、``URL.createObjectURL``、``document.createElement``、``document.body.append``、``link.click``、``link.remove``。

   **内部回调数量**：1。这些回调会在本页“局部函数与匿名回调”中逐项列出。

局部函数与匿名回调
--------------------------------------------------------------------------------

这些函数没有稳定的模块级导出名称，但仍会影响组件生命周期、事件处理和状态更新，因此逐项记录。

.. CWM-AST-FUNCTION src/lib/resourceDownload.js:1778:1814:FUNCTION

.. rubric:: ``setTimeout callback @ 46``

.. code-block:: javascript

   setTimeout callback @ 46()

设置与 ``Timeout`` 相关的数据或状态。

**性质**：同步局部函数；源码第 ``46``—``46`` 行；所属函数 ``downloadDocumentResource``。

**参数**

无。

**返回值**

无显式 return；普通函数完成时返回 ``undefined``，React 组件可能通过隐式 JSX 分支返回。

**副作用**

* 创建、使用或释放浏览器二进制资源。

**主要协作调用**：``URL.revokeObjectURL``。
