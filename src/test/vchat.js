import tester from '../utils/unitest'
import vchat from '../modules/vchat'

export default {
    testOpenApp() {
        tester.assertTrue(vchat.openApp(), 'vchat.openApp')
    },

    testGetTabs() {
        tester.assertLength(vchat.getTabs(), 4, 'vchat.getTabs')
    },

    testSwitchTabToExplorer() {
        tester.assertTrue(vchat.switchTab(2), 'vchat.switchTab-2')
    },

    testCurrentTabIsExplorer() {
        tester.assertEquals(vchat.currentTab(), 2, 'vchat.currentTab')
    },

    testSwitchTabToHome() {
        tester.assertTrue(vchat.switchTab(0), 'vchat.switchTab-0')
    },

    testCurrentTabIsHome() {
        tester.assertEquals(vchat.currentTab(), 0, 'vchat.currentTab')
    },

    testIsHome() {
        tester.assertTrue(vchat.isHome(), 'vchat.isHome')
    },

    testHasUnreadSession() {
        tester.assertTrue(vchat.hasUnreadSession() >= 0, 'vchat.hasUnreadSession')
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

    testDoNotDisturb() {
        tester.assertTrue(vchat.doNotDisturb(true), 'vchat.doNotDisturb')
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

    testDelSession() {
        tester.assertTrue(vchat.delSession(), 'vchat.delSession')
    },

    testTopSession() {
        tester.assertTrue(vchat.topSession(), 'vchat.topSession')
    },

    openUserSession() {
        tester.assertTrue(vchat.openUserSession('测试群功能'), 'vchat.openUserSession')
    },

    testFinish() {
        tester.assertTrue(vchat.finish(), 'vchat.finish')
    },
}