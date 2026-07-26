export type UserRole = 'CONSUMER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}
