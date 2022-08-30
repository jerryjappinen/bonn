# Bonn SCSS

`scss/` contains useful, generic mixins and functions for developing web sites and apps. It is designed to be compatible with `compnents/`, but can be used independently.

## Quick start

Install `bonn/scss`:

```sh
npm install bonn/scss
```

In your SCSS code, import everything:

```scss
@import 'bonn/scss';
```

Or customise with your own variables:

```scss
@import 'bonn/scss/shared';
@import './my-variables'; // Override default SCSS variables here
@import 'bonn/scss/global';
@import 'bonn/scss/util';
```

Or pick only what you need:

```scss
// Shared
@import 'bonn/scss/variables-scss';
@import 'bonn/scss/functions';
@import 'bonn/scss/mixins';

@import './my-variables';

// Normalizations and defaults (these output CSS)
@import 'bonn/scss/custom-properties';
@import 'bonn/scss/normalize';
@import 'bonn/scss/defaults';
@import 'bonn/scss/util';
```

You might not need all defaults or utilities. You can leave them out to optimise file size:

```scss
@import './defaults/body';
@import './defaults/forms';
@import './defaults/tables';
@import './util/bodytext';
```

### Importing in a JavaScript file

```js
import 'bonn/scss/variables-scss';
import 'bonn/scss/functions';
import 'bonn/scss/mixins';

import './my-variables';

import 'bonn/scss/normalize';
import 'bonn/scss/defaults';
