<script>
import { h } from 'vue'

// https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
// https://github.com/maoberlehner/transition-to-height-auto-with-vue/blob/master/src/App.vue
export default {
  render (context) {
    return h('transition', {

      props: {
        name: 'c-transition-expand'
      },

      on: {

        afterEnter (element) {
          element.style.height = 'auto'
        },

        enter (element) {
          const { width } = getComputedStyle(element)

          element.style.width = width
          element.style.position = 'absolute'
          element.style.visibility = 'hidden'
          element.style.height = 'auto'

          const { height } = getComputedStyle(element)

          element.style.width = null
          element.style.position = null
          element.style.visibility = null
          element.style.height = 0

          setTimeout(() => {
            element.style.height = height
          })
        },

        leave (element) {
          const { height } = getComputedStyle(element)

          element.style.height = height

          setTimeout(() => {
            element.style.height = 0
          })
        }

      }

    }, context.children)
  }

}

</script>

<style lang="scss">

.c-transition-expand-enter-active,
.c-transition-expand-leave-active {
  will-change: height, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;

  overflow-x: visible;
  overflow-y: hidden;
  opacity: 1;
  @include transition-medium;
  @include transition-properties(height, opacity);
}

.c-transition-expand-enter-from,
.c-transition-expand-leave-to {
  height: 0;
  opacity: 0;
}

</style>
