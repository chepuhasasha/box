import type { Viewer, ViewerTool } from '.'
import * as THREE from 'three'

export class PointerTool implements ViewerTool {
  enable: boolean = true
  raycaster: THREE.Raycaster = new THREE.Raycaster()
  viewer: Viewer | null = null

  install(viewer: Viewer) {
    this.viewer = viewer
    this.viewer.renderer.domElement.addEventListener('pointerdown', (e) => {
      if (this.enable) this.onPointerdown(e)
    })
    this.viewer.renderer.domElement.addEventListener('pointerup', (e) => {
      if (this.enable) this.onPointerup(e)
    })
    this.viewer.renderer.domElement.addEventListener('pointermove', (e) => {
      if (this.enable) this.onPointermove(e)
    })
  }

  setRay(event: PointerEvent) {
    if (!this.viewer || !this.viewer.view) return
    const rect = this.viewer.view
    const vector = new THREE.Vector3()
    const dir = new THREE.Vector3()

    vector.set(
      ((event.clientX - this.viewer.view.x) / rect.width) * 2 - 1,
      -((event.clientY - this.viewer.view.y) / rect.height) * 2 + 1,
      -1
    )

    vector.unproject(this.viewer.camera)
    dir.set(0, 0, -1).transformDirection(this.viewer.camera.matrixWorld)
    this.raycaster.set(vector, dir)
    const intersects = this.raycaster.intersectObjects(this.viewer.scene.children, true)
    return this.viewer.boxes.find((box) => intersects.some((e) => e.object.uuid === box.mesh.uuid))
  }

  onPointerdown(e: PointerEvent) {
    if (!this.viewer) return
    const selected = this.setRay(e)
    if (selected) {
      this.viewer.store.selected.box = selected.box
    }
  }

  onPointerup(e: PointerEvent) {
    if (!this.viewer) return
    const selected = this.setRay(e)
    this.viewer.store.selected.box = selected ? selected.box : null
    this.viewer.store.hovered.box = selected ? selected.box : null
  }

  onPointermove(e: PointerEvent) {
    if (!this.viewer) return
    const hovered = this.setRay(e)
    this.viewer.store.hovered.box = hovered ? hovered.box : null
  }
}
