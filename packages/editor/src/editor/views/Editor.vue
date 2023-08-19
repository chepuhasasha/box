<template lang="pug">
.editor(v-if='viewerStore.file')
  .editor_head(:title='viewerStore.file.name')
    e_drop
      template(v-slot:head)
        e_icon_button(name='menu' contrast='200')
      e_button(mode="dark" fill) Open
      e_button(mode="dark" fill :icons='[null, "left"]') Back to files
      e_button(mode="dark" fill :icons='[null, "save"]') Save
      e_button(mode="dark" fill :icons='[null, "download"]') Save local
      e_button(mode="dark" fill :icons='[null, "file"]') View doc
      e_button(mode="dark" fill :icons='[null, "logout"]') Logout
    span {{ viewerStore.file.name  }}
    e_icon_button(name='plus' contrast='200' @click='show.add_object = true')
  .editor_list
    editor_e_box(
      v-for='box in viewerStore.looseBoxes'
      :key="box.id" 
      :box='box')
    editor_e_container(
      v-for='container in viewerStore.file.containers'
      :key="container.id"
      :container='container')

  .editor_viewer(ref='viewerDiv')
    

Teleport(to='body')
  editor_m_add_object(v-if='show.add_object' @close='show.add_object = false')
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Viewer, Grid, useViewerStore } from '@/viewer'

const viewerStore = useViewerStore()
viewerStore.openFile(useRoute().params.id.toString())

const show = ref({
  add_object: false
})

const viewerDiv = ref<HTMLDivElement | null>(null)
const VIEWER = new Viewer()

onMounted(() => {
  if (viewerDiv.value) {
    VIEWER.mount(viewerDiv.value)
  }
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

    background: var(--background-color-200)

    span
      font-size: 12px
      color: var(--text-color-100)
      width: 100%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis

  &_list
    grid-area: 2/1/3/2

    display: flex
    flex-direction: column
    gap: 2px
    overflow: auto

    background: var(--background-color-200)
  &_viewer
    grid-area: 1/2/3/3
</style>
