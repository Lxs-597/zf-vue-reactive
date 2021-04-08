import { isObject } from './../shared/index';
import { mutableHandlers } from './baseHandlers';

export function reactive(target) {
  return createReactiveObject(target, mutableHandlers)
}

const proxyMap = new WeakMap()

function createReactiveObject(target, baseHandlers) {
  if (!isObject(target)) return target

  const exisitingProxy = proxyMap.get(target)

  if (exisitingProxy) return exisitingProxy

  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)

  return proxy
}