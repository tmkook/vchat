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
     * 收到新消息
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
     * 任务完成进入息屏等待状态
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
     * 打开APP
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
     * 获取底部 tabs
     * 
     * @returns UICollect | null
     */
    getTabs() {
        const tabs = className("TextView").depth(15).find()
        return tabs.length === 4 ? tabs : null
    },

    /**
     * 获取当前 Tab 的索引值
     * 如果在主页则返回0到3的数字
     * 如果不在主页则返回-1
     * 
     * @returns number
     */
    currentTab() {
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
    switchTab(index) {
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
     * 是否存在未读会话
     * 
     * @returns number
     */
    hasUnreadSession() {
        const dot = className("ImageView").drawingOrder(1).depth(20).find()
        return dot.length
    },

    /**
     * 打开屏幕顶部第一个会话
     * 
     * @returns boolean
     */
    openTopSession() {
        const header = classNameContains("FrameLayout").depth(19).findOnce()
        if (header) {
            const rand = random(10, 20)
            const rect = header.parent().parent().bounds()
            click(rect.centerX() + rand, rect.bottom + rand)
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
        desc("搜索").depth(13).click()
        sleep(random(500, 1000))
        setText(nickname)
        sleep(1000)
        const user = textContains(nickname).depth(16).findOnce()
        if (user) {
            const rect = user.bounds()
            click(rect.centerX(), rect.centerY())
            return true
        }
        back()
        return false
    },

    /**
     * 开启勿扰模式
     * 
     * @param {boolean} enable
     * @returns boolean
     */
    doNotDisturb(enable) {
        desc("聊天信息").depth(18).click()
        sleep(random(500, 1000))
        const isEnable = descContains("消息免打扰").depth(12).findOnce() != null
        if (isEnable == enable) {
            back()
            return true
        }
        const pos = text("查找聊天记录").depth(20).findOnce()
        if (pos) {
            const rect = pos.bounds()
            click(rect.centerX(), rect.centerY() + random(150, 180))
            back()
            return true
        }
        back()
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
        desc("聊天信息").depth(18).click()
        sleep(random(500, 1000))
        const leave = text("退出群聊").depth(16).findOnce()
        if (leave) {
            leave.click()
            sleep(random(500, 1000))
            text("退出").depth(10).click()
            return true
        }
        back()
        return false
    },

    /**
     * 将会话列表滚动到顶部
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
     * 将下一个未读会话滚动到顶部
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
     * 打开聊天窗口工具
     * 
     * @returns boolean
     */
    openChatTools() {
        const group = classNameContains("ViewGroup").depth(20).findOnce()
        if (!group) {
            const more = descContains("更多功能按钮").findOnce()
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
     * 是否在主界面
     * 
     * @returns boolean
     */
    isHome() {
        return this.getTabs() != null
    },

    /**
     * 是否在聊天界面
     * 
     * @returns boolean
     */
    isChat() {
        return desc("表情").depth(20).findOnce() !== null
    },

    /**
     * 是否是群聊
     * 
     * @returns boolean
     */
    isGroupChat() {
        if (this.openChatTools()) {
            sleep(random(500, 1000))
            return text("群工具").depth(25).findOnce() !== null
        }
        return false
    },

    /**
     * 切换到文字输入
     * 
     * @returns boolean
     */
    switchToTextInput() {
        const keyboard = desc("切换到键盘").depth(21).findOnce()
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
        const voice = desc("切换到按住说话").depth(21).findOnce()
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
        this.switchToTextInput()
        sleep(random(500, 1000))
        setText(content)
        sleep(random(500, 1000))
        let btn = text("发送").depth(21).findOnce()
        if (btn) {
            btn.click()
            return true
        }
        return false
    },

    /**
     * 发送自定义表情
     * @param {string} name 
     */
    sendCustomEmoji(name) {
        let btn = desc("表情").depth(20).findOnce()
        if (btn) {
            btn.click()
            sleep(random(500, 1000))
            let custom = desc("自定义表情").depth(22).findOnce()
            if (custom) {
                custom.parent().click()
                sleep(random(500, 1000))
                let emoji = desc(name).depth(24).findOnce()
                if (emoji) {
                    emoji.parent().click()
                    return true
                }
            }
        }
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
            sleep(random(500, 1000))
            let album = text("相册").depth(25).findOnce()
            if (album) {
                let rect = album.bounds()
                click(rect.centerX(), rect.centerY())
                sleep(random(500, 1000))
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
                            sleep(100)
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
        return false
    }
}