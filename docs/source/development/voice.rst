开发语音功能
============

输入
----

* 麦克风权限只在用户动作后申请；
* 录音结束时停止 Track 和 AudioContext；
* PCM/Opus Chunk 使用 ArrayBuffer；
* VAD、ASR Provider 通过 Adapter 选择；
* 自动发送必须允许关闭。

输出
----

* 朗读请求使用本地事件触发；
* 后端结果只监听 incoming；
* Media Body 使用有界队列；
* 暂停、继续、停止和 seek 都要有状态机；
* 结束/取消时清理字幕和音频资源。

打断
----

未来 barge-in 检测到用户说话后：停止当前 Audio、发送 speech.cancel/turn interrupt、清空未播放缓冲、
进入 Listening。所有动作绑定当前 streamId/runId，不能取消新一轮。

测试
----

Mock WebSocket Media、AudioContext、Timer、StrictMode 双 effect、快速连续点击和组件卸载。

.. important::

   通配符 ``speech.*`` 监听器若既接 local/outgoing 又 reply，会形成异步递归。使用 direction 和
   Reply 隔离双重防护。
