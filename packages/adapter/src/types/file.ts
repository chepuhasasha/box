import type { Box } from './box'
import type { Container } from './container'

export interface File {
  id: string
  owner_id: string
  name: string
  boxes: Box[]
  containers: Container[]
}