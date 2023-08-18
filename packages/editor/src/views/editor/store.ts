import { defineStore } from 'pinia'
import { Types } from '@box/adapter'
import { v4 } from 'uuid'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    selected: {
      container: null as Types.Container | null,
      box: null as Types.Box | null
    },
    file: null as Types.File | null
  }),

  actions: {
    openFile(file: Types.File) {
      this.file = file
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

    addLooseBox(box: Omit<Types.Box, 'id' | 'container_id' | 'object_type'>): Types.Box | null {
      if (this.file) {
        const count = this.file.boxes.push({
          id: v4(),
          object_type: 'BOX',
          container_id: null,
          ...box
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
        return null
      }
      if (object.object_type === 'BOX') {
        this.selected.box = object
        return this.selected.box
      } else if (object.object_type === 'CONTAINER') {
        this.selected.container = object
        return this.selected.container
      }
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
      if (state.file) return state.file.boxes.filter((box) => box.container_id === null)
      return []
    }
  }
})
