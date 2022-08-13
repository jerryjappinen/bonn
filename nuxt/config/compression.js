// Compression
// https://github.com/exreplay/nuxt-compression
export default (optionsInput) => {
  const options = {
    // maxAge: ...,
    // cacheControl: ...,

    // https://github.com/vbenjs/vite-plugin-compression#options
    viteCompression: {
      ...(optionsInput || {})
    }
  }

  return {
    buildModules: ['@averjs/nuxt-compression', options]
  }
}
