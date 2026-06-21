<script lang="ts">
import { defineComponent } from 'vue'

import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  components: {
    Toast,
  },

  setup() {
    const toast = useToast()

    function handleAuthError(event: Event) {
      const { detail } = event as CustomEvent<string>

      toast.add({
        severity: 'error',
        summary: 'Acesso negado',
        detail,
        life: 3000,
      })
    }

    return {
      handleAuthError,
    }
  },

  mounted() {
    window.addEventListener('auth:error', this.handleAuthError)
  },

  unmounted() {
    window.removeEventListener('auth:error', this.handleAuthError)
  },
})
</script>

<template>
  <Toast />

  <RouterView />
</template>
