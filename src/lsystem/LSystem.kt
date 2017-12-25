package lsystem

import lsystem.THREE.Euler
import lsystem.THREE.Vector3
import kotlin.coroutines.experimental.buildSequence
import kotlin.math.PI

/**
 * See https://en.wikipedia.org/wiki/L-system
 */
class LSystem(
    var axiom: String,
    var rules: Map<Char, String>,
    var angle: Double,
    val closedPath: Boolean = false,
    val stepLength: Double = 10.0
) {
    fun generatePoints(iterations: Int = 3): Sequence<Vector3> {
        return applySubstitutionRules(axiom, rules)
            .take(iterations + 1)
            .last().toPoints(angle, stepLength, closedPath)
    }
}

fun applySubstitutionRules(axiom: String, rules: Map<Char, String>, input: String = axiom): Sequence<String> = buildSequence {
    var result = input
    while (true) {
        yield(result)
        result = result.asIterable()
            .joinToString("") { char ->
                rules[char] ?: char.toString()
            }
    }
}

fun String.toPoints(
    angle: Double,
    stepLength: Double = 10.0,
    closedPath: Boolean = false,
    startPoint: Vector3 = Vector3(0, 0, 0),
    startDirection: Vector3 = Vector3(1, 0, 0)
): Sequence<Vector3> {
    return buildSequence {
        yield(startPoint.clone())

        var point = startPoint.clone()
        var v = startDirection.clone()
        v.multiplyScalar(stepLength)
        val stack = emptyArray<Pair<Vector3, Vector3>>()

        forEach { c ->
            when (c) {
                'F', 'G', 'H', 'I' -> {
                    point.add(v)
                    yield(point.clone())
                }

                '+' -> v.applyEuler(Euler(0, 0, angle, "XYZ"))
                '-' -> v.applyEuler(Euler(0, 0, -angle, "XYZ"))

                '^' -> v.applyEuler(Euler(0, angle, 0, "XYZ"))
                '&' -> v.applyEuler(Euler(0, -angle, 0, "XYZ"))

                '<' -> v.applyEuler(Euler(angle, 0, 0, "XYZ"))
                '>' -> v.applyEuler(Euler(-angle, 0, 0, "XYZ"))
                '|' -> v.applyEuler(Euler(-2 * angle, 0, 0, "XYZ"))

                '[' -> stack.push(Pair(point.clone(), v.clone()))
                ']' -> {
                    val removed = stack.pop()
                    point = removed.first
                    v = removed.second
                    yield(dontConnectDots)
                    yield(point.clone())
                }
            }
        }
        if (closedPath) yield(startPoint.clone())
    }
}


fun Int.toRadians(): Double = toDouble().toRadians()
fun Double.toDegrees(): Double = (this / PI) * 180
fun Double.toRadians(): Double = (this / 180) * PI

fun Vector3.toXYZString() = if (this === dontConnectDots) "dcd" else "$x $y $z"
val dontConnectDots = Vector3(Double.NaN, Double.NaN, Double.NaN)
