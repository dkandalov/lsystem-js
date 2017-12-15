@file:Suppress("unused")

package lsystem

import kotlin.test.Test
import kotlin.test.assertEquals

class LSystemTest {
    @Test fun algae_rules() {
        val lSystem = LSystem("A", mapOf(
            'A' to "AB",
            'B' to "A"
        ))
        val outputs = lSystem.produce().take(5).toList()
        outputs expectToEqual listOf("A", "AB", "ABA", "ABAAB", "ABAABABA")
    }

    @Test fun fractal_binary_tree() {
        val lSystem = LSystem("0", mapOf(
            '0' to "1[0]0",
            '1' to "11"
        ))
        val outputs = lSystem.produce().take(3).toList()
        outputs expectToEqual listOf("0", "1[0]0", "11[1[0]0]1[0]0")
    }

    @Test fun Koch_curve() {
        val lSystem = LSystem("F", mapOf(
            'F' to "F+F−F−F+F"
        ))
        val outputs = lSystem.produce().take(3).toList()
        outputs expectToEqual listOf("F", "F+F−F−F+F", "F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F")
    }
}

infix fun <T> T.expectToEqual(expected: T) = assertEquals(expected, this)

