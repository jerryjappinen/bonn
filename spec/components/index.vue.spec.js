// import { describe, it, expect } from 'vitest'
import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppStoreBadge from '../../components/AppStoreBadge.vue'
import AppStoreLink from '../../components/AppStoreLink.vue'
import Bitmap from '../../components/Bitmap.vue'
import Bodytext from '../../components/Bodytext.vue'
import Buttons from '../../components/Buttons.vue'
// import Checkbox from '../../components/Checkbox.vue'
import Click from '../../components/Click.vue'
import ClickButton from '../../components/ClickButton.vue'
import ConditionalLink from '../../components/ConditionalLink.vue'
import CustomTransition from '../../components/CustomTransition.vue'
import DateInterval from '../../components/DateInterval.vue'
// import Dropdown from '../../components/Dropdown.vue'
import Dump from '../../components/Dump.vue'

const propLists = [

  // FIXME: these rely on icons - add SVG import to test environment
  // [Checkbox, {}, { modelValue: true }, { disabled: true }, { disabled: true, modelValue: true }],
  // Dropdown,

  AppStoreBadge,
  [AppStoreLink, { appId: 'foobar' }],
  [Bitmap, {}, { src: 'foobar' }],
  Bodytext,
  Buttons,
  Click,
  ClickButton,
  ConditionalLink,
  CustomTransition,
  [DateInterval, { startDate: '2022-01-01' }, { startDate: new Date() }],
  Dump
]

// This mounts all components defined above
describe.concurrent('Components', () => {
  it('should mount', () => {
    propLists.forEach((args) => {
      const component = args[0] || args

      // Props are in the same list for convenience
      let propLists = [{}]
      if (args.length > 1) {
        propLists = (args.slice(1)).map(props => props || {})
      }

      // Mount component with each prop variation
      propLists.forEach((props) => {
        mount(component, { props })
      })
    })
  })
})
