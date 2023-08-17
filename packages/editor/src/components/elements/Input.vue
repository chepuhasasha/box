<template lang="pug">
.input(:class='[`input__contrast_${contrast}`]')
  label(v-if='label' :for='label') {{ label }}
  .input_message(v-if='message') {{ message  }}
  .input_content
    w_icon.input_icon(v-if='icon' :name='icon')
    input(:name='label' @input='update' :value="modelValue" v-bind='$attrs')
    slot
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  icon: { type: String as PropType<string>, default: null },
  contrast: { type: String as PropType<"100" | "200" | "300">, default: '100' },
  message: { type: String as PropType<string>, default: null },
  label: { type: String as PropType<string>, default: null },
  modelValue: { type: String as PropType<string>, default: null }
})

const emit = defineEmits(['update:modelValue'])
const update = (e: {target: HTMLInputElement}) => {
  const result = e.target.value.trim()
  emit('update:modelValue', result)
}
</script>
<style lang="sass">
.input
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%

  &_message
    font-size: 12px
    color: var(--text-color-200)
  &_content
    display: flex
    gap: 10px
    width: 100%
  &_icon
    align-self: center
  &__contrast
    &_100
      input
        background: var(--background-color-200)
    &_200
      input
        background: var(--background-color-300)
    &_300
      input
        background: var(--background-color-400)
  label
    font-size: 12px
    color: var(--text-color-200)
    text-transform: uppercase
  input
    border: none
    padding: 10px
    color: var(--text-color-100)
    border-radius: 4px
    font-size: 12px
    line-height: 10px
    width: 100%
    &:focus
      outline: 2px solid var(--interactive-color-100)
    &::placeholder
      color: var(--text-color-300)
      
</style>