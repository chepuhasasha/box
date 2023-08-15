import type { Types } from '@box/adapter/'
import * as THREE from 'three'

export class ContainerEntity {
  public mesh: THREE.Mesh
  public material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  private _geometry: THREE.BoxGeometry

  constructor(public doc: Types.Container) {
    this._geometry = new THREE.BoxGeometry(
      doc.geometry.width,
      doc.geometry.height,
      doc.geometry.depth
    )
    this.mesh = new THREE.Mesh(this._geometry)
  }

  addBox(id: string) {
    this.doc.boxes.push(id)
  }
  removeBox(id: string) {
    this.doc.boxes = this.doc.boxes.filter((_id) => _id != id)
  }

  set geometry(geometry: Types.BoxGeometry) {
    this.mesh.scale.set(
      this.doc.geometry.width / geometry.width,
      this.doc.geometry.height / geometry.height,
      this.doc.geometry.depth / geometry.depth
    )
    this.doc.geometry = geometry
  }
  set position(position: Types.SpacePoint) {
    this.mesh.position.set(position.x, position.y, position.z)
  }

  get id() {
    return this.doc.id
  }
  get space_id() {
    return this.mesh.uuid
  }
}
