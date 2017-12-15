package lsystem

import lsystem.LSystem3d.Companion.emptyVector
import lsystem.THREE.Color
import lsystem.THREE.EffectComposer
import lsystem.THREE.Geometry
import lsystem.THREE.Line
import lsystem.THREE.LineBasicMaterial
import lsystem.THREE.OrbitControls
import lsystem.THREE.PerspectiveCamera
import lsystem.THREE.Scene
import lsystem.THREE.Vector3
import lsystem.THREE.WebGLRenderer
import org.w3c.dom.*
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.PI
import kotlin.math.min
import kotlin.math.round

/**
 * Translation of https://github.com/mrdoob/three.js/blob/334ab72b4251f5dd0abc5c72a96942d438eae24a/examples/webgl_lines_cubes.html
 *
 * Misc links:
 *  - http://www.robertdickau.com/kochsurface.html
 *  - http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
 *  - http://www.kevs3d.co.uk/dev/lsystems
 *  - http://www.3dfractals.com/docs/3DFractals.pdf
 */
fun main() {
    init()
    animate()
}

lateinit var camera: PerspectiveCamera
lateinit var scene: Scene
lateinit var renderer: WebGLRenderer
lateinit var composer: EffectComposer
var windowHalfX = window.innerWidth / 2.0
var windowHalfY = window.innerHeight / 2.0

val material1 = LineBasicMaterial(object {}.applyDynamic {
    color = 0x000000
    linewidth = 5.0
    opacity = 1.0
    blending = THREE.AdditiveBlending
    transparent = false
})
val material2 = LineBasicMaterial(object {}.applyDynamic {
    color = 0xFFFFFF
    opacity = 1.0
    blending = THREE.AdditiveBlending
    transparent = false
})
var lineMaterial = material1


fun init() {
    val container = document.getElementById("content") as Node

    camera = PerspectiveCamera(
        fov = 33.0,
        aspect = window.innerWidth.toDouble() / window.innerHeight,
        near = 1.0,
        far = 10000.0
    )
    camera.position.set(0, 0, 400)

    scene = Scene()
    renderer = WebGLRenderer().apply {
        setPixelRatio(window.devicePixelRatio)
        setSize(window.innerWidth, window.innerHeight)
        val child = container.appendChild(this.domElement) as HTMLElement
        child.setAttribute("tabindex", "0")
        child.addEventListener("click", { _ ->
            child.focus() // Need this to make canvas take focus on mouse click.
        })
    }
    applyTheme2()

    val effectFXAA = THREE.ShaderPass(THREE.FXAAShader).applyDynamic {
        uniforms["resolution"].value.set(1.0 / window.innerWidth, 1.0 / window.innerHeight)
    }
    val effectBloom = THREE.BloomPass(1.3)
    val effectCopy = THREE.ShaderPass(THREE.CopyShader).applyDynamic {
        renderToScreen = true
    }
    composer = EffectComposer(renderer)
    composer.addPass(THREE.RenderPass(scene, camera))
//    composer.addPass(effectFXAA)
//    composer.addPass(effectBloom)
    composer.addPass(effectCopy)

    val presenter = LSystem3dPresenter()

    fun generateScene() {
        scene.clear()

        var geometry = Geometry()
        presenter
            .generatePoints()
//            .onEach { println(it.toXYZString()) }
            .forEach {
                if (it === LSystem3d.emptyVector) {
                    scene.add(Line(geometry, lineMaterial))
                    geometry = Geometry()
                } else {
                    geometry.vertices.push(it)
                }
            }
        if (geometry.vertices.isNotEmpty()) {
            scene.add(Line(geometry, lineMaterial))
        }

        render()
    }
    generateScene()

    val orbitControls = OrbitControls(camera, renderer.domElement)
    orbitControls.keyPanSpeed = 0.0

    initConfigToolbar(presenter, ::generateScene)
    updateConfigToolbar(presenter)

    window.addEventListener("resize", ::onWindowResize, false)
    window.addEventListener("keypress", onKeyPress(presenter, orbitControls, ::generateScene))
}

private fun THREE.Object3D.clear() {
    while (children.length > 0) {
        val children: dynamic = children
        remove(children[0])
    }
}

