import { createRouter, createWebHistory } from 'vue-router'

import ConsumerLayout from '@/layouts/ConsumerLayout.vue'

import HomeView from '@/views/consumer/HomeView.vue'
import ProductDetailsView from '@/views/consumer/ProductDetailsView.vue'
import CartView from '@/views/consumer/CartView.vue'
import CheckoutView from '@/views/consumer/CheckoutView.vue'
import FaqView from '@/views/consumer/FaqView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: ConsumerLayout,

      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },

        {
          path: 'product/:id',
          name: 'product-details',
          component: ProductDetailsView,
          props: true,
        },

        {
          path: 'cart',
          name: 'cart',
          component: CartView,
        },

        {
          path: 'checkout',
          name: 'checkout',
          component: CheckoutView,
        },

        {
          path: 'faq',
          name: 'faq',
          component: FaqView,
        },
      ],
    },
  ],
})

export default router
