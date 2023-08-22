import type { Types } from '@box/adapter'
import * as THREE from 'three'
import { shaders } from '../shaders'

export class ContainerSpaceEntity {
  group = new THREE.Group()
  hatchingMaterial = new THREE.ShaderMaterial({
    vertexShader: shaders.hatching.v,
    fragmentShader: shaders.hatching.f,
    transparent: true,
    uniforms: {
      time: { value: 0.0 },
      density: { value: 10 },
      r: { value: 1 },
      g: { value: 0 },
      b: { value: 0 }
    }
  })
  basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  constructor(public container: Types.Container) {
    const outGeometry = new THREE.PlaneGeometry(
      container.geometry.width + 400,
      container.geometry.depth + 400
    )
    const innerGeometry = new THREE.BoxGeometry(
      container.geometry.width,
      2,
      container.geometry.depth
    )
    const heightGeometry = new THREE.CylinderGeometry(4, 4, container.geometry.height)
    const outMesh = new THREE.Mesh(outGeometry, this.hatchingMaterial)
    outMesh.rotateX(-Math.PI / 2)
    const innerMesh = new THREE.Mesh(
      innerGeometry,
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
    const heightMesh = new THREE.Mesh(heightGeometry, this.basicMaterial)
    outMesh.position.y = -3
    innerMesh.position.y = -2
    heightMesh.position.y = container.geometry.height / 2
    // heightMesh.position.x = container.geometry.width / -2
    // heightMesh.position.z = container.geometry.depth / -2
    this.group = new THREE.Group()
    this.group.add(outMesh, innerMesh, heightMesh)

    return this
  }

  tick() {
    this.hatchingMaterial.uniforms.time.value += 0.01
  }
}
