<template lang="pug">
button.dropdown(@click='isOpen = true')
  slot(name='head')
  .dropdown_body(
    ref='ddbody'
    v-show='isOpen'
    :style='position'
    @mouseleave='isOpen = false'
  )
    slot
</template>
<script lang="ts" setup>
import { onMounted, ref, type PropType, computed } from 'vue'

const isOpen = ref(false)
const ddbody = ref<HTMLDivElement | null>(null)

const props = defineProps({
  left: { type: String as PropType<string>, default: null },
  right: { type: String as PropType<string>, default: null }
})

const position = computed(() => {
  if (props.left) {
    return { left: props.left }
  }
  if (props.right) {
    return { left: props.right }
  }
  return {}
})
onMounted(() => {
  window.addEventListener('pointerdown', (e) => {
    if (isOpen.value && ddbody.value) {
      const rect = ddbody.value.getBoundingClientRect()
      if (
        !(
          e.clientX > rect.left &&
          e.clientX < rect.left + rect.width &&
          e.clientY > rect.top - 40 &&
          e.clientY < rect.top + rect.height
        )
      ) {
        console.log('222')
        isOpen.value = false
      }
    }
  })
})
</script>
<style lang="sass">
.dropdown
  position: relative
  background: none
  padding: 0
  border: none
  &:focus-visible
    outline: 2px solid var(--interactive-color-bg)
  &_body
    min-width: 170px
    position: absolute
    z-index: 1
    display: flex
    flex-direction: column
    gap: 5px
    padding: 10px
    top: calc(100% + 10px)
    background: var(--background-color-100)
    border: 1px solid var(--background-color-200)
    border-radius: 10px
</style>
