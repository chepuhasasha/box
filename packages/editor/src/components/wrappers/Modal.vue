<template lang="pug">
.modal_wrapper
  .modal
    .modal_head
      .modal_head_slot {{ name  }}
        slot(name='head')
      e_icon_button(name='cross' @click='close')
    slot
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  name: { type: String as PropType<string>, default: null}
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>
<style lang="sass">
.modal
  &_wrapper
    // backdrop-filter: blur(5px)
    background: rgba(255,255,255,0.5)
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    place-content: center
    place-items: center

  width: max-content
  display: flex
  flex-direction: column
  border: 1px solid var(--background-color-200)
  background: var(--background-color-100)
  &_head
    font-size: 14px
    font-weight: 600
    color: var(--text-color-100)
    display: flex
    align-items: center
    gap: 20px
    width: 100%
    padding: 10px 10px 10px 20px
    border-bottom: 1px solid var(--background-color-200)
    &_slot
      display: flex
      align-items: center
      gap: 20px
      width: 100%
</style>