// Create a proxy to redirect requests of the "/api/*"
// https://mmazzarolo.com/blog/2022-02-05-creating-and-deploying-a-proxy-server-in-5-minutes/
// https://github.com/chimurai/http-proxy-middleware
//
// Examples:
// GET /api/hello → GET https://example.org/hello
// POST /api/test?color=red → POST https://example.org/test?color=red
import isFunction from 'lodash-es/isFunction'

import isAbsoluteUrl from '../../utils/isAbsoluteUrl'

import { createProxyMiddleware } from 'http-proxy-middleware'

export default (targetDomain, optionsInput) => {
  function modify (obj, newObj) {
    Object.keys(obj).forEach(function (key) {
      delete obj[key]
    })

    Object.keys(newObj).forEach(function (key) {
      obj[key] = newObj[key]
    })
  }

  const options = isFunction(optionsInput) ? { callback: optionsInput } : (optionsInput || {})
  const headersToAdd = options.headersToAdd || {}
  const headersToRemove = options.headersToRemove || []
  const callback = options.callback

  let target = targetDomain
  if (!isAbsoluteUrl(target)) {
    target = 'https://' + target
  }

  const apiProxy = createProxyMiddleware({
    target,
    changeOrigin: true,

    // Strip "/api" from the URL
    pathRewrite: {
      '^/api': ''
    },

    onProxyRes (proxyRes) {
      // Add headers to response
      for (const key in headersToAdd) {
        proxyRes.headers[key] = headersToAdd[key]
      }

      // Remove header from response
      for (let i = 0; i < headersToRemove.length; i++) {
        delete proxyRes.headers[headersToRemove[i]]
      }

      if (callback) {
        modify(proxyRes, callback(proxyRes))
      }
    }
  })

  return (req, res) => {
    return apiProxy(req, res)
  }
}
