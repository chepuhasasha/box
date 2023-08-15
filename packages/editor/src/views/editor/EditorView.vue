<template lang="pug">
.editor
  .tools
    pre(v-for='box in boxes') {{ box }}
    input(v-model='boxes[0].position.x' type='range' min='-100', max='100')
    input(v-model='boxes[0].position.y' type='range' min='-100', max='100')
    input(v-model='boxes[0].position.z' type='range' min='-100', max='100')
  Viewer(:boxes='boxes' :selected='boxes[0]')
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import Viewer from './components/Viewer.vue'

const boxes = ref([
  {
    id: '1',
    geometry: {
      width: 100,
      height: 100,
      depth: 100
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
  }
])

</script>
<style lang="sass">
.editor
  display: flex
  width: 100%
  height: 100%
</style>
