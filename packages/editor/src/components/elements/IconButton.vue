<template lang="pug">
button.icon-btn(:class='{"icon-btn__active": active}' @click='test')
  w_icon(:name='name')
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  name: { type: String as PropType<string>, default: null },
  active: { type: Boolean as PropType<boolean>, default: false },
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

  background: var(--background-color-100)
  border: 1px solid var(--background-color-200)
  &:hover
    background: var(--interactive-color-transparent)
    border-color: var(--interactive-color-transparent)
    path
      stroke: var(--interactive-color-bg)

  &__active
    background: var(--interactive-color-transparent)
    border-color: var(--interactive-color-transparent)
    path
      stroke: var(--interactive-color-bg)
    &:hover
      border-color: var(--interactive-color-bg)
</style>