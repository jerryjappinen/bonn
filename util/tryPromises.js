// Handle multiple promises with Promise.all, but don't throw errors
// - returns failing promises with `undefined` as return value
export default async (...promises) => {
  return Promise.all(
    promises.map(async (promise) => {
      // Try promise
      try {
        return await promise

      // Don't throw errors, return `undefined` instead
      } catch (error) {
        return undefined
      }
    })
  )
}
