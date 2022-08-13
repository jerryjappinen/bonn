# Bonn

Bonn is a utility, style and components library for web projects. Bonn includes the following elements:

- JavaScript utilities
- Scss mixins, variables and default styles
- SVG icon set
- Vue apps
  - Vue components
  - Vue composables
  - Pinia stores
  - Nuxt config helpers and module

## Installation

Install Bonn and (optional) dependencies:

```sh
npm i bonn lodash-es date-fns
```

You might need additional peer dependencies depending on the type of project and the components you use. See the relevant docs for more details.



## Usage

Use `.js` utilities:

```js
import formatFileSize from 'bonn/util/formatFileSize'

formatFileSize(19238028)
```

Use `.scss` styles:

```js
import formatFileSize from 'bonn/util/formatFileSize'

formatFileSize(19238028)
```

Use `.vue` components and composables:

```js
import ClickButton from 'bonn/components/ClickButton'
import useIsMounted from 'bonn/composables/useIsMounted'

const isMounted = useIsMounted()

export default {
  components: {
    ClickButton
  },

  data () {
    return {
      isMounted
    }
  }
}
```

`components/` are NOT built during install. You must transpile them yourself in your project.



### Composables

See [composables/](./composables/)



### nuxt.config

See [nuxt.config/](./nuxt.config/)



#### Nuxt module

Use the `nuxt.config` helper `bonn()`. It will output the desired config for you.

```js
import bonn from 'bonn/nuxt/config/bonn'

export default defineNuxtConfig(bonn({
  // components: false,
  // composables: false,
  // icons: false,
  // prefix: 'Bonn'
}))
```

### Todo

- [x] Replace `linna` usage
- [x] Replace import paths to internal paths
- [ ] Make tests pass
- [ ] Move docs readme to this repo
- [ ] Use readme from this repo in docs
- [ ] Update docs
- [x] `Icon` component
- [x] Add `persist` composable
- [x] Add `NuxtApp` component
- [ ] Add `NuxtPage` component
- [ ] Add tests
- [ ] Make test watcher the dev command
- [ ] Set test command as default in codesandbox
- [ ] `modelValue` composable
- [ ] Make `Textfield` support custom content and not just icons
