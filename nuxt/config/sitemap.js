import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

// Define extra routes to generate
// https://v3.nuxtjs.org/guide/deploy/static-hosting#client-side-only-rendering
// https://nitro.unjs.io/config/#prerender

// https://sitemap.nuxtjs.org/usage/sitemap
// {
//   url: '/page/3',
//   changefreq: 'daily',
//   priority: 1,
//   lastmod: '2017-06-30T13:30:00.000Z'
// }
export default (optionsInput) => {
  const {
    baseUrl,
    exclude,
    routes,
    routeRules
  } = (optionsInput || {})

  const app = {}

  // FIXME: this seems to be broken in Nuxt 3 currently
  // if (baseUrl) {
  //   app.baseURL = baseUrl
  // }

  return {
    app,

    // https://v3.nuxtjs.org/guide/concepts/rendering/#route-rules
    routeRules: routeRules || {},

    modules: [
      ['@nuxtjs/sitemap', {
        hostname: baseUrl,
        exclude: compact(flatten([exclude]))
      }]
    ],

    nitro: {
      prerender: {
        routes: compact(flatten([routes]))
      }
    }
  }
}
