<template lang="pug">
.editor
  .tools
    button(@click='add') ADD
    pre(v-for='box in boxes') {{ box }}
  Viewer(:boxes='boxes')
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Viewer from './components/Viewer.vue'
import { Types } from '@box/adapter'

const boxes = ref<Types.Box[]>([])

const add = () => {
  boxes.value = [
    ...boxes.value,
    {
      id: Date.now().toString(),
      geometry: {
        width: 100,
        height: 100,
        depth: 100
      },
      name: 'Test box',
      position: {
        x: Math.random() * 1000,
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
  ]
}
</script>
<style lang="sass">
.editor
  display: flex
  width: 100%
  height: 100%
</style>
