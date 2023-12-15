import headThemeColor from '../head/themeColor'

export default (...optionsInput) => {
  return {
    app: {
      head: headThemeColor(...optionsInput)
    }
  }
}
