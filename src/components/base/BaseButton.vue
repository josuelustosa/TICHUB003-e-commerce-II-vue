<script lang="ts">
import { defineComponent } from 'vue'

import pButton from 'primevue/button'

export default defineComponent({
  components: {
    pButton,
  },

  inheritAttrs: false,
})
</script>

<template>
  <pButton
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'w-full',
      },
    }"
  >
    <slot />
  </pButton>
</template>
