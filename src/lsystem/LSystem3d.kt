package lsystem

import lsystem.THREE.Vector3
import kotlin.coroutines.experimental.buildSequence

class LSystem3d(
    var axiom: String,
    var rules: Map<Char, String>,
    var angle: Double,
    val closedPath: Boolean = false,
    val stepLength: Double = 10.0
) {
    fun generatePoints(iterations: Int = 3): Sequence<Vector3> {
        return applyRules(axiom, iterations).toPoints(stepLength)
    }

    private fun applyRules(input: String, iterations: Int): String {
        if (iterations == 0) return input
        val result = input
            .asIterable()
            .joinToString("") { char ->
                rules[char] ?: char.toString()
            }
        return applyRules(result, iterations - 1)
    }

    private fun String.toPoints(stepLength: Double): Sequence<Vector3> {
        return buildSequence {
            val startPoint = Vector3(0, 0, 0)
            yield(startPoint.clone())

            var angles = Vector3(0, 0, 0)
            var p = startPoint.clone()
            val stack = emptyArray<Pair<Vector3, Vector3>>()
            forEach { c ->
                when (c) {
                    'F', 'G', 'H', 'I' -> {
                        val v = Vector3(0, stepLength, 0)
                        v.applyEuler(THREE.Euler(angles.x, angles.y, angles.z, "XYZ"))
                        p.add(v)
                        yield(p.clone())
                    }

                    '+' -> angles.z += this@LSystem3d.angle
                    '-' -> angles.z -= this@LSystem3d.angle

                    '<' -> angles.x += this@LSystem3d.angle
                    '>' -> angles.x -= this@LSystem3d.angle
                    '|' -> angles.x -= this@LSystem3d.angle * 2

                    '^' -> angles.y += this@LSystem3d.angle
                    '&' -> angles.y -= this@LSystem3d.angle

                    '[' -> stack.push(Pair(p.clone(), angles.clone()))
                    ']' -> {
                        val removed = stack.pop()
                        p = removed.first
                        angles = removed.second
                        yield(emptyVector)
                    }
                }
            }
            if (closedPath) yield(startPoint.clone())
        }
    }

    companion object {
        val emptyVector = Vector3(Double.NaN, Double.NaN, Double.NaN)
    }
}