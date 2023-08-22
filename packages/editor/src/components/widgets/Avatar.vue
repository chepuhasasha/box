<template lang="pug">
.avatar(:class='[`avatar__${mode}`]') {{ name[0].toUpperCase() + last_name[0].toUpperCase()  }}
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  url: { type: String as PropType<string | null>, default: null },
  name: { type: String as PropType<string>, default: 'Sergei' },
  last_name: { type: String as PropType<string>, default: 'Batukov' },
  mode: { type: String as PropType<'pro' | 'basic'>, default: 'basic' }
})
</script>
<style lang="sass">
.avatar
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  min-width: 40px
  max-width: 40px
  height: 40px
  min-height: 40px
  max-height: 40px
  border-radius: 4px

  &__basic
    background: var(--interactive-color-bg)
    color: var(--interactive-color-text)
  &__pro
    background: var(--pro-gradient)
    color: var(--text-color-100)
    font-weight: 500
    border: 2px solid var(--background-color-100)
    background-size: 150% 150%
    animation: grad 10s ease infinite
    box-shadow: 0px 0px 0px 1px var(--background-color-200)

@keyframes grad
  0%
    background-position: 0% 0%
  25%
    background-position: 0% 100%
  50%
    background-position: 100% 100%
  75%
    background-position: 100% 0%
  100%
    background-position: 0% 0%

</style>
