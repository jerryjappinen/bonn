<script setup>
import { computed, unref } from 'vue'

const pairs = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

const props = defineProps({
  mode: {
    default: 'out-in'
  },

  // left, right, top, bottom
  to: {
    type: String,
    default: null
  },

  // left, right, top, bottom
  from: {
    type: String,
    default: null
  },

  // Quick way to invert to and from
  reverse: {
    type: Boolean,
    default: false
  }

})

const transitionName = computed(() => {
  const base = 'c-fade'

  const reverse = unref(props.reverse)

  let to = unref(props.to)
  let from = unref(props.from)

  if (to || from) {
    // Default pairings
    if (to && !from) {
      from = pairs[to]
    } else if (from && !to) {
      to = pairs[from]
    }

    // Compose final transition name
    if (reverse) {
      return `${base}-from-${to}-to-${from}`
    }

    return `${base}-from-${from}-to-${to}`
  }

  return base
})
</script>

<template>
  <transition
    :mode="mode === 'simultaneous' ? undefined : mode"
    :name="transitionName"
  ><slot /></transition>
</template>

<style lang="scss">

:root {
  --c-fade-duration: var(--transition-fast);
  --c-fade-distance: var(--pad-tight-horizontal);

  // API: durations
  // --c-fade-enter-duration: var(--c-fade-duration);
  // --c-fade-leave-duration: var(--c-fade-duration);

  // --c-fade-from-left-duration: var(--c-fade-enter-duration);
  // --c-fade-from-right-duration: var(--c-fade-enter-duration);
  // --c-fade-from-top-duration: var(--c-fade-enter-duration);
  // --c-fade-from-bottom-duration: var(--c-fade-enter-duration);

  // --c-fade-to-left-duration: var(--c-fade-leave-duration);
  // --c-fade-to-right-duration: var(--c-fade-leave-duration);
  // --c-fade-to-top-duration: var(--c-fade-leave-duration);
  // --c-fade-to-bottom-duration: var(--c-fade-leave-duration);

  // API: movement
  // --c-fade-enter-distance: var(--c-fade-distance);
  // --c-fade-leave-distance: var(--c-fade-distance);

  // --c-fade-from-left-distance: var(--c-fade-enter-distance);
  // --c-fade-from-right-distance: var(--c-fade-enter-distance);
  // --c-fade-from-top-distance: var(--c-fade-enter-distance);
  // --c-fade-from-bottom-distance: var(--c-fade-enter-distance);

  // --c-fade-to-left-distance: var(--c-fade-leave-distance);
  // --c-fade-to-right-distance: var(--c-fade-leave-distance);
  // --c-fade-to-top-distance: var(--c-fade-leave-distance);
  // --c-fade-to-bottom-distance: var(--c-fade-leave-distance);
}

.c-fade-enter-active,
.c-fade-leave-active {
  transition-property: opacity;
}

.c-fade-from-top-to-top-enter-active,
.c-fade-from-top-to-bottom-enter-active,
.c-fade-from-top-to-left-enter-active,
.c-fade-from-top-to-right-enter-active,
.c-fade-from-bottom-to-top-enter-active,
.c-fade-from-bottom-to-bottom-enter-active,
.c-fade-from-bottom-to-left-enter-active,
.c-fade-from-bottom-to-right-enter-active,
.c-fade-from-left-to-top-enter-active,
.c-fade-from-left-to-bottom-enter-active,
.c-fade-from-left-to-left-enter-active,
.c-fade-from-left-to-right-enter-active,
.c-fade-from-right-to-top-enter-active,
.c-fade-from-right-to-bottom-enter-active,
.c-fade-from-right-to-left-enter-active,
.c-fade-from-right-to-right-enter-active,
.c-fade-from-top-to-top-leave-active,
.c-fade-from-top-to-bottom-leave-active,
.c-fade-from-top-to-left-leave-active,
.c-fade-from-top-to-right-leave-active,
.c-fade-from-bottom-to-top-leave-active,
.c-fade-from-bottom-to-bottom-leave-active,
.c-fade-from-bottom-to-left-leave-active,
.c-fade-from-bottom-to-right-leave-active,
.c-fade-from-left-to-top-leave-active,
.c-fade-from-left-to-bottom-leave-active,
.c-fade-from-left-to-left-leave-active,
.c-fade-from-left-to-right-leave-active,
.c-fade-from-right-to-top-leave-active,
.c-fade-from-right-to-bottom-leave-active,
.c-fade-from-right-to-left-leave-active,
.c-fade-from-right-to-right-leave-active {
  transition-property: opacity, transform;
}

