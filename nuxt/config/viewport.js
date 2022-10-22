import headViewport from '../head/viewport'

export default (...optionsInput) => {
  return {
    meta: headViewport(...optionsInput)
  }
}
