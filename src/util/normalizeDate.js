import isValidDate from './isValidDate'

export default (dateOrValue) => {
  if (dateOrValue || dateOrValue === 0) {
    if (isValidDate(dateOrValue)) {
      return dateOrValue
    }

    const newDate = new Date(dateOrValue)

    if (isValidDate(newDate)) {
      return newDate
    }
  }

  return null
}
