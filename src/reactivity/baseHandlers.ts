import { isArray, isObject, isInteger, hasOwn } from './../shared/index';
import { isSymbol } from "../shared/index"
import { reactive } from './reactive';
import { track, trigger } from './effect';

function createGetter() {
  return function get(target, key, receiver) {
    const res =  Reflect.get(target, key, receiver)

    if (isSymbol(key)) return res

    track(target, key)

    if (isObject(res)) return reactive(res)

    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const oldValue = target[key]
    const hadKey = isArray(target) && isInteger(key)
      ? Number[key] < target.length
      : hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)

    if (hadKey) {
      trigger(target, 'add', key, value)
    } else if (value !== oldValue) {
      trigger(target, 'set', key, value, oldValue)
    }

    return result
  }
}

const get = createGetter()
const set = createSetter()

export const mutableHandlers = {
  get,
  set,
}