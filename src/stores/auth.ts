import { defineStore } from 'pinia'

import type { User, UserRole } from '@/models/user.model'

interface AuthCredentials {
  email: string
  password: string
}

interface RegisterData extends AuthCredentials {
  name: string
}

interface MockUser extends User {
  password: string
}

const authenticationDelay = 500

const users: MockUser[] = [
  {
    id: 1,
    name: 'Josué Lustosa',
    email: 'josue.admin@email.com',
    password: '123456',
    role: 'ADMIN',
  },
  {
    id: 2,
    name: 'Vini Jr',
    email: 'virginio007@email.com',
    password: '123456',
    role: 'CONSUMER',
  },
]

function waitForAuthentication() {
  return new Promise((resolve) => setTimeout(resolve, authenticationDelay))
}

function toUser(mockUser: MockUser): User {
  const { password: _password, ...user } = mockUser

  return user
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
    isLoading: false,
  }),

  actions: {
    async login({ email, password }: AuthCredentials): Promise<User> {
      this.isLoading = true

      try {
        await waitForAuthentication()

        const account = users.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
        )

        if (!account) {
          throw new Error('Credenciais inválidas.')
        }

        this.user = toUser(account)
        this.token = `mock-token-${account.id}`
        this.isAuthenticated = true

        return this.user
      } finally {
        this.isLoading = false
      }
    },

    async register({ name, email, password }: RegisterData): Promise<User> {
      this.isLoading = true

      try {
        await waitForAuthentication()

        const normalizedEmail = email.trim().toLowerCase()
        const emailAlreadyInUse = users.some((user) => user.email.toLowerCase() === normalizedEmail)

        if (emailAlreadyInUse) {
          throw new Error('Este e-mail já está cadastrado.')
        }

        const account: MockUser = {
          id: users.length + 1,
          name: name.trim(),
          email: normalizedEmail,
          password,
          role: 'CONSUMER',
        }

        users.push(account)
        this.user = toUser(account)
        this.token = `mock-token-${account.id}`
        this.isAuthenticated = true

        return this.user
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true

      try {
        await waitForAuthentication()

        this.user = null
        this.token = null
        this.isAuthenticated = false
      } finally {
        this.isLoading = false
      }
    },

    hasRole(role: UserRole): boolean {
      return this.user?.role === role
    },

    requireAuthentication() {
      if (!this.isAuthenticated || !this.user || !this.token) {
        throw new Error('Você precisa estar autenticado para acessar esta página.')
      }
    },

    requireRole(role: UserRole) {
      this.requireAuthentication()

      if (!this.hasRole(role)) {
        throw new Error('Você não possui permissão para acessar esta área.')
      }
    },
  },
})
