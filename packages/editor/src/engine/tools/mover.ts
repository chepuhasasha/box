import type { ViewerTool, Viewer } from '../viewer'

export class Mover implements ViewerTool {
  enable: boolean = true
  install(viewer: Viewer) {}
}
