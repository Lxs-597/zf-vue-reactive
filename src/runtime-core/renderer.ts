export function createRenderer(options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
  return {
    createApp(rootComponent) {
      const app = {
        mount(container) {}
      }

      return app
    }
  }
}