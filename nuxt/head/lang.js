// Site titles and descriptions
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
export default (optionsInput) => {
  const lang = (optionsInput || {}).lang || optionsInput

  const head = {
    meta: []
  }

  if (lang) {
    head.meta.htmlAttrs = {
      lang
    }
  }

  return head
}