private fun onKeyPress(
    presenter: LSystem3dPresenter,
    orbitControls: OrbitControls,
    updateUI: () -> Unit
): (Event) -> Unit {
    val mapping = mapOf(
        "n" to { presenter.switch(1) },
        "N" to { presenter.switch(-1) },
        "i" to { presenter.changeIterationCount(1) },
        "I" to { presenter.changeIterationCount(-1) },
        "a" to { presenter.changeAngle(5.toRadians()) },
        "A" to { presenter.changeAngle((-5).toRadians()) },
        "c" to { orbitControls.reset() },
        "q" to { applyTheme1() },
        "w" to { applyTheme2() },
//        "d" to { presenter.debugMode = !presenter.debugMode },
//        "s" to { presenter.increaseDebugStep() },
//        "S" to { presenter.decreaseDebugStep() },
        "u" to { window.open(presenter.lSystem.url ?: "")?.focus() }
    )
    return { event ->
        if (event is KeyboardEvent) {
            if (event.key == "`") {
                toggleConfigToolbar(document)
            }
            if (event.target !is HTMLInputElement) {
                val action = mapping[event.key]
                if (action != null) {
                    action()
                    updateUI()
                    updateConfigToolbar(presenter)
                }
            }
        }
    }
}

private fun initConfigToolbar(presenter: LSystem3dPresenter, updateUI: () -> Unit) {
    fun applyChanges() {
        presenter.lSystem.value.axiom = inputById("axiom").value
        presenter.lSystem.value.rules = inputById("rules").value
            .split("; ")
            .map { it.split(" => ") }
            .associate { Pair(it[0][0], it[1]) }
        presenter.lSystem.value.angle = inputById("angle").value.toDouble().toRadians()
        presenter.lSystem.iterations = inputById("iterations").value.toInt()

        updateUI()
    }
    listOf(inputById("axiom"), inputById("rules"), inputById("angle"), inputById("iterations")).forEach {
        it.addEventListener("change", { _ -> applyChanges() })
    }
}

private fun updateConfigToolbar(presenter: LSystem3dPresenter) {
    inputById("title").value = presenter.lSystem.title
    inputById("axiom").value = presenter.lSystem.value.axiom
    inputById("rules").value = presenter.lSystem.value.rules
        .entries.joinToString("; ") { it.key + " => " + it.value }
    inputById("angle").value = presenter.lSystem.value.angle.toDegrees().toString()
    inputById("iterations").value = presenter.lSystem.iterations.toString()
}

private fun applyTheme1() {
    lineMaterial = material1
    scene.background = Color(0xffffff)
    document.body?.style?.background = "#ffffff"
}

private fun applyTheme2() {
    lineMaterial = material2
    scene.background = Color(0x000000)
    document.body?.style?.background = "#000000"
}

@Suppress("UNUSED_PARAMETER")
private fun animate(d: Double = 0.0) {
    window.requestAnimationFrame(::animate)
    render()
}

private fun render() {
    composer.render()
}

