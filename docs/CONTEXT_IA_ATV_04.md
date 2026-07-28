# Contexto IA — Atividade Prática: Arquitetura de Rotas e Segurança com PrimeVue

## Projeto

- Aplicação Vue 3 com TypeScript, Vue Router, PrimeVue e TailwindCSS.
- Entrada principal: `src/main.ts`.
- Componente raiz: `src/App.vue`.
- Roteador: `src/router/index.ts`.
- Guards: `src/router/guards.ts`.
- Autenticação atual: `src/services/fakeAuth.ts`.

## Estrutura relevante

```text
src/
├── components/
│   ├── CartSummary.vue
│   ├── MenuBar.vue
│   ├── ProductCard.vue
│   └── base/BaseButton.vue
├── layouts/
│   ├── AdminLayout.vue
│   └── ConsumerLayout.vue
├── router/
│   ├── guards.ts
│   └── index.ts
├── services/fakeAuth.ts
└── views/
    ├── admin/
    │   ├── DashboardView.vue
    │   ├── OrdersView.vue
    │   └── ProductsView.vue
    └── consumer/
        ├── CartView.vue
        ├── CheckoutView.vue
        ├── FaqView.vue
        ├── HomeView.vue
        └── ProductDetailsView.vue
```

## Rotas existentes

| Caminho | Nome | Layout/View | Proteção |
|---|---|---|---|
| `/` | `home` | `ConsumerLayout` → `HomeView` | pública |
| `/product/:id` | `product-details` | `ConsumerLayout` → `ProductDetailsView` | pública |
| `/cart` | `cart` | `ConsumerLayout` → `CartView` | pública |
| `/checkout` | `checkout` | `ConsumerLayout` → `CheckoutView` | `requiresAuth` |
| `/faq` | `faq` | `ConsumerLayout` → `FaqView` | pública |
| `/admin` | `admin-home` | `AdminLayout` → `DashboardView` | `requiresAuth`, role `ADMIN` |
| `/admin/products` | `admin-products` | `AdminLayout` → `ProductsView` | `requiresAuth`, role `ADMIN` |
| `/admin/orders` | `admin-orders` | `AdminLayout` → `OrdersView` | `requiresAuth`, role `ADMIN` |

## Navegação

- O consumidor utiliza `MenuBar` em `src/components/MenuBar.vue`.
- O menu do consumidor navega para `/`, `/cart` e `faq`.
- O Admin utiliza menu lateral em `src/layouts/AdminLayout.vue`.
- O menu Admin navega para `/admin`, `/admin/products`, `/admin/orders` e `/`.
- A navegação usa `RouterLink` e `RouterView`.
- A rota de detalhes usa o parâmetro dinâmico `:id` e `props: true`.
- A aplicação usa `createWebHistory(import.meta.env.BASE_URL)`.

## Layout Consumer

- Arquivo: `src/layouts/ConsumerLayout.vue`.
- Renderiza `MenuBar` no header.
- Mantém `MenuBar` e `RouterView` no layout durante a troca das views.
- O carrinho é contabilizado pelo `totalItems` de `src/components/MenuBar.vue`.
- O hook `mounted` restaura o tema salvo em `localStorage`.
- O método `toggleDarkMode` alterna a classe `dark` e persiste o tema.

## Layout Admin

- Arquivo: `src/layouts/AdminLayout.vue`.
- Possui menu lateral PrimeVue (`pMenu`).
- Possui breadcrumb PrimeVue (`pBreadcrumb`).
- Renderiza conteúdo das rotas filhas com `RouterView`.
- Possui rotas de navegação para Dashboard, Produtos, Pedidos e Área do Cliente.
- O breadcrumb é calculado a partir de `this.$route.path`.

## Guards e acesso

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

### Regras de proteção

- `meta.requiresAuth: true` exige usuário autenticado.
- `meta.roles: ['ADMIN']` exige usuário com role `ADMIN`.
- Falhas de autenticação ou autorização redirecionam para `/`.
- Falhas também disparam o evento `auth:error`.
- `src/App.vue` exibe o erro por meio do `useToast` do PrimeVue.
- `fakeAuth` fornece `getUser`, `isAuthenticated`, `hasRole`, `requireAuthentication`, `requireRole`, `loginAs` e `logout`.

## Estado atual da atividade

- Roteamento para Home, detalhes, carrinho, checkout, FAQ e Admin já está definido.
- Navegação sem recarregamento usa Vue Router.
- Checkout já possui guard de autenticação.
- Área Admin já possui guard de autenticação e role.
- Consumer e Admin possuem layouts distintos.
- Admin já possui menu lateral e breadcrumbs.
- Admin já utiliza nested routes para Dashboard, Produtos e Pedidos.
- `DataTable` para listagem de produtos não aparece nos arquivos mapeados.
- A rota existente `/admin/orders` representa pedidos; relatórios de vendas ainda não aparecem no mapa.
- Componentes `Card`, `Button` e `Menu` devem permanecer compatíveis com PrimeVue e classes utilitárias Tailwind.

## Requisitos da entrega

- Manter navegação funcional entre Home e Detalhes do Produto sem recarregar a página.
- Manter a rota dinâmica `/product/:id`.
- Manter o guard ativo em `/checkout`.
- Manter proteção por role `ADMIN` em `/admin` e rotas filhas.
- Preservar a diferença visual entre Consumer e Admin.
- Garantir header e carrinho persistentes no layout Consumer.
- Garantir menu lateral e estrutura de dashboard no layout Admin.
- Adicionar ou integrar `DataTable` PrimeVue para produtos no Admin.
- Manter breadcrumbs dinâmicos conforme a rota atual.
- Organizar produtos e relatórios/pedidos em nested routes.
- Usar componentes PrimeVue estilizados com classes Tailwind.

## Arquivos prioritários

- `src/router/index.ts`
- `src/router/guards.ts`
- `src/services/fakeAuth.ts`
- `src/layouts/ConsumerLayout.vue`
- `src/layouts/AdminLayout.vue`
- `src/components/MenuBar.vue`
- `src/views/consumer/HomeView.vue`
- `src/views/consumer/ProductDetailsView.vue`
- `src/views/consumer/CartView.vue`
- `src/views/consumer/CheckoutView.vue`
- `src/views/admin/DashboardView.vue`
- `src/views/admin/ProductsView.vue`
- `src/views/admin/OrdersView.vue`
