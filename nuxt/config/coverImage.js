import coverImage from '../head/coverImage'

export default (...optionsInput) => {
  return {
    app: {
      head: coverImage(...optionsInput)
    }
  }
}
