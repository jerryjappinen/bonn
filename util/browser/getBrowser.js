import chrome from 'chrome-aws-lambda'

// eslint-disable-next-line import/default
import puppeteer from 'puppeteer-core'
// import { launch } from 'puppeteer-core'

import isDev from '../isDev'

// When developing locally, we cannot cannot connect to a remote Chrome browser on Amazon
// https://github.com/vercel/og-image/blob/c06a2f573d4b467148c2ebd0e305e68a9bf2f9f9/api/_lib/options.ts#L2-L26
const devOptions = {
  args: [],
  headless: true,
  executablePath: process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

export default async () => {
  // const browser = await launch(

  // eslint-disable-next-line import/no-named-as-default-member
  const browser = await puppeteer.launch(
    isDev
      ? devOptions
      : {
          args: [
            ...chrome.args,
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ],
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        }
  )

  return browser
}
