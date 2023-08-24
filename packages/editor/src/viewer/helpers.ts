import { BoxSpaceEntity } from './entities/box';
import * as THREE from 'three'
import type { Viewer } from '.'

export const setRay = (viewer: Viewer, event: PointerEvent, objects: THREE.Object3D[]) => {
  if (!viewer || !viewer.view) return null
  const rect = viewer.view
  const vector = new THREE.Vector3()
  const dir = new THREE.Vector3()
  vector.set(
    ((event.clientX - viewer.view.x) / rect.width) * 2 - 1,
    -((event.clientY - viewer.view.y) / rect.height) * 2 + 1,
    -1
  )
  vector.unproject(viewer.camera)
  dir.set(0, 0, -1).transformDirection(viewer.camera.matrixWorld)
  const raycaster = new THREE.Raycaster()
  raycaster.set(vector, dir)
  const intersects = raycaster.intersectObjects(objects, true)
  return intersects[0] ? intersects[0] : null
}

export const findBoxByUUID = (boxes: BoxSpaceEntity[], uuid: string | undefined) => {
  const box = boxes.find((box) => box.mesh.uuid === uuid)
  return box?.box ? box.box : null
}