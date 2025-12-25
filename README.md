一个基于安卓无障碍的自动聊天测试框架，无需ROOT只要不到 10 行代码即可实现自动消息回复。本项目运行于 `Hamibot` 在开始前你需要了解如何安装并使用 `Hamibot` 相关文档可见 [Hamibot 文档](https://docs.hamibot.com/)

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
    vchat.openTopSession()
    vchat.sendText("Hello world")
    vchat.finish()
})
```

# 已完成API

- `onMessage(callback)` 监听新消息通知，回调接收 `notification` 对象
- `finish()` 结束任务并回到主屏，取消常亮，返回是否成功
- `openApp()` 启动并保持屏幕常亮 10 分钟
- `getTabs()` 获取底部 Tab 集合，未找到返回 `null`
- `getCurrentTab()` 获取当前选中 Tab 下标（0-3），非主页返回 `-1`
- `setCurrentTab(index)` 切换到底部指定 Tab，成功返回 `true`
- `hasUnreadSession()` 返回未读会话角标数量
- `openTopSession()` 打开会话列表顶部第一个会话
- `openUserSession(nickname)` 搜索并打开指定昵称会话，找不到则返回 `false`
- `doNotDisturb(enable)` 在会话信息里开/关 “消息免打扰”
- `topSession(enable)` 长按列表第一项并置顶该聊天或取消置顶
- `delSession()` 长按列表第一项并删除该聊天
- `leaveGroup()` 在群聊信息页退出群聊
- `scrollToFirstSession()` 将会话列表滚动到顶部
- `scrollToNextUnreadSession()` 通过点击底部 Tab 将下一个未读会话置顶
- `openChatTools()` 展开聊天窗口的 “更多功能” 面板
- `switchToTextInput()` 切换为文字输入模式
- `switchToVoiceInput()` 切换为语音输入模式
- `sendText(text)` 在聊天界面发送文本消息
- `sendCustomEmoji(name)` 发送自定义表情（按名称匹配）
- `sendPhoto([index], source)` 通过相册发送图片，如索引 [0,1] 为相册第一张和第二张，`source` 为是否原图
- `backToHome()` 最多退回 20 步直至主页
- `isHome()` 是否在主页
- `isChat()` 是否在聊天界面
- `isGroupChat()` 当前会话是否为群聊
- `isOfficialAccount()` 当前会话是否是公众号
- `isServiceAccount()` 当前会话是否是服务号
- `isWorkAccount()` 当前会话是否是企微号
- `isServiceNotice()` 当前会话是否是服务通知
- `getMessages()` 获取聊天消息，返回数组 [MessageObject]
- `MessageObject.getText()` 获取聊天详情文字返回数组 [string]
- `MessageObject.isPhoto()` 消息是否是照片
- `MessageObject.isFriend()` 发送方(true=好友，false=自己或系统)
- `MessageObject.isRedPacket()` 消息是否是红包
- `MessageObject.getRedPacket()` 领取红包


# 如何贡献
欢迎贡献代码，提交的代码必须在 `test` 中编写单元测试。编写完后执行 `npm run test` 获得最终执行 `dist/main.js` 文件。默认测试所有方法，你可以在文件末尾修改你需要测试的方法 `runTestMethod(obj,method)` 后执行单个功能的测试。

# 开发交流群

https://t.me/+OY7oyZrzyMQ5ZDRh