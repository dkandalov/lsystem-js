package lsystem

import org.w3c.dom.Document
import org.w3c.dom.Window

/**
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
