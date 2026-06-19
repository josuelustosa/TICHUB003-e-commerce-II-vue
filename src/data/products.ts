import { Product } from '@/models/product.model'
import { Category } from '@/models/category.model'

export const products: Product[] = [
  new Product(
    1,
    'Camisa Brasil Nike I 2026/27 - Masculino',
    'Modelo Torcedor oficial da seleção brasileira com Nike Dri-FIT.',
    449.99,
    0,
    new Category(1, 'Camisas de Time'),
  ),

  new Product(
    2,
    'Camisa Brasil Nike I 2026/27 - Feminino',
    'Modelo Torcedor oficial da seleção brasileira com Nike Dri-FIT.',
    409.99,
    0,
    new Category(1, 'Camisas de Time'),
  ),

  new Product(
    3,
    'Chuteira de Campo Adulto adidas Kaká',
    'Com solado em TPU com travas altas e fixas.',
    389.99,
    0,
    new Category(2, 'Chuteiras'),
  ),

  new Product(
    4,
    'Chuteira Futsal Infantil Puma Neymar Future 9 Play',
    'Com solado de borracha com tecnologia non-marking assegura tração superior.',
    379.99,
    0,
    new Category(2, 'Chuteiras'),
  ),

  new Product(
    5,
    'Tênis Feminino Nike Revolution 8',
    'Com solado de borracha para aderência duradoura no asfalto ou esteira.',
    341.99,
    0,
    new Category(3, 'Tênis'),
  ),
]
