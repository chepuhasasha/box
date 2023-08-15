import type { ViewerTool, Viewer } from '../viewer'

export class Selecter implements ViewerTool {
  enable: boolean = true
  install(viewer: Viewer) {}
}
