import getBrowser from './getBrowser'
import getPage from './getPage'
import getPagePdf from './getPagePdf'

export default async (pageUrl, options) => {
  const browser = await getBrowser()
  const page = await getPage(browser, pageUrl, options.width, options.height, options.mobile)
  const pdf = await getPagePdf(page, options)

  await browser.close()

  return pdf
}