.c-fade-from-top-to-top-enter-to,
.c-fade-from-top-to-bottom-enter-to,
.c-fade-from-top-to-left-enter-to,
.c-fade-from-top-to-right-enter-to,
.c-fade-from-bottom-to-top-enter-to,
.c-fade-from-bottom-to-bottom-enter-to,
.c-fade-from-bottom-to-left-enter-to,
.c-fade-from-bottom-to-right-enter-to,
.c-fade-from-left-to-top-enter-to,
.c-fade-from-left-to-bottom-enter-to,
.c-fade-from-left-to-left-enter-to,
.c-fade-from-left-to-right-enter-to,
.c-fade-from-right-to-top-enter-to,
.c-fade-from-right-to-bottom-enter-to,
.c-fade-from-right-to-left-enter-to,
.c-fade-from-right-to-right-enter-to,

.c-fade-from-top-to-top-leave-from,
.c-fade-from-top-to-bottom-leave-from,
.c-fade-from-top-to-left-leave-from,
.c-fade-from-top-to-right-leave-from,
.c-fade-from-bottom-to-top-leave-from,
.c-fade-from-bottom-to-bottom-leave-from,
.c-fade-from-bottom-to-left-leave-from,
.c-fade-from-bottom-to-right-leave-from,
.c-fade-from-left-to-top-leave-from,
.c-fade-from-left-to-bottom-leave-from,
.c-fade-from-left-to-left-leave-from,
.c-fade-from-left-to-right-leave-from,
.c-fade-from-right-to-top-leave-from,
.c-fade-from-right-to-bottom-leave-from,
.c-fade-from-right-to-left-leave-from,
.c-fade-from-right-to-right-leave-from {
  @include no-translate;
}

.c-fade-enter-from,
.c-fade-from-top-to-top-enter-from,
.c-fade-from-top-to-bottom-enter-from,
.c-fade-from-top-to-left-enter-from,
.c-fade-from-top-to-right-enter-from,
.c-fade-from-bottom-to-top-enter-from,
.c-fade-from-bottom-to-bottom-enter-from,
.c-fade-from-bottom-to-left-enter-from,
.c-fade-from-bottom-to-right-enter-from,
.c-fade-from-left-to-top-enter-from,
.c-fade-from-left-to-bottom-enter-from,
.c-fade-from-left-to-left-enter-from,
.c-fade-from-left-to-right-enter-from,
.c-fade-from-right-to-top-enter-from,
.c-fade-from-right-to-bottom-enter-from,
.c-fade-from-right-to-left-enter-from,
.c-fade-from-right-to-right-enter-from,

.c-fade-leave-to,
.c-fade-from-top-to-top-leave-to,
.c-fade-from-top-to-bottom-leave-to,
.c-fade-from-top-to-left-leave-to,
.c-fade-from-top-to-right-leave-to,
.c-fade-from-bottom-to-top-leave-to,
.c-fade-from-bottom-to-bottom-leave-to,
.c-fade-from-bottom-to-left-leave-to,
.c-fade-from-bottom-to-right-leave-to,
.c-fade-from-left-to-top-leave-to,
.c-fade-from-left-to-bottom-leave-to,
.c-fade-from-left-to-left-leave-to,
.c-fade-from-left-to-right-leave-to,
.c-fade-from-right-to-top-leave-to,
.c-fade-from-right-to-bottom-leave-to,
.c-fade-from-right-to-left-leave-to,
.c-fade-from-right-to-right-leave-to {
  opacity: 0;
}

// Entering from...

.c-fade-from-top-to-top-enter-from,
.c-fade-from-top-to-bottom-enter-from,
.c-fade-from-top-to-left-enter-from,
.c-fade-from-top-to-right-enter-from {
  @include translate-up(
    var(--c-fade-from-top-distance, var(--c-fade-enter-distance, var(--c-fade-distance)))
  );
}

.c-fade-from-bottom-to-top-enter-from,
.c-fade-from-bottom-to-bottom-enter-from,
.c-fade-from-bottom-to-left-enter-from,
.c-fade-from-bottom-to-right-enter-from {
  @include translate-down(
    var(--c-fade-from-bottom-distance, var(--c-fade-enter-distance, var(--c-fade-distance)))
  );
}

.c-fade-from-left-to-top-enter-from,
.c-fade-from-left-to-bottom-enter-from,
.c-fade-from-left-to-left-enter-from,
.c-fade-from-left-to-right-enter-from {
  @include translate-left(
    var(--c-fade-from-left-distance, var(--c-fade-enter-distance, var(--c-fade-distance)))
  );
}

