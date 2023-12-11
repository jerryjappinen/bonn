export default (publicGoogleSheetId, cellId) => {
  // return 'https://docs.google.com/spreadsheets/d/' + publicGoogleSheetId + '/export?format=csv&id=' + publicGoogleSheetId + '&gid=' + (cellId || '0')

  return 'https://docs.google.com/spreadsheets/d/' + publicGoogleSheetId + '/export?format=csv' + (cellId ? ('&gid=' + cellId) : '')
}
