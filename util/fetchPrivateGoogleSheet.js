import ky from 'ky-universal'

import csvToJson from './csvToJson'

import getPrivateGoogleSheetCsvUrl from './getPrivateGoogleSheetCsvUrl'

export default async (privateGoogleSheetShareId, headersIncluded) => {
  const csvUrl = getPrivateGoogleSheetCsvUrl(privateGoogleSheetShareId)

  const { body } = await ky(csvUrl)

  const items = csvToJson(body, headersIncluded)

  return items
}
