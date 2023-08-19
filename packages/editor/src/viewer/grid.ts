import type { ViewerTool, Viewer } from '../viewer'
import { GridHelper } from 'three'

export class Grid implements ViewerTool {
  enable: boolean = true
  install(viewer: Viewer) {
    const gridHelper = new GridHelper( 10000, 100, 0x21262D, 0x1A1D22 )
    viewer.scene.add(gridHelper)
  }
}
