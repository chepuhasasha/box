import type { Types } from '@box/adapter'
import * as THREE from 'three'
import { useViewerStore } from '..'
import { watch } from 'vue'
import { shaders } from '../shaders'

export class BoxSpaceEntity {
  geometry: THREE.BoxGeometry
  materials = {
    hover: new THREE.MeshMatcapMaterial({ color: 0x1f6feb, transparent: true, opacity: 0.5 }),
    base: new THREE.MeshMatcapMaterial({
      color: 0xC9D1D9,
      transparent: true,
      opacity: 0.5
    })
  }
  store = useViewerStore()
  mesh: THREE.Mesh
  group: THREE.Group = new THREE.Group()
  boxHelper: THREE.BoxHelper

  constructor(public box: Types.Box) {
    this.geometry = new THREE.BoxGeometry(
      box.geometry.width,
      box.geometry.height,
      box.geometry.depth
    )
    this.mesh = new THREE.Mesh(this.geometry, this.materials.base)
    this.mesh.position.x = box.position.x
    this.mesh.position.y = box.position.y + box.geometry.height / 2
    this.mesh.position.z = box.position.z
    this.boxHelper = new THREE.BoxHelper(this.mesh, 0x010409)
    this.group.add(this.mesh, this.boxHelper)

    watch(
      () => ({
        hovered: this.store.hovered.box,
        selected: this.store.selected.box
      }),
      (n, o) => {
        if(!n.hovered) {
          this.unhover()
        }
        if(!n.selected) {
          this.unselect()
        }
        if (n.selected && n.selected.id === box.id) {
          this.select()
        } else {
          this.unselect()
        }
        if (n.hovered && n.hovered.id === box.id) {
          this.hover()
        } else {
          this.unhover()
        }
      }
    )
  }

  select() {
    
    this.mesh.material = this.materials.hover
  }
  unselect() {
    this.mesh.material = this.materials.base
  }
  hover() {
    this.boxHelper.material.color = new THREE.Color(0x1f6feb)
  }
  unhover() {
    this.boxHelper.material.color = new THREE.Color(0x010409)
  }
}
