import gamepadIsSupported from './gamepadIsSupported'

// NOTE: getGamepads returns a GamepadList, not an array
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
export default () => {
  if (gamepadIsSupported()) {
    return navigator.getGamepads()
  }

  return [null, null, null, null]
}
