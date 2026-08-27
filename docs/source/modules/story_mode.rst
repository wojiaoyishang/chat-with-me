Story Mode
==========

Story Reader 位于 ``src/features/story/StoryReader.jsx``。Story 是独立持久资源，Reader 只负责
展示篇幅以及协调图片、视频、TTS 和篇幅导航；Conversation 仍通过 ``ChatPage`` 装配 Story API
与现有 Speech Runtime。

篇幅媒体
--------

每个 Story Part 可以同时具有文字、图片和一个可选视频。视频字段由后端序列化：

``videoUrl``
   浏览器可播放的视频资源。内部上传资源使用 ``cwm://artifact/{id}``，外部资源使用完整
   ``https://`` URL。

``videoPosition``
   ``auto / top / bottom / left / right``。当同一篇幅同时存在图片和视频时，``auto`` 不再等价于
   ``top``：宽屏由 ``media/storyMediaLayout.js`` 计算智能双媒体布局，移动端自动堆叠；显式
   ``top / bottom / left / right`` 仍然覆盖自动布局。

``videoAutoplay``
   是否在篇幅展示时自动播放视频，缺省为 ``true``。

``videoMuted``
   自动播放时是否静音，缺省为 ``true``。默认静音也能减少浏览器 Autoplay Policy 拒绝。

``videoLoop``
   是否循环播放视频，缺省为 ``false``。普通阅读时循环持续生效；Story Auto Play Session 中
   ``before / after`` 始终只消费一遍，``alongside`` 可在 TTS 尚未结束时继续循环，并在当前循环
   完成后进入下一篇，避免循环视频永久阻塞自动播放。

``videoTiming``
   Story 自动播放会话包含 TTS 时的视频时序：``before`` 表示视频结束后再朗读；
   ``alongside`` 表示视频和朗读同时开始（默认）；``after`` 表示朗读结束后再播放视频。

智能媒体布局
------------

当一个篇幅同时存在 ``imageUrl`` 与 ``videoUrl``，且 ``videoPosition=auto`` 时，Reader 使用统一
Media Deck，而不是让视频单独占满整行。图片宽高优先使用后端保存的 ``imageWidth/imageHeight``；
视频宽高在 ``loadedmetadata`` 后读取。宽屏下两个媒体项按宽高比估算等视觉高度所需宽度，并把
图片比例限制在 30%~55%，避免竖图或视频过度挤压另一侧。小于 768px 时自动改为上下堆叠。

``storyMediaLayout.js`` 是纯布局函数，不依赖 React/API。这是有意的边界：浏览器后续直接导出
Story HTML/打印布局时可以复用同一份布局决策，而不必复制 Reader 的条件分支。

自动播放会话
------------

原“朗读当前篇幅”入口升级为页面级 Auto Play Session。用户开启后，Reader 仍复用现有
``useChatSpeech`` / ``handleSpeakContentRequest``，没有独立的 TTS Runtime。

* 自动播放状态属于 Story Reader 页面生命周期，不持久化到 Conversation；
* 自动下一篇、手动上一篇/下一篇都只切换当前播放目标，不会关闭 Auto Play Session；
* 切换篇幅时会终止旧篇幅的 TTS/视频，再根据新篇幅参数继续播放；
* 只有用户点击“结束自动播放”或关闭 Story 页面才退出该 Session；
* 故事仍在生成且到达当前尾部时，Session 保持开启并等待后续 ``part_appended``；
* 视频自己的 ``videoAutoplay`` 与 Auto Play Session 分离：未开启 Story 自动播放时，视频仍可
  按篇幅配置自动播放，但不会自动切换篇幅。

协同时序
--------

开启 Auto Play Session 后，一个篇幅的终止条件为：

* 无自动视频：TTS 结束；
* ``before``：视频结束 -> TTS 结束；
* ``alongside``：视频与 TTS 都结束；
* ``after``：TTS 结束 -> 视频结束。

如果浏览器拒绝视频 ``play()``，Reader 不让自动播放链路永久阻塞：显示提示并将该视频阶段视为
已完成，继续 TTS 或下一篇。用户仍可通过原生 ``video`` controls 手动播放。
