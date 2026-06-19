<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Product } from '@/models/product.model'

import BaseButton from '@/components/base/BaseButton.vue'
import pCard from 'primevue/card'

import { RouterLink } from 'vue-router'

export default defineComponent({
  components: {
    BaseButton,
    pCard,
    RouterLink,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  methods: {
    handleAddToCart() {
      this.$emit('add-to-cart', this.product)
    },
  },
})
</script>

<template>
  <pCard
    className="w-full bg-neutral-100 dark:bg-neutral-950 shadow-xl/40 shadow-neutral-500 dark:shadow-neutral-950 rounded-xl"
  >
    <template #title>
      <RouterLink
        :to="{ name: 'product-details', params: { id: product.id } }"
        className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer"
      >
        {{ product.name }}
      </RouterLink>
    </template>

    <template #subtitle>
      <span className="text-xs text-neutral-500 uppercase">
        {{ product.category.title }}
      </span>
    </template>
    <template #content>
      <p className="text-sm text-neutral-800 dark:text-neutral-100">
        {{ product.description }}
      </p>
      <p className="text-base font-bold py-3 text-teal-500">R$ {{ product.price.toFixed(2) }}</p>
    </template>
    <template #footer>
      <BaseButton icon="pi pi-shopping-cart" label="Adicionar" @click="handleAddToCart" />
    </template>
  </pCard>
</template>

<style scoped></style>
