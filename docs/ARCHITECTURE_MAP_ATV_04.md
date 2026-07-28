# Inventário técnico ATV-04

## Árvore de pastas — até 3 níveis

```text
.
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .oxlintrc.json
├── .prettierrc.json
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── ARCHITECTURE_MAP_ATV_04.md
├── README.md
├── env.d.ts
├── eslint.config.ts
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── favicon.ico
├── src/
│   ├── App.vue
│   ├── assets/
│   │   ├── base.css
│   │   ├── favicon-ecommerce.png
│   │   ├── logo-ecommerce.png
│   │   ├── logo.svg
│   │   ├── main.css
│   │   └── profile.png
│   ├── components/
│   │   ├── CartSummary.vue
│   │   ├── MenuBar.vue
│   │   ├── ProductCard.vue
│   │   └── base/
│   │       └── BaseButton.vue
│   ├── data/
│   │   ├── cart.ts
│   │   └── products.ts
│   ├── layouts/
│   │   ├── AdminLayout.vue
│   │   └── ConsumerLayout.vue
│   ├── main.ts
│   ├── models/
│   │   ├── cart.model.ts
│   │   ├── category.model.ts
│   │   ├── product.model.ts
│   │   └── user.model.ts
│   ├── router/
│   │   ├── guards.ts
│   │   └── index.ts
│   ├── services/
│   │   └── fakeAuth.ts
│   └── views/
│       ├── admin/
│       │   ├── DashboardView.vue
│       │   ├── OrdersView.vue
│       │   └── ProductsView.vue
│       └── consumer/
│           ├── CartView.vue
│           ├── CheckoutView.vue
│           ├── FaqView.vue
│           ├── HomeView.vue
│           └── ProductDetailsView.vue
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Layout Admin

| Classificação | Caminho |
|---|---|
| Layout | `src/layouts/AdminLayout.vue` |
| Roteamento | `src/router/index.ts` |
| View | `src/views/admin/DashboardView.vue` |
| View | `src/views/admin/OrdersView.vue` |
| View | `src/views/admin/ProductsView.vue` |

## Layout Consumer

| Classificação | Caminho |
|---|---|
| Layout | `src/layouts/ConsumerLayout.vue` |
| Roteamento | `src/router/index.ts` |
| View | `src/views/consumer/CartView.vue` |
| View | `src/views/consumer/CheckoutView.vue` |
| View | `src/views/consumer/FaqView.vue` |
| View | `src/views/consumer/HomeView.vue` |
| View | `src/views/consumer/ProductDetailsView.vue` |
