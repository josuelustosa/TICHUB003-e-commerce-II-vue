<script lang="ts">
import { defineComponent } from 'vue'

import ProductCard from '@/components/ProductCard.vue'

import { Product } from '@/models/product.model'
import { Cart } from '@/models/cart.model'

import { products } from '@/data/products'

export default defineComponent({
  components: {
    ProductCard,
  },

  data() {
    return {
      products,
      cart: new Cart(),
    }
  },

  methods: {
    addToCart(product: Product) {
      this.cart.addItem(product, 1)
    },
  },
})
</script>

<template>
  <section>
    <h2>Catálogo de Produtos</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </section>
</template>

<style scoped></style>
