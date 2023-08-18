<template lang="pug">
.editor(v-if='fileStore.file')
  .tools
    editor_e_box(v-for='box in fileStore.looseBoxes' :box='box' :key="box.id")
    editor_e_container(v-for='container in fileStore.file.containers' :key='container.id' :container='container')
  Viewer(:boxes='fileStore.file.boxes')
</template>
<script lang="ts" setup>
import Viewer from './components/Viewer.vue'
import { onMounted } from 'vue'
import { useFilesStore } from '@/stores'
import { useRoute } from 'vue-router'
import { useFileStore } from '@/editor'

const filesStore = useFilesStore()
const fileStore = useFileStore()
const route = useRoute()

onMounted(() => {
  if (typeof route.params.id === 'string') {
    const file = filesStore.files.find((file) => file.id === route.params.id)
    if (file) {
      fileStore.openFile(file)
    }
  }
})
</script>
<style lang="sass">
.editor
  display: flex
  width: 100vw
  height: 100vh
.tools
  padding-top: 20px
  width: 300px
  gap: 2px
  display: flex
  flex-direction: column
  max-width: 300px
  min-width: 300px
  overflow: auto
  max-height: 100%
  background: #0D1117
  color: #ffffff
</style>
