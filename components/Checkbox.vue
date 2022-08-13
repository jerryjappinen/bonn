<script setup>
// This is a read-only component that visualizes state
// Wrap this component in a Toggle to deliver complete form element behavior
defineProps({

  value: {
    type: undefined,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  }

})
</script>

<template>
  <div
    class="c-checkbox"
    :class="{
      'c-checkbox-on': !!value,
      'c-checkbox-off': !value,
      'c-checkbox-disabled': !!disabled,
      'c-checkbox-enabled': !disabled
    }"
  >
    <slot name="icon" class="c-checkbox-icon">
      <IconCheck />
    </slot>
  </div>
</template>

<style lang="scss">

$c-checkbox-border-width: 2px;

.c-checkbox,
.c-checkbox-icon {
  @include relative;
  @include transition-slow;
  @include transition-properties-common;
}

.c-checkbox {
  @include round;
  @include inline-block;
  vertical-align: middle;

  width: 1em;
  height: 1em;
  border-width: $c-checkbox-border-width;
  padding: calc($pad-tight-horizontal - (2 * $c-checkbox-border-width));

  // Default for enabled, off state
  color: $white;
  // background-color: $white;
  border-color: $dark;
}

.c-checkbox-icon {
  @include block;
  width: 1em;
  height: 1em;

  // Default for off state
  opacity: 0;
}



// On states

.c-checkbox-on {
  background-color: $dark;
  @include transition-fast;

  .c-checkbox-icon {
    opacity: 1;
    @include transition-fast;
  }

}



// Enabled/disabled states

.c-checkbox-disabled {
  color: $white;
  background-color: $very-light-grey;
  border-color: $grey;
}

// .c-checkbox-enabled {
//   &.c-checkbox-on {}
//   &.c-checkbox-off {}
// }

.control-enabled {
  @include pointer;

  .c-checkbox-enabled {
    @include solid-shadow-tight-rest($dark);
  }

  &:focus,
  &:hover {
    .c-checkbox-enabled {
      @include transition-fast;
      @include solid-shadow-tight;
    }
  }
}

</style>
