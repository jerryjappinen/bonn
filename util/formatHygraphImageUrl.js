export default (url, { width, height, fit }) => {
  if (width || height) {
    const params = ['fit:' + fit]

    if (width) {
      params.push('width:' + width)
    }

    if (height) {
      params.push('height:' + height)
    }

    // FIXME: this should be done by replacing in the URL
    return url.replace('.com/', '.com/resize=' + params.join(',') + '/')
  }

  return url
}
