import headFacebookAppId from '../head/facebookAppId'

export default (...optionsInput) => {
  return {
    meta: headFacebookAppId(...optionsInput)
  }
}
