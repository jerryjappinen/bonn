export default {
  copyFiles: [],

  copyDirs: [
    '.github',
    'components',
    'experimentalComponents',
    'eslint',
    'icons',
    'scss',
    'prettier'
  ],

  cjs: [
    'composables/useCursor',
    'composables/useGamepad',
    'composables/useIsMounted',
    'composables/useLoop',
    'composables/useModelValue',
    'composables/useNetwork',
    'composables/usePersist',
    'composables/usePlatform',
    'composables/useSearch',
    'composables/useTime',
    'composables/useViewport',

    'nuxt/config/bonn/getDevAliases',
    'nuxt/config/svg/svgoConfig',

    'nuxt/config/assets',
    'nuxt/config/bonn',
    'nuxt/config/compression',
    'nuxt/config/css',
    'nuxt/config/dev',
    'nuxt/config/googleFonts',
    'nuxt/config/graphql',
    'nuxt/config/markdown',
    'nuxt/config/mergeConfigs',
    'nuxt/config/meta',
    'nuxt/config/noComponentPrefixing',
    'nuxt/config/pinia',
    'nuxt/config/prod',
    'nuxt/config/pwa',
    'nuxt/config/scripts',
    'nuxt/config/scss',
    'nuxt/config/sitemap',
    'nuxt/config/svg',
    'nuxt/config/transpile',
    'nuxt/config/viewport',
    'nuxt/config/webfonts',

    'nuxt/plugins/piniaPersist',

    'nuxt/index',

    'stores/setup/contentful',
    'stores/setup/device',
    'stores/setup/hygraph',
    'stores/setup/popover',
    'stores/setup/search',

    'stores/contentful',
    'stores/device',
    'stores/hygraph',
    'stores/popover',
    'stores/search',

    'util/browser/getBrowser',
    'util/browser/getPage',
    'util/browser/getPagePdf',
    'util/browser/getPageScreenshot',
    'util/browser/getUrlAsPdf',
    'util/browser/getUrlAsScreenshot',

    'util/blur',
    'util/clearSelection',
    'util/createSendinblueService',
    'util/createStyleElement',
    'util/csv',
    'util/csvToJson',
    'util/detectObtrusiveScrollbars',
    'util/eventHasAnyMetaKey',
    'util/eventHasKey',
    'util/eventHasMetaKey',
    'util/fetchPrivateGoogleSheet',
    'util/fetchPublicGoogleSheet',
    'util/focusFirstInput',
    'util/focusLastInput',
    'util/forEachAsync',
    'util/forEachSync',
    'util/formatDate',
    'util/formatDateInterval',
    'util/formatEventName',
    'util/formatExcerpt',
    'util/formatFileSize',
    'util/formatHygraphImageUrl',
    'util/formatInitials',
    'util/formatMachineReadableDate',
    'util/formatMachineReadableDateTime',
    'util/formatMonth',
    'util/formatSlug',
    'util/frameLoop',
    'util/gamepadIsSupported',
    'util/getApplePodcastUrl',
    'util/getBitbucketProfileUrl',
    'util/getCurrentTimestamp',
    'util/getDirection',
    'util/getDomain',
    'util/getFacebookPageUrl',
    'util/getFacebookProfileUrl',
    'util/getFigmaProfileUrl',
    'util/getGamepads',
    'util/getGithubProfileUrl',
    'util/getGravatarImageUrl',
    'util/getInstagramProfileUrl',
    'util/getIsoDurationInSeconds',
    'util/getLinkedinCompanyUrl',
    'util/getLinkedinProfileUrl',
    'util/getMarkdownIt',
    'util/getMediumCollectionUrl',
    'util/getMediumProfileUrl',
    'util/getMediumTopicUrl',
    'util/getNameFromEmail',
    'util/getNpmPackageUrl',
    'util/getNpmProfileUrl',
    'util/getObservableProfileUrl',
    'util/getPrivateGoogleSheetCsvUrl',
    'util/getPublicGoogleSheetCsvUrl',
    'util/getRandomNumberGenerator',
    'util/getRedditProfileUrl',
    'util/getRedditSubUrl',
    'util/getSkypeLink',
    'util/getSpotifyShowUrl',
    'util/getTwitchVideoUrl',
    'util/getTwitterProfileUrl',
    'util/getUserAgent',
    'util/getUserAgentValue',
    'util/getYoutubeThumbnailUrl',
    'util/getYoutubeVideoUrl',
    'util/goToUrl',
    'util/highlightCode',
    'util/includesAny',
    'util/isAbsoluteUrl',
    'util/isClient',
    'util/isDev',
    'util/isEmail',
    'util/isIsoDateString',
    'util/isPrefixed',
    'util/isProd',
    'util/isServer',
    'util/isSuffixed',
    'util/isTest',
    'util/isValidDate',
    'util/linkIsInternal',
    'util/md5',
    'util/mergeWithArrays',
    'util/nextTick',
    'util/normalizeDate',
    'util/now',
    'util/nowEpoch',
    'util/nowIso',
    'util/openTab',
    'util/parseDurationSeconds',
    'util/parseIsoDuration',
    'util/parseVersionNumber',
    'util/prefixWith',
    'util/processEnvExists',
    'util/processExists',
    'util/registerVueGlobals',
    'util/reloadPage',
    'util/removePrefix',
    'util/removeSuffix',
    'util/removeTrailingSlash',
    'util/replaceAll',
    'util/sendEmail',
    'util/suffixWith',
    'util/toDecimal',
    'util/toJson',
    'util/toPlainText',
    'util/trimAllWhitespace',
    'util/trimAny',
    'util/trimNewLines',
    'util/trimWhitespace',
    'util/tryPromises',
    'util/userPrefersDarkMode',
    'util/wait',
    'util/whitespaceCharacters',
    'util/windowExists',

    'vercel/endpoints/contentfulCreate',
    'vercel/endpoints/contentfulEntries',

    'vercel/endpoint',
    'vercel/parseQuery'
  ]
}
