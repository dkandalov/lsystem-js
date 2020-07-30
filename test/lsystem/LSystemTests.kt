package lsystem

import lsystem.THREE.Vector3
import kotlin.math.PI
import kotlin.math.roundToInt
import kotlin.test.Ignore
import kotlin.test.Test
import kotlin.test.assertEquals

class SubstitutionRulesTests {
    @Test fun algae_rules() {
        val axiom = "A"
        val rules = mapOf(
            'A' to "AB",
            'B' to "A"
        )
        val outputs = applySubstitutionRules(axiom, rules).take(5).toList()
        outputs expectToEqual listOf("A", "AB", "ABA", "ABAAB", "ABAABABA")
    }

    @Test fun fractal_binary_tree() {
        val axiom = "0"
        val rules = mapOf(
            '0' to "1[0]0",
            '1' to "11"
        )
        val outputs = applySubstitutionRules(axiom, rules).take(3).toList()
        outputs expectToEqual listOf("0", "1[0]0", "11[1[0]0]1[0]0")
    }

    @Test fun koch_curve() {
        val axiom = "F"
        val rules = mapOf(
            'F' to "F+F−F−F+F"
        )
        val outputs = applySubstitutionRules(axiom, rules).take(3).toList()
        outputs expectToEqual listOf("F", "F+F−F−F+F", "F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F")
    }
}

class InterpretationOfLSystemIn2dSpaceTests {
    @Test fun moving_forward() {
        "".toPoints(angle = PI / 2) expectToEqual sequenceOf(Vector3(0, 0, 0))
        "F".toPoints(angle = PI / 2) expectToEqual sequenceOf(Vector3(0, 0, 0), Vector3(10, 0, 0))
        "FF".toPoints(angle = PI / 2) expectToEqual sequenceOf(Vector3(0, 0, 0), Vector3(10, 0, 0), Vector3(20, 0, 0))
    }

    @Test fun koch_curve() {
        //   _
        // _| |_
        // →x ↑y
        "F+F-F-F+F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 10, 0),
            Vector3(20, 10, 0),
            Vector3(20, 0, 0),
            Vector3(30, 0, 0)
        )
    }

    @Test fun push_pop_current_position_and_angle_on_stack() {
        "F[F+F]F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0), Vector3(10, 0, 0), Vector3(20, 0, 0), Vector3(20, 10, 0),
            dontConnectDots, Vector3(10, 0, 0), Vector3(20, 0, 0)
        )
    }
}

class InterpretationOfLSystemIn3dSpaceTests {
    @Test fun pull_up_and_down() {
        "F^F^F^F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 0, 10),
            Vector3(0, 0, 10),
            Vector3(0, 0, 0)
        )
        "F&F&F&F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 0, -10),
            Vector3(0, 0, -10),
            Vector3(0, 0, 0)
        )
    }

    @Test fun tilt_on_its_own_does_not_affect_direction() {
        "F>F>F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(20, 0, 0),
            Vector3(30, 0, 0)
        )
        "F<F<F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(20, 0, 0),
            Vector3(30, 0, 0)
        )
    }

    @Test fun tilt_right_and_turn() {
        //      +
        //     /|
        //    + ↑
        // +→---+
        // →x ↗y ↑z
        "F>+F>+F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 0, 10),
            Vector3(10, -10, 10)
        )
        "F>+>+F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, -10, 0)
        )
    }

    @Test fun tilt_left_and_turn() {
        // +→---+
        //      |
        //      ↓
        //      +
        //     /
        //    +
        //  →x ↑y ↗z
        "F<+F<+F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 0, -10),
            Vector3(10, -10, -10)
        )
    }

    @Test fun pull_up_and_tilt() {
        //         +
        //        /
        //       +
        //       |
        //       ↑
        //  +→---+
        //  →x ↑y ↗z
        "F^<F^<F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 0, 10),
            Vector3(10, 10, 10)
        )
    }

    @Test fun pull_down_and_tilt() {
        //  +→---+
        //       |
        //       ↓
        //       +
        //      /
        //     +
        //  →x ↑y ↗z
        "F&<F&<F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(10, 0, 0),
            Vector3(10, 0, -10),
            Vector3(10, -10, -10)
        )
    }

    @Ignore
    @Test fun a() {
//      "^<F^<F-F^>>F&F+>>F-F>->"
        "^<F^<F-F".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
            Vector3(0, 0, 0),
            Vector3(0, 10, 0),
            Vector3(0, 10, 10),
            Vector3(0, 20, 10)
        )
//        "^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->".toPoints(angle = PI / 2).roundedToInt() expectToEqual sequenceOf(
//            Vector3(0, 0, 0),
//            Vector3(0, 10, 0),
//            Vector3(0, 10, 10)
//        )
    }
}

private fun Sequence<Vector3>.roundedToInt() = map {
    if (it === dontConnectDots) it
    else Vector3(it.x.roundToInt(), it.y.roundToInt(), it.z.roundToInt())
}

private infix fun Sequence<Vector3>.expectToEqual(expected: Sequence<Vector3>) = assertEquals(
    expected.map { it.toXYZString() }.toList(),
    this.map { it.toXYZString() }.toList()
)

private infix fun <T> T.expectToEqual(expected: T) = assertEquals(expected, this)

