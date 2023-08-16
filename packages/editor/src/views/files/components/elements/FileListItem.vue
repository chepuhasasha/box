<template lang="pug">
.file-list-item
  .file-list-item_btns
    e_icon_button(name='menu_dots' @click='menuIsOpen = !menuIsOpen' @blur='blur')
    e_icon_button(v-if='menuIsOpen' name='trash')
    e_icon_button(v-if='menuIsOpen' name='download')
  .file-list-item_info
    .file-list-item_info_name {{ file.name  }} {{ menuIsOpen  }}
    .file-list-item_info_time {{ file.last_update  }}
  e_button(mode='ghost' :icons='[null, "right"]') OPEN
</template>
<script lang="ts" setup>
import { ref, type PropType } from 'vue'

interface FileListItem {
  id: string
  name: string
  last_update: string
}

const blur = () => {
  menuIsOpen.value = false
}

const menuIsOpen = ref(false)

defineProps({
  file: { type: Object as PropType<FileListItem>, default: () => ({
    id: "Test cargo loading #1",
    name: "Test cargo loading #1",
    last_update: "19.09.1994",
  }) }
})
</script>
<style lang="sass">
.file-list-item
  display: grid
  grid-template-columns: max-content 1fr max-content
  gap: 20px
  padding: 20px
  background: var(--background-color-100)
  border-bottom: 1px solid var(--background-color-200)
  overflow: hidden
  &:hover
    background: var(--background-color-200)

  &_btns
    display: flex
  &_info
    display: flex
    flex-direction: column
    justify-content: center
    width: 100%
    overflow: hidden
    &_name
      text-overflow: ellipsis
      white-space: nowrap
      width: 100%
      overflow: hidden
      font-size: 14px
    &_time
      font-size: 14px
      color: var(--text-color-300)
  .button
    justify-self: end

@media screen and (max-width: 1200px)
  .file-list-item
    padding: 10px
    gap: 10px
</style>