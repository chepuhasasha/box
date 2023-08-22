import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useViewerStore } from '.'
import { watch } from 'vue'
import { Types } from '@box/adapter'
import { BoxSpaceEntity, ContainerSpaceEntity } from './entities'

export interface ViewerTool {
  install: (viewer: Viewer) => void
  enable: boolean
}

export class Viewer {
  scene: THREE.Scene = new THREE.Scene()
  camera: THREE.OrthographicCamera = new THREE.OrthographicCamera()
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true })
  DOMElement: HTMLDivElement | null = null
  controls: OrbitControls
  grid: THREE.GridHelper
  store = useViewerStore()
  container: ContainerSpaceEntity | null = null
  boxes: BoxSpaceEntity[] = []

  constructor(
    options: {
      background: number
      grid: [number, number, number, number]
    } = {
      background: 0xFFFFFF,
      grid: [10000, 100, 0xc9d1d9, 0xF0F6FC]
    }
  ) {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.grid = new THREE.GridHelper(...options.grid)
    this.scene.add(this.grid)

    this.scene.background = new THREE.Color(options.background)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.maxZoom = 2
    this.controls.minZoom = 0.5
    // this.controls.minAzimuthAngle = 0
    // this.controls.maxAzimuthAngle = Math.PI / 2
    watch(
      () => this.store.selected.container,
      (n, o) => {
        if (o) {
          this.removeContainer()
        }
        if (n) {
          this.addContainer(n)
        } else {
          this.removeContainer()
        }
      }
    )
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    if (this.container) {
      this.container.tick()
    }
  }

  addContainer(container: Types.Container) {
    this.container = new ContainerSpaceEntity(container)
    this.store
      .boxesByContainerId(container.id)
      .forEach((box) => this.boxes.push(new BoxSpaceEntity(box)))
    this.scene.add(this.container.group, ...this.boxes.map((box) => box.group))
  }

  removeContainer() {
    if (this.container) {
      this.scene.remove(this.container.group)
    }
  }

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
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(rect.width, rect.height)
    this.camera.position.set(1000, 1000, 1000)
    this.camera.updateProjectionMatrix()
  }

  setCameraPosition(x: number, y: number, z: number) {
    this.camera.position.set(x, y, z)
    this.camera.updateProjectionMatrix()
    this.controls.update()
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
