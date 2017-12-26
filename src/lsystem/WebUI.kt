package lsystem

import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.Window
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent

class WebUI(private val window: Window, private val page: IndexPage) {
    private lateinit var camera: THREE.PerspectiveCamera
    private lateinit var scene: THREE.Scene
    private lateinit var renderer: THREE.WebGLRenderer
    private lateinit var composer: THREE.EffectComposer
    private var windowHalfX = window.innerWidth / 2.0
    private var windowHalfY = window.innerHeight / 2.0

    private val material1 = THREE.LineBasicMaterial(object {}.applyDynamic {
        color = 0x000000
        linewidth = 5.0
        opacity = 1.0
        blending = THREE.AdditiveBlending
        transparent = false
    })
    private val material2 = THREE.LineBasicMaterial(object {}.applyDynamic {
        color = 0xFFFFFF
        opacity = 1.0
        blending = THREE.AdditiveBlending
        transparent = false
    })
    private var lineMaterial = material1


    fun init() {
        val container = page.content

        camera = THREE.PerspectiveCamera(
            fov = 33.0,
            aspect = window.innerWidth.toDouble() / window.innerHeight,
            near = 1.0,
            far = 10000.0
        )
        camera.position.set(0, 0, 400)

        scene = THREE.Scene()
        renderer = THREE.WebGLRenderer().apply {
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
        composer = THREE.EffectComposer(renderer)
        composer.addPass(THREE.RenderPass(scene, camera))
//    composer.addPass(effectFXAA)
//    composer.addPass(effectBloom)
        composer.addPass(effectCopy)

        val editor = LSystemEditor()

        fun generateScene() {
            scene.clear()

            var geometry = THREE.Geometry()
            editor
                .generatePoints()
                .fitCenteredInto(-100.0, -100.0, -100.0, 100.0, 100.0, 100.0)
//            .onEach { println(it.toXYZString()) }
                .forEach {
                    if (it === dontConnectDots) {
                        scene.add(THREE.Line(geometry, lineMaterial))
                        geometry = THREE.Geometry()
                    } else {
                        geometry.vertices.push(it)
                    }
                }
            if (geometry.vertices.isNotEmpty()) {
                scene.add(THREE.Line(geometry, lineMaterial))
            }

            render()
        }
        generateScene()

        val orbitControls = THREE.OrbitControls(camera, renderer.domElement)
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
        orbitControls: THREE.OrbitControls,
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
                    toggleConfigToolbar()
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
            editor.presenter.lSystem.axiom = page.axiom.value
            editor.presenter.lSystem.rules = page.rules.value
                .split("; ")
                .map { it.split(" => ") }
                .associate { Pair(it[0][0], it[1]) }
            editor.presenter.lSystem.angle = page.angle.value.toDouble().toRadians()
            editor.presenter.iterations = page.iterations.value.toInt()

            updateUI()
        }
        listOf(page.axiom, page.rules, page.angle, page.iterations).forEach {
            it.addEventListener("change", { _ -> applyChanges() })
        }
    }

    private fun updateConfigToolbar(editor: LSystemEditor) {
        page.title.value = editor.presenter.title
        page.axiom.value = editor.presenter.lSystem.axiom
        page.rules.value = editor.presenter.lSystem.rules
            .entries.joinToString("; ") { it.key + " => " + it.value }
        page.angle.value = editor.presenter.lSystem.angle.toDegrees().toString()
        page.iterations.value = editor.presenter.iterations.toString()
    }

    private fun applyTheme1() {
        lineMaterial = material1
        scene.background = THREE.Color(0xffffff)
        page.body.style.background = "#ffffff"
    }

    private fun applyTheme2() {
        lineMaterial = material2
        scene.background = THREE.Color(0x000000)
        page.body.style.background = "#000000"
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

    private fun toggleConfigToolbar() {
        page.configToolbar.let {
            if (it.style.display == "none") {
                it.style.display = ""
            } else {
                it.style.display = "none"
            }
        }
    }

    private fun List<THREE.Vector3>.fitCenteredInto(x1: Double, y1: Double, z1: Double, x2: Double, y2: Double, z2: Double): List<THREE.Vector3> {
        require(x1 < x2 && y1 < y2 && z1 < z2)
        val width = x2 - x1
        val height = y2 - y1
        val depth = z2 - z1

        val minPoint = THREE.Vector3(minBy { it.x }!!.x, minBy { it.y }!!.y, minBy { it.z }!!.z)
        val maxPoint = THREE.Vector3(maxBy { it.x }!!.x, maxBy { it.y }!!.y, maxBy { it.z }!!.z)
        val pointsWidth = maxPoint.x - minPoint.x
        val pointsHeight = maxPoint.y - minPoint.y
        val pointsDepth = maxPoint.z - minPoint.z
        val minScale = kotlin.math.min(kotlin.math.min(width / pointsWidth, height / pointsHeight), depth / pointsDepth)

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
}