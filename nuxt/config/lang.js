import headLang from '../head/lang'

export default (...optionsInput) => {
  return {
    app: {
      head: headLang(...optionsInput)
    }
  }
}
