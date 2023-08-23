<template lang="pug">
.file-list-item
  .file-list-item_btns
    e_icon_button(name='menu_dots' @click='menuIsOpen = !menuIsOpen')
    e_icon_button(v-if='menuIsOpen && userStore.user && userStore.user.pro' name='share' @click='generateQRCode')
    e_icon_button(v-if='menuIsOpen' name='download')
  .file-list-item_info
    .file-list-item_info_name {{ file.name  }}
    .file-list-item_info_time {{ file.last_update  }}
  e_button(
    tag='a'
    mode='ghost'
    :icons='[null, "right"]'
    :href="href"
    target="_blank"
    ) OPEN
Teleport(to='body')
  wr_modal(name='QR code' v-show='showQrGenerator' @close='showQrGenerator = false')
    canvas(ref='canvas' width="400" height="0")
    e_button(@click='saveQr' mode='ghost' size='l' :icons="[null, 'download']" fill) DOWNLOAD
</template>
<script lang="ts" setup>
import { ref, type PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Types } from '@box/adapter'
import { useUserStore } from '@/stores'
import QRCode from 'qrcode'
// import { encrypt, decrypt } from '@/engine'

const props = defineProps({
  file: {
    type: Object as PropType<Types.File>,
    default: () => ({
      id: 'Test cargo loading #1',
      name: 'Test cargo loading #1',
      last_update: 0
    })
  }
})
const userStore = useUserStore()
const menuIsOpen = ref(false)
const showQrGenerator = ref(false)
const canvas = ref<HTMLCanvasElement | null>(null)

const blur = () => {
  menuIsOpen.value = false
}

const saveQr = () => {
  if (canvas.value) {
    const imageDataURL = canvas.value.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = imageDataURL
    link.download = `${props.file.name} QR.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showQrGenerator.value = false
  }
}
const generateQRCode = () => {
  if (canvas.value) {
    showQrGenerator.value = true
    QRCode.toCanvas(canvas.value, 'http://172.16.200.78:5173/editor/' + props.file.id, {
      width: 500,
      color: {
        dark: '#010409ff',
        light: '#ffffff'
      },
      margin: 2
    })
  }
}

const router = useRouter()
const href = computed(() => {
  return router.resolve(`editor/${props.file.id}`).href
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
    gap: 10px
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

  &_modal
    &_input
      padding: 20px

@media screen and (max-width: 1200px)
  .file-list-item
    padding: 10px
    gap: 10px
</style>
