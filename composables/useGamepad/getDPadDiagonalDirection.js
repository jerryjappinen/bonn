export default (up, down, left, right) => {

  if (up) {
    return right
      ? 1
      : left
        ? 7
        : 0
  }

  if (down) {
    return right
      ? 3
      : left
        ? 5
        : 4
  }

  return right
    ? 2
    : left
      ? 6
      : null
}
