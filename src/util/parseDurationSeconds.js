export default (total) => {
  const hours = Math.floor(total / (60 * 60))
  const minutes = Math.floor((total - (hours * (60 * 60))) / 60)
  const seconds = total - (hours * (60 * 60)) - (minutes * 60)

  return {
    hours,
    minutes,
    seconds
  }
}
