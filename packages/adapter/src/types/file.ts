import type { Box } from './box'
import type { Container } from './container'

export interface File {
  id: string
  name: string
  owner_id: string
  boxes: Box[]
  containers: Container[]
  last_update: number
}