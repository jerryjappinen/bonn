import startCase from 'lodash-es/startCase'

export default (email) => {
  const replacedEmail = email.replace(/@.*$/, '')
  return startCase(replacedEmail !== email ? replacedEmail : email)
}
