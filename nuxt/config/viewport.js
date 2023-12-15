import headViewport from '../head/viewport'

export default (...optionsInput) => {
  return {
    app: {
      head: headViewport(...optionsInput)
    }
  }
}
