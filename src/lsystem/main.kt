package lsystem

import org.w3c.dom.Document
import org.w3c.dom.Window

@JsName("main")
@Suppress("unused") // Used in index.html
fun main(window: Window, document: Document) {
    WebUI(window, IndexPage(document)).apply {
        init()
        animate()
    }
}
