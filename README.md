# Bonn

Bonn is a convenient utility, style and components library for web projects. Bonn includes the following elements:

- JavaScript utilities
- SCSS mixins, variables and default styles
- SVG icon set
- Vue and Nuxt apps
  - Vue components
  - Vue composables
  - Pinia stores
  - Nuxt config helpers and module

Utilities can be used in any JS project, including server-side. Similarly, SCSS and SVGs can be used in any project, not only Vue or Nuxt projects.



## Installation

Install Bonn and (optional) dependencies:

```sh
npm i bonn lodash-es date-fns
```

You might need additional peer dependencies depending on the type of project and the components you use. See the relevant docs for more details.



### Nuxt

Use the `nuxt.config` helpers to load Bonn's Nuxt module and other relevant configurations:

```js
import bonn from 'bonn/nuxt/config/bonn'
import svg from 'bonn/nuxt/config/svg'

import mergeConfigs from 'bonn/nuxt/config/mergeConfigs'

export default defineNuxtConfig(mergeConfigs(
  bonn({
    // components: false,
    // composables: false,
    // icons: false,
    // prefix: 'Bonn'
  }),
  svg(),
  {
    // Your Nuxt configs here...
  }
))
```

This will output the desired config for you. See the relevant docs for more details.




## Usage

### `.js` utilities

```js
import formatFileSize from 'bonn/util/formatFileSize'

formatFileSize(19238028)
```



### `.vue` components

`components/` are NOT built during install. You must transpile them yourself in your project.

```vue
<script>
import ClickButton from 'bonn/components/ClickButton'

export default {
  components: {
    ClickButton
  }
}
</script>

<template>
  <ClickButton />
</template>
```

Note that when using `<script setup>`, you don't have to export the components. In a Nuxt project, components are also auto imported so you can directly use them in your templates.



### Vue composables

```js
import useIsMounted from 'bonn/composables/useIsMounted'

const isMounted = useIsMounted()

export default {
  data () {
    return {
      isMounted
    }
  }
}
```



### Pinia `stores/`

```js
import useDevice from 'bonn/stores/device'

const device = useDevice()
```



### `nuxt.config` helpers

```js
import { mergeConfigs, dev, assets, scss, svg } from 'bonn/nuxt/config'

export default defineNuxtConfig(mergeConfigs(
  assets({ /*...*/ }),
  scss({
    global: 'styles/global.scss',
    shared: 'styles/shared.scss'
  }),
  svg(),
  dev({
    typescript: {
      shim: false
    }
  })
))
```


### `.svg` icons

Auto imported in a Nuxt project:

```html
<Icon>
  <IconChevronUp />
</Icon>
```

The `Icon` component renders the SVG assets in a standard size, but is not required.

Some Vue components rely on SVG icon assets. Since these are user-configurable, you must choose where to get them (or manually use the defaults from `bonn/icons`).

Bonn assumes you import SVG icons as Vue components (using `vite-svg-loader`, for example). This can be easily done using a Nuxt config helper in your Nuxt project.

To completely replace the default icon set, provide the following icons:

```
Check.svg
ChevronDown.svg
```



### `.scss` mixins and styles

`scss/` contains useful, generic mixins and functions for developing web sites and apps. It is designed to be compatible with `components/`, but can be used independently.

```js
import formatFileSize from 'bonn/util/formatFileSize'

formatFileSize(19238028)
```

In your SCSS code, import everything:

```scss
@import 'bonn/scss';
```

Basic customisation:

```scss
@import 'bonn/scss/shared';

@import './my-variables';   // Override default SCSS variables here

@import 'bonn/scss/global'; // CSS variables, normalisation and defaults
@import 'bonn/scss/util';   // Optional
```

Advanced customisation:

```scss
// shared.scss
@import 'bonn/scss/variables-scss';
@import 'bonn/scss/functions';
@import 'bonn/scss/mixins';

// Custom SCSS variables
@import './my-variables';

// Normalizations and defaults (these output CSS)
@import 'bonn/scss/variables';
@import 'bonn/scss/normalize';
@import 'bonn/scss/defaults';
@import 'bonn/scss/util';
```

You can optimise your build even further by including only some defaults and utilities:

```scss
@import 'bonn/scss/defaults/body';
@import 'bonn/scss/defaults/forms';
@import 'bonn/scss/defaults/tables';

@import 'bonn/scss/util/bodytext';
```

Import from a JavaScript file:

```js
import 'bonn/scss/shared';
import 'bonn/scss/global';
import 'bonn/scss/util';
```
