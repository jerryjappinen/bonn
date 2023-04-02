import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'

// Define extra routes, redirects etc. to generate
export default (optionsInput) => {
  const {
    baseUrl,
    crawlLinks,
    ignore,
    routes,
    rules
  } = (optionsInput || {})

  const app = {}
  if (baseUrl) {
    app.baseURL = baseUrl
  }

  // https://nitro.unjs.io/config/#routerules
  const routeRules = rules || {}

  // https://nitro.unjs.io/config#prerender
  const ignoredRoutes = ignore ? compact(flatten([ignore])) : []
  const prerenderedRoutes = routes ? compact(flatten([routes])) : []

  return {
    app,
    routeRules,

    nitro: {
      prerender: {
        crawlLinks,
        ignore: ignoredRoutes,
        routes: prerenderedRoutes
      }
    }
  }
}
