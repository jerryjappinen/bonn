import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AppStoreBadge from '../../components/AppStoreBadge.vue'
import AppStoreLink from '../../components/AppStoreLink.vue'
import Bitmap from '../../components/Bitmap.vue'
import Bodytext from '../../components/Bodytext.vue'
import Buttons from '../../components/Buttons.vue'
import Checkbox from '../../components/Checkbox.vue'
import Click from '../../components/Click.vue'
import ClickButton from '../../components/ClickButton.vue'
import ConditionalLink from '../../components/ConditionalLink.vue'
import CustomTransition from '../../components/CustomTransition.vue'
import DateInterval from '../../components/DateInterval.vue'
import Dump from '../../components/Dump.vue'
import Duration from '../../components/Duration.vue'
import Ellipsis from '../../components/Ellipsis.vue'
import EmailLink from '../../components/EmailLink.vue'
import ExternalLink from '../../components/ExternalLink.vue'
import Fade from '../../components/Fade.vue'
import FigmaCanvas from '../../components/FigmaCanvas.vue'
import Flex from '../../components/Flex.vue'
import FlexFixed from '../../components/FlexFixed.vue'
import FlexFluid from '../../components/FlexFluid.vue'
import FormattedDate from '../../components/FormattedDate.vue'
import GooglePlayBadge from '../../components/GooglePlayBadge.vue'
import GooglePlayLink from '../../components/GooglePlayLink.vue'
import Icon from '../../components/Icon.vue'
import LiveDuration from '../../components/LiveDuration.vue'
import Markdown from '../../components/Markdown.vue'
import MobileWebAppBadge from '../../components/MobileWebAppBadge.vue'
import PhoneNumber from '../../components/PhoneNumber.vue'
import PlaceholderImage from '../../components/PlaceholderImage.vue'
import PlaceholderText from '../../components/PlaceholderText.vue'
import Plaintext from '../../components/Plaintext.vue'
import ProductHuntBadge from '../../components/ProductHuntBadge.vue'
import ProductHuntLink from '../../components/ProductHuntLink.vue'
import ProgressBar from '../../components/ProgressBar.vue'
import Set from '../../components/Set.vue'
import SlowFade from '../../components/SlowFade.vue'
import Spacer from '../../components/Spacer.vue'
import Spinner from '../../components/Spinner.vue'
import StyledTextfield from '../../components/StyledTextfield.vue'
import Switch from '../../components/Switch.vue'
import Tag from '../../components/Tag.vue'
import Textfield from '../../components/Textfield.vue'
import TitleArea from '../../components/TitleArea.vue'
import Toggle from '../../components/Toggle.vue'
import VideoPlayer from '../../components/VideoPlayer.vue'
import WebAppBadge from '../../components/WebAppBadge.vue'
import YoutubePlayer from '../../components/YoutubePlayer.vue'

const tests = {

  AppStoreBadge,
  AppStoreLink: [AppStoreLink, { appId: 'foobar' }],
  Bitmap: [Bitmap, {}, { src: 'foobar' }],
  Bodytext,
  Buttons,
  Checkbox: [Checkbox, null, { modelValue: true }, { disabled: true }, { disabled: true, modelValue: true }],
  Click,
  ClickButton,
  ConditionalLink,
  CustomTransition,
  DateInterval: [DateInterval, { startDate: '2022-01-01' }, { startDate: new Date() }],
  Dump,
  Duration: [Duration, { date: '2022-01-01' }],
  Ellipsis,
  EmailLink: [EmailLink, { to: 'foo@bar.com' }],
  ExternalLink,
  Fade,
  FigmaCanvas: [FigmaCanvas, { file: 'foobar' }],
  Flex,
  FlexFixed,
  FlexFluid,
  FormattedDate: [FormattedDate, { date: '2022-01-01' }],
  GooglePlayBadge: [GooglePlayBadge, { package: 'org.foo.bar' }],
  GooglePlayLink: [GooglePlayLink, { package: 'org.foo.bar' }],
  Icon,
  LiveDuration: [LiveDuration, { date: '2022-01-01' }],
  Markdown,
  MobileWebAppBadge,
  PhoneNumber,
  PlaceholderImage,
  PlaceholderText,
  Plaintext,
  ProductHuntBadge: [ProductHuntBadge, { postId: 'foobar' }],

  // FIXME: Not sure what's wrong with this
  ProductHuntLink: [ProductHuntLink, { postId: 'foobar', postSlug: 'foobar' }],

  ProgressBar,
  Set,
  SlowFade,
  Spacer,
  Spinner,
  StyledTextfield,
  Switch,
  Tag,
  Textfield,
  TitleArea,
  Toggle: [Toggle, { modelValue: false }],
  VideoPlayer,
  WebAppBadge,
  YoutubePlayer
}

// This mounts all components defined above
describe.concurrent('Components', () => {
  for (const componentName in tests) {
    const args = tests[componentName]
    const component = args[0] || args

    // Props are in the same list for convenience
    let propLists = [{}]
    if (args.length > 1) {
      propLists = (args.slice(1)).map(props => props || {})
    }

    // Mount component with each prop variation
    propLists.forEach((props) => {
      it(componentName + ' should mount', () => {
        // The minimum is that we have a wrapper object here
        // Any errors will fail the test here
        const wrapper = mount(component, { props })
        expect(wrapper).toBeTruthy()
      })
    })
  }
})
