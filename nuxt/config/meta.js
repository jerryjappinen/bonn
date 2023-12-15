import headMeta from '../head/meta'

export default (...optionsInput) => {
  return {
    app: {
      head: headMeta(...optionsInput)
    }
  }
}
