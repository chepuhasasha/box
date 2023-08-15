import { Types } from '@box/adapter'
import * as THREE from 'three'
import { BoxEntity, type ContainerEntity } from '.'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface ViewerTool {
  enable: boolean
  install: (viewer: Viewer) => void
}

export class Viewer {
  scene: THREE.Scene = new THREE.Scene()
  camera: THREE.OrthographicCamera | null = null
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
  DOMElement: HTMLDivElement | null = null
  controls: OrbitControls | null = null
  boxes: BoxEntity[] = []

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    if (this.camera) this.renderer.render(this.scene, this.camera)
    if (this.controls) this.controls.update()
  }

  mount(div: HTMLDivElement) {
    this.DOMElement = div
    this.DOMRect = this.DOMElement.getBoundingClientRect()
    this.DOMElement.appendChild(this.renderer.domElement)
    this.animate()
    window.addEventListener('resize', () => {
      if (this.DOMElement) this.DOMRect = this.DOMElement.getBoundingClientRect()
    })
  }

  addBox(doc: Types.Box) {
    const box = new BoxEntity(doc)
    this.boxes.push(box)
    this.scene.add(box.mesh)
  }

  removeBox(id: string) {
    const box = this.boxes.find((box) => box.doc.id === id)
    if (box) {
      this.scene.remove(box.mesh)
    }
  }

  updateBox(doc: Types.Box) {
    const box = this.boxes.find((box) => {
      return box.id === doc.id
    })
    if (box) {
      box.position = doc.position
      box.rotate = doc.rotate
    }
  }

  resizeView(rect: DOMRect) {
    this.renderer.setSize(rect.width, rect.height)
    this.camera = new THREE.OrthographicCamera(
      rect.width / -2,
      rect.width / 2,
      rect.height / 2,
      rect.height / -2,
      1,
      1000
    )
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  setCameraPosition(x: number, y: number, z: number) {
    if (this.camera) {
      this.camera.position.set(x, y, z)
    }
  }

  set DOMRect(rect: DOMRect | null) {
    if (rect) {
      this.resizeView(rect)
    }
  }
  get DOMRect() {
    if (this.DOMElement) {
      return this.DOMElement.getBoundingClientRect()
    }
    return null
  }

  use(tool: ViewerTool) {
    tool.install(this)
  }
}
