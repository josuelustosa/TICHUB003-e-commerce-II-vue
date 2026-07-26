import { reactive } from 'vue'
import { Cart } from '@/models/cart.model'

export const cart = reactive(new Cart())
