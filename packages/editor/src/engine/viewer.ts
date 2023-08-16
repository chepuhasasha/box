import { Types } from '@box/adapter'
import * as THREE from 'three'
import { BoxEntity } from '.'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { watch } from 'vue'

export interface ViewerTool {
  enable: boolean
  install: (viewer: Viewer) => void
}

export class Viewer {
  scene: THREE.Scene = new THREE.Scene()
  camera: THREE.OrthographicCamera | null = null
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true})
  DOMElement: HTMLDivElement | null = null
  controls: OrbitControls | null = null
  boxes: BoxEntity[] = []

  watch(props: { boxes: Types.Box[] }) {
    watch(
      () => props.boxes,
      (n) => {
        this.boxes = []
        n.forEach((doc) => this.addBox(doc))
      }
    )
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    if (this.camera) this.renderer.render(this.scene, this.camera)
    if (this.controls) this.controls.update()
  }

  mount(div: HTMLDivElement) {
    this.DOMElement = div
    this.DOMRect = this.DOMElement.getBoundingClientRect()
    this.DOMElement.appendChild(this.renderer.domElement)
    this.scene.background = new THREE.Color(0x010409)
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

  resizeView(rect: DOMRect) {
    this.renderer.setSize(rect.width, rect.height)
    // this.renderer.setViewport( 200, 200, 200, 200 );
    this.camera = new THREE.OrthographicCamera(
      rect.width / -2,
      rect.width / 2,
      rect.height / 2,
      rect.height / -2,
      -1000,
      1000
    )
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1
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
