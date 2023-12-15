import icon from '../head/icon'

export default (...optionsInput) => {
  return {
    app: {
      head: icon(...optionsInput)
    }
  }
}
