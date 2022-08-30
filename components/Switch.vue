<script setup>
// This is a read-only component that visualizes state
// Wrap this component in a control component to deliver complete form element behavior
defineProps({
  value: {},
  disabled: {}
})
</script>

<template>
  <div
    class="c-switch"
    :class="{
      'c-switch-on': !!value,
      'c-switch-off': !value,
      'c-switch-disabled': !!disabled,
      'c-switch-enabled': !disabled
    }"
  >
    <div class="c-switch-knob" />
  </div>
</template>

<style lang="scss">
$c-switch-track-height: 1.2em !default;
$c-switch-track-width: $c-switch-track-height * 2  !default;
$c-switch-knob-margin: 0.1em  !default;
$c-switch-knob-width: $c-switch-track-height - (2 * $c-switch-knob-margin)  !default;

.c-switch,
.c-switch-knob {
  @include transition-slow;
  @include transition-properties-common;
}

.c-switch {
  position: relative;
  display: inline-block;
  border-radius: 100px;
  vertical-align: middle;
  border-width: 2px;

  width: $c-switch-track-width;
  height: $c-switch-track-height;

  // Since knob will overflow
  margin-left: calc($c-switch-track-height / 2);
  margin-right: calc($c-switch-track-height / 2);

  // Default for enabled, off state
  border-color: var(--dark);
}

.c-switch-knob {
  position: relative;
  top: $c-switch-knob-margin;
  left: $c-switch-knob-margin;
  box-sizing: border-box;
  display: block;

  width: $c-switch-knob-width;
  height: $c-switch-knob-width;

  // Default for off state
  @include round;
  @include transparent-solid-shadow();
  background-color: var(--dark);
  transform: translate3d(0, 0, 0);

}



// On states

.c-switch-on {
  background-color: var(--dark);

  .c-switch-knob {
    background-color: var(--white);
    transform: translate3d(#{$c-switch-track-width - ($c-switch-knob-margin * 2) - $c-switch-knob-width}, 0, 0);
  }

}



// Enabled/disabled states

.c-switch-disabled {
  border-color: var(--grey);

  &.c-switch-on {
    border-color: transparent;
    background-color: var(--light-grey);
  }

  .c-switch-knob {
    background-color: var(--grey);
  }

}

.c-switch-enabled {

  &.c-switch-on,
  &.c-switch-on .c-switch-knob {
    @include transition-fast;
  }

  // &.c-switch-off {
  //   .c-switch-knob {
  //     background-color: var(--dark);
  //   }
  // }

}

// Feedback under controls
// Utility classes should be used by the component or element that controls the behavior
// This is already set in the standard control components
.control-enabled {
  &:hover {
    .c-switch-knob {
      @include transition-fast;
      @include solid-shadow;
    }
  }
}

</style>
