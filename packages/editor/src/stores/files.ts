import { defineStore } from 'pinia'
import { Types } from '@box/adapter'

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [
      {
        id: 'test_id',
        name: 'Test cargo loading #1',
        owner_id: '1',
        boxes: [
          {
            id: Date.now().toString(),
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
            type_code: 'oweweopfkweop',
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
            id: Date.now().toString() + '11',
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
            type_code: 'oweweopfkweop',
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
            id: '12',
            type_code: '',
            name: 'Test container',
            boxes: [
              {
                id: Date.now().toString(),
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
                type_code: 'oweweopfkweop',
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
                id: Date.now().toString() + '11',
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
                type_code: 'oweweopfkweop',
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
            geometry: {
              width: 1000,
              height: 1000,
              depth: 1000
            }
          },
        ],
        last_update: 129430909
      }
    ] as Types.File[]
  }),

  actions: {
    createFile(name: string) {
      const file = {
        id: Date.now().toString(),
        owner_id: '1',
        name,
        boxes: [],
        containers: [],
        last_update: 0
      }
      this.files.push(file)
      return file
    }
  }
})
