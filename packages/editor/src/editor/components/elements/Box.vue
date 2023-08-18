<template lang="pug">
.box(
  v-if='box'
  :title='box.name'
  :class='classes'
  @click='fileStore.select(box)'
  @mouseenter='fileStore.hover(box)'
  @mouseleave='fileStore.hover(null)'
  )
  .box_info 
    span {{ box.name  }}
    span(
      :style='{color: box.container_id ? "var(--text-color-300)" : "var(--danger-color-100)" }'
    ) {{ box.container_id ? "positioned" : "unpositioned" }}
  e_drop(left='-130px')
    template(v-slot:head)
      e_icon_button(name='settings' contrast='300')
    e_button(mode="dark" fill :icons='[null, "plus"]') Dublicate
    e_button(mode="dark" status='danger' fill :icons='[null, "trash"]') Delete
  e_icon_button(v-if='!box.container_id' name='target' contrast='300')
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { Types } from '@box/adapter'
import { useFileStore } from '@/editor'

const props = defineProps({
  box: { type: Object as PropType<Types.Box>, default: null },
  inside: { type: Boolean as PropType<boolean>, default: false }
})

const fileStore = useFileStore()
const classes = computed(() => ({
  box__inside: props.inside,
  box__selected: fileStore.isBoxSelected(props.box.id),
  box__hovered: fileStore.isBoxHovered(props.box.id),
  box__danger: props.box.container_id ? false : true
}))
</script>
<style lang="sass">
.box
  position: relative
  display: flex
  gap: 10px
  padding: 10px
  background: var(--background-color-300)
  border-left: 4px solid var(--background-color-400)
  cursor: pointer

  &:hover, &__hovered
    background: var(--background-color-400)

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
      border-bottom: 1px dashed var(--background-color-400)

  &__danger
    border-left-color: var(--danger-color-100)

  &__selected
    border-left-color: var(--interactive-color-100) !important
    &::after
      content: ''
      position: absolute
      top: calc(50% - 2px)
      left: -16px
      width: 4px
      height:  4px
      border-radius: 1px
      background: var(--interactive-color-100)
    &::before
      border-color: var(--interactive-color-100)
</style>
