<template lang="pug">
svg.icon(
  :width="style.width",
  :height="style.height",
  :style="style"
  viewBox="0 0 20 20",
  fill="none",
  xmlns="http://www.w3.org/2000/svg"
)
  path(
    v-for="d in icon",
    :d="d",
    stroke-width="2",
    stroke-linecap="round",
    stroke-linejoin="round"
    :stroke='color'
    fill="none"
  )
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IconName } from './icons'
import { computed } from 'vue'
import { icons } from './icons'

const props = defineProps({
  name: { type: String as PropType<IconName>, default: 'alert' },
  size: { type: String as PropType<'s' | 'm' | 'l'>, default: 'm' },
  color: { type: String as PropType<string>, default: 'var(--text-color-100)' }
})

const style = computed(() => {
  const map = {
    s: 14,
    m: 18,
    l: 26
  }
  return {
    width: map[props.size] + 'px',
    height: map[props.size] + 'px',
    minWidth: map[props.size] + 'px'
  }
})

const icon = computed(() => {
  if (icons[props.name]) return icons[props.name]
  return icons['alert']
})
</script>

<style lang="sass">
.icon
  path
    transition: all ease 0.3s
</style>
