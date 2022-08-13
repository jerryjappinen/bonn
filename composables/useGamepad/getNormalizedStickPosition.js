export default (rawValue, innerDeadzone, outerDeadzone) => {
  const min = innerDeadzone
  const max = 1 - outerDeadzone

  const multiplier = rawValue < 0 ? -1 : 1

  return multiplier * (Math.max(0, (Math.abs(rawValue) - min)) / max)
}
