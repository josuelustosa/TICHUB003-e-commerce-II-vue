import { createRouter, createWebHistory } from 'vue-router'

import { registerGuards } from './guards'

// CONSUMER
import ConsumerLayout from '@/layouts/ConsumerLayout.vue'
import HomeView from '@/views/consumer/HomeView.vue'
import ProductDetailsView from '@/views/consumer/ProductDetailsView.vue'
import CartView from '@/views/consumer/CartView.vue'
import CheckoutView from '@/views/consumer/CheckoutView.vue'
import FaqView from '@/views/consumer/FaqView.vue'

// ADMIN
import AdminLayout from '@/layouts/AdminLayout.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import OrdersView from '@/views/admin/OrdersView.vue'
import ProductsView from '@/views/admin/ProductsView.vue'

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

          meta: {
            requiresAuth: true,
          },
        },

        {
          path: 'faq',
          name: 'faq',
          component: FaqView,
        },
      ],
    },

    {
      path: '/admin',
      component: AdminLayout,

      meta: {
        requiresAuth: true,
        roles: ['ADMIN'],
      },

      children: [
        {
          path: '',
          name: 'admin-home',
          component: DashboardView,
        },
        {
          path: 'products',
          name: 'admin-products',
          component: ProductsView,
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: OrdersView,
        },
      ],
    },
  ],
})

registerGuards(router)

export default router
