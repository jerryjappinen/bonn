export default (buttonState) => {
  return buttonState.value || (buttonState.pressed ? 1 : 0)
}
