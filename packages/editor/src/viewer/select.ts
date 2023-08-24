import type { Viewer } from '.'
import { setRay, findBoxByUUID } from './helpers'

export class SelectTool  {
  enable: boolean = true
  constructor(private viewer: Viewer) {
    this.viewer = viewer
    this.viewer.renderer.domElement.addEventListener('pointerdown', (e) => {
      if (this.enable) this.pointerDown(e)
    })
    this.viewer.renderer.domElement.addEventListener('pointermove', (e) => {
      if (this.enable) this.pointerMove(e)
    })
  }

  pointerDown(e: PointerEvent) {
    const boxes = this.viewer.boxes.map((box) => box.mesh)
    const ray = setRay(this.viewer, e, boxes)
    const box = findBoxByUUID(this.viewer.boxes, ray?.object.uuid)
    if (!box) {
      this.viewer.store.selected.box = null
    } else if (
      (this.viewer.store.selected.box && this.viewer.store.selected.box.id != box.id) ||
      !this.viewer.store.selected.box
    ) {
      this.viewer.store.selected.box = box
    }
  }
  pointerMove(e: PointerEvent) {
    const boxes = this.viewer.boxes.map((box) => box.mesh)
    const ray = setRay(this.viewer, e, boxes)
    const box = findBoxByUUID(this.viewer.boxes, ray?.object.uuid)
    if (!box) {
      this.viewer.store.hovered.box = null
    } else if (
      (this.viewer.store.hovered.box && this.viewer.store.hovered.box.id != box.id) ||
      !this.viewer.store.hovered.box
    ) {
      this.viewer.store.hovered.box = box
    }
  }
}
