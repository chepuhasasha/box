import * as THREE from 'three'
import type { ViewerTool, Viewer } from '../viewer'
import type { Types } from '@box/adapter'

export class Mover implements ViewerTool {
  enable: boolean = true
  raycaster: THREE.Raycaster = new THREE.Raycaster()
  pointer: THREE.Vector2 = new THREE.Vector2()
  viewer: Viewer | null = null
  moverEntity: MoverEntity | null = null

  install(viewer: Viewer) {
    this.viewer = viewer
    this.viewer.renderer.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this))
    // document.addEventListener('pointerdown', onPointerDown)
    // document.addEventListener('keydown', onDocumentKeyDown)
    // document.addEventListener('keyup', onDocumentKeyUp)
  }

  onPointerDown(event: PointerEvent) {
    if (this.viewer && this.viewer.camera && this.viewer.DOMRect) {
      const rect = this.viewer.DOMRect
      this.pointer.set(
        ((event.clientX - rect.x) / rect.width) * 2 - 1,
        -((event.clientY - rect.y) / rect.height) * 2 + 1,
      )
      this.raycaster.setFromCamera(this.pointer, this.viewer.camera)
      const intersects = this.raycaster.intersectObjects(
        this.viewer.scene.children,
        false
      )
      if (intersects[0]) {
        this.select(intersects[0].object) 
      } else {
        this.select(null) 
      }
    }
  }

  select(object: THREE.Object3D<THREE.Event> | null) {
    if (!this.viewer) return
    if (this.moverEntity) {
      this.viewer.scene.remove(
        this.moverEntity.xAxis,
        this.moverEntity.yAxis,
        this.moverEntity.zAxis,
        this.moverEntity.clone,
        this.moverEntity.wireframe
      )
      const selected = this.viewer.boxes.find((box) => box.id === this.moverEntity?.doc.id)
      if (selected) {
        // @ts-ignore
        selected.mesh.material.opacity = 1
      }
      this.moverEntity = null
    }
    if(object) {
      const target = this.viewer.boxes.find((box) => box.space_id === object.uuid)
      if (target) {
        this.moverEntity = new MoverEntity(target.doc, 100)
        this.viewer.scene.add(
          this.moverEntity.xAxis,
          this.moverEntity.yAxis,
          this.moverEntity.zAxis,
          this.moverEntity.clone,
          this.moverEntity.wireframe
        )
        // @ts-ignore
        object.material.opacity = 0.5
      }
    }
  }
}

export class MoverEntity {
  xAxis: THREE.Mesh
  yAxis: THREE.Mesh
  zAxis: THREE.Mesh
  clone: THREE.Mesh
  wireframe: THREE.Mesh

  constructor(
    public doc: Types.Box,
    length: number = 100,
    offset: number = 10
  ) {
    const clonGeometry = new THREE.BoxGeometry(
      this.doc.geometry.width,
      this.doc.geometry.height,
      this.doc.geometry.depth
    )
    const wireframeGeometry = new THREE.BoxGeometry(
      this.doc.geometry.width + offset,
      this.doc.geometry.height + offset,
      this.doc.geometry.depth + offset
    )
    const clonMaterial = new THREE.MeshMatcapMaterial({
      color: 0x1f6feb,
      transparent: true,
      opacity: 0.2
    })
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x1f6feb,
      wireframeLinewidth: 10,
      transparent: true,
      opacity: 0.5
    })
    const axisMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f6feb,
      wireframe: true,
      wireframeLinewidth: 1
    })

    this.clone = new THREE.Mesh(clonGeometry, clonMaterial)
    this.clone.position.x = this.doc.position.x + this.doc.geometry.width / 2
    this.clone.position.y = this.doc.position.y + this.doc.geometry.height / 2
    this.clone.position.z = this.doc.position.z + this.doc.geometry.depth / 2

    this.wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    this.wireframe.position.x = this.doc.position.x + this.doc.geometry.width / 2
    this.wireframe.position.y = this.doc.position.y + this.doc.geometry.height / 2
    this.wireframe.position.z = this.doc.position.z + this.doc.geometry.depth / 2

    const xAxisGeometry = new THREE.CylinderGeometry(2, 2, length + this.doc.geometry.width)
    const yAxisGeometry = new THREE.CylinderGeometry(2, 2, length + this.doc.geometry.height)
    const zAxisGeometry = new THREE.CylinderGeometry(2, 2, length + this.doc.geometry.depth)
    this.xAxis = new THREE.Mesh(xAxisGeometry, axisMaterial)
    this.yAxis = new THREE.Mesh(yAxisGeometry, axisMaterial)
    this.zAxis = new THREE.Mesh(zAxisGeometry, axisMaterial)

    this.xAxis.position.x = this.doc.position.x + (this.doc.geometry.width + length) / 2
    this.xAxis.position.y = this.doc.position.y
    this.xAxis.position.z = this.doc.position.z
    this.xAxis.rotateX(Math.PI / 2)
    this.xAxis.rotateZ(Math.PI / 2)

    this.yAxis.position.x = this.doc.position.x
    this.yAxis.position.y = this.doc.position.y + (this.doc.geometry.height + length) / 2
    this.yAxis.position.z = this.doc.position.z

    this.zAxis.position.x = this.doc.position.x
    this.zAxis.position.y = this.doc.position.y
    this.zAxis.position.z = this.doc.position.z + (this.doc.geometry.depth + length) / 2
    this.zAxis.rotateX(Math.PI / 2)
  }
}
