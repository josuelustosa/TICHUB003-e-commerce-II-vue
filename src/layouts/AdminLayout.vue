<script lang="ts">
import { defineComponent } from 'vue'

import pMenu from 'primevue/menu'
import pBadge from 'primevue/badge'
import pAvatar from 'primevue/avatar'

import logo from '@/assets/favicon-ecommerce.png'
import profile from '@/assets/profile.png'

export default defineComponent({
  components: {
    pMenu,
    pBadge,
    pAvatar,
  },
  data() {
    return {
      logo,
      profile,
      items: [
        {
          separator: true,
        },
        {
          // label: 'Profile',
          items: [
            {
              label: 'Dashboard',
              route: '/admin',
              icon: 'pi pi-home',
            },
            {
              label: 'Produtos',
              route: '/admin/products',
              icon: 'pi pi-box',
              badge: 5,
            },
            {
              label: 'Pedidos',
              route: '/admin/orders',
              icon: 'pi pi-receipt',
              badge: 9,
            },
            {
              label: 'Categorias',
              icon: 'pi pi-th-large',
            },
            {
              label: 'Usuários',
              icon: 'pi pi-users',
            },
            {
              label: 'Settings',
              icon: 'pi pi-cog',
            },
            {
              label: 'Área do Cliente',
              route: '/',
              icon: 'pi pi-external-link',
            },
          ],
        },
        {
          separator: true,
        },
      ],
    }
  },
})
</script>

<template>
  <div class="flex min-h-screen bg-neutral-100 dark:bg-neutral-900">
    <aside>
      <pMenu :model="items" class="w-full min-h-screen md:w-60">
        <template #start>
          <span class="inline-flex items-center gap-1 px-2 py-3">
            <img :src="logo" alt="E-Commerce do Atleta" class="w-auto h-8" />
            <span class="text-xl font-semibold">Admin<span class="text-teal-500">Store</span></span>
          </span>
        </template>
        <template #submenulabel="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <RouterLink :to="item.route">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
              <pBadge v-if="item.badge" class="ml-auto" :value="item.badge" />
            </a>
          </RouterLink>
        </template>
        <template #end>
          <button
            v-ripple
            class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
          >
            <pAvatar :image="profile" class="mr-2" shape="circle" />
            <span class="inline-flex flex-col items-start">
              <span class="font-bold">Vini Jr</span>
              <span class="text-sm">Admin</span>
            </span>
          </button>
        </template>
      </pMenu>
    </aside>

    <!-- Main -->
    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
