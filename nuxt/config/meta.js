import headMeta from '../head/meta'

export default (...optionsInput) => {
  return {
    meta: headMeta(...optionsInput)
  }
}
