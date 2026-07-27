<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useVuelidate from '@vuelidate/core'
import {
  email as emailValidator,
  helpers,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { useToast } from 'primevue/usetoast'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const passwordForComparison = computed(() => form.password)

const rules = {
  name: {
    required: helpers.withMessage('Nome é obrigatório.', required),
  },
  email: {
    required: helpers.withMessage('E-mail é obrigatório.', required),
    email: helpers.withMessage('E-mail inválido.', emailValidator),
  },
  password: {
    required: helpers.withMessage('Senha é obrigatória.', required),
    minLength: helpers.withMessage('A senha deve ter no mínimo 6 caracteres.', minLength(6)),
  },
  passwordConfirmation: {
    required: helpers.withMessage('Confirme sua senha.', required),
    sameAs: helpers.withMessage('As senhas não coincidem.', sameAs(passwordForComparison)),
  },
}

const v$ = useVuelidate(rules, form)

function getPostAuthRoute() {
  const redirect = route.query.redirect

  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }

  return { name: 'home' as const }
}

async function submitRegister() {
  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
    })

    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Conta criada com sucesso!',
      life: 3000,
    })

    await router.push(getPostAuthRoute())
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao criar conta',
      detail: (error as Error).message,
      life: 3000,
    })
  }
}
</script>

<template>
  <main class="min-h-screen bg-neutral-200 px-6 py-12 dark:bg-neutral-900">
    <section class="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
      <Card class="w-full rounded-xl shadow-xl">
        <template #title>
          <h1 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Criar conta</h1>
        </template>

        <template #subtitle>
          <p class="text-neutral-500">Cadastre-se para acessar a loja.</p>
        </template>

        <template #content>
          <form class="flex flex-col gap-5" @submit.prevent="submitRegister">
            <div class="flex flex-col gap-2">
              <label for="register-name" class="font-medium text-neutral-700 dark:text-neutral-200">
                Nome
              </label>
              <InputText
                id="register-name"
                v-model="form.name"
                autocomplete="name"
                placeholder="Seu nome"
                class="w-full"
                :invalid="v$.name.$error"
              />
              <small v-for="error in v$.name.$errors" :key="error.$uid" class="text-red-600">
                {{ error.$message }}
              </small>
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="register-email"
                class="font-medium text-neutral-700 dark:text-neutral-200"
              >
                E-mail
              </label>
              <InputText
                id="register-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="seu@email.com"
                class="w-full"
                :invalid="v$.email.$error"
              />
              <small v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-600">
                {{ error.$message }}
              </small>
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="register-password"
                class="font-medium text-neutral-700 dark:text-neutral-200"
              >
                Senha
              </label>
              <Password
                inputId="register-password"
                v-model="form.password"
                toggleMask
                autocomplete="new-password"
                placeholder="Digite sua senha"
                inputClass="w-full"
                class="w-full"
                :invalid="v$.password.$error"
              />
              <small v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-600">
                {{ error.$message }}
              </small>
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="register-password-confirmation"
                class="font-medium text-neutral-700 dark:text-neutral-200"
              >
                Confirmar senha
              </label>
              <Password
                inputId="register-password-confirmation"
                v-model="form.passwordConfirmation"
                :feedback="false"
                toggleMask
                autocomplete="new-password"
                placeholder="Repita sua senha"
                inputClass="w-full"
                class="w-full"
                :invalid="v$.passwordConfirmation.$error"
              />
              <small
                v-for="error in v$.passwordConfirmation.$errors"
                :key="error.$uid"
                class="text-red-600"
              >
                {{ error.$message }}
              </small>
            </div>

            <Button
              type="submit"
              label="Criar conta"
              icon="pi pi-user-plus"
              class="w-full"
              :loading="authStore.isLoading"
              :disabled="authStore.isLoading"
            />
          </form>
        </template>

        <template #footer>
          <p class="text-center text-sm text-neutral-600 dark:text-neutral-300">
            Já possui uma conta?
            <RouterLink
              :to="{ name: 'login' }"
              class="font-semibold text-teal-600 hover:text-teal-700"
            >
              Entrar
            </RouterLink>
          </p>
        </template>
      </Card>
    </section>
  </main>
</template>
