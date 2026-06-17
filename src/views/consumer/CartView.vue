<script lang="ts">
import { defineComponent } from 'vue'
import CartSummary from '@/components/CartSummary.vue'

import { Product } from '@/models/product.model'

export default defineComponent({
  components: {
    CartSummary,
  },
  computed: {
    totalItems(): number {
      return this.cart.getTotalItems()
    },
    finalPrice(): number {
      return this.cart.getFinalPrice()
    },
  },
  methods: {
    addToCart(product: Product) {
      this.cart.addItem(product, 1)
    },
    removeFromCart(productId: number) {
      this.cart.removeItem(productId)
    },
    removeItemFromCart(productId: number) {
      this.cart.removeItemCompletely(productId)
    },
  },
})
</script>

<template>
  <!-- <CartSummary
    :cart-items="cart.cartItem"
    :total-items="totalItems"
    :final-price="finalPrice"
    @increment="addToCart"
    @decrement="removeFromCart"
    @remove="removeItemFromCart"
  /> -->

  <h2 className="text-2xl font-bold">Página de Carrinho</h2>

  <p className="mt-4">Página de Carrinho em construção.</p>
</template>

<style scoped></style>
