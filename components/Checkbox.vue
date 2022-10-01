<script setup>
  // This is a read-only component that visualizes state
  // Wrap this component in a Toggle to deliver complete form element behavior
  const props = defineProps({

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
      class="c-checkbox"
      :class="{
        'c-checkbox-on': !!modelValue,
        'c-checkbox-off': !modelValue,
        'c-checkbox-disabled': disabled,
        'c-checkbox-enabled': !disabled
      }"
    >
      <slot>
        <IconCheck
          class="c-checkbox-icon"
          :class="{
            'c-checkbox-icon-on': !!modelValue,
            'c-checkbox-icon-off': !modelValue,
            'c-checkbox-icon-disabled': disabled,
            'c-checkbox-icon-enabled': !disabled
          }"
        />
      </slot>
    </span>
  </template>

  <style lang="scss">

  // NOTE: this could also be confined in component class name
  // But then overriding it will be more laborious
  :root {
    // --c-checkbox-width: 1em;
    // --c-checkbox-border-width: 2px;
    // --c-checkbox-radius: var(--round);

    // --c-checkbox-enabled-on-color: var(--inverted-offset-background-color);
    // --c-checkbox-enabled-off-color: var(--text-color);
    // --c-checkbox-enabled-check-color: var(--inverted-text-color);

    // --c-checkbox-disabled-on-color: var(--discreet-color-very-light);
    // --c-checkbox-disabled-off-color: var(--discreet-text-color);
    // --c-checkbox-disabled-check-color: var(--discreet-text-color);
  }

  .c-checkbox,
  .c-checkbox-icon {
    @include transition-leave;
    @include transition-properties-common;
  }

  .c-checkbox {
    @include relative;
    @include inline-block;
    vertical-align: middle;

    width: var(--c-checkbox-width, 1em);
    height: var(--c-checkbox-width, 1em);

    border-width: var(--c-checkbox-border-width, 1.5px);
    border-radius: var(--c-checkbox-radius, var(--round));

    // Default for enabled, off state
    color: var(--c-checkbox-enabled-check-color, var(--inverted-text-color));
    border-color: var(--c-checkbox-enabled-off-color, var(--text-color));
  }

  .c-checkbox-icon {
    @include block;
    @include fill;
    width: 100%;
    height: 100%;

    // Default for off state
    opacity: 0;
  }



  // On states

  .c-checkbox-on,
  .c-checkbox-icon-on {
    @include transition-enter;
  }

  .c-checkbox-on {
    background-color: var(--c-checkbox-enabled-on-color, var(--inverted-offset-background-color));
  }

  .c-checkbox-icon-on {
    opacity: 1;
  }



  // Enabled/disabled states

  .c-checkbox-disabled {
    color: var(--c-checkbox-disabled-check-color, var(--discreet-text-color));
    border-color: var(--c-checkbox-disabled-off-color, var(--discreet-text-color));
    background-color: var(--c-checkbox-disabled-on-color, var(--discreet-color-very-light));
  }

  // .c-checkbox-enabled {
  //   &.c-checkbox-on {}
  //   &.c-checkbox-off {}
  // }

  .control-enabled {
    @include pointer;

    .c-checkbox-enabled {
      @include transparent-solid-shadow;
    }

    &:focus,
    &:hover {
      .c-checkbox-enabled {
        @include transition-fast;
        @include solid-shadow;
      }
    }
  }

  </style>
