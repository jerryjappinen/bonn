// https://stackoverflow.com/questions/11619805/using-the-google-drive-api-to-download-a-spreadsheet-in-csv-format
export default (privateGoogleSheetShareId, gid) => {
  return 'https://docs.google.com/spreadsheets/d/e/' + privateGoogleSheetShareId + '/pub?output=csv' + (gid ? ('&gid=' + gid) : '')
}
