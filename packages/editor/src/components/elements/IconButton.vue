<template lang="pug">
button.icon-btn(:class='[`icon-btn__${contrast}`]' @click='test')
  w_icon(:name='name')
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  name: { type: String as PropType<string>, default: null },
  contrast: { type: String as PropType<'100' | '200' | '300'>, default: '100' },
})

</script>
<style lang="sass">
.icon-btn
  display: flex
  place-items: center
  place-content: center
  cursor: pointer
  width: 40px
  min-width: 40px
  max-width: max-content
  height: 40px
  min-height: 40px
  max-height: 40px

  border-radius: 4px
  transition: all ease 0.3s

  &:focus-visible
    outline: 2px solid var(--interactive-color-200)

  &__100
    background: var(--background-color-100)
    border: 1px solid var(--background-color-200)
    &:hover
      background: var(--background-color-200)

  &__200
    background: var(--background-color-200)
    border: 1px solid var(--background-color-200)
    &:hover
      background: var(--background-color-300)

  &__300
    background: var(--background-color-300)
    border: 1px solid var(--background-color-300)
    &:hover
      background: var(--background-color-400)
</style>