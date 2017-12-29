package lsystem

import kotlin.math.PI
import kotlin.math.round

class LSystemEditor {
    val lSystemPresenters = listOf(
        LSystemPresenter(kochSnowflake, title = "Koch snowflake", url = "https://en.wikipedia.org/wiki/Koch_snowflake"),
        LSystemPresenter(cesaroFractal, title = "Cesaro fractal", url = "http://mathworld.wolfram.com/CesaroFractal.html"),
        LSystemPresenter(quadraticType2Curve, title = "Quadratic type 2", url = "https://en.wikipedia.org/wiki/Koch_snowflake#Variants_of_the_Koch_curve"),
        LSystemPresenter(hilbertCurve, title = "Hilbert curve", url = "https://en.wikipedia.org/wiki/Hilbert_curve"),
        LSystemPresenter(lindenmayerCurve, title = "Lindenmayer curve"),
        LSystemPresenter(gosperCurve, title = "Gosper curve", url = "https://en.wikipedia.org/wiki/Gosper_curve"),
        LSystemPresenter(sierpinskiTriangle, title = "Sierpinski triangle", url = "https://en.wikipedia.org/wiki/Sierpinski_triangle"),
        LSystemPresenter(sierpinskiArrowheadCurve, title = "Sierpinski arrow head triangle", url = "https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve"),
        LSystemPresenter(dragonCurve, maxIterations = 14, title = "Dragon curve", url = "https://en.wikipedia.org/wiki/Dragon_curve"),
        LSystemPresenter(fractalPlant, title = "Plant", url = "https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant"),
//            LSystemPresenter(kochCurve3d, title = "Koch curve 3d", url = "https://github.com/Hiestaa/3D-Lsystem/blob/master/lsystem/KochCurve3D.py"),
        LSystemPresenter(hilbertCurve3d, title = "Hilbert Curve 3d", url = "https://math.stackexchange.com/questions/123642/representing-a-3d-hilbert-curve-as-an-l-system")
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

    fun changeLSystem(direction: Int) {
        val i = lSystemPresenters.indexOfFirst { it.lSystem == presenter.lSystem } + direction
        presenter = when {
            i < 0 -> lSystemPresenters.last()
            i >= lSystemPresenters.size -> lSystemPresenters.first()
            else -> lSystemPresenters[i]
        }
        debugMode = false
        debugStepSize = 0
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
        val title: String = "",
        val url: String? = null
    ) {
        var iterations: Int = 1

        fun generatePoints(): Sequence<THREE.Vector3> {
            return lSystem.generatePoints(iterations)
        }
    }
}