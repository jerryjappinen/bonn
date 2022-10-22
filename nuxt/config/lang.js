import headLang from '../head/lang'

export default (...optionsInput) => {
  return {
    meta: headLang(...optionsInput)
  }
}
