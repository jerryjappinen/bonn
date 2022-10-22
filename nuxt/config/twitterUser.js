import headTwitterUser from '../head/twitterUser'

export default (...optionsInput) => {
  return {
    meta: headTwitterUser(...optionsInput)
  }
}
