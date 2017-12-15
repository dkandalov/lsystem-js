package lsystem

import kotlin.math.PI


val kochSnowflake = LSystem3d(
    axiom = "F--F--F",
    rules = mapOf('F' to "F+F--F+F"),
    angle = PI / 3,
    closedPath = true
)

val cesaroFractal = LSystem3d(
    axiom = "F",
    rules = mapOf('F' to "F+F-F-F+F"),
    angle = 85.toRadians()
)

val quadraticType2Curve = LSystem3d(
    axiom = "F",
    rules = mapOf('F' to "F+F-F-FF+F+F-F"),
    angle = PI / 2
)

// https://en.wikipedia.org/wiki/Hilbert_curve
val hilbertCurve = LSystem3d(
    axiom = "A",
    rules = mapOf(
        'A' to "-BF+AFA+FB-",
        'B' to "+AF-BFB-FA+"
    ),
    angle = PI / 2
)

val lindenmayerCurve = LSystem3d(
    axiom = "X",
    rules = mapOf(
        'X' to "XFYFX+F+YFXFY-F-XFYFX",
        'Y' to "YFXFY-F-XFYFX+F+YFXFY"
    ),
    angle = PI / 2
)

// https://en.wikipedia.org/wiki/Gosper_curve
val gosperCurve = LSystem3d(
    axiom = "F",
    rules = mapOf(
        'F' to "F-G--G+F++FF+G-",
        'G' to "+F-GG--G-F++F+G"
    ),
    angle = 60.toRadians()
)

// https://en.wikipedia.org/wiki/Sierpinski_triangle
val sierpinskiTriangle = LSystem3d(
    axiom = "F-G-G",
    rules = mapOf(
        'F' to "F-G+F+G-F",
        'G' to "GG"
    ),
    angle = 120.toRadians()
)

// https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve
val sierpinskiArrowheadCurve = LSystem3d(
    axiom = "F",
    rules = mapOf(
        'F' to "G-F-G",
        'G' to "F+G+F"
    ),
    angle = PI / 3
)

// https://en.wikipedia.org/wiki/Dragon_curve
val dragonCurve = LSystem3d(
    axiom = "FX",
    rules = mapOf(
        'X' to "X+YF+",
        'Y' to "-FX-Y"
    ),
    angle = PI / 2
)

val fractalPlant = LSystem3d(
    axiom = "X",
    rules = mapOf(
        'X' to "F[-X][X]F[-X]+FX",
        'F' to "FF"
    ),
    angle = 25.toRadians()
)

val hilbertCurve3d = LSystem3d(
    axiom = "X",
    rules = mapOf('X' to "^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->"),
    angle = PI / 2
)

val kochCurve3d = LSystem3d(
    axiom = "A",
    rules = mapOf(
        'A' to "[[[[F+F-F-F+F]G<G>G>G<G]H-H+H+H-H]I>I<I<I>I]",
        'F' to "F+F-F-F+F",
        'G' to "G<G>G>G<G",
        'H' to "H-H+H+H-H",
        'I' to "I>I<I<I>I"
    ),
    angle = PI / 2
)
