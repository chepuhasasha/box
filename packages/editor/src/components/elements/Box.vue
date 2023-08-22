<template lang="pug">
.box(
  v-if='box'
  :title='box.name'
  :class='classes'
  @click='viewerStore.select(box)'
  @mouseenter='viewerStore.hover(box)'
  @mouseleave='viewerStore.hover(null)'
  )
  .box_info 
    span {{ box.name  }}
    span(
      :style='{color: box.container_id ? "var(--text-color-300)" : "var(--danger-color-100)" }'
    ) {{ box.container_id ? "positioned" : "unpositioned" }}
  e_drop(left='-130px')
    template(v-slot:head)
      e_icon_button(name='info')
    .box_min
      span W: 
        b {{ box.geometry.width }} mm
      span H: 
        b {{ box.geometry.height }} mm 
      span D: 
        b {{ box.geometry.depth }} mm
    .box_min
      span X: 
        b {{ box.position.x }} mm
      span Y: 
        b {{ box.position.y}} mm 
      span Z: 
        b {{ box.position.z }} mm
    e_button(mode="trans" fill :icons='[null, "edit"]') Edit
  e_drop(left='-130px')
    template(v-slot:head)
      e_icon_button(name='settings' contrast='100')
    e_button(mode="trans" fill :icons='[null, "plus"]') Dublicate
    e_button(mode="trans" status='danger' fill :icons='[null, "trash"]') Delete
  //- e_icon_button(v-if='!box.container_id' name='target' contrast='100')
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { Types } from '@box/adapter'
import { useViewerStore } from '@/viewer'

const props = defineProps({
  box: { type: Object as PropType<Types.Box>, default: null },
  inside: { type: Boolean as PropType<boolean>, default: false }
})

const viewerStore = useViewerStore()
const classes = computed(() => ({
  box__inside: props.inside,
  box__selected: viewerStore.isBoxSelected(props.box.id),
  box__hovered: viewerStore.isBoxHovered(props.box.id),
  box__danger: props.box.container_id ? false : true
}))
</script>
<style lang="sass">
.box
  position: relative
  display: flex
  gap: 10px
  padding: 10px
  background: var(--background-color-100)
  border-bottom: 1px solid var(--background-color-200)
  border-left: 4px solid var(--background-color-300)
  cursor: pointer

  &:hover, &__hovered
    background: var(--background-color-200)
  &_min
    display: flex
    flex-direction: column
    gap: 4px
    padding: 10px
    border: 1px solid var(--background-color-200)
    border-radius: 4px
    span
      text-align: left
      font-size: 12px
      color: var(--text-color-300)
  &_info
    display: flex
    flex-direction: column
    justify-content: space-around
    width: 100%

    overflow: hidden

    span:first-child
      font-size: 12px
      color: var(--text-color-100)
      width: 100%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

    span:last-child
      font-size: 10px
      text-transform: uppercase
      font-weight: 600

  &__inside
    margin-left: 10px
    &::before
      content: ''
      position: absolute
      top: 0
      left: -14px
      width: 10px
      height:  50%
      border-bottom: 1px dashed var(--background-color-300)

  &__danger
    border-left-color: var(--danger-color-100)

  &__selected
    border-left-color: var(--interactive-color-bg) !important
    &::before
      border-color: var(--interactive-color-bg)
</style>
