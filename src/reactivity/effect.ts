import { isInteger } from './../shared/index';
import { isArray } from "../shared/index"

export function effect(fn: Function, options: any = {}) {
  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    effect()
  }

  return effect
}

let activeEffect
let uid = 0
const effectStack = []
function createReactiveEffect(fn: Function, options = {}) {
  const effect = function() {
    if (!effectStack.includes(effect)) {
      try {
        activeEffect = effect
        effectStack.push(effect)
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.id = uid++
  effect.deps = []
  effect.options = options

  return effect
}

const targetMap = new WeakMap()

export function track(target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(key)
  }
}

export function trigger(target, type, key, value?, oldValue?) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return

  const run = effects => {
    if (effects) effects.forEach(effect => effect())
  }

  if (key === 'length' || isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= value) {
        run(dep)
      }
    })
  }

  if (key !== void 0) {
    const dep = depsMap.get(key)
    run(dep)
  }

  switch(type) {
    case 'add':
      if (isInteger(key)) {
        if (isArray(target)) {
          run(depsMap.get('length'))
        }
      }

      break
    default:
      break
  }
}
