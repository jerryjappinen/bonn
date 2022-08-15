<script>
import { h } from 'vue'

export default {
  setup (props, { slots }) {
    const className = 'c-icon'

    console.log('slots.default', slots)

    const children = slots.default()

    if (children && children.length) {
      children.forEach((child) => {
        console.log('child', child)
        if (child.el) {
          child.el.classlist.add(className)
        }
      })
    }

    return () => h(slots.default)
  }
}
</script>
