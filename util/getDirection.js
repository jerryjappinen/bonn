// Returns direction of XY position from origo (0, 0) in degrees
// NOTE: absolute values of X and Y do not matter for this (can be floats, XY coordinates)
// Positive X and positive Y yields 0-90
// Positive X and negative Y yields 90-180
// Negative X and negative Y yields 180-270
// Negative X and positive Y yields 270-0
export default (x, y) => {
  if (!x && !y) {
    return null
  }

  return 180 - ((Math.atan2(x, y) * 180) / Math.PI)
}
