import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface ViewerTool {
  install: (viewer: Viewer) => void
  enable: boolean
}

export class Viewer {
  scene: THREE.Scene = new THREE.Scene()
  camera: THREE.OrthographicCamera = new THREE.OrthographicCamera()
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
  DOMElement: HTMLDivElement | null = null
  controls: OrbitControls
  grid: THREE.GridHelper

  constructor(
    options: {
      background: number,
      grid: [number, number, number, number]
    } = {
      background: 0x010409,
      grid: [10000, 100, 0x21262d, 0x1a1d22]
    }
  ) {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.grid = new THREE.GridHelper(...options.grid)
    this.scene.add(this.grid)
    this.scene.background = new THREE.Color(options.background)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
    // this.controls.enablePan = false
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  mount(div: HTMLDivElement) {
    this.DOMElement = div
    this.DOMElement.appendChild(this.renderer.domElement)
    this.resize()
    this.animate()
    window.addEventListener('resize', () => {
      this.resize()
    })
  }

  resize() {
    const rect = this.view
    if (!rect) {
      return
    }
    this.camera.left = rect.width / -2
    this.camera.right = rect.width / 2
    this.camera.top = rect.height / 2
    this.camera.bottom = rect.height / -2
    this.camera.near = -10000
    this.camera.far = 10000
    this.renderer.setSize(rect.width, rect.height)
    this.camera.position.set(10, 10, 10)
    this.camera.updateProjectionMatrix()
  }

  get view() {
    if (this.DOMElement) {
      return this.DOMElement.getBoundingClientRect()
    }
    return null
  }

  use(tool: ViewerTool) {
    tool.install(this)
  }
}
