package lsystem

import kotlin.math.PI
import kotlin.math.round

class LSystemEditor {
    val lSystemPresenters = listOf(
        LSystemPresenter(kochSnowflake, name = "Koch snowflake", url = "https://en.wikipedia.org/wiki/Koch_snowflake"),
        LSystemPresenter(kochCurve, name = "Koch curve", url = "https://en.wikipedia.org/wiki/L-system#Example_4:_Koch_curve"),
        LSystemPresenter(hexaFlake, name = "Hexa flake", url = "https://en.wikipedia.org/wiki/N-flake#Hexaflake"),
//        LSystemPresenter(cesaroFractal, name = "Cesaro fractal", url = "http://mathworld.wolfram.com/CesaroFractal.html"),
        LSystemPresenter(lindenmayerCurve, name = "Lindenmayer curve", url = "https://akademikmatematik.tr.gg/Hilbert-Curve.htm"),
        LSystemPresenter(gosperCurve, name = "Gosper curve", url = "https://en.wikipedia.org/wiki/Gosper_curve"),
        LSystemPresenter(sierpinskiTriangle, name = "Sierpinski triangle", url = "https://en.wikipedia.org/wiki/Sierpinski_triangle"),
        LSystemPresenter(sierpinskiArrowheadCurve, name = "Sierpinski arrow head triangle", url = "https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve"),
        LSystemPresenter(dragonCurve, maxIterations = 14, name = "Dragon curve", url = "https://en.wikipedia.org/wiki/Dragon_curve"),
        LSystemPresenter(fractalPlant, name = "Plant", url = "https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant"),
        LSystemPresenter(hilbertCurve, name = "Hilbert curve", url = "https://en.wikipedia.org/wiki/Hilbert_curve"),
        LSystemPresenter(hilbertCurve3d, name = "Hilbert curve 3d", url = "https://math.stackexchange.com/questions/123642/representing-a-3d-hilbert-curve-as-an-l-system")
    )
    var presenter = lSystemPresenters.first()
    var debugMode = false
    private var debugStepSize = 1

    fun generatePoints(): List<THREE.Vector3> {
        val points = presenter.generatePoints().toList()
        return points.let {
            if (debugMode) it.take(debugStepSize) else it
        }
    }

    fun changeIterationCount(increment: Int) {
        presenter.iterations += increment
        if (presenter.iterations > presenter.maxIterations) {
            presenter.iterations = presenter.maxIterations
        }
        if (presenter.iterations <= 0) {
            presenter.iterations = 0
        }
    }

    fun increaseDebugStep() {
        if (debugMode) debugStepSize++
    }

    fun decreaseDebugStep() {
        if (debugMode) debugStepSize--
    }

    fun changeAngle(value: Double) {
        presenter.lSystem.apply {
            angle = round((angle + value).toDegrees()).toRadians()
            if (angle < 0) angle += 2 * PI
            if (angle > 2 * PI) angle -= 2 * PI
        }
    }

    class LSystemPresenter(
        val lSystem: LSystem,
        val maxIterations: Int = 9,
        val name: String = "",
        val url: String? = null
    ) {
        var iterations: Int = 2

        fun generatePoints(): Sequence<THREE.Vector3> {
            return lSystem.generatePoints(iterations)
        }
    }
}