package lsystem

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
    closedPath: Boolean = false
): Sequence<Vector3> {
    return buildSequence {
        val startPoint = Vector3(0, 0, 0)
        yield(startPoint.clone())

        var direction = Vector3(0, 0, 0)
        var p = startPoint.clone()
        val stack = emptyArray<Pair<Vector3, Vector3>>()
        forEach { c ->
            when (c) {
                'F', 'G', 'H', 'I' -> {
                    val v = Vector3(0, stepLength, 0)
                    v.applyEuler(THREE.Euler(direction.x, direction.y, direction.z, "XYZ"))
                    p.add(v)
                    yield(p.clone())
                }

                '+' -> direction.z += angle
                '-' -> direction.z -= angle

                '<' -> direction.x += angle
                '>' -> direction.x -= angle
                '|' -> direction.x -= angle * 2

                '^' -> direction.y += angle
                '&' -> direction.y -= angle

                '[' -> stack.push(Pair(p.clone(), direction.clone()))
                ']' -> {
                    val removed = stack.pop()
                    p = removed.first
                    direction = removed.second
                    yield(nanVector)
                }
            }
        }
        if (closedPath) yield(startPoint.clone())
    }
}


fun Int.toRadians(): Double = toDouble().toRadians()
fun Double.toDegrees(): Double = (this / PI) * 180
fun Double.toRadians(): Double = (this / 180) * PI

fun Vector3.toXYZString() = "$x $y $z"
val nanVector = Vector3(Double.NaN, Double.NaN, Double.NaN)
