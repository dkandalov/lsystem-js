@file:Suppress("unused", "NOTHING_TO_INLINE", "UnsafeCastFromDynamic")

package lsystem

import org.w3c.dom.Node

external object THREE {
    class PerspectiveCamera(fov: Number, aspect: Double, near: Number, far: Number): Camera {
        var aspect: Double
        fun updateProjectionMatrix()
        fun lookAt(position: Vector3)
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
    }

    class Scene: Object3D {
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
        var background: Color
    }

    class WebGLRenderer {
        val domElement: Node
        fun setPixelRatio(ratio: Double)
        fun setSize(width: Int, height: Int)
        fun render(scene: Scene, camera: PerspectiveCamera)
        fun clear()
    }

    class Geometry {
        val vertices: Array<Vector3>
    }
    class BufferGeometry

    interface Camera: Object3D

    interface Object3D {
        val scale: Vector3
        val position: Vector3
        val children: Array<Object3D>
        fun add(object3D: Object3D)
        fun remove(object3D: Object3D)
    }

    class Vector3(x: Number, y: Number, z: Number) {
        var x: Double
        var y: Double
        var z: Double
        fun set(x: Number, y: Number, z: Number)
        fun addScaledVector(vector3: Vector3, length: Double)
        fun clone(): Vector3
        fun applyEuler(euler: Euler)
        fun add(v: Vector3)
        fun multiplyScalar(i: Number)
    }

    class LineBasicMaterial(any: dynamic)
    class MeshBasicMaterial(any: dynamic)

    class Line(geometry: Geometry, material: LineBasicMaterial): Object3D {
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
    }

    val NormalBlending: Int
    val AdditiveBlending: Int
    val SubtractiveBlending: Int
    val MultiplyBlending: Int
    val CustomBlending: Int

    class CubeGeometry(width: Double, height: Double, depth: Double)

    class Mesh(cubeGeometry: CubeGeometry, meshBasicMaterial: MeshBasicMaterial): Object3D {
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
    }

    class SpotLight(color: Int, intensity: Double): Object3D {
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
    }

    class AmbientLight(color: Int): Object3D {
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
    }

    class OrbitControls(camera: Camera, element: Node) {
        fun reset()
        var keyPanSpeed: Double
    }

    class AxesHelper(size: Int): Object3D {
        override val scale: Vector3
        override val position: Vector3
        override val children: Array<Object3D>
        override fun add(object3D: Object3D)
        override fun remove(object3D: Object3D)
    }

    class Color(value: Any)
    class Euler(x: Number, y: Number, z: Number, order: String)


    open class RenderPass(scene: Scene, camera: Camera)

    class ShaderPass(fxaaShader: dynamic): RenderPass

    class BloomPass(d: Double): RenderPass

    class EffectComposer(renderer: WebGLRenderer) {
        fun addPass(renderPass: RenderPass)
        fun render()

    }
    val CopyShader: dynamic

    val FXAAShader: dynamic
}

inline fun <T> Array<T>.push(e: T): Int = asDynamic().push(e)
inline fun <T> Array<T>.pop(): T = asDynamic().pop()
inline val Array<*>.length get() = size

fun <T> T.applyDynamic(f: dynamic.() -> Unit): T {
    f(this.asDynamic())
    return this
}
