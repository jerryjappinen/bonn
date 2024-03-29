import isAbsoluteUrl from '../../utils/isAbsoluteUrl'
import suffixWith from '../../utils/suffixWith'

// Cover image for sharing
export default (optionsInput) => {
  const {
    host,
    title,
    path
  } = (optionsInput || {})

  const head = {
    meta: []
  }

  const h = suffixWith((host || '').trim(), '/')
  const p = path || 'cover-image.png'
  const coverImagePath = isAbsoluteUrl(p) ? p : h + p

  // Twitter cards
  head.meta.push({
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  })

  head.meta.push({
    hid: 'twitter:image',
    name: 'twitter:image',
    content: coverImagePath
  })

  // Facebook (OpenGraph)
  head.meta.push({
    hid: 'og:image',
    property: 'og:image',
    content: coverImagePath
  })

  // Title is done with separate tags
  if (title) {
    head.meta.push({
      hid: 'twitter:image:alt',
      property: 'twitter:image:alt',
      content: title
    })

    head.meta.push({
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: title
    })
  }

  // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#meta
  // https://v3.nuxtjs.org/api/composables/use-head/
  return head
}
