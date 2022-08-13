import flatten from 'lodash-es/flatten'
import flattenDeep from 'lodash-es/flattenDeep'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'

// https://developers.google.com/fonts/docs/css2
// googleFonts('Font Name', {
//   Dosis: true,
//   Poppins: false,
//   'Mouse Memoirs': [200, 300, 800],
//   'Mouse Memoirs': [200, 300, 800]
// })
export default (...args) => {

  // First pass on normalizing input into objects
  const familyInputs = {
    ...flatten(args).map((arg) => {

      // Allow passing family name as a string
      if (isString(arg)) {
        return {
          [arg]: true
        }
      }

      return arg
    })
  }

  // Each arg will
  const families = {}
  for (const familyName in familyInputs) {
    const weightsInput = familyInputs[familyName]

    // Filter out falsy values now
    if (weightsInput) {

      // Normalize array of weights
      families[familyName] = flattenDeep(flattenDeep([weightsInput]).map((weightValue) => {
        return isString(weightValue)
          ? weightValue.split(',')
          : isNumber(weightValue)
            ? Math.round(weightValue)
            : !!weightValue
      }))
    }
  }

  // {
  //   'Dosis': [100, '200'],
  //   'Poppins': true
  // }
  const hrefs = []
  for (const name in families) {
    let href = 'family=' + name

    // Construct proper URL format
    if (families[name] !== true) {
      href += ':wght@' + families[name].join(';')
    }

    hrefs.push(href)
  }

  // Looks like this:
  // <link rel="preconnect" href="https://fonts.googleapis.com">
  // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  // <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;800&family=Mouse+Memoirs&display=swap" rel="stylesheet">
  const linkTags = []
  if (hrefs && hrefs.length) {
    linkTags.push({
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    })
    linkTags.push({
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true
    })

    // Construct final URLs
    linkTags.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?' + hrefs.join('&') + '&display=swap'
    })
  }

  return {
    link: linkTags
  }
}
