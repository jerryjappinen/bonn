// NOTE: this is not exact for all controllers as their shapes can vary
// We won't let this go above 1 but it's not perfect on an Xbox controller at 45 deg
export default (x, y) => {
  return Math.min(1, Math.sqrt((x * x) + (y * y)))
}
