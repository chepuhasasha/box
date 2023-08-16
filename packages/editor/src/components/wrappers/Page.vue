<template lang="pug">
.page
  .page_head(ref='head')
    slot(name='head')
  .page_head.page_head_fixed(v-show='scrolled')
    slot(name='head')
  .page_body
    slot
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
  margin: 0 auto
  width: 100%
  background: var(--background-color-100)
  border: 1px solid var(--background-color-200)
  border-top: none

  &_head
    display: flex
    flex-direction: column
    max-width: 1198px
    width: calc(100vw - 2px)
    background: var(--background-color-100)
    border-bottom: 1px solid var(--background-color-200)
    margin-top: -1px
    &_fixed
      position: fixed
      top: -1px
  &_body
    height: max-content

@media screen and (min-width: 1200px)
  .page_head
    padding-top: 100px
    
</style>