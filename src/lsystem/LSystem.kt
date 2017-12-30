package lsystem

import lsystem.THREE.Quaternion
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
        val step = startDirection.clone()
        step.multiplyScalar(stepLength)

        var direction = THREE.Quaternion()
        val stack = emptyArray<Pair<Vector3, Quaternion>>()

        forEach { c ->
            when (c) {
                'F', 'G', 'H', 'I', 'f', 'g', 'h', 'i' -> {
                    point.add(step.clone().applyQuaternion(direction))
                    yield(point.clone())
                }

                '+' -> direction = direction.multiply(rotation(zAxis, angle))
                '-' -> direction = direction.multiply(rotation(zAxis, -angle))

                '^' -> direction = direction.multiply(rotation(yAxis, -angle))
                '&' -> direction = direction.multiply(rotation(yAxis, angle))

                '<' -> direction = direction.multiply(rotation(xAxis, -angle))
                '>' -> direction = direction.multiply(rotation(xAxis, angle))
                '|' -> direction = direction.multiply(rotation(xAxis, 2 * angle))

                '[' -> stack.push(Pair(point.clone(), direction.clone()))
                ']' -> {
                    val removed = stack.pop()
                    point = removed.first
                    direction = removed.second
                    yield(dontConnectDots)
                    yield(point.clone())
                }
            }
        }
        if (closedPath) yield(startPoint.clone())
    }
}

private fun rotation(axis: Vector3, angle: Double) =
    THREE.Quaternion().apply { setFromAxisAngle(axis, angle) }

private val xAxis = Vector3(1, 0, 0)
private val yAxis = Vector3(0, 1, 0)
private val zAxis = Vector3(0, 0, 1)

fun Int.toRadians(): Double = toDouble().toRadians()
fun Double.toDegrees(): Double = (this / PI) * 180
fun Double.toRadians(): Double = (this / 180) * PI

fun Vector3.toXYZString() = if (this === dontConnectDots) "dcd" else "$x $y $z"
fun Quaternion.toXYZWString() = "$x $y $z $w"
val dontConnectDots = Vector3(Double.NaN, Double.NaN, Double.NaN)
