import ky from 'ky-universal'

import csvToJson from './csvToJson'

import getPublicGoogleSheetCsvUrl from './getPublicGoogleSheetCsvUrl'

export default async (publicGoogleSheetId, headersIncluded) => {
  const csvUrl = getPublicGoogleSheetCsvUrl(publicGoogleSheetId)

  const { body } = await ky(csvUrl)

  const items = csvToJson(body, headersIncluded)

  return items
}
