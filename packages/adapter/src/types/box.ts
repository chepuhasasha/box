import type { BoxGeometry, BoxRotate, SpacePoint } from "./primitives"

export interface BoxProps {
  rotate_limits: BoxRotate
  weight: number | null
}

export interface Box {
  id: string
  name: string
  object_type: 'BOX'
  geometry: BoxGeometry
  position: SpacePoint
  rotate: BoxRotate
  props: BoxProps
  container_id: string | null
}