export default async (page, options) => {
  const {
    format,
    margin,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom
  } = (options || {})

  const defaultMargin = margin || '1cm'

  const pdf = await page.pdf({
    format: format || 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
      left: marginLeft || defaultMargin,
      top: marginTop || defaultMargin,
      right: marginRight || defaultMargin,
      bottom: marginBottom || defaultMargin
    }
  })

  return pdf
}
