export default async (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, (duration || 1000))
  })
}
