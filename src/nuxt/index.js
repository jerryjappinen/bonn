// Nuxt module definition
import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addComponentsDir, addImportsDir } from '@nuxt/kit'

// This file allows auto importing bonn components and composables in a Nuxt app
export default defineNuxtModule({
  meta: {
    name: 'bonn',
    configKey: 'bonn',
    compatibility: {
      nuxt: '^3.0.0-rc.9'
    }
  },

  defaults: {
    components: true,
    composables: true,
    prefix: ''
  },

  async setup ({
    components,
    composables,
    icons,
    prefix
  }) {
    if (components) {
      const componentsDir = fileURLToPath(new URL('../components', import.meta.url))
      await addComponentsDir({
        path: componentsDir,
        extensions: ['vue'],
        prefix: (prefix || '')
      })
    }

    // FIXME: no prefixing for composables
    if (composables) {
      const composablesDir = fileURLToPath(new URL('../composables', import.meta.url))
      addImportsDir(composablesDir)

      // Prefixing can be done here, but no way to make default imports work?
      // addAutoImport(composableNames.map((composableName) => {
      //   generateComposableName(composableName, prefix)
      //   return {
      //     // name: generateComposableName(composableName),
      //     name: 'default',
      //     as: generateComposableName(composableName, prefix),
      //     from: composablesDir
      //   }
      // }))
    }

    if (icons) {
      const iconsDir = fileURLToPath(new URL('../icons', import.meta.url))
      await addComponentsDir({
        path: iconsDir,
        extensions: ['svg', 'vue'],
        prefix: (prefix || '') + 'Icon'
      })
    }
  }

})
