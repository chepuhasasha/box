<template lang="pug">
.editor(v-if='viewerStore.file')
  .editor_head(:title='viewerStore.file.name')
    e_drop
      template(v-slot:head)
        e_icon_button(name='menu' contrast='100')
      e_button(mode="trans" fill) Open
      e_button(mode="trans" fill :icons='[null, "list"]' @click='toFiles') Files
      e_button(mode="trans" fill :icons='[null, "save"]') Save
      e_button(mode="trans" fill :icons='[null, "download"]') Save local
      e_button(mode="trans" fill :icons='[null, "file"]') View doc
      e_button(mode="trans" fill :icons='[null, "logout"]') Logout
    span {{ viewerStore.file.name  }}
    e_icon_button(name='plus' contrast='100' @click='show.add_object = true')
  .editor_list
    e_box(
      v-for='box in viewerStore.looseBoxes'
      :key="box.id" 
      :box='box')
    e_container(
      v-for='container in viewerStore.file.containers'
      :key="container.id"
      :container='container')
  .editor_bottom
    e_button(fill size='l' :icons='[null, "magic"]' mode='ghost' disable) AI (soon)

  .editor_viewer(ref='viewerDiv')
  .editor_tools
    e_icon_button(name='undo')
    e_icon_button(name='do')
    e_icon_button(name='cursor' :active='pointerMode === "select"' @click='setPointerMode("select")')
    e_icon_button(name='move' :active='pointerMode === "move"' @click='setPointerMode("move")')
    e_icon_button(name='rotate' :active='pointerMode === "rotate"' @click='setPointerMode("rotate")')
    e_drop(left='-130px')
      template(v-slot:head)
        e_icon_button(name='eye' )
      e_button(mode='trans' @click='VIEWER.setCameraPosition(1000, 1000, 1000)') ISOMETRY
      e_button(mode='trans' @click='VIEWER.setCameraPosition(0, 1000, 0)') TOP
      e_button(mode='trans' @click='VIEWER.setCameraPosition(0, 0, 1000)') FRONT
      e_button(mode='trans' @click='VIEWER.setCameraPosition(1000, 0, 0)') LEFT

Teleport(to='body')
  m_add_object(v-if='show.add_object' @close='show.add_object = false')
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { Viewer, PointerTool, useViewerStore } from '@/viewer'

const viewerStore = useViewerStore()
viewerStore.openFile(useRoute().params.id.toString())

const show = ref({
  add_object: false
})
const router = useRouter()
const pointerMode = ref<'move' | 'rotate' | 'select'>('select')
const viewerDiv = ref<HTMLDivElement | null>(null)
const VIEWER = new Viewer()
const POINTER = new PointerTool()
POINTER.mode = pointerMode.value
VIEWER.use(POINTER)

const setPointerMode = (mode: 'move' | 'rotate' | 'select') => {
  POINTER.mode = mode
  pointerMode.value = mode
}

const toFiles = () => {
  window.open('/', 'blank')
}

onMounted(() => {
  if (viewerDiv.value) {
    VIEWER.mount(viewerDiv.value)
    if (viewerStore.file) document.title = viewerStore.file.name
  }
})

onUnmounted(() => {
  VIEWER.destroy()
})
</script>
<style lang="sass">
.editor
  display: grid
  grid-template-columns: max-content 1fr max-content
  grid-template-rows: max-content 1fr max-content
  width: 100vw
  height: 100vh

  &_head
    grid-area: 1/1/2/2
    width: 300px

    display: flex
    align-items: center
    padding: 10px
    gap: 10px

    background: var(--background-color-100)
    border-right: 1px solid var(--background-color-200)
    border-bottom: 1px solid var(--background-color-200)

    span
      font-size: 14px
      color: var(--text-color-100)
      width: 100%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

  &_list
    grid-area: 2/1/3/2
    width: 300px
    display: flex
    flex-direction: column
    // gap: 2px
    overflow: auto
    border-right: 1px solid var(--background-color-200)

    background: var(--background-color-100)
  &_bottom
    grid-area: 3/1/4/2
  &_viewer
    grid-area: 1/2/4/3
  &_tools
    grid-area: 1/2/2/3
    display: flex
    gap: 10px
    z-index: 2
    align-self: center
    justify-self: center
    background: rgba(255,255,255, 0.8)
    border: 1px solid var(--background-color-200)
    backdrop-filter: blur(10px)
    padding: 10px
    border-radius: 0 0 4px 4px
</style>
