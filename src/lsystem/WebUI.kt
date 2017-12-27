package lsystem

import lsystem.THREE.Vector3
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
    private lateinit var stats: Stats

    private val material1 = THREE.LineBasicMaterial(object {}.applyDynamic {
        color = 0x000000
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
        val (width, height, aspect) = calcRenderingSizes()

        camera = THREE.PerspectiveCamera(fov = 33.0, aspect = aspect, near = 1.0, far = 10000.0)
        camera.position.set(0, 0, 400)
        stats = Stats()
        //container.appendChild(stats.dom)

        scene = THREE.Scene()
        renderer = THREE.WebGLRenderer().apply {
            val canvas = page.content.appendChild(this.domElement) as HTMLElement
            canvas.setAttribute("tabindex", "0")
            canvas.addEventListener("click", { _ ->
                canvas.focus() // Need this to make canvas take focus on mouse click.
            })
            setPixelRatio(window.devicePixelRatio)
            setSize(width.toInt(), height)
        }
        applyTheme2()

        composer = THREE.EffectComposer(renderer)
        composer.addPass(THREE.RenderPass(scene, camera))
        composer.addPass(THREE.ShaderPass(THREE.CopyShader).applyDynamic {
            renderToScreen = true
        })

        val editor = LSystemEditor()

        fun generateScene() {
            scene.clear()

            var points = Array(0, { Vector3(0, 0, 0) })
            editor
                .generatePoints()
                .fitCenteredInto(-100.0, -100.0, -100.0, 100.0, 100.0, 100.0)
                .forEach {
                    if (it === dontConnectDots) {
                        val bufferGeometry = THREE.BufferGeometry()
                        bufferGeometry.setFromPoints(points)
                        scene.add(THREE.Line(bufferGeometry, lineMaterial))
                        points = Array(0, { Vector3(0, 0, 0) })
                    } else {
                        points.push(it)
                    }
                }
            if (points.isNotEmpty()) {
                val bufferGeometry = THREE.BufferGeometry()
                bufferGeometry.setFromPoints(points)
                scene.add(THREE.Line(bufferGeometry, lineMaterial))
            }

            render()
        }
        generateScene()

        val orbitControls = THREE.OrbitControls(camera, renderer.domElement)
        orbitControls.keyPanSpeed = 0.0

        initConfigToolbar(editor, ::generateScene)
        updateConfigToolbar(editor)

        window.addEventListener("resize", { _ -> onWindowResize() }, false)
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
        stats.update()
    }

    private fun render() {
        composer.render()
    }

    private fun onWindowResize() {
        val (width, height, aspect) = calcRenderingSizes()
        camera.aspect = aspect
        camera.updateProjectionMatrix()
        renderer.setSize(width.toInt(), height)
    }

    private fun calcRenderingSizes(): Triple<Double, Int, Double> {
        val toolbarWidth =
            if (page.configToolbar.style.display == "none")
                0.0 else page.configToolbar.getBoundingClientRect().width

        val width = window.innerWidth - toolbarWidth
        val height = window.innerHeight
        val aspect = width / height

        return Triple(width, height, aspect)
    }

    private fun toggleConfigToolbar() {
        page.configToolbar.let {
            if (it.style.display == "none") {
                it.style.display = ""
            } else {
                it.style.display = "none"
            }
        }
        onWindowResize()
    }

    private fun List<Vector3>.fitCenteredInto(x1: Double, y1: Double, z1: Double, x2: Double, y2: Double, z2: Double): List<Vector3> {
        require(x1 < x2 && y1 < y2 && z1 < z2)
        val width = x2 - x1
        val height = y2 - y1
        val depth = z2 - z1

        val minPoint = Vector3(minBy { it.x }!!.x, minBy { it.y }!!.y, minBy { it.z }!!.z)
        val maxPoint = Vector3(maxBy { it.x }!!.x, maxBy { it.y }!!.y, maxBy { it.z }!!.z)
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
