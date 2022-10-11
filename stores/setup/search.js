import useSearch from '../../composables/useSearch'

export default (optionsInput) => {
  return () => {
    return useSearch(optionsInput)
  }
}
