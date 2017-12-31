package lsystem

import org.w3c.dom.*

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