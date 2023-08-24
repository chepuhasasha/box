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
      density: { value: 4 },
      angle: { value: 45 },
      opacity: { value: 0.1 },
      threshold: { value: 0.5 },
      r: { value: 0 },
      g: { value: 0 },
      b: { value: 0 }
    }
  })
  basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })

  constructor(public container: Types.Container) {
    const rect = new THREE.Mesh(new THREE.BoxGeometry(100, 20, 100), this.hatchingMaterial)
    rect.position.y = 10
    const lt = rect.clone()
    const rt = rect.clone()
    const lb = rect.clone()
    const rb = rect.clone()

    lt.position.x = container.geometry.width / 2 + 50
    lt.position.z = container.geometry.depth / 2 + 50
    rt.position.x = -(container.geometry.width / 2) - 50
    rt.position.z = container.geometry.depth / 2 + 50
    lb.position.x = container.geometry.width / 2 + 50
    lb.position.z = -(container.geometry.depth / 2) - 50
    rb.position.x = -(container.geometry.width / 2) - 50
    rb.position.z = -(container.geometry.depth / 2) - 50

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(
        container.geometry.width,
        container.geometry.height,
        container.geometry.depth
      )
    )
    box.position.y = (container.geometry.height / 2) + 1
    const helper = new THREE.BoxHelper(box, 0x000000)
    // const heightGeometry = new THREE.CylinderGeometry(4, 4, container.geometry.height)
    // const heightMesh = new THREE.Mesh(heightGeometry, this.basicMaterial)
    // heightMesh.position.y = container.geometry.height / 2

    this.group = new THREE.Group()
    this.group.add(lt, rt, lb, rb, helper)

    return this
  }

  tick() {
    this.hatchingMaterial.uniforms.time.value += 0.01
  }
}
