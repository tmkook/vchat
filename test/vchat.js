import tester from '../src/utils/unitest'
import vchat from '../src/modules/vchat'

export default {
    testOpenApp() {
        tester.assertTrue(vchat.openApp(), 'vchat.openApp')
    },

    testTabs() {
        tester.assertLength(vchat.getTabs(), 4, 'vchat.getTabs')
        tester.assertTrue(vchat.setCurrentTab(0), 'vchat.setCurrentTab')
        tester.assertEquals(vchat.getCurrentTab(), 0, 'vchat.getCurrentTab')
        tester.assertTrue(vchat.isHome(), 'vchat.isHome')
    },

    testScrollToNextUnreadSession() {
        tester.assertTrue(vchat.scrollToNextUnreadSession(), 'vchat.scrollToNextUnreadSession')
    },

    testScrollToFirstSession() {
        tester.assertTrue(vchat.scrollToFirstSession(), 'vchat.scrollToFirstSession')
    },

    testOpenUserSession() {
        tester.assertTrue(vchat.openUserSession('文件传输助手'), 'vchat.openUserSession')
    },

    testSendText() {
        tester.assertTrue(vchat.sendText('Hello, world!'), 'vchat.sendText')
    },

    testSendPhoto() {
        tester.assertTrue(vchat.sendPhoto([0], true), 'vchat.sendPhoto')
    },

    testSendCustomEmoji() {
        tester.assertTrue(vchat.sendCustomEmoji('开心', 0), 'vchat.sendCustomEmoji')
    },

    testBackToHome() {
        tester.assertTrue(vchat.backToHome(), 'vchat.backToHome')
    },

    testTopSession() {
        tester.assertTrue(vchat.topSession(true), 'vchat.topSession')
    },

    testDelSession() {
        tester.assertTrue(vchat.delSession(), 'vchat.delSession')
    },

    testOpenSession() {
        let unread = vchat.getUnreadSession()
        tester.assertArray(unread, 'vchat.getUnreadSession')
        if (unread.length > 0) {
            tester.assertTrue(vchat.openUnreadSession(), 'vchat.openUnreadSession')
        } else {
            tester.assertTrue(vchat.openTopSession(), 'vchat.openTopSession')
        }
    },

    testChatStatus() {
        tester.assertBoolean(vchat.isChat(), 'vchat.isChat')
        tester.assertBoolean(vchat.isGroupChat(), 'vchat.isGroupChat')
        tester.assertBoolean(vchat.isOfficialAccount(), 'vchat.isOfficialAccount')
        tester.assertBoolean(vchat.isServiceAccount(), 'vchat.isServiceAccount')
        tester.assertBoolean(vchat.isWorkAccount(), 'vchat.isWorkAccount')
        tester.assertBoolean(vchat.isServiceNotice(), 'vchat.isServiceNotice')
    },

    testScrollToUnreadMessage() {
        tester.assertBoolean(vchat.scrollToUnreadMessage(), 'vchat.scrollToUnreadMessage')
    },

    testChatTools() {
        tester.assertTrue(vchat.openChatTools(), 'vchat.openChatTools')
    },

    testSwitchToVoiceInput() {
        tester.assertTrue(vchat.switchToVoiceInput(), 'vchat.switchToVoiceInput')
    },

    testSwitchToTextInput() {
        tester.assertTrue(vchat.switchToTextInput(), 'vchat.switchToTextInput')
    },

    testDoNotDisturb() {
        let enable = vchat.getDoNotDisturb()
        tester.assertBoolean(enable, 'vchat.getDoNotDisturb')
        tester.assertTrue(vchat.setDoNotDisturb(!enable), 'vchat.setDoNotDisturb')
    },

    testGetMessages() {
        let voiceTested = false
        let photoTested = false
        let redPacketTested = false
        let messages = vchat.getMessages()
        tester.assertArray(messages, 'vchat.getMessages')
        for (let i in messages) {
            let item = messages[i]

            // 基础方法测试
            tester.assertArray(item.getText(), `message[${i}].getText`)
            tester.assertNotNull(item.getMessage(), `message[${i}].getMessage`)
            tester.assertNotNull(item.getUser(), `message[${i}].getUser`)
            tester.assertNotNull(item.getTime(), `message[${i}].getTime`)

            // 类型判断方法测试
            tester.assertBoolean(item.isPhoto(), `message[${i}].isPhoto`)
            tester.assertBoolean(item.isVoice(), `message[${i}].isVoice`)
            tester.assertBoolean(item.isFriend(), `message[${i}].isFriend`)
            tester.assertBoolean(item.isRedPacket(), `message[${i}].isRedPacket`)

            // 语音消息相关测试（只测试第一条语音消息）
            if (!voiceTested && item.isVoice()) {
                tester.assertBoolean(item.voiceToText(), "message.voiceToText")
                sleep(1000)
                tester.assertNotNull(item.getVoiceText(), "message.getVoiceText")
                voiceTested = true
            }

            // 图片消息相关测试（只测试第一条图片消息）
            if (!photoTested && item.isPhoto()) {
                tester.assertBoolean(item.savePhoto(), "message.savePhoto")
                sleep(1000)
                tester.assertNotNull(item.getPhotoText(), "message.getPhotoText")
                photoTested = true
            }

            // 红包相关测试（只测试第一个红包）
            if (!redPacketTested && item.isRedPacket()) {
                tester.assertBoolean(item.getRedPacket(), "message.getRedPacket")
                redPacketTested = true
            }
        }
    },

    testReceiveOldFriendRequest() {
        tester.assertBoolean(vchat.receiveOldFriendRequest(), 'vchat.receiveOldFriendRequest')
    },

    testLeaveGroup() {
        tester.assertBoolean(vchat.leaveGroup(), 'vchat.leaveGroup')
    },

    testReceiveNewFriendRequest() {
        vchat.setCurrentTab(1)
        sleep(1000)
        tester.assertBoolean(vchat.receiveNewFriendRequest(), 'vchat.receiveNewFriendRequest')
    },

    testFinish() {
        tester.assertTrue(vchat.finish(), 'vchat.finish')
    },
}