export default {
    runTestMethod(tests, method) {
        try {
            toast(`Test ${method} started`)
            sleep(2000)
            tests[method]()
        } catch (e) {
            log(e.toString())
        }
    },

    runTestAssemble(tests) {
        for (let i in tests) {
            this.runTestMethod(tests, i)
        }
        toast("Test all finished")
    }
}