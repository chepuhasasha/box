<template lang="pug">
component(:is='tag').button(:class='classes', :style='{width: fill ? "100%" : "max-content"}')
  w_icon(v-if='icons[0]' :name='icons[0]' :size='size')
  slot
  .button_content
    slot(name='content')
  w_icon(v-if='icons[1]' :name='icons[1]' :size='size')
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  mode: { type: String as PropType<'default' | 'ghost' | 'dark'>, default: 'default' },
  disable: { type: Boolean as PropType<boolean>, default: false },
  status: { type: String as PropType<null | 'ok' | 'warn' | 'danger'>, default: null },
  size: { type: String as PropType<'s' | 'm' | 'l'>, default: 'm' },
  icons: { type: Array as PropType<(string | null)[]>, default: () => [] },
  fill: { type: Boolean as PropType<boolean>, default: false },
  tag: { type: String as PropType<"button" | "a">, default: "button" }
})

const classes = computed(() => ({
  [`button__${props.mode}`]: true,
  [`button__${props.size}`]: true,
  [`button__${props.mode}__${props.status}`]: props.status ? true : false,
  [`button__disable`]: props.disable
}))
</script>
<style lang="sass">
.button
  display: flex
  align-items: center
  justify-content: space-between
  cursor: pointer
  border: none
  text-decoration: none

  font-family: Inter
  font-style: normal
  font-weight: 500

  transition: all ease 0.3s
  outline: none
  // height: 100%

  &_content
    display: flex
    flex-direction: column
    text-align: left
    gap: 4px
    span:first-child
      font-size: 14px
      font-weight: 500
      line-height: 16px
    span:last-child
      font-size: 12px
      line-height: 14px
      font-weight: 400


  &:focus-visible
    outline: 2px solid var(--interactive-color-200)

  &__disable
    background: var(--disable-background-color) !important
    cursor: not-allowed !important
    color: var(--disable-text-color) !important
    &:hover
      background: var(--disable-background-color) !important
      color: var(--disable-text-color) !important

  &__s
    border-radius: 2px
    padding: 4px 6px
    gap: 6px

    font-size: 12px
    line-height: 14px

  &__m
    border-radius: 4px
    padding: 6px 10px
    gap: 10px

    font-size: 14px
    line-height: 20px

  &__l
    border-radius: 0
    padding: 20px
    gap: 16px

    font-size: 16px
    line-height: 26px

  &__default
    background: var(--interactive-color-100)
    color: var( --text-color-100)

    &:hover
      background: var(--interactive-color-transparent)
      color: var(--interactive-color-100)
      path
        stroke: var(--interactive-color-100)

    &__ok
      background: var(--ok-color-100)
      color: var(--text-color-100)

      &:hover
        background: var(--ok-color-transparent)
        color: var(--ok-color-100)

    &__warn
      background: var(--warn-color-100)
      color: var(--text-color-100)

      &:hover
        background: var(--warn-color-transparent)
        color: var(--warn-color-100)

    &__danger
      background: var(--danger-color-100)
      color: var(--text-color-100)

      &:hover
        background: var(--danger-color-transparent)
        color: var(--danger-color-100)

  &__ghost
    background: var(--interactive-color-transparent)
    color: var(--interactive-color-100)
    path
      stroke: var(--interactive-color-100)

    &:hover
      background: var(--interactive-color-100)
      color: var( --text-color-100)
      path
        stroke: var( --text-color-100)

    &__ok
      background: var(--ok-color-transparent)
      color: var(--ok-color-100)
      path
        stroke: var(--ok-color-100)

      &:hover
        background: var(--warn-color-100)
        color: var(--text-color-100)

    &__warn
      background: var(--warn-color-transparent)
      color: var(--warn-color-100)
      path
        stroke: var(--warn-color-100)

      &:hover
        background: var(--warn-color-100)
        color: var(--text-color-100)

    &__danger
      background: var(--danger-color-transparent)
      color: var(--danger-color-100)
      path
        stroke: var(--danger-color-100)

      &:hover
        background: var(--danger-color-100)
        color: var(--text-color-100)

  &__dark
    background: var(--background-color-200)
    color: var(--text-color-100)
    path
      stroke: var(--text-color-100)

    .button_content
      span:last-child
        color: var(--text-color-300)

    &:hover
      background: var(--interactive-color-100)
      color: var( --text-color-100)
      path
        stroke: var( --text-color-100)
      .button_content
        span:last-child
          color: var(--text-color-100)


    &__ok
      background: var(--background-color-200)
      color: var(--ok-color-100)

      path
        stroke: var(--ok-color-100)

      &:hover
        background: var(--warn-color-100)
        color: var(--text-color-100)

    &__warn
      background: var(--background-color-200)
      color: var(--warn-color-100)

      path
        stroke: var(--warn-color-100)

      &:hover
        background: var(--warn-color-100)
        color: var(--text-color-100)

    &__danger
      background: var(--background-color-200)
      color: var(--danger-color-100)
      path
        stroke: var(--danger-color-100)

      .button_content
        span
          color: var(--danger-color-100)

      &:hover
        background: var(--danger-color-100)
        color: var(--text-color-100)
        span
          color: var(--text-color-100)
</style>
