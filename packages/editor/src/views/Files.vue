<template lang="pug">
wr_page.files
  template(v-slot:head)
    .files_head
      .files_head_links
        w_link(to='/') FILES
        w_link(to='/') ABOUT
        w_link(to='/') HOW IT WORKS?
        e_icon_button(name='file')
      .files_head_user
        e_user
      e_button.files_head_new(size='l' fill :icons='[null, "plus"]' @click='newFileModal = true') 
        template(v-slot:content) 
          span New file
          span create a new cargo loading file
      .files_head_search
        e_input(v-model='search' placeholder='start typing the file name...' icon='search')
  e_filelistitem(v-for='file in filtred' :key='file.id' :file='file')
Teleport(to='body')
  wr_modal(v-if='newFileModal' name='New file' @close='newFileModal = false')
    .files_new-file-modal
      .files_new-file-modal_input
        e_input(
          label='file name'
          v-model='filename'
          placeholder='start typing the file name...'
        )
      e_button(size='l' :icons='[null, "cross"]' mode='ghost' fill @click='newFileModal = false') CANCEL
      e_button(size='l' :icons='[null, "plus"]' fill :disable='filename ? false : true' @click='createFile') CREATE
</template>
<script lang="ts" setup>
import { useFilesStore } from '@/stores'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const filesStore = useFilesStore()
const search = ref<string | null>(null)
const newFileModal = ref<boolean>(false)
const filename = ref<string | null>(null)
const filtred = computed(() => {
  if (search.value) {
    return filesStore.files.filter((file) =>
      file.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }
  return filesStore.files
})

const createFile = () => {
  if (filename.value) {
    const file = filesStore.createFile(filename.value)
    newFileModal.value = false
    window.open(router.resolve(`editor/${file.id}`).href)
  }
}
</script>
<style lang="sass">
.files
  &_head
    display: grid
    grid-template-columns: 300px 1fr 300px
    grid-template-rows: max-content max-content

    &_links
      grid-area: 1 / 1 / 2 / 3
      display: flex
      align-items: center
      padding: 0 20px 20px 20px
      gap: 20px
    &_user
      grid-area: 1 / 3 / 2 / 4
      height: 100%
      min-width: 300px
      max-width: 300px
      width: 300px
    &_new
      grid-area: 2 / 1 / 3 / 2
    &_search
      grid-area: 2 / 2 / 3 / 4
      padding: 20px
      border-top: 1px solid var(--background-color-200)
  &_new-file-modal
    display: grid
    grid-template-columns: repeat(2, 1fr)
    max-height: 90vh
    overflow: auto
    &_input
      padding: 20px
      grid-area: 1/1/2/3
</style>
