import headThemeColor from '../head/themeColor'

export default (...optionsInput) => {
  return {
    meta: headThemeColor(...optionsInput)
  }
}