@Suppress("UNUSED_PARAMETER")
private fun onWindowResize(event: Event) {
    windowHalfX = window.innerWidth / 2.0
    windowHalfY = window.innerHeight / 2.0

    camera.aspect = window.innerWidth / window.innerHeight.toDouble()
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

private fun List<Vector3>.fitCenteredInto(x1: Double, y1: Double, z1: Double, x2: Double, y2: Double, z2: Double): List<Vector3> {
    require(x1 < x2 && y1 < y2 && z1 < z2)
    val width = x2 - x1
    val height = y2 - y1
    val depth = z2 - z1

    val minPoint = Vector3(minBy{ it.x }!!.x, minBy{ it.y }!!.y, minBy{ it.z }!!.z)
    val maxPoint = Vector3(maxBy{ it.x }!!.x, maxBy{ it.y }!!.y, maxBy{ it.z }!!.z)
    val pointsWidth = maxPoint.x - minPoint.x
    val pointsHeight = maxPoint.y - minPoint.y
    val pointsDepth = maxPoint.z - minPoint.z
    val minScale = min(min(width / pointsWidth, height / pointsHeight), depth / pointsDepth)

    return this.map {
        if (it === emptyVector) it
        else {
            it.multiplyScalar(minScale)
            it.set(
                x = it.x + x1 - minPoint.x * minScale + (width - pointsWidth * minScale) / 2,
                y = it.y + y1 - minPoint.y * minScale + (height - pointsHeight * minScale) / 2,
                z = it.z + z1 - minPoint.z * minScale + (depth - pointsDepth * minScale) / 2
            )
            it
        }
    }
}


class LSystem3dPresenter {
    private val lSystems = listOf(
        ConfigurableLSystem(kochSnowflake, title = "Koch snowflake", url = "https://en.wikipedia.org/wiki/Koch_snowflake"),
        ConfigurableLSystem(cesaroFractal, title = "Cesaro fractal", url = "http://mathworld.wolfram.com/CesaroFractal.html"),
        ConfigurableLSystem(quadraticType2Curve, title = "Quadratic type 2", url = "https://en.wikipedia.org/wiki/Koch_snowflake#Variants_of_the_Koch_curve"),
        ConfigurableLSystem(hilbertCurve, title = "Hilbert curve", url = "https://en.wikipedia.org/wiki/Hilbert_curve"),
        ConfigurableLSystem(lindenmayerCurve, title = "Lindenmayer curve"),
        ConfigurableLSystem(gosperCurve, title = "Gosper curve", url = "https://en.wikipedia.org/wiki/Gosper_curve"),
        ConfigurableLSystem(sierpinskiTriangle, title = "Sierpinski triangle", url = "https://en.wikipedia.org/wiki/Sierpinski_triangle"),
        ConfigurableLSystem(sierpinskiArrowheadCurve, title = "Sierpinski arrow head triangle", url = "https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve"),
        ConfigurableLSystem(dragonCurve, maxIterations = 14, title = "Dragon curve", url = "https://en.wikipedia.org/wiki/Dragon_curve"),
        ConfigurableLSystem(fractalPlant, title = "Plant", url = "https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant"),
        ConfigurableLSystem(kochCurve3d, title = "Koch curve 3d", url = "https://github.com/Hiestaa/3D-Lsystem/blob/master/lsystem/KochCurve3D.py")
//        ConfigurableLSystem(hilbertCurve3d, title = "Hilbert Curve 3d", url = "https://en.wikipedia.org/wiki/Hilbert_curve"),
    )
    var lSystem: ConfigurableLSystem = lSystems.first()
    var debugMode = false
    private var debugStepSize = 1

    fun generatePoints(): List<Vector3> {
        val points = lSystem.value
            .generatePoints(lSystem.iterations)
            .toList().fitCenteredInto(-100.0, -100.0, -100.0, 100.0, 100.0, 100.0)
        return points.let {
            if (debugMode) it.take(debugStepSize) else it
        }
    }

    fun switch(direction: Int) {
        val i = lSystems.indexOfFirst { it.value == lSystem.value } + direction
        lSystem = when {
            i < 0 -> lSystems.last()
            i >= lSystems.size -> lSystems.first()
            else -> lSystems[i]
        }
        debugMode = false
        debugStepSize = 0
    }

    fun changeIterationCount(increment: Int) {
        lSystem.iterations += increment
        if (lSystem.iterations > lSystem.maxIterations) {
            lSystem.iterations = lSystem.maxIterations
        }
        if (lSystem.iterations <= 0) {
            lSystem.iterations = 0
        }
    }

    fun increaseDebugStep() {
        if (debugMode) debugStepSize++
    }

    fun decreaseDebugStep() {
        if (debugMode) debugStepSize--
    }

    fun changeAngle(value: Double) {
        lSystem.value.apply {
            angle = round((angle + value).toDegrees()).toRadians()
            if (angle < 0) angle += 2 * PI
            if (angle > 2 * PI) angle -= 2 * PI
        }
    }

    class ConfigurableLSystem(
        val value: LSystem3d,
        val maxIterations: Int = 9,
        val title: String = "",
        val url: String? = null
    ) {
        var iterations: Int = 1
    }
}

private fun Vector3.toXYZString() = x.toString() + " " + y + " " + z

fun Double.toDegrees(): Double = (this / PI) * 180
fun Double.toRadians(): Double = (this / 180) * PI
fun Int.toRadians(): Double = toDouble().toRadians()

fun toggleConfigToolbar(document: Document) {
    val element = document.getElementById("config-toolbar") as HTMLDivElement
    if (element.style.display == "none") {
        element.style.display = ""
    } else {
        element.style.display = "none"
    }
}

fun inputById(id: String) = document.getElementById(id) as HTMLInputElement
