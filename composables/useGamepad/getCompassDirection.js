export default (degrees) => {
  if (degrees || degrees === 0) {
    return Math.round(degrees / 90)
  }

  return null
}
