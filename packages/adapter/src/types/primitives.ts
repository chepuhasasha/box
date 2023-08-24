export interface BoxGeometry {
  width: number
  height: number
  depth: number
}

export interface SpacePoint {
  x: number
  y: number
  z: number
}

export interface BoxRotate {
  x_rotate: boolean
  y_rotate: boolean
  z_rotate: boolean
}

export interface ServerError {
  statusCode: number
  message: string
}