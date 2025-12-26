import tester from '../../src/utils/unitest'
import vchat from '../../src/modules/vchat'

export default {
    testOpenApp() {
        tester.assertTrue(vchat.openApp(), 'vchat.openApp')
    },

    testGetTabs() {
        tester.assertLength(vchat.getTabs(), 4, 'vchat.getTabs')
    },

    testSetCurrentTabToExplorer() {
        tester.assertTrue(vchat.setCurrentTab(2), 'vchat.setCurrentTab-2')
    },

    testCurrentTabIsExplorer() {
        tester.assertEquals(vchat.getCurrentTab(), 2, 'vchat.getCurrentTab')
    },

    testSetCurrentTabToHome() {
        tester.assertTrue(vchat.setCurrentTab(0), 'vchat.setCurrentTab-0')
    },

    testCurrentTabIsHome() {
        tester.assertEquals(vchat.getCurrentTab(), 0, 'vchat.getCurrentTab')
    },

    testIsHome() {
        tester.assertTrue(vchat.isHome(), 'vchat.isHome')
    },

    testGetUnreadSession() {
        tester.assertArray(vchat.getUnreadSession(), 'vchat.getUnreadSession')
    },

    testOpenUnreadSession() {
        tester.assertTrue(vchat.openUnreadSession(), 'vchat.openUnreadSession')
    },

    testOpenTopSession() {
        tester.assertTrue(vchat.openTopSession(), 'vchat.openTopSession')
    },

    testOpenChatTools() {
        tester.assertTrue(vchat.openChatTools(), 'vchat.openChatTools')
    },

    testIsChat() {
        tester.assertTrue(vchat.isChat(), 'vchat.isChat')
    },

    testIsGroupChat() {
        tester.assertBoolean(vchat.isGroupChat(), 'vchat.isGroupChat')
    },

    testIsOfficialAccount() {
        tester.assertBoolean(vchat.isOfficialAccount(), 'vchat.isOfficialAccount')
    },

    testIsServiceAccount() {
        tester.assertBoolean(vchat.isServiceAccount(), 'vchat.isServiceAccount')
    },

    testIsWorkAccount() {
        tester.assertBoolean(vchat.isWorkAccount(), 'vchat.isWorkAccount')
    },

    testIsServiceNotice() {
        tester.assertBoolean(vchat.isServiceNotice(), 'vchat.isServiceNotice')
    },

    testSwitchToVoiceInput() {
        tester.assertTrue(vchat.switchToVoiceInput(), 'vchat.switchToVoiceInput')
    },

    testSwitchToTextInput() {
        tester.assertTrue(vchat.switchToTextInput(), 'vchat.switchToTextInput')
    },

    testSendText() {
        tester.assertTrue(vchat.sendText('Hello, world!'), 'vchat.sendText')
    },

    testSendCustomEmoji() {
        tester.assertTrue(vchat.sendCustomEmoji('剪刀石头布'), 'vchat.sendCustomEmoji')
    },

    testSendPhoto() {
        tester.assertTrue(vchat.sendPhoto([0]), 'vchat.sendPhoto')
    },

    testSetDoNotDisturb() {
        tester.assertTrue(vchat.setDoNotDisturb(true), 'vchat.setDoNotDisturb-true')
        sleep(1000)
        tester.assertTrue(vchat.setDoNotDisturb(false), 'vchat.setDoNotDisturb-false')
    },

    testLeaveGroup() {
        tester.assertTrue(vchat.leaveGroup(), 'vchat.leaveGroup')
    },

    testBackToHome() {
        tester.assertTrue(vchat.backToHome(), 'vchat.backToHome')
    },

    testScrollToFirstSession() {
        tester.assertTrue(vchat.scrollToFirstSession(), 'vchat.scrollToFirstSession')
    },

    testScrollToNextUnreadSession() {
        tester.assertTrue(vchat.scrollToNextUnreadSession(), 'vchat.scrollToNextUnreadSession')
    },

    testTopSession() {
        tester.assertTrue(vchat.topSession(true), 'vchat.topSession-true')
        sleep(1000)
        tester.assertTrue(vchat.topSession(false), 'vchat.topSession-false')
    },

    testDelSession() {
        tester.assertTrue(vchat.delSession(), 'vchat.delSession')
    },

    openUserSession() {
        tester.assertTrue(vchat.openUserSession('文件传输助手'), 'vchat.openUserSession')
    },

    getMessages() {
        let messages = vchat.getMessages()
        for (let i in messages) {
            let item = messages[i]
            tester.assertArray(item.getText(), "message.getText")
            tester.assertBoolean(item.isPhoto(), "message.isPhoto")
            tester.assertBoolean(item.isFriend(), "message.isFriend")
            tester.assertBoolean(item.isRedPacket(), "message.isRedPacket")
            tester.assertBoolean(item.getRedPacket(), "message.getRedPacket")
        }
    },

    testFinish() {
        tester.assertTrue(vchat.finish(), 'vchat.finish')
    },
}