.c-fade-from-right-to-top-enter-from,
.c-fade-from-right-to-bottom-enter-from,
.c-fade-from-right-to-left-enter-from,
.c-fade-from-right-to-right-enter-from {
  @include translate-right(
    var(--c-fade-from-right-distance, var(--c-fade-enter-distance, var(--c-fade-distance)))
  );
}

// Entering leaving to...

.c-fade-from-top-to-top-leave-to,
.c-fade-from-bottom-to-top-leave-to,
.c-fade-from-right-to-top-leave-to,
.c-fade-from-left-to-top-leave-to {
  @include translate-top(
    var(--c-fade-to-top-distance, var(--c-fade-leave-distance, var(--c-fade-distance)))
  );
}

.c-fade-from-top-to-bottom-leave-to,
.c-fade-from-bottom-to-bottom-leave-to,
.c-fade-from-right-to-bottom-leave-to,
.c-fade-from-left-to-bottom-leave-to {
  @include translate-bottom(
    var(--c-fade-to-bottom-distance, var(--c-fade-leave-distance, var(--c-fade-distance)))
  );
}

.c-fade-from-top-to-left-leave-to,
.c-fade-from-bottom-to-left-leave-to,
.c-fade-from-right-to-left-leave-to,
.c-fade-from-left-to-left-leave-to {
  @include translate-left(
    var(--c-fade-to-left-distance, var(--c-fade-leave-distance, var(--c-fade-distance)))
  );
}

.c-fade-from-top-to-right-leave-to,
.c-fade-from-bottom-to-right-leave-to,
.c-fade-from-right-to-right-leave-to,
.c-fade-from-left-to-right-leave-to {
  @include translate-right(
    var(--c-fade-to-right-distance, var(--c-fade-leave-distance, var(--c-fade-distance)))
  );
}

// Enter durations

.c-fade-enter-active {
  transition-duration: var(--c-fade-enter-duration, var(--c-fade-duration));
}

.c-fade-from-top-to-top-enter-active,
.c-fade-from-top-to-bottom-enter-active,
.c-fade-from-top-to-left-enter-active,
.c-fade-from-top-to-right-enter-active {
  transition-duration: var(--c-fade-from-top-duration, var(--c-fade-enter-duration, var(--c-fade-duration)));
}

.c-fade-from-bottom-to-top-enter-active,
.c-fade-from-bottom-to-bottom-enter-active,
.c-fade-from-bottom-to-left-enter-active,
.c-fade-from-bottom-to-right-enter-active {
  transition-duration: var(--c-fade-from-bottom-duration, var(--c-fade-enter-duration, var(--c-fade-duration)));
}

.c-fade-from-left-to-top-enter-active,
.c-fade-from-left-to-bottom-enter-active,
.c-fade-from-left-to-left-enter-active,
.c-fade-from-left-to-right-enter-active {
  transition-duration: var(--c-fade-from-left-duration, var(--c-fade-enter-duration, var(--c-fade-duration)));
}

.c-fade-from-right-to-top-enter-active,
.c-fade-from-right-to-bottom-enter-active,
.c-fade-from-right-to-left-enter-active,
.c-fade-from-right-to-right-enter-active {
  transition-duration: var(--c-fade-from-right-duration, var(--c-fade-enter-duration, var(--c-fade-duration)));
}

// Leave durations

.c-fade-leave-active {
  transition-duration: var(--c-fade-leave-duration, var(--c-fade-duration));
}

.c-fade-from-right-to-top-leave-active,
.c-fade-from-left-to-top-leave-active,
.c-fade-from-bottom-to-top-leave-active,
.c-fade-from-top-to-top-leave-active {
  transition-duration: var(--c-fade-to-top-duration, var(--c-fade-leave-duration, var(--c-fade-duration)));
}

.c-fade-from-top-to-bottom-leave-active,
.c-fade-from-bottom-to-bottom-leave-active,
.c-fade-from-left-to-bottom-leave-active,
.c-fade-from-right-to-bottom-leave-active {
  transition-duration: var(--c-fade-to-bottom-duration, var(--c-fade-leave-duration, var(--c-fade-duration)));
}

.c-fade-from-top-to-left-leave-active,
.c-fade-from-bottom-to-left-leave-active,
.c-fade-from-left-to-left-leave-active,
.c-fade-from-right-to-left-leave-active {
  transition-duration: var(--c-fade-to-left-duration, var(--c-fade-leave-duration, var(--c-fade-duration)));
}

.c-fade-from-top-to-right-leave-active,
.c-fade-from-bottom-to-right-leave-active,
.c-fade-from-left-to-right-leave-active,
.c-fade-from-right-to-right-leave-active {
  transition-duration: var(--c-fade-to-right-duration, var(--c-fade-leave-duration, var(--c-fade-duration)));
}

</style>
