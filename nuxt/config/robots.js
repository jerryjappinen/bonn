import compact from 'lodash-es/compact'
import flatten from 'lodash-es/flatten'
import isString from 'lodash-es/isString'

export default (...optionsInput) => {
  const ruleInputs = compact(flatten(optionsInput))

  let rules = []
  let configPath = ''

  // Accept configPath in a convenient way
  if (isString(ruleInputs[0])) {
    configPath = ruleInputs[0]

  // Otherwise treat input as list of rule definitions
  } else {
    rules = ruleInputs
  }

  return {
    modules: ['@nuxtjs/robots'],
    robots: {
      rules,
      configPath
    }
  }
}
