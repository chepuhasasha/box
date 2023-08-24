import { useViewerStore } from './store'
import type { Viewer } from '.'
import type { Types } from '@box/adapter'
import * as THREE from 'three'
import { setRay, findBoxByUUID } from './helpers'

export class MoverTool {
  enable: boolean = true
  store = useViewerStore()
  colors = {
    accent: 0x1f6feb,
    visible: 0x000000
  }
  materials = {
    invisible: new THREE.MeshBasicMaterial({ visible: false }),
    visible: new THREE.MeshBasicMaterial({
      color: this.colors.visible,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    }),
    accent: new THREE.MeshBasicMaterial({
      color: this.colors.accent,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    }),
    trans: new THREE.MeshBasicMaterial({
      color: this.colors.accent,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    }),
    dashed: new THREE.LineDashedMaterial({
      color: this.colors.accent,
      linewidth: 2,
      dashSize: 20,
      gapSize: 10,
    })
  }
  helpers: {
    shadow: THREE.BoxHelper | null
    moveLine: THREE.Line | null
    pointerPlanes: THREE.Mesh[]
    axialArrows: THREE.Mesh[]
    rotationRings: THREE.Mesh[]
  } = {
    shadow: null,
    moveLine: null,
    pointerPlanes: [],
    axialArrows: [],
    rotationRings: []
  }
  group = new THREE.Group()
  pointOffset: THREE.Vector3 = new THREE.Vector3()

  constructor(private viewer: Viewer) {
    this.viewer = viewer
    this.viewer.scene.add(this.group)
    this.viewer.renderer.domElement.addEventListener('pointerdown', (e) => {
      if (this.enable) {
        this.select(e)
        this.pointerDown(e)
      }
    })
    this.viewer.renderer.domElement.addEventListener('pointermove', (e) => {
      if (this.enable) {
        this.pointerMove(e)
        this.hoverTool(e)
      }
    })
    this.viewer.renderer.domElement.addEventListener('pointerup', (e) => {
      if (this.enable) this.pointerUp(e)
    })
  }

  select(e: PointerEvent) {
    const boxes = this.viewer.boxes.map((box) => box.mesh)
    const boxRay = setRay(this.viewer, e, boxes)
    const box = findBoxByUUID(this.viewer.boxes, boxRay?.object.uuid)
    const groupRay = setRay(this.viewer, e, this.group.children)

    if (groupRay) return

    if (!box) {
      this.store.selected.box = null
      this.removeAxialArrows()
      this.removeRotationRings()
      this.removePointerPlanes()
      this.removeShadow()
    } else if (
      (this.store.selected.box && this.store.selected.box.id != box.id) ||
      !this.store.selected.box
    ) {
      this.store.selected.box = box
      this.group.position.x = box.position.x
      this.group.position.y = box.position.y
      this.group.position.z = box.position.z
      this.addAxialArrows(box)
      this.addRotationRings(box)
      this.addShadow(box)
    }
  }

  pointerDown(e: PointerEvent) {
    const axis = setRay(this.viewer, e, this.helpers.axialArrows)
    const ring = setRay(this.viewer, e, this.helpers.rotationRings)
    const box = this.viewer.store.selected.box
    if (axis && box) {
      this.addShadow(box)
      this.pointOffset.set(
        box.position.x - axis.point.x,
        box.position.y - axis.point.y,
        box.position.z - axis.point.z
      )
      this.addMoveLine()
      if (axis.object.name === 'A_X') {
        this.addPointerPlanes('X')
      } else if (axis.object.name === 'A_Y') {
        this.addPointerPlanes('Y')
      } else if (axis.object.name === 'A_Z') {
        this.addPointerPlanes('Z')
      }
    } else {
      this.removePointerPlanes()
    }
    if (ring) {
      if (ring.object.name === 'R_X') {
        this.group.rotateX(Math.PI / 2)
      } else if (ring.object.name === 'R_Y') {
        this.group.rotateY(Math.PI / 2)
      } else if (ring.object.name === 'R_Z') {
        this.group.rotateZ(Math.PI / 2)
      }
    }
  }
  pointerMove(e: PointerEvent) {
    if (this.helpers.pointerPlanes) {
      const plane = setRay(this.viewer, e, this.helpers.pointerPlanes)
      if (plane) {
        this.viewer.controls.enableRotate = false
        this.viewer.controls.enablePan = false
        this.viewer.controls.enableZoom = false
        this.updateMoveLine()
        switch (plane.object.name) {
          case 'X':
            this.group.position.x = plane.point.x + this.pointOffset.x
            break
          case 'Y':
            this.group.position.y = plane.point.y + this.pointOffset.y
            break
          case 'Z':
            this.group.position.z = plane.point.z + this.pointOffset.z
            break

          default:
            break
        }
      }
    }
  }
  pointerUp(e: PointerEvent) {
    this.removePointerPlanes()
    this.removeShadow()
    this.removeMoveLine()
    if (!this.viewer) return
    this.viewer.controls.enableRotate = true
    this.viewer.controls.enablePan = true
    this.viewer.controls.enableZoom = true
    if (this.viewer.store.selected.box) {
      this.viewer.store.selected.box.position.x = this.group.position.x
      this.viewer.store.selected.box.position.y = this.group.position.y
      this.viewer.store.selected.box.position.z = this.group.position.z
      this.viewer.store.selected.box.rotate.x_rotate = this.group.rotation.x
      this.viewer.store.selected.box.rotate.y_rotate = this.group.rotation.y
      this.viewer.store.selected.box.rotate.z_rotate = this.group.rotation.z
    }
  }

