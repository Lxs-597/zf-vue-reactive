import { ShapeFlag } from "../shared/ShapeFlag"
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component"

export function createRenderer(options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
  const mountElement = (vnode, container) => {

  }

  const patchElement = (oldVnode, vnode, container) => {

  }

  const mountComponent = (initialVnode, container) => {
    const instance = initialVnode.component = createComponentInstance(initialVnode)

    setupComponent(instance)

    console.log((instance as any).render)
  }

  const updateComponent = (oldVnode, vnode, container) => {}

  const processElement = (oldVnode, vnode, container) => {
    if (oldVnode === null) {
      mountElement(vnode, container)
    } else {
      patchElement(oldVnode, vnode, container)
    }
  }

  const processComponent = (oldVnode, vnode, container) => {
    if (oldVnode === null) {
      mountComponent(vnode, container)
    } else {
      updateComponent(oldVnode, vnode, container)
    }
  }

  const patch = (oldVnode, vnode, container) => {
    const { shapeFlag } = vnode

    if (shapeFlag & ShapeFlag.ELEMENT) { // 元素
      processElement(oldVnode, vnode, container)
    } else if (shapeFlag & ShapeFlag.STATEFUL_COMPONENT) { // 组件
      processComponent(oldVnode, vnode, container)
    }
  }

  const render = (vnode, container) => {
    patch(null, vnode, container)
  }

  return {
    createApp: createAppAPI(render)
  }
}