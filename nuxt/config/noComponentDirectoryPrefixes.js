// https://github.com/nuxt/framework/discussions/6268
export default (componentsDir) => {
  return {
    components: [
      { path: componentsDir || '~/components', pathPrefix: false },
    ]
  }
}
