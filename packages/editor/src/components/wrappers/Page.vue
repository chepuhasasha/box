<template lang="pug">
.page
  .page_head(ref='head')
    slot(name='head')
  .page_head.page_head_fixed(v-show='scrolled')
    slot(name='head')
  .page_body
    slot
    pre {{ scrolled }}
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const scrolled = ref<any>(0)
const head = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if(head.value) {
    window.addEventListener('scroll', () => {
      const rect = head.value.getBoundingClientRect()
      scrolled.value = rect.top < 0 ? true : false
    });
  }
})
</script>
<style lang="sass">
.page 
  position: relative
  display: flex
  flex-direction: column
  max-width: 1200px
  width: 100%
  margin: 0 auto
  height: 200vh
  background: var(--background-color-100)
  border-left: 1px solid var(--background-color-200)
  border-right: 1px solid var(--background-color-200)
  color: var(--text-color-100)

  &_head
    display: flex
    flex-direction: column
    max-width: 1200px
    width: 100vw
    padding-top: 100px
    background: var(--background-color-100)
    border-bottom: 1px solid var(--background-color-200)
    &_fixed
      position: fixed
  // &_body
</style>