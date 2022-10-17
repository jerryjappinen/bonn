import { describe, it, expect } from 'vitest'

import isPlainObject from 'lodash-es/isPlainObject'
import values from 'lodash-es/values'

// import mergeConfigs from '../../../nuxt/config/mergeConfigs'

import assets from '../../src/nuxt/config/assets'
import bonn from '../../src/nuxt/config/bonn'
import compression from '../../src/nuxt/config/compression'
import dev from '../../src/nuxt/config/dev'
import googleFonts from '../../src/nuxt/config/googleFonts'
import markdown from '../../src/nuxt/config/markdown'
import meta from '../../src/nuxt/config/meta'
import noComponentPrefixing from '../../src/nuxt/config/noComponentPrefixing'
import pinia from '../../src/nuxt/config/pinia'
import prod from '../../src/nuxt/config/prod'
import scripts from '../../src/nuxt/config/scripts'
import scss from '../../src/nuxt/config/scss'
import sitemap from '../../src/nuxt/config/sitemap'
import svg from '../../src/nuxt/config/svg'
import transpile from '../../src/nuxt/config/transpile'
import viewport from '../../src/nuxt/config/viewport'

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
  noComponentPrefixing,
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
