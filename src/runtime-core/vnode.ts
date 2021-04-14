import { isArray, isObject, isString } from "../shared/index"
import { ShapeFlag } from "../shared/ShapeFlag"

export function createVnode(type, props: any = {}, children = null) {
  const shapeFlag = isString(type)
    ? ShapeFlag.ELEMENT
    : isObject(type)
      ? ShapeFlag.STATEFUL_COMPONENT
      : 0

  const vnode = {
    type,
    props,
    children,
    component: null,
    el: null,
    key: props.key,
    shapeFlag
  }

  if (isArray(children)) {
    vnode.shapeFlag |= ShapeFlag.ARRAY_CHILDREN
  } else {
    vnode.shapeFlag |= ShapeFlag.TEXT_CHILDREN
  }

  return vnode
}