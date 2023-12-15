import headFacebookAppId from '../head/facebookAppId'

export default (...optionsInput) => {
  return {
    app: {
      head: headFacebookAppId(...optionsInput)
    }
  }
}
