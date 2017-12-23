@file:Suppress("unused")

package lsystem

import lsystem.THREE.Vector3
import kotlin.math.PI
import kotlin.math.roundToInt
import kotlin.test.Test
import kotlin.test.assertEquals

class LSystemTests {
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

    @Test fun interpret_output_as_navigation_commands_in_2d_space() {
        val halfPi = PI / 2
        "".toPoints(angle = halfPi) expectToEqual sequenceOf(Vector3(0, 0, 0))
        "F".toPoints(angle = halfPi) expectToEqual sequenceOf(Vector3(0, 0, 0), Vector3(0, 10, 0))

        //  _|
        // |_
        //   |
        "F+F-F-F+F".toPoints(angle = halfPi).map{ it.roundToInt() } expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(0, 10, 0),
            Vector3(-10, 10, 0),
            Vector3(-10, 20, 0),
            Vector3(0, 20, 0),
            Vector3(0, 30, 0)
        )
    }
}

private fun Vector3.roundToInt() = Vector3(x.roundToInt(), y.roundToInt(), z.roundToInt())

infix fun Sequence<Vector3>.expectToEqual(expected: Sequence<Vector3>) = assertEquals(
    expected.map { it.toXYZString() }.toList(),
    this.map { it.toXYZString() }.toList()
)
infix fun <T> T.expectToEqual(expected: T) = assertEquals(expected, this)

