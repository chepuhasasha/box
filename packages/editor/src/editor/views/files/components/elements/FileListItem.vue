<template lang="pug">
.file-list-item
  .file-list-item_btns
    e_icon_button(name='menu_dots' @click='menuIsOpen = !menuIsOpen')
    e_icon_button(v-if='menuIsOpen && userStore.user && userStore.user.pro' name='qr' @click='showQrGenerator = true')
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
  wr_modal(name='QR code' v-if='showQrGenerator' @close='showQrGenerator = false')
    canvas(ref='canvas' width="500" height="0")
    .file-list-item_modal_input
      e_input(label='SECRET KEY' contrast='200' v-model='qrKey' @keydown.enter='generateQRCode')
    e_button(@click='generateQRCode' size='l' :icons="[null, 'qr']" fill) GENERATE
</template>
<script lang="ts" setup>
import { ref, type PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Types } from '@box/adapter'
import { useUserStore } from '@/stores'
import QRCode from 'qrcode'
import { encrypt, decrypt } from '@/engine'

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
const qrKey = ref<string>('')
const canvas = ref<HTMLCanvasElement | null>(null)

const blur = () => {
  menuIsOpen.value = false
}

const generateQRCode = () => {
  if (canvas.value) {
    const code = encrypt(props.file, qrKey.value)
    QRCode.toCanvas(canvas.value, 'http://192.168.0.229:5173/viewer/' + code, {
      width: 500,
      color: {
        dark: '#010409ff',
        light: '#f0f6fcff'
      },
      margin: 2
    })
    // qrKey.value = ''
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
