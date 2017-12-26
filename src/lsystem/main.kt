package lsystem

import org.w3c.dom.Document
import org.w3c.dom.Window

/**
 * Based on https://github.com/mrdoob/three.js/blob/334ab72b4251f5dd0abc5c72a96942d438eae24a/examples/webgl_lines_cubes.html
 *
 * Misc links:
 *  - http://www.robertdickau.com/kochsurface.html
 *  - http://algorithmicbotany.org/papers/abop/abop-ch1.pdf
 *  - http://www.kevs3d.co.uk/dev/lsystems
 *  - http://www.3dfractals.com/docs/3DFractals.pdf
 */
@JsName("main")
@Suppress("unused") // Used in index.html
fun main(window: Window, document: Document) {
    WebUI(window, IndexPage(document)).apply {
        init()
        animate()
    }
}
