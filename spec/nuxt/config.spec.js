import { describe, it, expect } from 'vitest'

import isPlainObject from 'lodash-es/isPlainObject'
import values from 'lodash-es/values'

// import mergeConfigs from '../../../nuxt/config/mergeConfigs'

import assets from '../../nuxt/config/assets'
import bonn from '../../nuxt/config/bonn'
import compression from '../../nuxt/config/compression'
import dev from '../../nuxt/config/dev'
import googleFonts from '../../nuxt/config/googleFonts'
import markdown from '../../nuxt/config/markdown'
import meta from '../../nuxt/config/meta'
import noComponentDirectoryPrefixes from '../../nuxt/config/noComponentDirectoryPrefixes'
import pinia from '../../nuxt/config/pinia'
import prod from '../../nuxt/config/prod'
import scripts from '../../nuxt/config/scripts'
import scss from '../../nuxt/config/scss'
import sitemap from '../../nuxt/config/sitemap'
import svg from '../../nuxt/config/svg'
import transpile from '../../nuxt/config/transpile'
import viewport from '../../nuxt/config/viewport'

const conditions = {
  dev,
  prod
}

const helpers = {
  assets,
  bonn,
  compression,
  googleFonts,
  markdown,
  meta,
  noComponentDirectoryPrefixes,
  pinia,
  scripts,
  scss,
  sitemap,
  svg,
  transpile,
  viewport
}

describe.concurrent('config helpers', () => {
  it('should return objects', () => {
    values({
      ...conditions,
      ...helpers
    }).forEach((helper) => {
      expect(isPlainObject(helper())).toBeTruthy()
    })
  })
})
