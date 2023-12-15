import headScripts from '../head/scripts'

export default (...optionsInput) => {
  return {
    app: {
      head: headScripts(...optionsInput)
    }
  }
}
