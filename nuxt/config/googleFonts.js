import googleFonts from '../head/googleFonts'

export default (...optionsInput) => {
  return {
    app: {
      head: googleFonts(...optionsInput)
    }
  }
}
