import type { Types } from '@box/adapter'
import * as THREE from 'three'
import { shaders } from '../shaders'

export class ContainerSpaceEntity {
  group = new THREE.Group()
  hatchingMaterial = new THREE.ShaderMaterial({
    vertexShader: shaders.hatching.v,
    fragmentShader: shaders.hatching.f,
    transparent: true,
    uniforms: { time: { value: 0.0 }, lineWidth: { value: 1 } }
  })
  basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  constructor(container: Types.Container) {
    // setInterval(() => {
    //   this.hatchingMaterial.uniforms.time.value += 0.001
    // }, 10)
    const outGeometry = new THREE.BoxGeometry(
      container.geometry.width + 400,
      1,
      container.geometry.depth + 400
    )
    const innerGeometry = new THREE.BoxGeometry(
      container.geometry.width,
      2,
      container.geometry.depth
    )
    const heightGeometry = new THREE.CylinderGeometry(4, 4, container.geometry.height)
    const outMesh = new THREE.Mesh(outGeometry, this.hatchingMaterial)
    const innerMesh = new THREE.Mesh(
      innerGeometry,
      new THREE.MeshBasicMaterial({ color: 0x010409 })
    )
    const heightMesh = new THREE.Mesh(heightGeometry, this.basicMaterial)
    outMesh.position.y = -2
    innerMesh.position.y = -2
    heightMesh.position.y = container.geometry.height / 2
    heightMesh.position.x = container.geometry.width / -2
    heightMesh.position.z = container.geometry.depth / -2
    this.group = new THREE.Group()
    this.group.add(outMesh, innerMesh, heightMesh)
  }
}
