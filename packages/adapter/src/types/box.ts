import type { BoxGeometry, BoxRotate, SpacePoint } from "./primitives"

export interface BoxProps {
  rotate_limits: BoxRotate
  weight: number | null
}

export interface Box {
  id: string
  name: string
  geometry: BoxGeometry
  position: SpacePoint
  rotate: BoxRotate
  type_code: string
  props: BoxProps
}