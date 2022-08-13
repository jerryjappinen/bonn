export default async (array, asyncCallback) => {
  const results = []

  for (const item of array) {
    results.push(await asyncCallback(item))
  }

  return results
}
