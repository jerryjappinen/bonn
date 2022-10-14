const defaultWindowWidth = 1440
const defaultWindowHeight = 800
const maxWindowWidth = 1920 * 4
const maxWindowHeight = 1080 * 4

export default async (browser, pageUrl, width, height, mobile) => {
  const page = await browser.newPage()

  await page.goto(pageUrl, {
    waitUntil: 'networkidle2'
  })

  const parsedWidth = width ? parseInt(width) : undefined
  const parsedHeight = height ? parseInt(height) : undefined

  await page.setViewport({
    width: parsedWidth && parsedWidth > 0
      ? Math.min(parsedWidth, maxWindowWidth)
      : defaultWindowWidth,
    height: parsedHeight && parsedHeight > 0
      ? Math.min(parsedHeight, maxWindowHeight)
      : defaultWindowHeight,
    deviceScaleFactor: 2,
    isMobile: !!mobile,
    hasTouch: !!mobile,
    isLandscape: !!(width > height)
  })

  return page
}
