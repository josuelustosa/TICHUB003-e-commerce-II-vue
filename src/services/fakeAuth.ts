import type { User, UserRole } from '@/models/user.model'

const users = {
  admin: {
    id: 1,
    name: 'Josué Lustosa',
    email: 'josue.admin@email.com',
    role: 'ADMIN',
  } satisfies User,

  consumer: {
    id: 2,
    name: 'Vini Jr',
    email: 'virginio007@email.com',
    role: 'CONSUMER',
  } satisfies User,
}

// Altere apenas esta linha para testar:
// users.consumer -> Consumidor
// users.admin    -> Administrador
// null           -> Visitante (não autenticado)

let currentUser: User | null = users.admin

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

  loginAs(role: UserRole) {
    currentUser = role === 'ADMIN' ? users.admin : users.consumer
  },

  logout() {
    currentUser = null
  },
}
