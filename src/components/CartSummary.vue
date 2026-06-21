<script lang="ts">
import { defineComponent, PropType } from 'vue'

import pCard from 'primevue/card'
import pDataView from 'primevue/dataview'
import pButton from 'primevue/button'
import pConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

import type { CartItem } from '@/models/cart.model'

export default defineComponent({
  components: {
    pCard,
    pDataView,
    pButton,
    pConfirmDialog,
  },

  props: {
    cartItems: {
      type: Array as PropType<CartItem[]>,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
  },

  emits: ['increment', 'decrement', 'remove'],

  setup(props, { emit }) {
    const confirm = useConfirm()

    const confirmRemove = (productId: number) => {
      confirm.require({
        message: `Deseja remover o produto do carrinho?`,
        header: 'Confirmação',
        acceptProps: {
          label: 'Remover',
          severity: 'danger',
          size: 'small',
        },
        rejectProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
          size: 'small',
        },

        accept: () => {
          emit('remove', productId)
        },
      })
    }

    return {
      confirmRemove,
    }
  },
})
</script>

<template>
  <pConfirmDialog />

  <template v-if="cartItems.length > 0">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- Resumo Lateral à esquerda -->
      <aside className="lg:col-span-2">
        <pCard
          className="bg-neutral-100 dark:bg-neutral-950 shadow-xl/40 shadow-neutral-500 dark:shadow-neutral-950 rounded-xl"
        >
          <template #content>
            <div className="flex justify-between align-items-center gap-4">
              <span className="text-base text-neutral-800 dark:text-neutral-100">
                Total de Itens:
              </span>
              <span className="text-base font-bold text-neutral-800 dark:text-neutral-100">{{
                totalItems
              }}</span>
            </div>
            <div className="flex justify-between align-items-center gap-4">
              <span className="text-base text-neutral-800 dark:text-neutral-100">Preço Final:</span>
              <span className="text-base font-bold text-teal-500"
                >R$ {{ finalPrice.toFixed(2) }}</span
              >
            </div>
          </template>
        </pCard>
      </aside>

      <!-- Lista de Itens com pDataView à direita -->
      <aside className="lg:col-span-3">
        <div
          className="bg-neutral-100 dark:bg-neutral-950 shadow-xl/40 shadow-neutral-500 dark:shadow-neutral-950 rounded-xl overflow-hidden"
        >
          <pDataView
            v-if="cartItems.length > 0"
            :value="cartItems"
            :pt="{
              root: { className: 'bg-transparent border-none shadow-none' },
              content: { className: 'bg-transparent p-0' },
            }"
          >
            <template #list="{ items }">
              <div
                v-for="item in items"
                :key="item.product.id"
                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
                    {{ item.product.name }}
                  </h3>

                  <div className="flex items-center gap-2">
                    <pButton label="-" size="small" @click="$emit('decrement', item.product.id)" />

                    <span
                      className="min-w-8 text-center font-semibold text-neutral-800 dark:text-neutral-100"
                    >
                      {{ item.quantity }}
                    </span>

                    <pButton
                      label="+"
                      size="small"
                      :disabled="item.quantity >= 10"
                      @click="$emit('increment', item.product)"
                    />

                    <pButton
                      label="Remover Produto"
                      variant="outlined"
                      severity="danger"
                      size="small"
                      @click="confirmRemove(item.product.id)"
                    />
                  </div>
                  <small v-if="item.quantity >= 10" className="text-amber-500 font-medium">
                    Limite máximo de 10 unidades atingido.
                  </small>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs uppercase text-neutral-500">Subtotal</p>

                  <span className="text-lg font-bold text-teal-500">
                    R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>
            </template>
          </pDataView>
        </div>
      </aside>
    </div>
  </template>

  <template v-else>
    <!-- Card de aviso: carrinho vazio -->
    <pCard
      className="mt-6 bg-neutral-100 dark:bg-neutral-950 shadow-xl/40 shadow-neutral-500 dark:shadow-neutral-950 rounded-xl"
    >
      <template #content>
        <div className="py-8 text-center text-neutral-500">Seu carrinho está vazio!</div>
      </template>
    </pCard>
  </template>
  <div className="mx-auto"></div>
</template>

<style scoped></style>
