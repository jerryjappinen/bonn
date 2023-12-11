import googleFonts from '../head/googleFonts'

export default (...optionsInput) => {
  return {
    meta: googleFonts(...optionsInput)
  }
}
