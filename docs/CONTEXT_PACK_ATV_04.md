# Context Pack ATV-04

## `src/router/guards.ts`

```ts
export function registerGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    try {
      if (to.meta.requiresAuth) {
        fakeAuth.requireAuthentication()
      }

      if (to.meta.roles?.length) {
        fakeAuth.requireRole(to.meta.roles[0])
      }

      next()
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent('auth:error', {
          detail: (error as Error).message,
        }),
      )

      next('/')
    }
  })
}
```

## `src/router/index.ts`

```ts
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
```

```ts
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
```

## `src/services/fakeAuth.ts`

```ts
export const fakeAuth = {
  getUser(): User | null {
    return currentUser
  },

  isAuthenticated(): boolean {
    return currentUser !== null
  },

  hasRole(role: UserRole): boolean {
    return currentUser?.role === role
  },

  requireAuthentication() {
    if (!currentUser) {
      throw new Error('Você precisa estar autenticado para acessar esta página.')
    }
  },

  requireRole(role: UserRole) {
    this.requireAuthentication()

    if (currentUser!.role !== role) {
      throw new Error('Você não possui permissão para acessar esta área.')
    }
  },
}
```

## `src/layouts/AdminLayout.vue`

```ts
export default defineComponent({
  data() {
    return {
      items: [
        {
          items: [
            {
              label: 'Dashboard',
              route: '/admin',
            },
            {
              label: 'Produtos',
              route: '/admin/products',
            },
            {
              label: 'Pedidos',
              route: '/admin/orders',
            },
            {
              label: 'Área do Cliente',
              route: '/',
            },
          ],
        },
      ],
      home: {
        route: '/admin',
      },
    }
  },
  computed: {
    breadcrumbs() {
      return this.breadcrumbItems[this.$route.path] ?? []
    },
  },
})
```

```vue
<RouterLink :to="item.route">
  <a v-ripple v-bind="props.action">
    <span :class="item.icon" />
    <span>{{ item.label }}</span>
  </a>
</RouterLink>

<RouterView />
```

## `src/layouts/ConsumerLayout.vue`

```ts
export default defineComponent({
  components: {
    MenuBar,
  },
})
```

```vue
<MenuBar />
<RouterView />
```

## `src/components/MenuBar.vue`

```ts
export default defineComponent({
  data() {
    return {
      checked: false,
      items: [
        { label: 'Catálogo', route: '/' },
        { label: 'Carrinho', route: '/cart' },
        { label: 'FAQ', route: 'faq' },
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
```

```vue
<RouterLink :to="item.route" custom v-slot="{ href, navigate, isExactActive }">
  <a :href="href" @click="navigate">
    <i :class="item.icon" />
    <span>{{ item.label }}</span>
  </a>
</RouterLink>
```

## `src/App.vue`

```ts
setup() {
  const toast = useToast()

  function handleAuthError(event: Event) {
    const { detail } = event as CustomEvent<string>

    toast.add({
      severity: 'error',
      summary: 'Acesso negado',
      detail,
      life: 3000,
    })
  }

  return {
    handleAuthError,
  }
},

mounted() {
  window.addEventListener('auth:error', this.handleAuthError)
},

unmounted() {
  window.removeEventListener('auth:error', this.handleAuthError)
},
```
