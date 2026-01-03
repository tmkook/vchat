一个基于安卓无障碍的自动聊天测试框架，无需 ROOT 只要不到 10 行代码即可实现自动消息回复。本项目运行于 `Autojs` 及相关衍生品如`Hamibot` 在开始前你需要了解如何安装并使用 `Hamibot` 相关文档可见 [Hamibot 文档](https://docs.hamibot.com/)

本项目仅供学习自动化测试使用，请勿用于商业及违法违规场景，由此引起的一切问题与本项目无关。

# 版本要求

- 系统版本：Android7+
- 软件版本：开发于 WX 8.0.38 版本

# 最优设置

- 设置电池选项，`关闭自动管理`，`允许自启动`，`允许关联启动`，`允许后台活动` 防止应用被杀后台
- 在设置中将手机自带的`安全相关`功能关闭（部分手机会检测弹窗和危险提示将APP进行管控）
- 在设置中将所有系统服务的`修改系统设置`权限全部关闭（部分手机会自动关闭无障碍权限）
- 关闭手机的`锁屏密码`（实现息屏状态下收到消息自动点亮屏幕打开APP操作）

# 开始使用

```
npx giget@latest gh:tmkook/vchat-starter-kit vchat
```

或者

```
gh repo clone tmkook/vchat-starter-kit
```

# 开发演示

在 `main.js` 中编写自动化逻辑，执行 `npm run build` 后获得最终执行代码 `dist/main.js` 文件

```
import { vchat } from 'vchat'
vchat.onMessage((notice) => {
    vchat.openApp()
    vchat.openUnreadSession()
    vchat.sendText("Hello world")
    vchat.finish()
})
```


# API

基于无障碍限制，以下所有操作只在可见的UI控件范围内有效。

## 基础操作

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| onMessage(callback) | Function(Notification) | — | 监听新消息通知（需要打开通知权限） |
| openApp() | — | boolean | 打开APP并进入主界面 |
| backToHome() | — | boolean | 返回到主界面，最多尝试 20 步 |
| finish() | — | boolean | 任务完成返回桌面息屏等待 |

## Tab 操作

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| getTabs() | — | UICollect \| null | 获取底部 Tabs 集合，未找到返回 `null` |
| getCurrentTab() | — | number | 获取当前 Tab 的索引值（0-3），不在主页返回 -1 |
| setCurrentTab(index) | number | boolean | 切换到指定 Tab 页 |

## 会话操作

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| getUnreadSession() | — | Array(UIObject) | 获取未读会话角标 |
| openUnreadSession() | — | boolean | 打开一个未读会话 |
| openTopSession() | — | boolean | 打开屏幕顶部第一个会话 |
| openUserSession(nickname) | string | boolean | 打开指定用户会话（通过搜索） |
| topSession(enable) | boolean | boolean | 置顶/取消置顶会话 |
| delSession() | — | boolean | 删除会话 |
| scrollToFirstSession() | — | boolean | 将会话列表滚动到顶部（双击顶部） |
| scrollToNextUnreadSession() | — | boolean | 将下一个未读会话滚动到顶部（双击第一个Tab） |

## 聊天界面操作

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| openChatTools() | — | boolean | 打开聊天窗口工具 |
| switchToTextInput() | — | boolean | 切换到文字输入 |
| switchToVoiceInput() | — | boolean | 切换到语音输入 |
| scrollToUnreadMessage() | — | boolean | 聊天中滚动到第一个未读消息 |
| sendText(content) | string | boolean | 发送文字消息 |
| sendCustomEmoji(name) | string | boolean | 发送自定义表情（按名称匹配） |
| sendPhoto(index, source) | Array(number), boolean | boolean | 发送图片，index 为相册中的图片索引数组（如 [0,1]），source 为是否发送原图 |
| leaveGroup() | — | boolean | 退出群聊 |
| getDoNotDisturb() | — | boolean | 是否开启了免打扰 |
| setDoNotDisturb(enable) | boolean | boolean | 开启/关闭勿扰模式 |

## 好友请求

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| receiveNewFriendRequest() | — | boolean | 接收新的好友请求 |
| receiveOldFriendRequest() | — | boolean | 接收聊天窗口的好友请求（已删除的好友） |


## 状态判断

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| isHome() | — | boolean | 是否在主界面 |
| isChat() | — | boolean | 是否在聊天界面 |
| isGroupChat() | — | boolean | 是否是群聊 |
| isOfficialAccount() | — | boolean | 是否是公众号 |
| isServiceAccount() | — | boolean | 是否是服务号 |
| isWorkAccount() | — | boolean | 是否是企微 |
| isServiceNotice() | — | boolean | 是否是服务通知 |

## 消息获取

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| getMessages() | — | Array(MessageObject) | null | 获取聊天消息列表，失败返回 `null` |

## MessageObject 对象方法

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| getText() | — | Array(string) | 获取所有文字内容 |
| getMessage() | — | string | 获取聊天文字消息 |
| getUser() | — | string | 获取发送者昵称 |
| getTime() | — | string | 获取消息时间 |
| voiceToText() | — | boolean | 将语音消息转换为文字 |
| getVoiceText() | — | string | 获取语音转文字后的内容 |
| isVoice() | — | boolean | 是否是语音消息 |
| isPhoto() | — | boolean | 是否是照片 |
| isFriend() | — | boolean | 是否是好友发送（true=好友，false=自己或系统） |
| isRedPacket() | — | boolean | 是否是红包 |
| getRedPacket() | — | boolean | 领取红包，已领取返回 true |


# 如何贡献
欢迎贡献代码，提交的代码须在 `test` 中编写单元测试。编写完后执行 `npm run test` 获得最终执行 `dist/main.js` 文件。默认测试所有方法，你可以在文件末尾修改你需要测试的方法 `runTestMethod(obj,method)` 后执行单个功能的测试。

# 开发交流群

https://t.me/+OY7oyZrzyMQ5ZDRh

# 机器人体验

https://hamibot.com/marketplace/BBrx8