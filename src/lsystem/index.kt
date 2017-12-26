package lsystem

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
import kotlin.math.min

/**
 * Based on https://github.com/mrdoob/three.js/blob/334ab72b4251f5dd0abc5c72a96942d438eae24a/examples/webgl_lines_cubes.html
 *
 * Misc links:
 *  - http://www.robertdickau.com/kochsurface.html
 *  - http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
 *  - http://www.kevs3d.co.uk/dev/lsystems
 *  - http://www.3dfractals.com/docs/3DFractals.pdf
 */
@JsName("main") @Suppress("unused")
fun main(window: Window, document: Document) {
    WebUI(window, document).apply {
        init()
        animate()
    }
}

class WebUI(val window: Window, val document: Document) {
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

        val editor = LSystemEditor()

        fun generateScene() {
            scene.clear()

            var geometry = Geometry()
            editor
                .generatePoints()
//            .onEach { println(it.toXYZString()) }
                .forEach {
                    if (it === dontConnectDots) {
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

        initConfigToolbar(editor, ::generateScene)
        updateConfigToolbar(editor)

        window.addEventListener("resize", ::onWindowResize, false)
        window.addEventListener("keypress", onKeyPress(editor, orbitControls, ::generateScene))
    }

    private fun THREE.Object3D.clear() {
        while (children.length > 0) {
            val children: dynamic = children
            remove(children[0])
        }
    }

    private fun onKeyPress(
        editor: LSystemEditor,
        orbitControls: OrbitControls,
        updateUI: () -> Unit
    ): (Event) -> Unit {
        val mapping = mapOf(
            "n" to { editor.changeLSystem(1) },
            "N" to { editor.changeLSystem(-1) },
            "i" to { editor.changeIterationCount(1) },
            "I" to { editor.changeIterationCount(-1) },
            "a" to { editor.changeAngle(5.toRadians()) },
            "A" to { editor.changeAngle((-5).toRadians()) },
            "c" to { orbitControls.reset() },
            "q" to { applyTheme1() },
            "w" to { applyTheme2() },
            "d" to { editor.debugMode = !editor.debugMode },
            "s" to { editor.increaseDebugStep() },
            "S" to { editor.decreaseDebugStep() },
            "u" to { window.open(editor.presenter.url ?: "")?.focus() }
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
                        updateConfigToolbar(editor)
                    }
                }
            }
        }
    }

    private fun initConfigToolbar(editor: LSystemEditor, updateUI: () -> Unit) {
        fun applyChanges() {
            editor.presenter.lSystem.axiom = inputById("axiom").value
            editor.presenter.lSystem.rules = inputById("rules").value
                .split("; ")
                .map { it.split(" => ") }
                .associate { Pair(it[0][0], it[1]) }
            editor.presenter.lSystem.angle = inputById("angle").value.toDouble().toRadians()
            editor.presenter.iterations = inputById("iterations").value.toInt()

            updateUI()
        }
        listOf(inputById("axiom"), inputById("rules"), inputById("angle"), inputById("iterations")).forEach {
            it.addEventListener("change", { _ -> applyChanges() })
        }
    }

    private fun updateConfigToolbar(editor: LSystemEditor) {
        inputById("title").value = editor.presenter.title
        inputById("axiom").value = editor.presenter.lSystem.axiom
        inputById("rules").value = editor.presenter.lSystem.rules
            .entries.joinToString("; ") { it.key + " => " + it.value }
        inputById("angle").value = editor.presenter.lSystem.angle.toDegrees().toString()
        inputById("iterations").value = editor.presenter.iterations.toString()
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
    fun animate(d: Double = 0.0) {
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

    fun toggleConfigToolbar(document: Document) {
        val element = document.getElementById("config-toolbar") as HTMLDivElement
        if (element.style.display == "none") {
            element.style.display = ""
        } else {
            element.style.display = "none"
        }
    }

    fun inputById(id: String) = document.getElementById(id) as HTMLInputElement
}


fun List<Vector3>.fitCenteredInto(x1: Double, y1: Double, z1: Double, x2: Double, y2: Double, z2: Double): List<Vector3> {
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
        if (it === dontConnectDots) it
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
