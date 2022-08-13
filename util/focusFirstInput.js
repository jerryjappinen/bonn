export default (container, selector) => {
  const input = container.querySelector(
    selector || 'input, button, textarea'
  )

  if (input) {
    return input.focus()
  }

  return null
}
