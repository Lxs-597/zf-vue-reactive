

function patchClass(el: HTMLElement, value: any) {
  if (value == null) {
    value = ''
  }

  el.className = value
}

function patchStyle(el: HTMLElement, prevValue: any, nextValue: any) {
  const style = el.style

  if (!nextValue) {
    el.removeAttribute('style')
  } else {
    for (let key in nextValue) {
      style[key] = nextValue[key]
    }

    if (prevValue) {
      for (let key in prevValue) {
        if (nextValue[key] == null) {
          style[key] = ''
        }
      }
    }
  }
}

function patchAttr(el: HTMLElement, key: string, value: any) {
  if (value == null) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, value)
  }
}

export function patchProp(el: HTMLElement, key: string, prevValue: any, nextValue: any) {
  switch (key) {
    case 'class':
      patchClass(el, nextValue)
      break
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break
    default:
      patchAttr(el, key, nextValue)
      break
  }
}