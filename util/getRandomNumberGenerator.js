// https://github.com/davidbau/seedrandom
import seedrandom from 'seedrandom'

export default (seed, includeState) => {
  return seedrandom(seed, {
    state: !!includeState
  })
}
