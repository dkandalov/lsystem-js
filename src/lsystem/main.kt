package lsystem

import org.w3c.dom.*

@JsName("main")
@Suppress("unused") // Used in index.html
fun main(window: Window, document: Document) {
    WebUI(window, IndexPage(document)).apply {
        init()
        animate()
    }
}

class IndexPage(document: Document) {
    val body = document.body!!
    val content = document.getElementById("content") as Node
    val lSystemEditor = document.getElementById("lsystem-editor") as HTMLDivElement
    val name = document.getElementById("name") as HTMLSelectElement
    val axiom = document.getElementById("axiom") as HTMLInputElement
    val rules = document.getElementById("rules") as HTMLTextAreaElement
    val angle = document.getElementById("angle") as HTMLInputElement
    val iterations = document.getElementById("iterations") as HTMLInputElement
}