# TIC Hub Programação Fullstack: Módulo Frontend

Aqui você irá encontrar as atividades que desenvolvi durante o **Módulo Front-end** do programa [TIC Hub 12: Programação Fullstack](https://tic-hub.irede.org.br/) (2026_1).

## 🎓 Conheça o Programa

A Residência em TIC 12 é um programa de capacitação profissional e tecnológica executado pela Universidade Estadual do Ceará (UECE), coordenado pela Softex, com parceria do Instituto iRede (iRede) e do Instituto Federal do Ceará (IFCE), e incentivo do Ministério da Ciência, Tecnologia e Inovação (MCTI).

> O programa oferece 7 trilhas tecnológicas, com destaque para a formação em Programação FullStack, que atraiu 508 candidatos para apenas 100 vagas iniciais.

## 📂 Organização das Atividades

| Atividade                                                  | Branch                      |
| ---------------------------------------------------------- | --------------------------- |
| Atividade 2: VueJS - E-commerce com Vue.js & Options API   | `atv-2/vue-js`              |
| Atividade 3: PrimeVue e Tailwind CSS                       | `atv-3/primevue-e-tailwind` |
| Atividade 4: Arquitetura de Rotas e Segurança com PrimeVue | `atv-4/vue-router`          |

## 💻 Sobre o Projeto

- Objetivo do Módulo: Desenvolver o frontend de um e-commerce.
- Tecnologias Utilizadas: Vite, Vue 3 (PrimeVue, Vue Router, Pinia e Vuelidate), TypeScript e Tailwind CSS 4.

## ⚙️ Configuração do Projeto

1. Clone o repositório ou a Branch que desejar:

```sh
git clone https://github.com/josuelustosa/TICHUB-iRede-Frontend.git
cd TICHUB-iRede-Frontend
```

2. Instale as dependências

```sh
npm install
```

3. Execute o projeto em ambiente de desenvolvimento:

```sh
npm run dev
```

4. Acesse a atividade no navegador:

```sh
http://localhost:5173
```

## ⚠️ Observações da Atividade (4)

Todos os critérios e desafios para a entrega foram atendidos conforme o escopo do sistema. Segue algumas observações importantes para acesso e teste da aplicação, alternado entre os layouts Consumidor e Admin.

### Layouts Diferenciados

Para acessar esses layouts (Consumidor e Admin) na aplicação, encontre o arquivo `src/services/fakeAuth.ts` e altere apenas a seguinte linha:

```sh
let currentUser: User | null = users.admin
```

- `users.admin` -> Administrador
  - Possui acesso completo ao sistema (CONSUMER ou ADMIN).
- `users.consumer` -> Consumidor
  - Possui acesso exclusivo à página Checkout, mas não tem acesso a área ADMIN.
- `null` -> Visitante
  - Usuário NÃO autenticado que não tem acesso à página Checkout e nem a área ADMIN.

### Rotas dos Layouts

- "/" -> Acessa o layout ConsumerLayout (Catálogo)
- "/admin" -> Acessa o layout AdminLayout (Dashboard)

## 📃 Certificado de Conclusão

Status do Programa: Em andamento.
