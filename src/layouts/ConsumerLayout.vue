<script lang="ts">
import { defineComponent } from 'vue'

import MenuBar from '@/components/MenuBar.vue'

export default defineComponent({
  components: {
    MenuBar,
  },
})
</script>

<template>
  <div className="font-mono bg-neutral-200 dark:bg-neutral-900 min-h-screen">
    <header className="container mx-auto p-6 md:py-8 md:px-12">
      <MenuBar />
    </header>

    <main className="container mx-auto px-6 pb-6 md:px-12">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
