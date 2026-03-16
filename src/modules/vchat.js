/**
 * WX模块
 * 
 * @author tmkook
 * @version 1.0.0
 * @description Support 8.0.38 版本
 * @since 2025-12-20
 */
export default {

    /**
     * 包名
     */
    package: 'com.tencent.mm',

    /**
     * 收到新消息(需要打开通知)
     * @param {Function(notification)} callback
     */
    onMessage(callback) {
        events.observeNotification();
        events.onNotification((notification) => {
            if (notification.getPackageName() === this.package) {
                device.wakeUpIfNeeded()
                callback(notification)
            }
        })
    },

    /**
     * 返回到主界面最多 20 步
     * 
     * @returns boolean
     */
    backToHome() {
        for (let i = 0; i < 20; i++) {
            sleep(random(500, 1000))
            if (this.isHome()) {
                return true
            }
            back()
        }
        return false
    },

    /**
     * 打开APP并进入主界面
     * 
     * @returns boolean
     */
    openApp() {
        launch(this.package)
        waitForPackage(this.package)
        device.keepScreenDim(600000)
        return this.backToHome()
    },

    /**
     * 任务完成返回桌面息屏等待
     * 
     * @returns boolean
     */
    finish() {
        device.cancelKeepingAwake()
        const ret = this.backToHome()
        if (ret) {
            home()
        }
        return ret
    },

    /**
     * 获取底部 Tabs
     * 
     * @returns UICollect | null
     */
    getTabs() {
        const tabs = className("TextView").depth(15).find()
        return tabs.length === 4 ? tabs : null
    },

    /**
     * 获取当前 Tab 的索引值
     * 如果在主页则返回0到3的数字不在主页则返回-1
     * 
     * @returns number
     */
    getCurrentTab() {
        const tabs = this.getTabs()
        if (tabs) {
            for (let i in tabs) {
                if (tabs[i].selected()) {
                    return Number(i)
                }
            }
        }
        return -1
    },

    /**
     * 切换到指定 Tab 页
     * 
     * @returns boolean
     */
    setCurrentTab(index) {
        const tabs = this.getTabs()
        if (tabs && tabs[index]) {
            const rect = tabs[index].bounds()
            click(rect.centerX(), rect.centerY())
            sleep(random(100, 500))
            return true
        }
        return false
    },

    /**
     * 获取未读会话角标
     * 
     * @returns array
     */
    getUnreadSession() {
        let elements = []
        const num = className("TextView").drawingOrder(2).depth(20).find()
        const dot = className("ImageView").drawingOrder(3).depth(20).find()
        num.forEach(item => {
            elements.push(item)
        })
        dot.forEach(item => {
            elements.push(item)
        })
        return elements
    },

    /**
     * 打开一个未读会话
     * 
     * @returns boolean
     */
    openUnreadSession() {
        let unread = this.getUnreadSession()
        if (unread.length > 0) {
            let rand = random(10, 20)
            let rect = unread[0].bounds()
            click(rect.centerX() + rand, rect.centerY() + rand)
            return true
        }
        return false
    },

    /**
     * 打开屏幕顶部第一个会话
     * 
     * @returns boolean
     */
    openTopSession() {
        const top = className("LinearLayout").depth(18).findOnce()
        if (top) {
            top.parent().click()
            return true
        }
        return false
    },

    /**
     * 打开指定用户会话
     * @param {string} nickname 用户昵称
     * @returns boolean
     */
    openUserSession(nickname) {
        let search = desc("搜索").depth(13).findOne(5000)
        if (search) {
            search.click()
            let edit = className("EditText").depth(11).findOne(5000)
            if (edit) {
                setText(nickname)
                const user = textContains(nickname).depth(16).findOne(5000)
                if (user) {
                    const rect = user.bounds()
                    click(rect.centerX(), rect.centerY())
                    click(rect.centerX(), rect.centerY())
                    return true
                }
                back()
            }
        }
        return false
    },

    /**
     * 是否开启了免打扰
     * 
     * @returns boolean
     */
    getDoNotDisturb() {
        return className("ImageView").depth(16).exists();
    },

    /**
     * 开启勿扰模式
     * 
     * @param {boolean} enable
     * @returns boolean
     */
    setDoNotDisturb(enable) {
        let status = this.getDoNotDisturb()
        if (status != enable) {
            let info = desc("聊天信息").depth(18).findOnce()
            if (info) {
                info.click()
                sleep(random(500, 1000))
                const pos = text("查找聊天记录").depth(20).findOnce()
                if (pos) {
                    const rect = pos.bounds()
                    click(rect.centerX(), rect.centerY() + random(150, 180))
                    sleep(random(500, 1000))
                    back()
                    return true
                }
                sleep(random(500, 1000))
                back()
            }
        }
        return false
    },

    /**
     * 置顶会话
     * 
     * @param {boolean} enable
     * @returns boolean
     */
    topSession(enable) {
        const header = classNameContains("FrameLayout").depth(19).findOnce()
        if (header) {
            const rand = random(10, 20)
            const rect = header.parent().parent().bounds()
            longClick(rect.centerX() + rand, rect.bottom + rand)
            sleep(random(500, 1000))
            let menu = enable ? '置顶该聊天' : '取消置顶'
            let top = text(menu).depth(3).findOnce()
            if (top) {
                top.click()
                return true
            }
        }
        back()
        return false
    },

    /**
     * 删除会话
     * 
     * @returns boolean
     */
    delSession() {
        const header = classNameContains("FrameLayout").depth(19).findOnce()
        if (header) {
            const rand = random(10, 20)
            const rect = header.parent().parent().bounds()
            longClick(rect.centerX() + rand, rect.bottom + rand)
            sleep(random(500, 1000))
            let del = text("删除该聊天").depth(3).findOnce()
            if (del) {
                del.click()
                sleep(random(500, 1000))
                let ok = text("知道了").findOnce()
                if (ok) {
                    ok.click()
                    sleep(random(500, 1000))
                }
                let confirm = text("删除").findOnce()
                if (confirm) {
                    confirm.click()
                    return true
                }
            }
        }
        back()
        return false
    },

    /**
     * 退出群聊
     * 
     * @returns boolean
     */
    leaveGroup() {
        if (this.isGroupChat()) {
            desc("聊天信息").depth(18).click()
            let list = className("ListView").depth(13).findOne(2000)
            for (let i = 0; i < 10; i++) {
                list.scrollDown()
                const leave = text("退出群聊").depth(16).findOne(2000)
                if (leave) {
                    let rect = leave.bounds()
                    click(rect.centerX(), rect.centerY())
                    let confirm = text("退出").depth(10).findOne(2000)
                    if (confirm) {
                        confirm.click()
                    }
                    return true
                }
            }
            back()
        }
        return false
    },

    /**
     * 将会话列表滚动到顶部(双击顶部)
     * 
     * @returns boolean
     */
    scrollToFirstSession() {
        const rand = random(5, 10)
        const x = device.width * 0.7 + rand
        const y = 10 * rand
        click(x, y)
        click(x, y)
        return true
    },

    /**
     * 将下一个未读会话滚动到顶部(双击第一个Tab)
     * 
     * @returns boolean
     */
    scrollToNextUnreadSession() {
        const tabs = this.getTabs()
        if (tabs) {
            const rect = tabs[0].bounds()
            click(rect.centerX(), rect.centerY())
            click(rect.centerX(), rect.centerY())
            return true
        }
        return false
    },

    /**
     * 聊天中滚动到第一个未读消息
     * 
     * @returns boolean
     */
    scrollToUnreadMessage() {
        let more = className("LinearLayout").depth(14).findOnce()
        if (more) {
            more.click()
            return true
        }
        return false
    },

    /**
     * 打开聊天窗口工具
     * 
     * @returns boolean
     */
    openChatTools() {
        let album = className("TextView").text("相册").findOne(5000)
        if (!album) {
            const more = className("ImageButton").descContains("更多功能按钮").findOnce()
            if (more) {
                more.click()
                return true
            } else {
                return false
            }
        }
        return true
    },

    /**
     * 切换到文字输入
     * 
     * @returns boolean
     */
    switchToTextInput() {
        const keyboard = className("ImageButton").desc("切换到键盘").findOnce()
        if (keyboard) {
            keyboard.click()
            return true
        }
        return false
    },

    /**
     * 切换到语音输入
     * 
     * @returns boolean
     */
    switchToVoiceInput() {
        const voice = className("ImageButton").desc("切换到按住说话").findOnce()
        if (voice) {
            voice.click()
            return true
        }
        return false
    },

    /**
     * 发送文字
     * 
     * @returns boolean
     */
    sendText(content) {
        if (className("Button").desc("按住说话").exists()) {
            this.switchToTextInput()
            sleep(100)
        }
        setText(content)
        let btn = className("Button").text("发送").findOne(5000)
        if (btn) {
            btn.click()
            return true
        }
        return false
    },

    /**
     * 发送自定义表情
     * @param {string} name 
     * @param {number} index 
     */
    sendCustomEmoji(name, index) {
        let keyboard = className("ImageButton").desc("键盘").findOnce()
        if (!keyboard) {
            let btn = className("ImageButton").desc("表情").findOne(1000)
            if (btn) {
                btn.click()
            }
        }
        let search = className("ImageView").desc("搜索表情").findOne(1000)
        if (search) {
            search.parent().click()
            let isopen = desc("精选表情").findOne(5000)
            if (isopen) {
                setText(name)
                className("ImageView").depth(15).findOne(20000)
                let emojis = className("ImageView").depth(15).find();
                if (emojis.nonEmpty()) {
                    if (!index) {
                        index = 0
                    }
                    let rect = emojis[index].bounds()
                    click(rect.centerX(), rect.centerY())
                    return true
                }
            }
        }
        back()
        return false
    },

    /**
     * 发送图片
     * @param {array} index 相册中的图片索引
     * @param {boolean} source 是否发送原图
     * 
     * @returns boolean
     */
    sendPhoto(index, source) {
        if (this.isChat() && this.openChatTools()) {
            let album = className("TextView").text("相册").findOne(5000)
            if (album) {
                let rect = album.parent().bounds();
                click(rect.centerX(), rect.centerY())
                let preview = className("TextView").text("预览").findOne(5000)
                if (preview) {
                    if (source) {
                        click("原图")
                    }
                    const photos = className("CheckBox").depth(12).find()
                    if (photos.nonEmpty()) {
                        let has = false
                        for (let i in index) {
                            if (photos[i]) {
                                has = true
                                photos[i].click()
                                sleep(500)
                            }
                        }
                        if (has) {
                            click('发送')
                            return true
                        } else {
                            back()
                        }
                    }
                }
            }
        }
        return false
    },

    /**
     * 接收新的好友请求
     * 
     * @returns boolean
     */
    receiveNewFriendRequest() {
        if (this.setCurrentTab(1)) {
            let menu = text("新的朋友").depth(23).findOnce()
            if (menu) {
                let rect = menu.bounds()
                click(rect.centerX(), rect.centerY())
                sleep(random(500, 1000))
                return true
            }
        }
        return false
    },

    /**
     * 接收聊天窗口的好友请求(删的好友)
     * 
     * @returns boolean
     */
    receiveOldFriendRequest() {
        let has = text("对方还不是你的朋友").depth(15).findOnce()
        if (has) {
            let rect = has.bounds()
            click(rect.centerX(), rect.centerY())
            sleep(random(500, 1000))
            let contact = text("添加到通讯录").findOnce()
            if (contact) {
                let rect2 = contact.bounds()
                click(rect2.centerX(), rect2.centerY())
                sleep(random(500, 1000))
                text("完成").click()
                return true
            }
        }
        return false
    },

    /**
     * 是否在主界面
     * 
     * @returns boolean
     */
    isHome() {
        return this.getCurrentTab() === 0
    },

    /**
     * 是否在聊天界面
     * 
     * @returns boolean
     */
    isChat() {
        return className("ImageButton").descContains("切换").exists()
    },

    /**
     * 是否是群聊
     * 
     * @returns boolean
     */
    isGroupChat() {
        return className("TextView").depth(21).exists()
    },

    /**
     * 是否是公众号
     * 
     * @returns boolean
     */
    isOfficialAccount() {
        return desc("公众号").depth(12).exists()
    },

    /**
     * 是否是公众号
     * 
     * @returns boolean
     */
    isServiceAccount() {
        return desc("服务号").depth(12).exists()
    },

    /**
     * 是否是企微
     * 
     * @returns boolean
     */
    isWorkAccount() {
        return className("TextView").depth(10).exists()
    },

    /**
     * 是否是服务通知
     * 
     * @returns boolean
     */
    isServiceNotice() {
        return desc("更多").depth(18).exists()
    },

    /**
     * 获取聊天消息
     * 
     * @returns [MessageObject]
     */
    getMessages() {
        let messages = [];
        let list = classNameContains("RecyclerView").depth(17).findOnce()
        if (list) {
            let recents = list.children()
            recents.forEach((item) => {
                messages.push(new MessageObject(item))
            });
        }
        return messages
    }
}

