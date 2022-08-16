import components from './components'

// FIXME: does this even work?
const plugin = {
  install (Vue) {
    for (const prop in components) {
      const component = components[prop]
      Vue.component(component.name, component)
    }
  }
}

export default plugin
