import { isObject } from './../shared/index';
import { isSymbol } from "../shared/index"
import { reactive } from './reactive';

function createGetter() {
  return function get(target, key, receiver) {
    const res =  Reflect.get(target, key, receiver)

    if (isSymbol(key)) return res

    if (isObject(res)) return reactive(res)

    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)

    return result
  }
}

const get = createGetter()
const set = createSetter()

export const mutableHandlers = {
  get,
  set,
}