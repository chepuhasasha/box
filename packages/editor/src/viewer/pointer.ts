import type { Types } from '@box/adapter'
import type { Viewer, ViewerTool } from '.'
import * as THREE from 'three'

export class PointerTool implements ViewerTool {
  mode: 'move' | 'rotate' | 'select' = 'select'
  materials = {
    axis: new THREE.MeshBasicMaterial({ color: 0x000000, visible: false, side: THREE.DoubleSide }),
    axisActive: new THREE.MeshBasicMaterial({
      color: 0x1f6feb,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    }),
    shadow: new THREE.MeshBasicMaterial({
      color: 0x1f6feb,
      transparent: true,
      opacity: 0.5
    })
  }
  shadow: THREE.Mesh | null = null
  axes: THREE.Group = new THREE.Group()
  enable: boolean = true
  raycaster: THREE.Raycaster = new THREE.Raycaster()
  viewer: Viewer | null = null
  pointOffset: THREE.Vector3 = new THREE.Vector3()

  install(viewer: Viewer) {
    this.viewer = viewer
    this.viewer.scene.add(this.axes)
    this.viewer.renderer.domElement.addEventListener('pointerdown', (e) => {
      if (this.enable) {
        switch (this.mode) {
          case 'select':
            this.select(e)
            break
          case 'move':
            this.select(e)
            this.startMove(e)
            break
          case 'rotate':
            this.select(e)
            this.startRotate(e)
            break
          default:
            break
        }
      }
    })
    this.viewer.renderer.domElement.addEventListener('pointerup', (e) => {
      if (this.enable) {
        if (this.mode === 'move') this.stopMove(e)
      }
    })
    this.viewer.renderer.domElement.addEventListener('pointermove', (e) => {
      if (this.enable) {
        this.hover(e)
        if (this.mode === 'move') this.move(e)
        if (this.mode === 'rotate') this.rotateMove(e)
      }
    })
  }

  findBox(uuid: string | undefined) {
    if (!this.viewer) return null
    const box = this.viewer.boxes.find((box) => box.mesh.uuid === uuid)
    return box?.box ? box.box : null
  }

  hover(e: PointerEvent) {
    if (!this.viewer) return
    const boxes = this.viewer.boxes.map((box) => box.mesh)
    const event = this.setRay(e, boxes)
    const box = this.findBox(event?.object.uuid)
    this.viewer.store.hovered.box = box
  }
  select(e: PointerEvent) {
    if (!this.viewer) return
    const boxes = this.viewer.boxes.map((box) => box.mesh)
    const event = this.setRay(e, boxes)
    const box = this.findBox(event?.object.uuid)
    this.viewer.store.selected.box = box
    if (box && event && this.axes.children.length === 0) {
      this.addAxes(box, event.object.position)
    } else if (!box || !event) {
      this.axes.remove(...this.axes.children)
    }
  }

  addShadow({ geometry }: Types.Box, point: THREE.Vector3) {
    if (!this.viewer) return null
    this.shadow = new THREE.Mesh(
      new THREE.BoxGeometry(geometry.width, geometry.height, geometry.depth),
      this.materials.shadow
    )
    this.shadow.name = 'SHADOW'
    this.shadow.position.copy(point)
    this.viewer.scene.add(this.shadow)
  }

  removeShadow() {
    if (this.viewer && this.shadow) {
      this.viewer.scene.remove(this.shadow)
      this.shadow = null
    }
  }

  addAxes(box: Types.Box, point: THREE.Vector3, width: number = 10) {
    const geometry = new THREE.BoxGeometry(4, 4, 300)
    const xyGeometry = new THREE.PlaneGeometry(box.geometry.width, box.geometry.height)
    const xy = new THREE.Mesh(xyGeometry, this.materials.axis)
    const _xy = new THREE.Mesh(xyGeometry, this.materials.axis)
    xy.position.z = box.geometry.depth / 2
    _xy.position.z = -box.geometry.depth / 2
    xy.name = 'XY'
    _xy.name = '_XY'

    const xzGeometry = new THREE.PlaneGeometry(box.geometry.width, box.geometry.depth)
    const xz = new THREE.Mesh(xzGeometry, this.materials.axis)
    const _xz = new THREE.Mesh(xzGeometry, this.materials.axis)
    xz.rotateX(Math.PI / 2)
    _xz.rotateX(Math.PI / 2)
    xz.position.y = box.geometry.height / 2
    _xz.position.y = -box.geometry.height / 2
    xz.name = 'XZ'
    _xz.name = '_XZ'

    const yzGeometry = new THREE.PlaneGeometry(box.geometry.depth, box.geometry.height)
    const yz = new THREE.Mesh(yzGeometry, this.materials.axis)
    const _yz = new THREE.Mesh(yzGeometry, this.materials.axis)
    yz.rotateY(Math.PI / 2)
    _yz.rotateY(Math.PI / 2)
    yz.position.x = box.geometry.width / 2
    _yz.position.x = -box.geometry.width / 2
    yz.name = 'YZ'
    _yz.name = '_YZ'

    this.axes.add(xy, _xy, xz, _xz, yz, _yz)
    this.axes.position.copy(point)
  }

