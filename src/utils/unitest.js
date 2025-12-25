import { assert } from "node:console"

export default {
    assertEquals(actual, expected, message) {
        const passed = actual === expected
        if (passed) {
            log(`✓ ${message}: 通过 (期望: ${expected}, 实际: ${actual})`)
        } else {
            log(`✗ ${message}: 失败 (期望: ${expected}, 实际: ${actual})`)
        }
        return passed
    },

    assertLength(value, length, message) {
        const passed = Array.isArray(value) && value.length === length
        if (passed) {
            log(`✓ ${message}: 通过 (长度为 ${length})`)
        } else {
            log(`✗ ${message}: 失败 (长度为 ${value.length})`)
        }
        return passed
    },

    assertNotNull(value, message) {
        const passed = value !== null && value !== undefined
        if (passed) {
            log(`✓ ${message}: 通过 (值不为空)`)
        } else {
            log(`✗ ${message}: 失败 (值为空)`)
        }
        return passed
    },

    assertTrue(value, message) {
        const passed = value === true
        if (passed) {
            log(`✓ ${message}: 通过`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    },

    assertFalse(value, message) {
        const passed = value === false
        if (passed) {
            log(`✓ ${message}: 通过`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    },

    assertBoolean(value, message) {
        const passed = typeof value === 'boolean'
        if (passed) {
            log(`✓ ${message}: 通过 (值为布尔值)`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    },

    assertArray(value, message) {
        const passed = Array.isArray(value)
        if (passed) {
            log(`✓ ${message}: 通过 (值为数组)`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    },

    assertJson(value, message) {
        const passed = typeof value === 'object' && value !== null
        if (passed) {
            log(`✓ ${message}: 通过 (值为 JSON)`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    },

    assertGreaterThan(value, expected, message) {
        const passed = value > expected
        if (passed) {
            log(`✓ ${message}: 通过 (值大于 ${expected})`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    },

    assertLessThan(value, expected, message) {
        const passed = value < expected
        if (passed) {
            log(`✓ ${message}: 通过 (值小于 ${expected})`)
        } else {
            log(`✗ ${message}: 失败 (值为 ${value})`)
        }
        return passed
    }
}