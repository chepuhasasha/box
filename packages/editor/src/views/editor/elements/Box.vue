<template lang="pug">
.box(v-if='box')
  .box_head
    e_icon_button(name='box')
    .box_info
      span {{ box.name  }}
      span {{ info.m }}m | {{ info.m3 }}m³ | {{ info.l  }} L.
    e_icon_button(name='target')
</template>
<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue'
import { Types } from '@box/adapter'

const props = defineProps({
  box: { type: Object as PropType<Types.Box>, default: null }
})
const info = computed(() => {
  const mm3 = props.box.geometry.width * props.box.geometry.height * props.box.geometry.depth 
  return {
    m3: mm3 / (1000 * 1000 * 1000),
    l: mm3 / (1000 * 1000),
    m: `${props.box.geometry.width / 1000}X${props.box.geometry.height / 1000}X${props.box.geometry.depth / 1000}`
  }
})
</script>
<style lang="sass">
.box
  cursor: pointer
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%
  padding: 10px 20px
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
</style>
