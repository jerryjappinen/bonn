// https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
export default (optionsInput) => {
  const options = (optionsInput || {})
  const username = options.username || options

  const head = {
    meta: []
  }

  if (username) {
    const hasAt = username.substring(0, 1) === '@'
    const tag = options.creator ? 'creator' : 'site'

    head.meta.push({
      hid: `twitter:${tag}`,
      name: `twitter:${tag}`,
      content: (hasAt ? '' : '@') + username
    })
  }

  return head
}
