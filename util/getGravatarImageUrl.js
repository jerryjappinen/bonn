// import md5 from './md5'
import gravatarUrl from 'gravatar-url'

export default (email, size, fallbackImageUrl) => {
  const options = {
    size: size || 160
  }

  if (fallbackImageUrl) {
    options.default = fallbackImageUrl
  }

  return gravatarUrl(email, options)
}
