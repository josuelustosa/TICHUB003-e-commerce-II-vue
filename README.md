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
| Atividade 5: Autenticação Segura com Pinia e Vuelidate     | `atv-5/vuelidate-e-pinia-store` |

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

## ⚠️ Observações da Atividade (5)

### Acesso dos usuários

Os usuários simulados estão definidos no array `users` de [`src/stores/auth.ts`](src/stores/auth.ts):

| Usuário | E-mail | Senha | Role |
|---|---|---|---|
| Administrador | `josue.admin@email.com` | `123456` | `ADMIN` |
| Consumidor | `virginio007@email.com` | `123456` | `CONSUMER` |

- A aplicação inicia sem usuário autenticado.
- Novos registros são criados com role `CONSUMER`.
- O login está disponível em `/login`.
- O registro está disponível em `/register`.
- O logout limpa a sessão e redireciona para `/login`.

### Proteção de rotas

- `/checkout` exige autenticação.
- `/admin` e suas rotas filhas exigem autenticação e role `ADMIN`.
- A rota protegida de origem é preservada em `?redirect=` após redirecionamento para Login.
- Usuários sem permissão recebem feedback pelo `Toast` do PrimeVue.

### Rotas principais

- `/` → layout Consumer e catálogo.
- `/product/:id` → detalhes do produto.
- `/cart` → carrinho.
- `/checkout` → checkout protegido.
- `/admin` → layout Admin e dashboard protegido.

Para as informações completas da atividade, acesse [`docs/CONTEXT_IA_ATV_05.md`](docs/CONTEXT_IA_ATV_05.md).

## 📃 Certificado de Conclusão

Status do Programa: Em andamento.
