import camelCase from 'lodash-es/camelCase'
import kebabCase from 'lodash-es/kebabCase'

// Register components, directives, mixins etc. on the top level
export default (Vue, {
  components,
  directives,
  filters,
  mixins,
  svgs
}) => {
  if (components) {
    for (const componentName in components) {
      Vue.component(kebabCase(componentName), components[componentName])
    }
  }

  if (svgs) {
    for (const svg in svgs) {
      Vue.component(kebabCase('svg-' + svg), svgs[svg])
    }
  }

  if (directives) {
    for (const directiveName in directives) {
      Vue.directive(camelCase(directiveName), directives[directiveName])
    }
  }

  if (filters) {
    for (const filterName in filters) {
      Vue.filter(camelCase(filterName), filters[filterName])
    }
  }

  if (mixins) {
    for (const mixinName in mixins) {
      Vue.mixin(mixins[mixinName])
    }
  }
}
