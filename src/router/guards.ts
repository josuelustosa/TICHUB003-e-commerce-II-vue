import type { Router } from 'vue-router'

import type { UserRole } from '@/models/user.model'
import { useAuthStore } from '@/stores/auth'

export function registerGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const roles = Array.isArray(to.meta.roles) ? to.meta.roles : []

    try {
      if (to.meta.requiresAuth) {
        authStore.requireAuthentication()
      }

      if (roles.length && typeof roles[0] === 'string') {
        authStore.requireRole(roles[0] as UserRole)
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
