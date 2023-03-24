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
    routes,
    sitemapRoutes,
    routeRules
  } = (optionsInput || {})

  const app = {}

  // FIXME: this seems to be broken in Nuxt 3 currently
  // if (baseUrl) {
  //   app.baseURL = baseUrl
  // }

  return {
    app,

    // https://nitro.unjs.io/config/#routerules
    routeRules: routeRules || {},

    // https://www.npmjs.com/package/@funken-studio/sitemap-nuxt-3
    // NOTE: imports break this
    modules: ['@funken-studio/sitemap-nuxt-3', {
      generateOnBuild: true,
      hostname: baseUrl,
      routes: sitemapRoutes || routes || [],
      defaults: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString()
      }
    }],

    nitro: {
      prerender: {
        routes: compact(flatten([routes]))
      }
    }
  }
}
