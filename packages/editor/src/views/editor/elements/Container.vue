<template lang="pug">
.container(v-if='container')
  .container_head(@click='open = !open')
    e_icon_button(name='box_simple')
    .container_info
      span {{ container.name  }}
      span {{ info.m }}m | {{ info.m3 }}m³ | {{ info.l  }} L.
  w_util(:value='utilization')
  .container_body(v-show='open')
    e_box(v-for='box in container.boxes' :key='box.id' :box='box')
</template>
<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue'
import { Types } from '@box/adapter'
import e_box from './Box.vue'

const props = defineProps({
  container: { type: Object as PropType<Types.Container>, default: null }
})
const open = ref(true)
const utilization = ref(Math.floor(Math.random() * 100))
const info = computed(() => {
  const mm3 = props.container.geometry.width * props.container.geometry.height * props.container.geometry.depth 
  return {
    m3: mm3 / (1000 * 1000 * 1000),
    l: mm3 / (1000 * 1000),
    m: `${props.container.geometry.width / 1000}X${props.container.geometry.height / 1000}X${props.container.geometry.depth / 1000}`
  }
})
</script>
<style lang="sass">
.container
  cursor: pointer
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%
  padding: 20px
  background: var(--background-color-200)
  border-bottom: 1px solid var(--background-color-300)
  &:hover
    background: var(--background-color-300)
  &_head
    display: flex
    align-items: center
    gap: 10px
  &_info
    display: flex
    flex-direction: column
    span:first-child
      font-size: 12px
      color: var(--text-color-100)
    span:last-child
      font-size: 12px
      color: var(--text-color-300)
  &_body
    border-left: 1px dashed var(--background-color-400)
</style>
