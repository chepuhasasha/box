<template lang="pug">
.utilization
  .utilization_wrapp(:style='{borderColor: style.borderColor}')
    .utilization_value(:style='style')
    .utilization_line(:style='{borderColor: style.borderColor}')
  span(:style='{color: style.borderColor}') {{ value }}%
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  value: { type: Number as PropType<number>, default: 0 }
})

const style = computed(() => {
  const scaleFactor = 255 / 15
  const red_p = props.value > 85 ? props.value - 85 : 0
  const green_p = props.value > 85 ? 15 : props.value - 70
  const red = (15 - red_p) * scaleFactor
  const green = green_p > 0 ? green_p * scaleFactor : 0 
  const current = [Math.floor(red), Math.floor(green), 0]
  return {
    borderColor: `rgb(${current[0]},${current[1]},${current[2]})`,
    background: `repeating-linear-gradient(-45deg, rgb(${current[0]},${current[1]},${current[2]}) 0, rgb(${current[0]},${current[1]},${current[2]}) 1px, transparent 2px, transparent 4px)`,
    width: `${props.value}%`
  }
})
</script>
<style lang="sass">
.utilization
  display: flex
  align-items: center
  gap: 10px
  width: 100%
  span
    width: 30px
    font-size: 12px
  &_wrapp
    width: 100%
    height: 6px
    display: flex
    align-items: center
  &_value
    width: 50%
    transition: all ease 0.3s
    border-left: 4px solid var(--interactive-color-bg)
    border-right: 4px solid var(--interactive-color-bg)
    background: none
    height: 100%

  &_line
    width: 100%
    height: 1px
    border-bottom: 1px solid red
</style>
