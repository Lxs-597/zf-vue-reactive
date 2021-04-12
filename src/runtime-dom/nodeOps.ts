export const nodeOps = {
  createElement(type: string) {
    return document.createElement(type)
  },
  setElementText(el: HTMLElement, text: string) {
    el.textContent = text
  },
  insert(child: HTMLElement, parent: HTMLElement, anchor: HTMLElement | null = null) {
    parent.insertBefore(child, anchor)
  },
  remove(child: HTMLElement) {
    const parent = child.parentNode

    if (parent) parent.removeChild(child)
  }
}