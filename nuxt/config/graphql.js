import graphql from '@rollup/plugin-graphql'

// https://www.npmjs.com/package/@rollup/plugin-graphql
export default (optionsInput) => {
  return {
    vite: {
      plugins: [
        graphql(optionsInput || {})
      ]
    }
  }
}
