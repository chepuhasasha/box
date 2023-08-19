import { defineStore } from 'pinia'
import { Types } from '@box/adapter'
import { v4 } from 'uuid'

export const useViewerStore = defineStore('viewer', {
  state: () => ({
    selected: {
      container: null as Types.Container | null,
      box: null as Types.Box | null
    },
    hovered: {
      container: null as Types.Container | null,
      box: null as Types.Box | null
    },
    file: null as Types.File | null
  }),

  actions: {
    openFile(id: string) {
      this.file = {
        id: 'test_id',
        name: 'Test cargo loading #1',
        owner_id: '1',
        boxes: [
          {
            id: '123',
            object_type: 'BOX',
            geometry: {
              width: 100,
              height: 200,
              depth: 150
            },
            name: 'Test box',
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            rotate: {
              x_rotate: 0,
              y_rotate: 0,
              z_rotate: 0
            },
            container_id: '1',
            props: {
              rotate_limits: {
                x_rotate: 0,
                y_rotate: 0,
                z_rotate: 0
              },
              weight: 10
            }
          },
          {
            id: '234',
            object_type: 'BOX',
            geometry: {
              width: 200,
              height: 100,
              depth: 50
            },
            name: 'Test box',
            position: {
              x: 200,
              y: 0,
              z: 0
            },
            rotate: {
              x_rotate: 0,
              y_rotate: 0,
              z_rotate: 0
            },
            container_id: null,
            props: {
              rotate_limits: {
                x_rotate: 0,
                y_rotate: 0,
                z_rotate: 0
              },
              weight: 10
            }
          }
        ],
        containers: [
          {
            id: '1',
            object_type: 'CONTAINER',
            name: 'Test container',
            boxes: ['123', '234'],
            geometry: {
              width: 1000,
              height: 1000,
              depth: 1000
            }
          }
        ],
        last_update: 129430909
      }
    },

    addEmptyContainer(
      container: Omit<Types.Container, 'id' | 'object_type'>
    ): Types.Container | null {
      if (this.file) {
        const count = this.file.containers.push({
          id: v4(),
          object_type: 'CONTAINER',
          ...container
        })
        return this.file.containers[count - 1]
      }
      return null
    },

    addLooseBox(box: Omit<Types.Box, 'id' | 'container_id' | 'object_type' | 'position' | 'rotate'>): Types.Box | null {
      if (this.file) {
        const count = this.file.boxes.push({
          id: v4(),
          object_type: 'BOX',
          container_id: null,
          ...box,
          position: {x: 0, y: 0, z: 0},
          rotate: {x_rotate: 0, y_rotate: 0, z_rotate: 0},
        })
        return this.file.boxes[count - 1]
      }
      return null
    },

    containerize(box_id: string, container_id: string) {
      if (!this.file) return null
      const box = this.file.boxes.find((box) => box.id === box_id)
      const container = this.file.containers.find((container) => container.id === container_id)
      if (!box || !container) return null
      box.container_id = container.id
      return box
    },

    uncontainerize(box_id: string) {
      if (!this.file) return null
      const box = this.file.boxes.find((box) => box.id === box_id)
      if (!box) return null
      box.container_id = null
      return box
    },

    select(object: Types.Box | Types.Container | null) {
      if (!object) {
        this.selected.box = null
        this.selected.container = null
        return this.selected
      }
      if (object.object_type === 'BOX') {
        this.selected.box = object
        if (this.file) {
          const container = this.file.containers.find((c) => c.id === object.container_id)
          this.selected.container = container ? container : null
        }
      } else if (object.object_type === 'CONTAINER') {
        this.selected.container = object
        this.selected.box = null
      }
      return this.selected
    },
    hover(object: Types.Box | Types.Container | null) {
      if (!object) {
        this.hovered.box = null
        this.hovered.container = null
        return this.hovered
      }
      if (object.object_type === 'BOX') {
        this.hovered.box = object
        if (this.file) {
          const container = this.file.containers.find((c) => c.id === object.container_id)
          this.hovered.container = container ? container : null
        }
      } else if (object.object_type === 'CONTAINER') {
        this.hovered.container = object
        this.hovered.box = null
      }
      return this.hovered
    }
  },
  getters: {
    boxesByContainerId: (state) => {
      return (id: string): Types.Box[] => {
        if (state.file) {
          return state.file.boxes.filter((box) => box.container_id === id)
        }
        return []
      }
    },
    looseBoxes: (state): Types.Box[] => {
      if (state.file) {
        return state.file.boxes.filter((box) => box.container_id === null)
      }
      return []
    },
    isBoxSelected: (state) => {
      return (id: string) => state.selected.box?.id === id
    },
    isContainerSelected: (state) => {
      return (id: string) => state.selected.container?.id === id
    },
    isBoxHovered: (state) => {
      return (id: string) => state.hovered.box?.id === id
    },
    isContainerHovered: (state) => {
      return (id: string) => state.hovered.container?.id === id
    }
  }
})
