import isFunction from 'lodash-es/isFunction'

import parseQuery from './parseQuery'

export default (optionsInput) => {
  // Parse endpoint options
  const {
    endpointCallback,
    parse

  // Allow passing callback on top level
  } = isFunction(optionsInput)
    ? { endpointCallback: optionsInput }
    : optionsInput

  return async (request, response) => {
    try {
      // https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects
      const callbackResult = await endpointCallback({

        // Shorthands
        method: request.method ? request.method.toLowerCase() : 'get',
        query: parse ? (parseQuery(request.query) || {}) : request.query,
        headers: request.headers || {},
        cookies: request.cookies,
        body: request.body || {},

        // Original req, res objects
        request,
        response
      })

      // Content type
      response.setHeader('Content-Type', callbackResult.contentType || 'application/json')

      // Headers
      if (callbackResult.headers) {
        for (const key in callbackResult.headers) {
          response.setHeader(key, callbackResult.headers[key])
        }
      }

      // Status and body
      response.status(callbackResult.status || 200).send(callbackResult.body)

    // If error is thrown, we respond with an HTTP error
    // NOTE: to set a different error code, return an object with status
    } catch (error) {
      response.status(400).send(error.message)
    }
  }
}
