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
  x_rotate: number
  y_rotate: number
  z_rotate: number
}

export interface ServerError {
  statusCode: number
  message: string
}