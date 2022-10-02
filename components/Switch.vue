<script setup>
// This is a read-only component that visualizes state
// Wrap this component in a control component to deliver complete form element behavior
defineProps({

  modelValue: {
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span
    class="c-switch"
    :class="{
      'c-switch-on': !!modelValue,
      'c-switch-off': !modelValue,
      'c-switch-disabled': !!disabled,
      'c-switch-enabled': !disabled
    }"
  >
    <span class="c-switch-knob" />
  </span>
</template>

<style lang="scss">

// CSS API
// :root {
//   --c-switch-border-width: 1.5px;
//   --c-switch-radius: var(--round);

//   --c-switch-on-color: var(--inverted-background-color); // background when on
//   --c-switch-on-knob-color: var(--inverted-text-color);
//   --c-switch-off-color: var(--text-color); // border when off
//   --c-switch-off-knob-color: var(--text-color);

//   --c-switch-disabled-on-color: var(--discreet-color);
//   --c-switch-disabled-on-knob-color: var(--inverted-text-color);
//   --c-switch-disabled-off-color: var(--discreet-color);
//   --c-switch-disabled-off-knob-color: var(--discreet-color);

//   --c-switch-knob-width: 1em;
//   --c-switch-knob-margin: var(--c-switch-border-width);
//   --c-switch-track-width: calc(var(--c-switch-knob-width, 1em) * 3);
//   --c-switch-track-height: 1em;
// }

.c-switch,
.c-switch-knob {
  @include transition-leave;
  @include transition-properties-common;
}

.c-switch {
  @include relative;
  @include inline-block;
  border-radius: var(--c-switch-radius, var(--round));
  border-width: var(--c-switch-border-width, 1.5px);
  vertical-align: middle;

  width: var(--c-switch-track-width, calc(var(--c-switch-knob-width, 1em) * 2.5));
  height: calc((2 * var(--c-switch-knob-margin, var(--c-switch-border-width, 1.5px))) + var(--c-switch-knob-width, 1em));

  // Since knob will overflow
  // margin-left: calc(var(--switch-track-height) / 2);
  // margin-right: calc(var(--switch-track-height) / 2);

  // Default for enabled, off state
  border-color: var(--c-switch-off-color, var(--text-color));
}

.c-switch-knob {
  position: relative;
  box-sizing: border-box;
  display: block;

  top: var(--c-switch-knob-margin, var(--c-switch-border-width, 1.5px));
  left: var(--c-switch-knob-margin, var(--c-switch-border-width, 1.5px));

  width: var(--c-switch-knob-width, 1em);
  height: var(--c-switch-knob-width, 1em);

  background-color: var(--c-switch-off-knob-color, var(--c-switch-off-color, var(--text-color)));

  // Default for off state
  @include round;
  @include transparent-solid-shadow;
  transform: translate3d(0, 0, 0);
}



// On states

.c-switch-on {
  background-color: var(--c-switch-on-color, var(--inverted-background-color));

  .c-switch-knob {
    background-color: var(--c-switch-on-knob-color, var(--inverted-text-color));
    transform: translate3d(
      calc(
        var(--c-switch-track-width, calc(var(--c-switch-knob-width, 1em) * 2.5)) - (var(--c-switch-knob-margin, var(--c-switch-border-width, 1.5px)) * 2) - var(--c-switch-knob-width, 1em)
      ), 0, 0);
  }

}



// Enabled/disabled states

.c-switch-disabled {
  border-color: var(--c-switch-disabled-off-color, var(--discreet-color));

  .c-switch-knob {
    background-color: var(--c-switch-disabled-off-knob-color, var(--c-switch-disabled-off-color, var(--discreet-color)));
  }

  &.c-switch-on {
    border-color: transparent;
    background-color: var(--c-switch-disabled-on-color, var(--discreet-color));

    .c-switch-knob {
      background-color: var(--c-switch-disabled-on-knob-color, var(--inverted-text-color));
    }

  }

}

.c-switch-enabled {
  &.c-switch-on,
  &.c-switch-on .c-switch-knob {
    @include transition-enter;
  }
}

// Feedback under controls
// Utility classes should be used by the component or element that controls the behavior
// This is already set up in the standard control components
.control-enabled {
  .c-switch-enabled {
    @include transparent-solid-shadow;
  }

  &:focus,
  &:hover {
    .c-switch-enabled {
      @include transition-enter;
      @include solid-shadow;
    }
  }
}

</style>
