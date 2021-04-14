import { createRenderer } from "../runtime-core/index"
import { nodeOps } from "./nodeOps"
import { patchProp } from "./patchProp"

const renderOptions = {
  ...nodeOps,
  patchProp
}

function ensureRenderer() {
  return createRenderer(renderOptions)
}

export function createApp(rootComponent) {
  const app = ensureRenderer().createApp(rootComponent)

  const { mount } = app

  app.mount = function(selector: string) {
    const container = document.querySelector(selector)
    container.innerHTML = ''
    mount(container)
  }
}