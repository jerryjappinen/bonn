export default (string) => {
  if (string && typeof string === 'string') {
    const urlParts = /^(?:\w+:\/\/)?([^/]+)(.*)$/.exec(string)

    if (urlParts && urlParts[1]) {
      const sub = urlParts[1].substr(0, 4)

      if (sub === 'www.') {
        return urlParts[1].substr(4)
      }

      return urlParts[1]
    }
  }

  return string
}
