<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

import { Product } from '@/models/product.model'
import { Category } from '@/models/category.model'
import { Cart } from '@/models/cart.model'

export default defineComponent({
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        new Product(
          1,
          'Camisa Brasil Nike I 2026/27 - Masculino',
          'Modelo Torcedor oficial da seleção brasileira com Nike Dri-FIT.',
          449.99,
          0,
          new Category(1, 'Camisas de Time'),
        ),
        new Product(
          2,
          'Camisa Brasil Nike I 2026/27 - Feminino',
          'Modelo Torcedor oficial da seleção brasileira com Nike Dri-FIT.',
          409.99,
          0,
          new Category(1, 'Camisas de Time'),
        ),
        new Product(
          3,
          'Chuteira de Campo Adulto adidas Kaká',
          'Com solado em TPU com travas altas e fixas.',
          389.99,
          0,
          new Category(2, 'Chuteiras'),
        ),
        new Product(
          4,
          'Chuteira Futsal Infantil Puma Neymar Future 9 Play',
          'Com solado de borracha com tecnologia non-marking assegura tração superior.',
          379.99,
          0,
          new Category(2, 'Chuteiras'),
        ),
        new Product(
          5,
          'Tênis Feminino Nike Revolution 8',
          'Com solado de borracha para aderência duradoura no asfalto ou esteira.',
          341.99,
          0,
          new Category(3, 'Tênis'),
        ),
      ] as Product[],
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
