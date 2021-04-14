import { isFunction } from "../shared/index"

export function createComponentInstance(vnode) {
  const instance = {
    type: vnode.type,
    props: vnode.props,
    vnode,
    isMounted: false,
  }

  return instance
}

export function setupComponent(instance) {
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  const Component = instance.type

  const { setup } = Component

  if (setup) {
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    instance.render = setupResult
  } else {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  if (Component.render) {
    instance.render = Component.render
  } else if (!instance.render) {
    // compile(Component.template)
  }

  // applyOptions()
}
