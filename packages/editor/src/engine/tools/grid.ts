import type { ViewerTool, Viewer } from '../viewer'
import { GridHelper } from 'three'

export class Grid implements ViewerTool {
  enable: boolean = true
  install(viewer: Viewer) {
    const gridHelper = new GridHelper( 1000, 100, 0x0000ff, 0x808080 )
    viewer.scene.add(gridHelper)
  }
}
