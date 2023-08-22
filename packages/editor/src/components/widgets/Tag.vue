<template lang="pug">
.tag(:class='[`tag__${mode}`]')
  slot
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  mode: { type: String as PropType<'new' | 'pro'>, default: 'pro' }
})
</script>
<style lang="sass">
.tag
  display: inline-flex
  gap: 4px
  padding: 8px
  text-transform: uppercase
  font-size: 10px
  line-height: 8px
  font-weight: 900
  border-radius: 2px

  &__new
    background: var(--interactive-color-transparent)
    color: var(--interactive-color-bg)
  &__pro
    background: var(--pro-gradient)
    color: var(--text-color-100)
</style>