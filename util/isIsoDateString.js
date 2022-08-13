export default (string) => {
  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string)) {
    const d = new Date(string)

    if (d.toISOString() === string) {
      return true
    }
  }

  return false
}
