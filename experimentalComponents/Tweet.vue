<script>
import windowExists from '../util/windowExists'

// // https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization
// const initTwitterLibrary = () => {
//   if (windowExists()) {

//     window.twttr = (function (d, s, id) {
//       const fjs = d.getElementsByTagName(s)[0]
//       const t = window.twttr || {}

//       if (d.getElementById(id)) return t

//       const js = d.createElement(s)
//       js.id = id
//       js.src = 'https://platform.twitter.com/widgets.js'
//       fjs.parentNode.insertBefore(js, fjs)

//       t._e = []
//       t.ready = function (f) {
//         t._e.push(f)
//       }

//       return t
//     }(window.document, 'script', 'twitter-wjs'))

//   }

//   return null
// }

export default {

  props: {

    // Required

    userName: {
      type: String,
      required: true
    },

    tweetId: {
      type: [Number, String],
      required: true
    },

    // Optional

    dark: {
      type: Boolean,
      default: false
    },

    userDisplayName: {
      type: String,
      default: null
    },

    userProfileImageUrl: {
      type: String,
      default: null
    },

    tweetLanguage: {
      type: String,
      default: null
    },

    tweetTextDirection: {
      type: String,
      default: null
    },

    tweetBody: {
      type: String,
      default: null
    },

    tweetTimestamp: {
      type: String,
      default: null
    }
  },

  computed: {

    bindings () {
      const bindings = {
        'data-dnt': true
      }

      if (this.dark) {
        bindings['dark-theme'] = true
      }

      return bindings
    }

  },

  mounted () {
    this.loadScript()
    // initTwitterLibrary()
    // this.loadTwitterComponent()
  },

  methods: {

    // loadTwitterComponent () {
    //   if (windowExists() && window.twttr) {
    //     // eslint-disable-next-line no-console
    //     console.log(window.twttr)
    //     if (window.twttr.widgets) {
    //       window.twttr.widgets.load(this.$el)
    //     } else {
    //       window.twttr.ready((twittr) => {
    //         twittr.widgets.load(this.$el)
    //       })
    //     }
    //   }
    // }

    loadScript () {
      if (windowExists()) {

        // Create a script element
        const script = window.document.createElement('script')

        // Set attributes
        script.setAttribute('type', 'text/javascript')
        script.setAttribute('language', 'javascript')
        script.setAttribute('charset', 'utf-8')
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
        script.defer = true

        // Append script
        this.$el.appendChild(script)

      }
    }

  }

}
</script>

<template>
  <div
    :class="{
      'c-tweet-dark': dark
    }"
    class="c-tweet"
  >
    <blockquote
      v-bind="bindings"
      class="c-tweet-placeholder twitter-tweet no-rhythm"
    >
      <slot class="c-tweet-placeholder-content">
        <div class="c-tweet-link">
          <a :href="'https://twitter.com/' + userName">
            See {{ userName }}'s other Tweets
          </a>
        </div>

        <a
          :href="'https://twitter.com/' + userName"
          class="c-tweet-user"
        >

          <img
            v-if="userProfileImageUrl"
            :src="userProfileImageUrl"
            class="c-tweet-user-image"
          >

          <div
            v-else
            class="c-tweet-user-image-placeholder"
          />

          <div class="c-tweet-placeholder-user-details">
            <div>
              <strong>{{ userDisplayName || userName }}</strong>
            </div>
            <div class="c-tweet-info">
              @{{ userName }}
            </div>
          </div>

        </a>

        <div class="c-tweet-content">
          <p
            :lang="tweetLanguage || 'en'"
            :dir="tweetTextDirection || 'ltr'"
          >
            {{ tweetBody || '' }}
          </p>
          <div class="c-tweet-info">
            &mdash; {{ userDisplayName || userName }} (@{{ userName }})
            <a :href="'https://twitter.com/' + userName + '/status/' + tweetId + '?ref_src=twsrc%5Etfw'">
              {{ tweetTimestamp || 'Go to tweet' }}
            </a>
          </div>
        </div>
      </slot>
    </blockquote>
  </div>
</template>

<style lang="scss">

.c-tweet {
  width: 550px;
  max-width: 100%;

  .twitter-tweet {
    width: 100% !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

}

.c-tweet-placeholder {
  @include border-box;
  max-width: 100%;
  width: 530px;
  min-width: 220px;
  margin-left: auto;
  margin-right: auto;
  border-width: 1px;
  border-radius: 15px;
  color: #1c2022;
  background-color: #fff;
  border-color: #e1e8ed;
  font-size: 16px;
  line-height: 1.4;
  font-family: Helvetica, Roboto, "Segoe UI", Calibri, sans-serif;
  font-style: normal;
}

.c-tweet-dark {

  .c-tweet-placeholder {
    color: #fff;
    background-color: #1c2022;
  }

  .c-tweet-placeholder,
  .c-tweet-content {
    border-color: #253341;
  }

}

.c-tweet-placeholder-content {
  @include flex;
  @include flex-vertical;
}

.c-tweet-user,
.c-tweet-content,
.c-tweet-link {
  padding-left: 20px;
  padding-right: 20px;
}

.c-tweet-content,
.c-tweet-user {
  padding-top: 20px;
}

.c-tweet-user {
  @include flex;
}

.c-tweet-placeholder-user-details {
  line-height: 1.2;
}

.c-tweet-user-image,
.c-tweet-user-image-placeholder {
  @include flex-fixed;
  width: 36px;
  height: 36px;
  margin-right: 9px;
  border-radius: 36px;
}

.c-tweet-content {
  padding-bottom: 12px;
  border-color: #e1e8ed;
  border-bottom-width: 1px;

  .c-tweet-info {
    margin-top: 10px;
  }

}

.c-tweet-info,
.c-tweet-link {
  font-size: 14px;
}

.c-tweet-info {
  color: #697882;
}

.c-tweet-link {
  order: 2;
  padding-top: 9px;
  padding-bottom: 9px;
  color: #2b7bb9;
}

</style>
