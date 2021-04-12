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

  app.mount = function(container: HTMLElement) {
    container.innerHTML = ''
    mount(container)
  }
}