<template lang="pug">
.container_wrapper(
  v-if='container'
  :class='classes')
  .container(@click='viewerStore.select(container)' :title='container.name')
    .container_info 
      span {{ container.name  }}
      w_util(:value='utilization')
    e_icon_button(name='settings' contrast='300')
    e_icon_button(:name='isOpen ? "up" : "down"' @click='isOpen = !isOpen' contrast='300')
  .container_childs(v-show='isOpen')
    e_box(
      v-for='box in viewerStore.boxesByContainerId(container.id)'
      :key='box.id'
      :box='box'
      inside
    )
</template>
<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import type { Types } from '@box/adapter'
import { useViewerStore } from '@/viewer'

const props = defineProps({
  container: { type: Object as PropType<Types.Container>, default: null }
})
const isOpen = ref(true)
const viewerStore = useViewerStore()
const classes = computed(() => ({
  container__selected: viewerStore.isContainerSelected(props.container.id)
}))
const utilization = computed(() => {
  return Math.floor(Math.random() * 100)
})
</script>
<style lang="sass">
.container
  cursor: pointer
  display: flex
  align-items: center
  gap: 10px
  width: 100%
  padding: 10px
  background: var(--background-color-300)
  border-left: 4px solid var(--background-color-400)
  &:hover
    background: var(--background-color-400)
    
  &_info
    display: flex
    flex-direction: column
    gap: 5px
    width: 100%
    overflow: hidden

    span:first-child
      font-size: 12px
      color: var(--text-color-100)
      width: 100%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
  &_childs
    position: relative
    margin-left: 20px
    border-left: 1px dashed var(--background-color-400)
    padding-top: 2px
    // border-bottom: 1px dashed var(--background-color-400)
    &::before
      content: '',
      position: absolute
      top: -3px
      left: -3px
      width: 6px
      height: 6px
      border-radius: 1px
      background: var(--background-color-400)

  &__selected
    .container
      border-left-color: var(--interactive-color-100)

    .container_childs
      border-color: var(--interactive-color-100)
      &::before
        background: var(--interactive-color-100)
</style>
