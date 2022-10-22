import headScripts from '../head/scripts'

export default (...optionsInput) => {
  return {
    meta: headScripts(...optionsInput)
  }
}
