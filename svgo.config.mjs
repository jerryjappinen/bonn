// https://github.com/svg/svgo
export default {
  multipass: false, // boolean
  // datauri: 'base64', // 'base64'|'enc'|'unenc'
  js2svg: {
    indent: 4, // number
    pretty: false // boolean
  },
  plugins: [
    'preset-default', // built-in plugins enabled by default
    'removeTitle',
    // 'removeViewBox',
    'removeDimensions',

    // {
    //   name: 'convertTransform',
    //   params: {
    //     degPrecision: 0,
    //     floatPrecision: 0,
    //     transformPrecision: 0
    //   }
    // },

    // https://svgo.dev/docs/plugins/convertColors/
    {
      name: 'convertColors',
      params: {
        names2hex: true,
        rgb2hex: true,
        shorthex: true,
        shortname: true,

        // Convert this color code in fills/strokes to currentColor (used to generate mono-capable assets)
        // NOTE: must be exact, case-sensitive match before any other conversions
        // Assets must be authored with this in mind
        currentColor: '#F0F'
      }
    }
  ]
}
