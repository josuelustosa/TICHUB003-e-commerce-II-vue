<script lang="ts">
import { defineComponent } from 'vue'

import pMenubar from 'primevue/menubar'
import pToggleSwitch from 'primevue/toggleswitch'
import pAvatar from 'primevue/avatar'

import logo from '@/assets/logo-ecommerce.png'

export default defineComponent({
  components: {
    pMenubar,
    pToggleSwitch,
    pAvatar,
  },

  data() {
    return {
      logo,
      checked: false,
      items: [
        { label: 'Catálogo', icon: 'pi pi-shop' },
        { label: 'Carrinho', icon: 'pi pi-shopping-cart' },
        { label: 'FAQ', icon: 'pi pi-question-circle' },
      ],
    }
  },

  mounted() {
    const savedTheme = localStorage.getItem('theme')
    this.checked = savedTheme === 'dark'
    document.documentElement.classList.toggle('dark', this.checked)
  },

  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle('dark', this.checked)
      localStorage.setItem('theme', this.checked ? 'dark' : 'light')
    },
  },
})
</script>

<template>
  <pMenubar
    :model="items"
    :pt="{
      root: {
        class: [
          'flex items-center gap-4 px-4 py-2',
          'bg-neutral-100 dark:bg-neutral-950',
          'shadow-xl/40 shadow-neutral-500 dark:shadow-neutral-950',
          'rounded-xl border-none',
        ],
      },
      // Slot #start fica à esquerda — sem flex-1
      start: {
        class: 'flex items-center shrink-0',
      },
      // A <ul> com os itens fica ao centro com flex-1 e justify-center
      menu: {
        class: 'flex items-center justify-center gap-1 flex-1 list-none m-0 p-0',
      },
      // Slot #end fica à direita — sem flex-1
      end: {
        class: 'flex items-center gap-4 shrink-0 ml-auto',
      },
    }"
  >
    <template #start>
      <img :src="logo" alt="E-Commerce do Atleta" class="w-32 h-10 md:w-auto md:h-12" />
    </template>

    <template #item="{ item, props }">
      <a v-ripple v-bind="props.action" class="flex items-center gap-2 px-3 py-2">
        <i :class="item.icon" />
        <span>{{ item.label }}</span>
      </a>
    </template>

    <template #end>
      <!-- Botão de alterar tema com PrimeVue usando classes do TailwindCSS -->
      <pToggleSwitch
        v-model="checked"
        :pt="{ root: { class: 'scale-125 my-2' } }"
        @change="toggleDarkMode"
      >
        <template #handle="{ checked }">
          <i :class="['text-xs! pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
        </template>
      </pToggleSwitch>

      <pAvatar icon="pi pi-user" shape="circle" />
    </template>
  </pMenubar>
</template>

<style scoped></style>
