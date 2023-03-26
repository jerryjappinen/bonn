export default (rules, configPath) => {
  return {
    modules: ['@nuxtjs/robots'],
    robots: {
      rules: rules || [],
      configPath
    }
  }
}