  setRay(event: PointerEvent, objects: THREE.Object3D[]) {
    if (!this.viewer || !this.viewer.view) return null
    const rect = this.viewer.view
    const vector = new THREE.Vector3()
    const dir = new THREE.Vector3()
    vector.set(
      ((event.clientX - this.viewer.view.x) / rect.width) * 2 - 1,
      -((event.clientY - this.viewer.view.y) / rect.height) * 2 + 1,
      -1
    )
    vector.unproject(this.viewer.camera)
    dir.set(0, 0, -1).transformDirection(this.viewer.camera.matrixWorld)
    this.raycaster.set(vector, dir)
    const intersects = this.raycaster.intersectObjects(objects, true)
    return intersects[0] ? intersects[0] : null
  }

  startMove(e: PointerEvent) {
    if (!this.viewer) return
    const boxes = this.viewer.boxes.map((box) => box.mesh)
    const event = this.setRay(e, boxes)
    if (event && event.object && event.point) {
      const box = this.findBox(event.object.uuid)
      this.pointOffset.set(
        event.object.position.x - event.point.x,
        event.object.position.y - event.point.y,
        event.object.position.z - event.point.z
      )
      if (box) {
        this.addShadow(box, event.object.position)
        this.viewer.controls.enableRotate = false
        this.viewer.controls.enableZoom = false
      }
    }
  }

  stopMove(e: PointerEvent) {
    if (!this.viewer) return

    if (this.shadow && this.viewer.store.selected.box) {
      this.viewer.store.selected.box.position.x = this.shadow.position.x
      this.viewer.store.selected.box.position.y = this.shadow.position.y
      this.viewer.store.selected.box.position.z = this.shadow.position.z
    }

    this.removeShadow()
    this.viewer.controls.enableRotate = true
    this.viewer.controls.enableZoom = true
  }

  move(e: PointerEvent) {
    if (!this.viewer || !this.viewer.container) return
    const event = this.setRay(e, this.axes.children)
    const axisName: string | null = event ? event.object.name : null
    if (event && this.shadow && axisName) {
      if (['XY', '_XY'].includes(axisName)) {
        const x = event.point.x - this.axes.position.x + this.pointOffset.x
        const y = event.point.y - this.axes.position.y + this.pointOffset.y
        this.axes.position.x += x
        this.axes.position.y += y
        // console.log(Math.abs(x), Math.abs(y))
        // if (Math.abs(x) > Math.abs(y)) {
        // } else {
        // }
      }
      if (['XZ', '_XZ'].includes(axisName)) {
        this.axes.position.x += event.point.x - this.axes.position.x + this.pointOffset.x
        this.axes.position.z += event.point.z - this.axes.position.z + this.pointOffset.z
      }
      if (['YZ', '_YZ'].includes(axisName)) {
        this.axes.position.y += event.point.y - this.axes.position.y + this.pointOffset.y
        this.axes.position.z += event.point.z - this.axes.position.z + this.pointOffset.z
      }
      this.shadow.position.copy(this.axes.position)
    }
    this.axes.children.forEach((axis) => {
      if (axis.name === axisName) {
        // @ts-ignore
        axis.material = this.materials.axisActive
      } else {
        // @ts-ignore
        axis.material = this.materials.axis
      }
    })
  }

  startRotate(e: PointerEvent) {}
  stopRotate(e: PointerEvent) {}
  rotateMove(e: PointerEvent) {
    if (!this.viewer || !this.viewer.container) return
    const event = this.setRay(e, this.axes.children)
    const axisName: string | null = event ? event.object.name : null
    this.axes.children.forEach((axis) => {
      if (axis.name === axisName) {
        // @ts-ignore
        axis.material = this.materials.axisActive
      } else {
        // @ts-ignore
        axis.material = this.materials.axis
      }
    })
  }
}
