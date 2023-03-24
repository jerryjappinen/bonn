import md5 from './md5'

// Taken from the official package
// Duplicated here to avoid dependency issues
// https://github.com/sindresorhus/gravatar-url/blob/main/index.js
const getGravatarUrl = (identifier, options) => {
  if (!identifier) {
    throw new Error('Please specify an identifier, such as an email address')
  }

  if (identifier.includes('@')) {
    identifier = identifier.toLowerCase().trim()
  }

  const baseUrl = new URL('https://gravatar.com/avatar/')
  baseUrl.pathname += md5(identifier)
  baseUrl.search = new URLSearchParams(options)

  return baseUrl.toString()
}

export default (email, size, fallbackImageUrl) => {
  const options = {
    size: size || 160
  }

  if (fallbackImageUrl) {
    options.default = fallbackImageUrl
  }

  return getGravatarUrl(email, options)
}
