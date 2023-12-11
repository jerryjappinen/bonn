// Removes one or more trailing slashes from URL
// https://gist.github.com/jens1101/9f3faa6c2dae23537257f1c3d0afdfdf
export default (urlString) => {
  return urlString.replace(/\/+$/, '')
}
