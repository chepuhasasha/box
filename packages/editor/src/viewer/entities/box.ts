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
      },
    }),
    base: new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3
    })
  }
  store = useViewerStore()
  mesh: THREE.Mesh
  group: THREE.Group = new THREE.Group()
  boxHelper: THREE.BoxHelper

  constructor(public box: Types.Box) {
    setInterval(() => {
      this.materials.select.uniforms.time.value += 0.01
    }, 10)
    this.geometry = new THREE.BoxGeometry(
      box.geometry.width,
      box.geometry.height,
      box.geometry.depth
    )
    this.mesh = new THREE.Mesh(this.geometry, this.materials.base)
    this.mesh.position.x = box.position.x
    this.mesh.position.y = box.position.y
    this.mesh.position.z = box.position.z
    this.boxHelper = new THREE.BoxHelper(this.mesh, 0x181C22)
    this.group.add(this.mesh, this.boxHelper)

    watch(() => ({
      x: box.position.x,
      y: box.position.y,
      z: box.position.z,
    }), (n, o) => {
      this.mesh.position.x = box.position.x
      this.mesh.position.y = box.position.y
      this.mesh.position.z = box.position.z
      this.boxHelper.update()
    })

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
    this.mesh.material = this.materials.select
  }
  unselect() {
    this.mesh.material = this.materials.base
  }
  hover() {
    this.boxHelper.material.color = new THREE.Color(0x1f6feb)
  }
  unhover() {
    this.boxHelper.material.color = new THREE.Color(0x181C22)
  }
}
