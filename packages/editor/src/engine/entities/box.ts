import type { Types } from '@box/adapter/'
import * as THREE from 'three'
import { watch } from 'vue'

export class BoxEntity {
  public mesh: THREE.Mesh
  public material: THREE.MeshMatcapMaterial = new THREE.MeshMatcapMaterial({
    color: 0xC9D1D9,
    transparent: true,
    opacity: 1
  })
  private _geometry: THREE.BoxGeometry

  constructor(public doc: Types.Box) {
    this._geometry = new THREE.BoxGeometry(
      doc.geometry.width,
      doc.geometry.height,
      doc.geometry.depth
    )
    this.mesh = new THREE.Mesh(this._geometry, this.material)
    this.position = doc.position
    this.rotate = doc.rotate
    watch(
      () => ({
        x: doc.position.x,
        y: doc.position.y,
        z: doc.position.z
      }),
      (n, o) => {
        this.p_position = { x: n.x, y: n.y, z: n.z }
      }
    )
  }

  set docPosition(value: Types.Box) {
    console.log(value)
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
    this.doc.position = position
    this.mesh.position.set(
      position.x + this.doc.geometry.width / 2,
      position.y + this.doc.geometry.height / 2,
      position.z + this.doc.geometry.depth / 2
    )
  }
  set p_position(position: Types.SpacePoint) {
    this.mesh.position.set(
      position.x + this.doc.geometry.width / 2,
      position.y + this.doc.geometry.height / 2,
      position.z + this.doc.geometry.depth / 2
    )
  }
  set rotate(rotate: Types.BoxRotate) {
    if (rotate.x_rotate <= this.doc.props.rotate_limits.x_rotate) {
      this.doc.rotate.x_rotate = rotate.x_rotate
    }
    if (rotate.y_rotate <= this.doc.props.rotate_limits.y_rotate) {
      this.doc.rotate.y_rotate = rotate.y_rotate
    }
    if (rotate.z_rotate <= this.doc.props.rotate_limits.z_rotate) {
      this.doc.rotate.z_rotate = rotate.z_rotate
    }
  }

  get id() {
    return this.doc.id
  }
  get space_id() {
    return this.mesh.uuid
  }
}
