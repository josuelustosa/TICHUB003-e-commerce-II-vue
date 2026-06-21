<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'

import { products } from '@/data/products'
import { Product } from '@/models/product.model'

export default defineComponent({
  components: {
    RouterLink,
    BaseButton,
  },

  data() {
    return {
      product: null as Product | null,
    }
  },

  created() {
    const id = Number(this.$route.params.id)

    this.product = products.find((product) => product.id === id) ?? null
  },

  methods: {
    handleAddToCart() {
      if (!this.product) return

      // TODO:
      // Integrar com o cartStore (Pinia) na Atividade 5
      console.log('Adicionar ao carrinho:', this.product)
    },
  },
})
</script>

<template>
  <section v-if="!product" className="max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold">Produto não encontrado</h2>

    <p className="mt-4 text-neutral-600 dark:text-neutral-300">O produto informado não existe.</p>

    <RouterLink
      :to="{ name: 'home' }"
      className="inline-flex items-center gap-2 mt-6 text-teal-500 hover:underline"
    >
      <i class="pi pi-arrow-left"></i>

      Voltar ao catálogo
    </RouterLink>
  </section>

  <section v-else className="max-w-3xl mx-auto">
    <RouterLink
      :to="{ name: 'home' }"
      className="inline-flex items-center gap-2 mb-8 text-teal-500 hover:underline"
    >
      <i class="pi pi-arrow-left"></i>

      Voltar ao catálogo
    </RouterLink>

    <p className="text-sm uppercase tracking-wide text-neutral-500">
      {{ product.category.title }}
    </p>

    <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
      {{ product.name }}
    </h1>

    <p className="mt-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
      {{ product.description }}
    </p>

    <p className="mt-8 text-3xl font-bold text-teal-500">R$ {{ product.price.toFixed(2) }}</p>

    <div className="my-8">
      <BaseButton icon="pi pi-shopping-cart" label="Adicionar" @click="handleAddToCart" />
    </div>
  </section>
</template>

<style scoped></style>