  hoverTool(e: PointerEvent) {
    const objects = [...this.helpers.rotationRings, ...this.helpers.axialArrows]
    const ray = setRay(this.viewer, e, objects)
    if (ray) {
      objects.forEach((mesh) => {
        if (mesh.uuid === ray.object.uuid) {
          mesh.material = this.materials.accent
        } else {
          mesh.material = this.materials.invisible
        }
      })
    } else {
      objects.forEach((mesh) => {
        mesh.material = this.materials.visible
      })
    }
  }
  addMoveLine() {
    const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)]
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, this.materials.dashed)
    line.computeLineDistances()
    this.helpers.moveLine = line
    this.viewer.scene.add(this.helpers.moveLine)
  }
  addPointerPlanes(axis: 'X' | 'Y' | 'Z') {
    const plane_v = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), this.materials.invisible)
    const plane_h = plane_v.clone()
    if (axis === 'X') {
      plane_h.rotateX(Math.PI / 2)
    } else if (axis === 'Y') {
      plane_h.rotateY(Math.PI / 2)
    } else if (axis === 'Z') {
      plane_v.rotateY(Math.PI / 2)
      plane_h.rotateX(Math.PI / 2)
    }
    plane_h.name = axis
    plane_v.name = axis
    this.helpers.pointerPlanes = [plane_v, plane_h]
    this.group.add(...this.helpers.pointerPlanes)
  }
  addRotationRings(box: Types.Box) {
    const max = Math.max(box.geometry.width, box.geometry.height, box.geometry.depth)
    const geometry = new THREE.RingGeometry(max - 20, max, 50, 1, -Math.PI, -Math.PI / 2)
    // const _geometry = new THREE.RingGeometry(max / 4, max, 50, 1, -Math.PI, -Math.PI / 2)
    const circle = new THREE.Mesh(geometry, this.materials.visible)
    const x = circle.clone()
    const y = circle.clone()
    const z = circle.clone()
    x.name = 'R_X'
    y.name = 'R_Y'
    z.name = 'R_Z'
    x.rotateY(Math.PI / 2)
    y.rotateX(Math.PI / 2)
    this.helpers.rotationRings = [x, y, z]
    this.group.add(...this.helpers.rotationRings)
  }
  addAxialArrows(box: Types.Box, size: number = 20) {
    const arrow = new THREE.Mesh(
      new THREE.CylinderGeometry(0, size / 2, size, 50),
      this.materials.visible
    )
    const x = arrow.clone()
    const y = arrow.clone()
    const z = arrow.clone()
    const _x = arrow.clone()
    const _y = arrow.clone()
    const _z = arrow.clone()
    x.name = 'A_X'
    y.name = 'A_Y'
    z.name = 'A_Z'
    _x.name = 'A_X'
    _y.name = 'A_Y'
    _z.name = 'A_Z'

    x.position.x = box.geometry.width / 2 + size
    _x.position.x = -(box.geometry.width / 2) - size
    x.rotateZ(-Math.PI / 2)
    _x.rotateZ(Math.PI / 2)

    y.position.y = box.geometry.height / 2 + size
    _y.position.y = -(box.geometry.height / 2) - size
    _y.rotateZ(Math.PI)

    z.position.z = box.geometry.depth / 2 + size
    _z.position.z = -(box.geometry.depth / 2) - size
    z.rotateX(Math.PI / 2)
    _z.rotateX(-Math.PI / 2)

    this.helpers.axialArrows = [x, _x, y, _y, z, _z]
    this.group.add(...this.helpers.axialArrows)
  }
  addShadow({ geometry }: Types.Box) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(geometry.width, geometry.height, geometry.depth),
      this.materials.invisible
    )
    this.helpers.shadow = new THREE.BoxHelper(mesh, this.colors.accent)
    this.helpers.shadow.name = 'SHADOW'
    this.group.add(this.helpers.shadow)
  }
  removeRotationRings() {
    this.group.remove(...this.helpers.rotationRings)
  }
  removeAxialArrows() {
    this.group.remove(...this.helpers.axialArrows)
  }
  removePointerPlanes() {
    this.group.remove(...this.helpers.pointerPlanes)
    this.helpers.pointerPlanes = []
  }
  removeShadow() {
    if (this.helpers.shadow) {
      this.group.remove(this.helpers.shadow)
      this.helpers.shadow = null
    }
  }
  removeMoveLine() {
    if (this.helpers.moveLine) {
      this.viewer.scene.remove(this.helpers.moveLine)
      this.helpers.moveLine = null
    }
  }
  updateMoveLine() {
    if(!this.helpers.moveLine || !this.viewer.store.selected.box) return
    const boxPosition = this.viewer.store.selected.box.position
    const vertices = this.helpers.moveLine.geometry.attributes.position;
    vertices.setXYZ(0, boxPosition.x, boxPosition.y, boxPosition.z);
    vertices.setXYZ(1, this.group.position.x , this.group.position.y, this.group.position.z); 
    this.helpers.moveLine.computeLineDistances()
    vertices.needsUpdate = true;
  }
}
