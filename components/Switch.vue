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

:root {
  --c-switch-on-color: var(--dark);
  --c-switch-on-knob-color: var(--white);
  --c-switch-off-color: var(--dark);
  --c-switch-off-knob-color: var(--dark);

  --c-switch-disabled-on-color: var(--light-grey);
  --c-switch-disabled-on-knob-color: var(--grey);
  --c-switch-disabled-off-color: var(--grey);
  --c-switch-disabled-off-knob-color: var(--grey);

  --c-switch-track-height: 1.2em;
  --c-switch-track-width: calc(var(--c-switch-track-height) * 2);
  --c-switch-knob-margin: 0.1em ;
  --c-switch-knob-width: calc(var(--c-switch-track-height) - (2 * var(--c-switch-knob-margin)));
}

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

  width: var(--switch-track-width);
  height: var(--switch-track-height);

  // Since knob will overflow
  margin-left: calc(var(--switch-track-height) / 2);
  margin-right: calc(var(--switch-track-height) / 2);

  // Default for enabled, off state
  border-color: var(--c-switch-off-color);
}

.c-switch-knob {
  position: relative;
  box-sizing: border-box;
  display: block;

  top: var(--c-switch-knob-margin);
  left: var(--c-switch-knob-margin);

  width: var(--c-switch-knob-width);
  height: var(--c-switch-knob-width);

  background-color: var(--c-switch-off-knob-color);

  // Default for off state
  @include round;
  @include transparent-solid-shadow();
  transform: translate3d(0, 0, 0);
}



// On states

.c-switch-on {
  background-color: var(--c-switch-on-color);

  .c-switch-knob {
    background-color: var(--c-switch-on-knob-color);
    transform: translate3d(
      calc(
        var(--c-switch-track-width) - (var(--c-switch-knob-margin) * 2) - var(--c-switch-knob-width)
      ), 0, 0);
  }

}



// Enabled/disabled states

.c-switch-disabled {
  border-color: var(--c-switch-disabled-off-color);

  .c-switch-knob {
    background-color: var(--c-switch-disabled-off-color);
  }

  &.c-switch-on {
    border-color: transparent;
    background-color: var(--c-switch-disabled-on-color);

    .c-switch-knob {
      background-color: var(--c-switch-disabled-on-color);
    }

  }

}

.c-switch-enabled {
  &.c-switch-on,
  &.c-switch-on .c-switch-knob {
    @include transition-fast;
  }
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
