export default (container, selector) => {
  const inputs = container.querySelectorAll(
    selector || 'input, button, textarea'
  )

  if (inputs && inputs.length) {
    return inputs[inputs.length - 1].focus()
  }

  return null
}
