export default (orgOrPackageName, packageName) => {
  return 'https://www.npmjs.com/package/' + orgOrPackageName + (packageName ? ('/' + packageName) : '')
}