const MessageObject = function (UIObject) {
    this.UIObject = UIObject

    /**
     * 获取所有文字
     * 
     * @returns [string]
     */
    this.getText = function () {
        let msgs = []
        let views = this.UIObject.find(className("TextView"))
        if (views.nonEmpty()) {
            views.forEach(item => {
                msgs.push(item.text())
            })
            if (this.isPhoto()) {
                msgs.push("图片")
            }
        }
        return msgs
    }

    /**
     * 获取聊天文字消息
     * 
     * @returns [string]
     */
    this.getMessage = function () {
        let msg1 = this.UIObject.findOne(className("TextView").depth(22))
        let msg2 = this.UIObject.findOne(className("TextView").depth(23))
        if (msg1) {
            return msg1.text()
        }
        if (msg2) {
            return msg2.text()
        }
        return ""
    }

    /**
     * 获取昵称
     * 
     * @returns string
     */
    this.getUser = function () {
        let avatar = this.UIObject.findOne(className("ImageView").depth(21)) || this.UIObject.findOne(className("ImageView").depth(22))
        if (avatar) {
            let user = avatar.desc()
            return user.replace("头像", "")
        }
        return ""
    }

    /**
     * 获取时间
     * 
     * @returns string
     */
    this.getTime = function () {
        let dt = this.UIObject.findOne(className("TextView").depth(19))
        if (dt) {
            return dt.text()
        }
        return ""
    }

    /**
     * 是否是语音消息
     * 
     * @returns boolean
     */
    this.voiceToText = function () {
        let toText = this.UIObject.findOne(className("RelativeLayout").depth(21))
        if (toText) {
            toText.click()
            sleep(random(500, 1000))
            return true
        }
        return false
    }

    /**
     * 是否是语音消息
     * 
     * @returns string
     */
    this.getVoiceText = function () {
        let voiceText = this.UIObject.findOne(className("RelativeLayout").depth(22))
        if (voiceText) {
            let rectText = voiceText.bounds()
            longClick(rectText.centerX(), rectText.centerY())
            sleep(random(500, 1000))
            click(rectText.left - 20, rectText.top - 50)
            sleep(random(500, 1000))
            let edit = className("EditText").findOnce()
            if (edit) {
                edit.click()
                edit.paste()
                sleep(random(500, 1000))
                let edit2 = className("EditText").findOnce()
                return edit2.text()
            }
        }
        return ""
    }

    /**
     * 是否是语音消息
     * 
     * @returns boolean
     */
    this.isVoice = function () {
        let voice = this.UIObject.find(descContains("语音"))
        return voice.nonEmpty()
    }

    /**
     * 是否是图片
     * 
     * @returns boolean
     */
    this.isPhoto = function () {
        let photo = this.UIObject.find(descContains("图片"))
        return photo.nonEmpty()
    }

    /**
     * 保存图片
     * 
     * @returns boolean
     */
    this.savePhoto = function () {
        let photo = this.UIObject.findOnce(descContains("图片"))
        if (photo) {
            photo.parent().click()
            sleep(random(500, 1000))
            let save = className("FrameLayout").depth(20).drawingOrder(4).findOnce()
            save.click()
            back()
            return true
        }
        return false
    }

    /**
     * 提取图片中的文字
     * 
     * @returns string
     */
    this.getPhotoText = function () {
        let ocrs = []
        let photo = this.UIObject.findOnce(descContains("图片"))
        if (photo) {
            photo.parent().click()
            sleep(random(500, 1000))
            let more = className("FrameLayout").depth(20).drawingOrder(6).findOnce()
            more.click()
            sleep(random(500, 1000))
            let ocr = text("提取文字").depth(13).findOnce()
            if (ocr) {
                ocr.parent().parent().click()
                let ts = className("TextView").depth(18).find()
                if (ts.nonEmpty()) {
                    ts.forEach(item => {
                        ocrs.push(item.text())
                    })
                    back()
                }
            }
            back()
        }
        return ocrs.join("")
    }

    /**
     * 是否是好友发送
     * 
     * @returns boolean
     */
    this.isFriend = function () {
        let avatar = this.UIObject.findOne(className("ImageView").depth(21))
        if (avatar) {
            let rect = avatar.bounds()
            return rect.left < 50
        }
        return false
    }

    /**
     * 是否是红包
     * 
     * @returns boolean
     */
    this.isRedPacket = function () {
        let redpacket = this.UIObject.find(textContains("红包").depth(25))
        return redpacket.nonEmpty()
    }

    /**
     * 领取红包
     * 
     * @returns string
     */
    this.getRedPacket = function () {
        let redpacket = this.UIObject.findOne(textContains("红包").depth(25))
        if (redpacket) {
            let isReceived = this.UIObject.findOne(textContains("已").depth(26))
            if (isReceived) {
                return true
            }
            let box = this.UIObject.findOne(className("FrameLayout").depth(22))
            if (box) {
                box.click()
                let open = className("ImageButton").depth(11).findOne(10000)
                if (open) {
                    let cover = open.bounds()
                    click(cover.centerX(), cover.centerY())
                    className("ImageView").depth(16).findOne(10000)
                    sleep(random(500, 1000))
                    back()
                    return true
                }
                back()
            }
        }
        return false
    }
}