<template lang="pug">
.editor(v-if='viewerStore.file')
  .editor_head(:title='viewerStore.file.name')
    e_drop
      template(v-slot:head)
        e_icon_button(name='menu' contrast='100')
      e_button(mode="trans" fill) Open
      e_button(mode="trans" fill :icons='[null, "left"]') Back to files
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

  .editor_viewer(ref='viewerDiv')
  .editor_tools
    e_icon_button(name='plus' contrast='100' @click='show.add_object = true')
    e_drop(left='-130px')
      template(v-slot:head)
        e_icon_button(name='eye' )
      e_button(mode='trans') Home
      e_button(mode='trans') Top
      e_button(mode='trans') Front
      e_button(mode='trans') Left
    

Teleport(to='body')
  m_add_object(v-if='show.add_object' @close='show.add_object = false')
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { Viewer, PointerTool, useViewerStore } from '@/viewer'

const viewerStore = useViewerStore()
viewerStore.openFile(useRoute().params.id.toString())

const show = ref({
  add_object: false
})

const viewerDiv = ref<HTMLDivElement | null>(null)
const VIEWER = new Viewer()
const POINTER = new PointerTool()
VIEWER.use(POINTER)

onMounted(() => {
  if (viewerDiv.value) {
    VIEWER.mount(viewerDiv.value)
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
  grid-template-rows: max-content 1fr
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
  &_viewer
    grid-area: 1/2/3/3
  &_tools
    grid-area: 1/2/2/3
    display: flex
    gap: 10px
    // z-index: 2
    align-self: center
    justify-self: center
    background: rgba(255,255,255, 0.8)
    border: 1px solid var(--background-color-200)
    backdrop-filter: blur(5px)
    padding: 10px
    border-radius: 0 0 4px 4px
</style>
