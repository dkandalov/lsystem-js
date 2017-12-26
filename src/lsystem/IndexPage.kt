package lsystem

import org.w3c.dom.Document
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.Node

class IndexPage(document: Document) {
    val body = document.body!!
    val content = document.getElementById("content") as Node
    val configToolbar = document.getElementById("config-toolbar") as HTMLDivElement
    val axiom = document.getElementById("axiom") as HTMLInputElement
    val rules = document.getElementById("rules") as HTMLInputElement
    val angle = document.getElementById("angle") as HTMLInputElement
    val iterations = document.getElementById("iterations") as HTMLInputElement
    val title = document.getElementById("title") as HTMLInputElement
}