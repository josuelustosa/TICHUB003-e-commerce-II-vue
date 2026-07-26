<script lang="ts">
import { defineComponent } from 'vue'

import pMenubar from 'primevue/menubar'
import pToggleSwitch from 'primevue/toggleswitch'
import pAvatar from 'primevue/avatar'
import pBadge from 'primevue/badge'

import { cart } from '@/data/cart'

import logo from '@/assets/logo-ecommerce.png'

export default defineComponent({
  components: {
    pMenubar,
    pToggleSwitch,
    pAvatar,
    pBadge,
  },

  data() {
    return {
      logo,
      checked: false,
      cart,
      items: [
        { label: 'Catálogo', icon: 'pi pi-shop', route: '/' },
        { label: 'Carrinho', icon: 'pi pi-shopping-cart', route: '/cart', badge: false },
        { label: 'FAQ', icon: 'pi pi-question-circle', route: 'faq' },
      ],
    }
  },

  computed: {
    totalItems(): number {
      return this.cart.getTotalItems()
    },
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
          'flex! items-center! gap-4! lg:gap-12! px-3! lg:px-6! py-3!',
          'bg-neutral-100! dark:bg-neutral-950!',
          'shadow-xl/40! shadow-neutral-500! dark:shadow-neutral-950!',
          'rounded-xl! border-none!',
        ],
      },

      end: {
        class: 'flex items-center gap-4 shrink-0 ml-auto',
      },
    }"
  >
    <template #start>
      <img :src="logo" alt="E-Commerce do Atleta" class="w-32 h-10 md:w-auto md:h-12" />
    </template>

    <template #item="{ item }">
      <RouterLink :to="item.route" custom v-slot="{ href, navigate, isExactActive }">
        <a
          :href="href"
          @click="navigate"
          class="relative flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200"
          :class="[
            isExactActive
              ? 'bg-teal-200/75 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
              : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800',
          ]"
        >
          <i :class="item.icon" />

          <span>{{ item.label }}</span>

          <pBadge
            v-if="item.label === 'Carrinho' && totalItems > 0"
            :value="totalItems"
            severity="primary"
          />
        </a>
      </RouterLink>
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

<style scoped>
:deep(.p-menubar-item-content) {
  background: transparent !important;
}

:deep(.p-menubar-item-content:hover) {
  background: transparent !important;
}
</style>
