import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useViewerStore } from '.'
import { watch } from 'vue'
import { Types } from '@box/adapter'

export interface ViewerTool {
  install: (viewer: Viewer) => void
  enable: boolean
}

export class Viewer {
  scene: THREE.Scene = new THREE.Scene()
  camera: THREE.OrthographicCamera = new THREE.OrthographicCamera()
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true})
  DOMElement: HTMLDivElement | null = null
  controls: OrbitControls
  grid: THREE.GridHelper
  store = useViewerStore()

  constructor(
    options: {
      background: number
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

    this.initWatchers()
  }

  initWatchers() {
    watch(
      () => this.store.selected.container,
      (n, o) => {
        if (o) {
          this.removeContainer(o)
        }
        if (n) {
          this.addContainer(n)
        }
      }
    )
    watch(
      () => this.store.selected.box,
      (n, o) => {
        // console.log(n)
      }
    )
    watch(
      () => this.store.hovered.box,
      (n, o) => {
        // console.log(n)
      }
    )
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  addContainer(container: Types.Container) {
    const geometry = new THREE.BoxGeometry(1000, 10, 1000)
    const material = new THREE.MeshMatcapMaterial({ color: 0xff0000 })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.y = -10
    this.scene.add(plane)
    console.log(container)
  }
  removeContainer(container: Types.Container) {}

  mount(div: HTMLDivElement) {
    this.DOMElement = div
    this.DOMElement.appendChild(this.renderer.domElement)
    this.resize()
    this.animate()
    window.addEventListener('resize', this.resize.bind(this))
  }

  destroy() {
    window.removeEventListener('resize', this.resize.bind(this))
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
