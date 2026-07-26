<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function submitLogin() {
  errorMessage.value = ''

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    await router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = (error as Error).message
  }
}
</script>

<template>
  <main class="min-h-screen bg-neutral-200 px-6 py-12 dark:bg-neutral-900">
    <section class="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
      <Card class="w-full rounded-xl shadow-xl">
        <template #title>
          <h1 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Entrar</h1>
        </template>

        <template #subtitle>
          <p class="text-neutral-500">Acesse sua conta para continuar.</p>
        </template>

        <template #content>
          <form class="flex flex-col gap-5" @submit.prevent="submitLogin">
            <div class="flex flex-col gap-2">
              <label for="login-email" class="font-medium text-neutral-700 dark:text-neutral-200">
                E-mail
              </label>
              <InputText
                id="login-email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="seu@email.com"
                class="w-full"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="login-password"
                class="font-medium text-neutral-700 dark:text-neutral-200"
              >
                Senha
              </label>
              <Password
                inputId="login-password"
                v-model="password"
                :feedback="false"
                toggleMask
                autocomplete="current-password"
                placeholder="Digite sua senha"
                inputClass="w-full"
                class="w-full"
              />
            </div>

            <p v-if="errorMessage" class="text-sm text-red-600" role="alert">
              {{ errorMessage }}
            </p>

            <Button
              type="submit"
              label="Entrar"
              icon="pi pi-sign-in"
              class="w-full"
              :disabled="authStore.isLoading"
            />
          </form>
        </template>

        <template #footer>
          <p class="text-center text-sm text-neutral-600 dark:text-neutral-300">
            Ainda não possui uma conta?
            <RouterLink
              :to="{ name: 'register' }"
              class="font-semibold text-teal-600 hover:text-teal-700"
            >
              Criar conta
            </RouterLink>
          </p>
        </template>
      </Card>
    </section>
  </main>
</template>
