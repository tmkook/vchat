一个基于Autojs的自动聊天测试框架（仅供学习使用）需要一台安卓设备，关闭锁屏密码，开启无障碍，开启通知读取等权限后可息屏等待，收到消息自动回复，回复完自动返回桌面息屏。

# 安装

```
npm install @tmkook:vchat
```

# 使用

```
import vchat from 'vchat'
vchat.onMessage((notify) => {
    vchat.openApp()
    vchat.scrollToNextUnreadSession()
    vchat.openTopSession()
    vchat.switchToTextInput()
    vchat.sendText("Hello world")
    vchat.finish()
})
```

# API

- `onMessage(callback)`：监听新消息通知，回调接收 `notification` 对象。
- `finish()`：结束任务并回到主屏，取消常亮，返回是否成功。
- `openApp()`：启动并保持屏幕常亮 10 分钟。
- `getTabs()`：获取底部 Tab 集合，未找到返回 `null`。
- `currentTab()`：获取当前选中 Tab 下标（0-3），非主页返回 `-1`。
- `switchTab(index)`：切换到底部指定 Tab，成功返回 `true`。
- `hasUnreadSession()`：返回未读会话角标数量。
- `openTopSession()`：打开会话列表顶部第一个会话。
- `openUserSession(nickname)`：搜索并打开指定昵称会话，找不到则返回 `false`。
- `doNotDisturb(enable)`：在会话信息里开/关“消息免打扰”。
- `leaveGroup()`：在群聊信息页退出群聊。
- `topSession()`：长按列表第一项并置顶该聊天。
- `delSession()`：长按列表第一项并删除该聊天。
- `scrollToFirstSession()`：将会话列表滚动到顶部。
- `scrollToNextUnreadSession()`：通过点击底部“”Tab 将下一个未读会话置顶。
- `openChatTools()`：展开聊天窗口下方的“更多功能”面板。
- `isHome()`：是否在主页。
- `isChat()`：是否在聊天界面。
- `isGroupChat()`：是否当前会话为群聊（需先展开工具）。
- `switchToTextInput()`：切换为文字输入模式。
- `switchToVoiceInput()`：切换为语音输入模式。
- `sendText(text)`：在聊天界面发送文本消息。
- `sendCustomEmoji(name)`：发送自定义表情（按名称匹配）。
- `sendPhoto(index, source)`：通过相册发送图片，`index` 为索引数组，`source` 为是否原图。
- `backToHome()`：最多退回 20 步直至主页，成功返回 `true`。

# 开发交流群
https://t.me/+OY7oyZrzyMQ5ZDRh