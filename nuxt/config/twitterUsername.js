import headTwitterUsername from '../head/twitterUsername'

export default (...optionsInput) => {
  return {
    app: {
      head: headTwitterUsername(...optionsInput)
    }
  }
}
