import compact from 'lodash-es/compact'
import flattenDeep from 'lodash-es/flattenDeep'

import css from './css'

// see mixins/text/font-face.scss
export default (...optionsInputs) => {
  const definitions = compact(flattenDeep(optionsInputs)).map(({
    family,
    weight,
    style,
    path,

    eot,
    woffdata,
    woff2data
  }) => {
    return {
      family,
      weight: weight || 400,
      style: style || 'normal',
      path,

      eot: !!eot,
      woffdata,
      woff2data
    }
  })

  const cssStrings = definitions.map(({
    family,
    weight,
    style,
    path,

    eot,
    woffdata,
    woff2data
  }) => {
    let cssString = ''

    if (eot) {
      cssString += `@font-face {
          font-family: ${family};
          font-weight: ${weight};
          font-style: ${style};
          src: url('${path}.eot');
        }`
    }

    cssString += `@font-face {
      font-family: ${family};
      font-style: ${style};
      font-weight: ${weight};

      ${
        woffdata || woff2data
          ? `src:
        url('data:application/font-woff;charset=utf-8;base64,${woffdata}') format('woff'),
        url('data:application/font-woff2;charset=utf-8;base64,${woff2data}') format('woff2'),`
          : `src:
        url('${path}.woff') format('woff'),
        url('${path}.woff2') format('woff2'),`
      }

      url('${path}.ttf') format('truetype');
    }`

    return cssString
  })

  return css({
    inline: cssStrings.join('\n\n')
  })
}
