# Contexto IA — Atividade Prática 05

## Projeto

- Vue 3, TypeScript, Vite, Vue Router, Pinia, Vuelidate, PrimeVue e TailwindCSS 4.
- Inicialização: `src/main.ts`.
- Componente raiz: `src/App.vue`.
- Store de autenticação: `src/stores/auth.ts`.
- Roteador: `src/router/index.ts`.
- Guards: `src/router/guards.ts`.

## Estrutura de autenticação

```text
src/
├── stores/
│   └── auth.ts
├── views/
│   └── auth/
│       ├── LoginView.vue
│       └── RegisterView.vue
├── router/
│   ├── guards.ts
│   └── index.ts
├── components/
│   └── MenuBar.vue
└── layouts/
    ├── AdminLayout.vue
    └── ConsumerLayout.vue
```

## AuthStore

Arquivo: `src/stores/auth.ts`

- Store: `useAuthStore`.
- Estado:
  - `user: User | null`;
  - `token: string | null`;
  - `isAuthenticated: boolean`;
  - `isLoading: boolean`.
- Actions:
  - `login({ email, password })`;
  - `register({ name, email, password })`;
  - `logout()`.
- Controle de acesso:
  - `hasRole(role)`;
  - `requireAuthentication()`;
  - `requireRole(role)`.
- Login, registro e logout usam delay simulado de 500 ms.
- Registro cria usuário com role `CONSUMER`.
- A store é a fonte central de autenticação.
- `src/services/fakeAuth.ts` não é mais utilizado.

## Usuários simulados

Array: `users` em `src/stores/auth.ts`.

| E-mail | Senha | Role |
|---|---|---|
| `josue.admin@email.com` | `123456` | `ADMIN` |
| `virginio007@email.com` | `123456` | `CONSUMER` |

## Rotas

| Caminho | Nome | Componente | Proteção |
|---|---|---|---|
| `/login` | `login` | `LoginView` | pública |
| `/register` | `register` | `RegisterView` | pública |
| `/` | `home` | `ConsumerLayout` → `HomeView` | pública |
| `/product/:id` | `product-details` | `ProductDetailsView` | pública |
| `/cart` | `cart` | `CartView` | pública |
| `/checkout` | `checkout` | `CheckoutView` | autenticação |
| `/admin` | `admin-home` | `AdminLayout` → `DashboardView` | autenticação + `ADMIN` |
| `/admin/products` | `admin-products` | `ProductsView` | autenticação + `ADMIN` |
| `/admin/orders` | `admin-orders` | `OrdersView` | autenticação + `ADMIN` |

## Guard e redirecionamento

Arquivo: `src/router/guards.ts`

- `router.beforeEach` consulta `useAuthStore`.
- `meta.requiresAuth` exige usuário autenticado.
- `meta.roles` valida a role do usuário.
- Acesso negado dispara `auth:error`.
- Acesso negado redireciona para `/login`.
- A rota original é preservada em `query.redirect`.
- O `Toast` de `src/App.vue` exibe o feedback de acesso negado.

## Login e Registro

Arquivos:

- `src/views/auth/LoginView.vue`;
- `src/views/auth/RegisterView.vue`.

Componentes PrimeVue utilizados:

- `Card`;
- `InputText`;
- `Password` com `toggleMask`;
- `Button` com `loading`.

## Validação Vuelidate

### Login

- E-mail obrigatório.
- E-mail em formato válido.
- Senha obrigatória.

### Registro

- Nome obrigatório.
- E-mail obrigatório e válido.
- Senha obrigatória com mínimo de 6 caracteres.
- Confirmação de senha obrigatória.
- Confirmação comparada com a senha por `sameAs` e `computed` reativo.
- Submissão inválida é interrompida.
- Erros aparecem abaixo dos campos com classes Tailwind vermelhas.

## Feedback e sessão

- `Toast` exibe sucesso de login e registro.
- `Toast` exibe erros de credenciais e cadastro.
- Botões exibem loading durante as actions da store.
- Logout disponível no `MenuBar` e no `AdminLayout`.
- Logout limpa `user`, `token` e `isAuthenticated`.
- Após logout, a aplicação navega para `/login`.
- Login e registro retornam para `query.redirect` quando o caminho é interno; caso contrário, retornam para Home.

## Arquivos prioritários

- `src/stores/auth.ts`
- `src/router/guards.ts`
- `src/router/index.ts`
- `src/views/auth/LoginView.vue`
- `src/views/auth/RegisterView.vue`
- `src/components/MenuBar.vue`
- `src/layouts/AdminLayout.vue`
- `src/App.vue`
- `src/models/user.model.ts`
- `package.json`
