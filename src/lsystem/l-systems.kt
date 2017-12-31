package lsystem

import kotlin.math.PI

// Misc links:
//  - http://www.robertdickau.com/kochsurface.html
//  - http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
//  - http://www.kevs3d.co.uk/dev/lsystems
//  - http://www.3dfractals.com/docs/3DFractals.pdf

val kochSnowflake = LSystem(
    axiom = "F--F--F",
    rules = mapOf('F' to "F+F--F+F"),
    angle = PI / 3
)

val kochCurve = LSystem(
    axiom = "F",
    rules = mapOf('F' to "F+F-F-F+F"),
    angle = PI / 2
)

val cesaroFractal = LSystem(
    axiom = "F",
    rules = mapOf('F' to "F+F-F-F+F"),
    angle = 85.toRadians()
)

val quadraticType2Curve = LSystem(
    axiom = "F",
    rules = mapOf('F' to "F+F-F-FF+F+F-F"),
    angle = PI / 2
)

val hilbertCurve = LSystem(
    axiom = "A",
    rules = mapOf(
        'A' to "-BF+AFA+FB-",
        'B' to "+AF-BFB-FA+"
    ),
    angle = PI / 2
)

val lindenmayerCurve = LSystem(
    axiom = "X",
    rules = mapOf(
        'X' to "XFYFX+F+YFXFY-F-XFYFX",
        'Y' to "YFXFY-F-XFYFX+F+YFXFY"
    ),
    angle = PI / 2
)

val gosperCurve = LSystem(
    axiom = "F",
    rules = mapOf(
        'F' to "F-G--G+F++FF+G-",
        'G' to "+F-GG--G-F++F+G"
    ),
    angle = 60.toRadians()
)

val sierpinskiTriangle = LSystem(
    axiom = "F-G-G",
    rules = mapOf(
        'F' to "F-G+F+G-F",
        'G' to "GG"
    ),
    angle = 120.toRadians()
)

val sierpinskiArrowheadCurve = LSystem(
    axiom = "F",
    rules = mapOf(
        'F' to "G-F-G",
        'G' to "F+G+F"
    ),
    angle = PI / 3
)

val dragonCurve = LSystem(
    axiom = "FX",
    rules = mapOf(
        'X' to "X+YF+",
        'Y' to "-FX-Y"
    ),
    angle = PI / 2
)

val fractalPlant = LSystem(
    axiom = "+++X",
    rules = mapOf(
        'X' to "F[-X][X]F[-X]+FX",
        'F' to "FF"
    ),
    angle = 25.toRadians()
)

val hilbertCurve3d = LSystem(
    axiom = "X",
    rules = mapOf('X' to "^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->"),
    angle = PI / 2
)

val kochCurve3d = LSystem(
    axiom = "A",
    rules = mapOf(
        // [[[[F+F-F-F+F]G<+G-G-G+G]H-H+H+H-H]I>+I-I-I+I]
        'A' to "[[[[F+F-F-F+F]G<+G-G-G+G]H-H+H+H-H]I>+I-I-I+I]",
        'F' to "F+F-F-F+F",
        'G' to "G<+G-G-G+G",
        'H' to "H-H+H+H-H",
        'I' to "I>+I-I-I+I"
    ),
    angle = PI / 2
)
