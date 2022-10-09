# Bonn SCSS

`scss/` contains useful, generic mixins and functions for developing web sites and apps. It is designed to be compatible with `components/`, but can be used independently.

## Quick start

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

### Import from a JavaScript file

```javascript
import 'bonn/scss/shared';
import 'bonn/scss/global';
import 'bonn/scss/util';
```
