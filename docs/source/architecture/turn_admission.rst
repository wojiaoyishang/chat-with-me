连续输入与 Turn Admission
================================================================================

前端不再把 ``generating`` 状态等同于“禁止一切新输入”。Composer 根据当前输入内容决定用户意图，并由后端 Turn Admission 决定最终并发语义。

普通生成中的新输入
--------------------------------------------------------------------------------

生成过程中输入框为空时，发送按钮仍表示“停止生成”。当输入框已有文本或附件时，按钮切换为发送箭头，表示“打断当前回答并发送新消息”。请求使用：

.. code-block:: javascript

   {
     sendButtonStatus: 'normal',
     admissionPolicy: 'interrupt',
     inputSource: 'chat'
   }

.. important::

   前端只表达用户意图，不自行取消 Run。真正的 Run 抢占、Task Mode 判断、Tool Approval 取消和 Worker cancellation 由后端统一处理。

Task Mode
--------------------------------------------------------------------------------

Task Mode 生成期间输入普通文本时继续使用 ``task.interrupt``，保持现有任务、清单和已完成结果。附件暂不作为任务补充发送；结构性编辑由后端执行 Task 终止后再进入新 Turn。

Realtime Voice
--------------------------------------------------------------------------------

实时语音允许在普通生成仍进行时进入 Voice Surface。真正检测到用户讲话并完成 Transcript 后，后端通过 ``admissionPolicy=interrupt`` 处理：普通 Run 被抢占，Task Mode 则转为软打断。

.. note::

   ``voice.turn.committed`` 返回 ``admissionAction=task_interrupt`` 时，该 Voice Turn 没有创建第二个 durable Turn，前端不能把它加入等待 ``turn.completed`` 的 ``activeTurnIds``。
