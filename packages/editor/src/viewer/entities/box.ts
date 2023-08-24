import type { Types } from '@box/adapter'
import * as THREE from 'three'
import { useViewerStore } from '..'
import { watch } from 'vue'
import { shaders } from '../shaders'

export class BoxSpaceEntity {
  geometry: THREE.BoxGeometry
  materials = {
    select: new THREE.ShaderMaterial({
      vertexShader: shaders.hatching.v,
      fragmentShader: shaders.hatching.f,
      transparent: true,
      uniforms: {
        time: { value: 0.0 },
        density: { value: 5 },
        angle: { value: 45 },
        opacity: { value: 0.2 },
        threshold: { value: 0.92 },
        r: { value: 0.12 },
        g: { value: 0.44 },
        b: { value: 0.92 }
      }
    }),
    base: new THREE.MeshMatcapMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
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
    this.mesh.position.y = box.position.y
    this.mesh.position.z = box.position.z
    this.boxHelper = new THREE.BoxHelper(this.mesh, 0x181c22)
    this.group.add(this.mesh, this.boxHelper)

    this.rotate(box.rotate)

    watch(
      () => ({
        x: box.position.x,
        y: box.position.y,
        z: box.position.z,
        x_rotate: box.rotate.x_rotate,
        y_rotate: box.rotate.y_rotate,
        z_rotate: box.rotate.z_rotate
      }),
      (n, o) => {
        this.mesh.position.set(box.position.x, box.position.y, box.position.z)
        this.rotate(box.rotate)
        this.boxHelper.update()
      }
    )

    watch(
      () => ({
        hovered: this.store.hovered.box,
        selected: this.store.selected.box
      }),
      (n, o) => {
        if (!n.hovered) {
          this.unhover()
        }
        if (!n.selected) {
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

  rotate(rotate: Types.BoxRotate) {
    const geometry = {...this.box.geometry}
    if(rotate.x_rotate) {
      geometry.depth = this.box.geometry.height
      geometry.height = this.box.geometry.depth
    }
    if(rotate.y_rotate) {
      geometry.width = this.box.geometry.depth
      geometry.depth = this.box.geometry.width
    }
    if(rotate.z_rotate) {
      geometry.height = this.box.geometry.width
      geometry.width = this.box.geometry.height
    }
    this.group.remove(this.mesh, this.boxHelper)
  
    this.geometry = new THREE.BoxGeometry(
      geometry.width,
      geometry.height,
      geometry.depth
    )
    this.mesh = new THREE.Mesh(this.geometry, this.materials.base)
    this.mesh.position.x = this.box.position.x
    this.mesh.position.y = this.box.position.y
    this.mesh.position.z = this.box.position.z
    this.boxHelper = new THREE.BoxHelper(this.mesh, 0x181c22)
    this.group.add(this.mesh, this.boxHelper)

  }

  select() {
    this.boxHelper.material.color = new THREE.Color(0x1f6feb)
    this.mesh.material = this.materials.select
  }
  unselect() {
    this.mesh.material = this.materials.base
    this.boxHelper.material.color = new THREE.Color(0x181c22)
  }
  hover() {
    this.boxHelper.material.color = new THREE.Color(0x1f6feb)
  }
  unhover() {
    if (!this.store.selected.box || this.store.selected.box.id != this.box.id) {
      this.boxHelper.material.color = new THREE.Color(0x181c22)
    }
  }
  tick() {
    this.materials.select.uniforms.time.value += 0.01
  }
}
