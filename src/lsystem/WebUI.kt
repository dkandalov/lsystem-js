package lsystem

import lsystem.THREE.Vector3
import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLOptionElement
import org.w3c.dom.Window
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.math.roundToInt

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

        initEditor(editor, ::generateScene)
        update(editor)

        window.addEventListener("resize", { _ -> onWindowResize() }, false)
        window.addEventListener("keypress", onKeyPress(editor, orbitControls, {
            generateScene()
            update(editor)
        }))
    }

    private fun onKeyPress(
        editor: LSystemEditor,
        orbitControls: THREE.OrbitControls,
        updateUI: () -> Unit
    ): (Event) -> Unit {
        val mapping = mapOf(
            "`" to { toggleLSystemEditor() },
            "(" to { editor.changeIterationCount(-1); updateUI() },
            ")" to { editor.changeIterationCount(1); updateUI() },
            "{" to { editor.changeAngle((-5).toRadians()); updateUI() },
            "}" to { editor.changeAngle(5.toRadians()); updateUI() },
            "c" to { orbitControls.reset() },
            "u" to { window.open(editor.presenter.url ?: "")?.focus() }
            //"q" to { applyTheme1() },
            //"w" to { applyTheme2() },
            //"d" to { editor.debugMode = !editor.debugMode },
            //"s" to { editor.increaseDebugStep() },
            //"S" to { editor.decreaseDebugStep() },
        )
        return { event ->
            if (event is KeyboardEvent) {
                val action = mapping[event.key]
                if (action != null) {
                    action()
                    event.preventDefault()
                    event.stopImmediatePropagation()
                }
            }
        }
    }

    private fun initEditor(editor: LSystemEditor, updateUI: () -> Unit) {
        fun applyChanges() {
            editor.presenter.lSystem.axiom = page.axiom.value
            editor.presenter.lSystem.rules = page.rules.value
                .split("\n")
                .filter { it.trim().isNotEmpty() }
                .map { it.split(" => ") }
                .associate { Pair(it[0][0], it[1]) }
            editor.presenter.lSystem.angle = page.angle.value.toDouble().toRadians()
            editor.presenter.iterations = page.iterations.value.toInt()

            updateUI()
        }
        listOf(page.axiom, page.rules, page.angle, page.iterations).forEach {
            it.addEventListener("input", { _ -> applyChanges() })
        }
        page.name.addEventListener("change", { _ ->
            editor.presenter = editor.lSystemPresenters.find { it.name == page.name.value }!!
            update(editor)
            updateUI()
        })

        val child = page.name.firstElementChild!!.cloneNode(deep = true) as HTMLOptionElement
        page.name.innerHTML = ""
        editor.lSystemPresenters.forEachIndexed { i, presenter ->
            val node = (child.cloneNode(deep = true) as HTMLOptionElement).also {
                it.textContent = presenter.name
                it.value = presenter.name
                if (i == 0) it.setAttribute("selected", "selected")
            }
            page.name.appendChild(node)
        }

        page.rules.let {
            it.setAttribute("style", "height:" + it.scrollHeight + "px;overflow-y:hidden;")
            it.addEventListener("input", { _ -> updateRulesHeight() })
        }
    }

    private fun update(editor: LSystemEditor) {
        page.name.value = editor.presenter.name
        page.axiom.value = editor.presenter.lSystem.axiom
        page.rules.value = editor.presenter.lSystem.rules
            .entries.joinToString("\n") { it.key + " => " + it.value }
        updateRulesHeight()
        page.angle.value = editor.presenter.lSystem.angle.toDegrees().roundToInt().toString()
        page.iterations.value = editor.presenter.iterations.toString()
    }

    private fun updateRulesHeight() {
        page.rules.style.height = "auto"
        page.rules.style.height = page.rules.scrollHeight.toString() + "px"
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
        val editorWidth =
            if (page.lSystemEditor.style.display == "none") 0.0
            else page.lSystemEditor.getBoundingClientRect().width

        val width = window.innerWidth - editorWidth
        val height = window.innerHeight
        val aspect = width / height

        return Triple(width, height, aspect)
    }

    private fun toggleLSystemEditor() {
        page.lSystemEditor.let {
            if (it.style.display == "none") {
                it.style.display = ""
            } else {
                it.style.display = "none"
            }
        }
        onWindowResize()
    }

    @Suppress("UnsafeCastFromDynamic")
    private fun THREE.Object3D.clear() {
        while (children.length > 0) {
            val children: dynamic = children
            remove(children[0])
        }
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
