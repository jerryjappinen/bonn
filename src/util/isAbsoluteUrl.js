// https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
export default (string) => {
  return string && !!(/^(?:[a-z]+:)?\/\//i).test(string)
}
