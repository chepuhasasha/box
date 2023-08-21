import type { Types } from '@box/adapter'
import type { Viewer, ViewerTool } from '.'
import * as THREE from 'three'

export class PointerTool implements ViewerTool {
  enable: boolean = true
  raycaster: THREE.Raycaster = new THREE.Raycaster()
  viewer: Viewer | null = null
  shadow: THREE.Mesh | null = null

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

  addShadow(box: Types.Box) {
    if (!this.viewer) return null
    const geometry = new THREE.BoxGeometry(box.geometry.width, box.geometry.height, box.geometry.depth)
    const material = new THREE.MeshMatcapMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 })
    this.shadow = new THREE.Mesh(geometry, material)
    this.shadow.position.x = box.position.x
    this.shadow.position.y = box.position.y + box.geometry.height / 2
    this.shadow.position.z = box.position.z
    this.viewer.scene.add(this.shadow)
  }
  removeShadow() {
    if (this.viewer && this.shadow) this.viewer.scene.remove(this.shadow)
  }

  setRay(event: PointerEvent) {
    if (!this.viewer || !this.viewer.view)
      return {
        object: undefined,
        point: undefined
      }
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
    return {
      object: this.viewer.boxes.find((box) =>
        intersects.some((e) => e.object.uuid === box.mesh.uuid)
      ),
      point: intersects[0]?.point
    }
  }

  onPointerdown(e: PointerEvent) {
    if (!this.viewer) return
    const ray = this.setRay(e)
    if (ray.object) {
      this.viewer.store.selected.box = ray.object.box
      this.viewer.controls.enableRotate = false
      this.addShadow(ray.object.box)
    }
    // rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
  }

  onPointerup(e: PointerEvent) {
    if (!this.viewer) return
    const ray = this.setRay(e)
    if(this.shadow && this.viewer.store.selected.box) {
      this.viewer.store.selected.box.position.x = this.shadow.position.x
      this.viewer.store.selected.box.position.y = this.shadow.position.y - this.viewer.store.selected.box.geometry.height / 2
      this.viewer.store.selected.box.position.z = this.shadow.position.z
    }
    this.viewer.store.selected.box = ray.object ? ray.object.box : null
    this.viewer.store.hovered.box = ray.object ? ray.object.box : null
    this.viewer.controls.enableRotate = true
    this.removeShadow()
  }

  onPointermove(e: PointerEvent) {
    if (!this.viewer) return
    const ray = this.setRay(e)
    if (this.shadow && ray.point) {
      this.shadow.position.copy(ray.point)
    }
    this.viewer.store.hovered.box = ray.object ? ray.object.box : null
  }
}
