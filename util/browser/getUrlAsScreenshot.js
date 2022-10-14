import getBrowser from './getBrowser'
import getPage from './getPage'
import getPageScreenshot from './getPageScreenshot'

export default async (pageUrl, options) => {
  const browser = await getBrowser()
  const page = await getPage(browser, pageUrl, options.width, options.height, options.mobile)
  const screenshot = await getPageScreenshot(page, options)

  await browser.close()

  return screenshot
}
