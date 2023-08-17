<template lang="pug">
.editor
  .tools
    e_container(v-for='container in file.containers' :key='container.id' :container='container')
    //- button(@click='add') ADD
    //- pre(v-for='box in file.boxes') {{ box }}
  Viewer(:boxes='file.boxes')
</template>
<script lang="ts" setup>
import e_container from './elements/Container.vue'
import { computed, ref } from 'vue'
import Viewer from './components/Viewer.vue'
import { Types } from '@box/adapter'
import { useFilesStore } from '@/stores'
import { useRoute } from 'vue-router'


const filesStore = useFilesStore()
const route = useRoute()

const file = computed(() => {
  return filesStore.files.find((file) => file.id === (route.params.id as string))
})

// const add = () => {
//   boxes.value = [
//     ...boxes.value,
//     {
//       id: Date.now().toString(),
//       geometry: {
//         width: 100,
//         height: 200,
//         depth: 150
//       },
//       name: 'Test box',
//       position: {
//         x: 0,
//         y: 0,
//         z: 0
//       },
//       rotate: {
//         x_rotate: 0,
//         y_rotate: 0,
//         z_rotate: 0
//       },
//       type_code: 'oweweopfkweop',
//       props: {
//         rotate_limits: {
//           x_rotate: 0,
//           y_rotate: 0,
//           z_rotate: 0
//         },
//         weight: 10
//       }
//     },
//     {
//       id: Date.now().toString() + '11',
//       geometry: {
//         width: 200,
//         height: 100,
//         depth: 50
//       },
//       name: 'Test box',
//       position: {
//         x: 200,
//         y: 0,
//         z: 0
//       },
//       rotate: {
//         x_rotate: 0,
//         y_rotate: 0,
//         z_rotate: 0
//       },
//       type_code: 'oweweopfkweop',
//       props: {
//         rotate_limits: {
//           x_rotate: 0,
//           y_rotate: 0,
//           z_rotate: 0
//         },
//         weight: 10
//       }
//     }
//   ]
// }
</script>
<style lang="sass">
.editor
  display: flex
  width: 100vw
  height: 100vh
.tools
  width: 300px
  max-width: 300px
  min-width: 300px
  overflow: auto
  max-height: 100%
  background: #0D1117
  color: #ffffff
</style>
