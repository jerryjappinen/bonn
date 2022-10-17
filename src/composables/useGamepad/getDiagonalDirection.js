export default (degrees) => {
  if (degrees || degrees === 0) {
    return Math.round(degrees / 45)
  }

  return null
}
