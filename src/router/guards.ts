import type { Router } from 'vue-router'

import { fakeAuth } from '@/services/fakeAuth'

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
