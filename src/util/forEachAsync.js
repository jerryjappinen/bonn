export default async (arrayOrObject, asyncCallback) => {
  const promises = []

  // Array
  if (arrayOrObject instanceof Array) {
    arrayOrObject.forEach((item, i, array) => {
      promises.push(asyncCallback(item, i, array))
    })

  // Object
  } else if (arrayOrObject instanceof Object) {
    // for (const key in arrayOrObject) {
    //   promises.push(asyncCallback(arrayOrObject[key], key))
    // }

    // Since Promise only works with arrays, we must transform keyed queries to one
    const orderedPromises = []
    for (const key in arrayOrObject) {
      orderedPromises.push({
        key,
        query: arrayOrObject[key]
      })
    }

    // Run fetch callback for each query
    const results = await Promise.all(
      orderedPromises.map(({ query }) => {
        return asyncCallback(query)
      })
    )

    // Place each result under the correct key
    const keyedResults = {}
    results.forEach((result, i) => {
      keyedResults[orderedPromises[i].key] = result
    })

    return keyedResults
  }

  return Promise.all(promises)
}
