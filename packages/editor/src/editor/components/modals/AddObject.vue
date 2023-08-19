<template lang="pug">
wr_modal(@close='$emit("close")')
  template(v-slot:head)
    span.add-object_tab(:class='{"add-object_tab__active": tab === "box"}' @click='tab = "box"') Box
    span.add-object_tab(:class='{"add-object_tab__active": tab === "container"}' @click='tab = "container"') Container
    a.add-object_tab(href='http://google.com' target='_blank') How it works?
  .add-object
    .add-object_input(:style='{gridArea: tab === "box" ? "1/1/2/3" : "1/1/2/4"}')
      e_input(type='text' v-model='form.name' label='Name' contrast='200' :placeholder='`${tab} name`')
    .add-object_input(v-show='tab === "box"' :style='{gridArea: "1/3/2/4"}')
      e_input(type='number' v-model='form.props.weight' label='Weight' contrast='200' placeholder='kg')
    .add-object_input(:style='{gridArea: "2/1/3/2"}')
      e_input(type='number' v-model='form.geometry.x' label='width' contrast='200' placeholder='mm')
      e_input(type='number' v-model='form.geometry.y' label='height' contrast='200' placeholder='mm')
      e_input(type='number' v-model='form.geometry.z' label='depth' contrast='200' placeholder='mm')
    .add-object_input(v-show='tab === "box"' :style='{gridArea: "2/3/3/4"}')
      e_input(type='number' v-model='form.props.rotate_limits.x_rotate' label='x rotate' contrast='200' placeholder='deg')
      e_input(type='number' v-model='form.props.rotate_limits.y_rotate' label='y rotate' contrast='200' placeholder='deg')
      e_input(type='number' v-model='form.props.rotate_limits.z_rotate' label='z rotate' contrast='200' placeholder='deg')
    .add-object_input(:style='{gridArea: "3/1/4/2"}')
      e_input(type='number' v-model='form.copies' label='copies' contrast='200' placeholder='1')
    e_button(
      :style='{gridArea: "3/2/4/4"}'
      @click="add"
      fill size='l' :icons='[null, "plus"]') ADD {{ tab.toUpperCase()  }}
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useViewerStore } from '@/viewer'

const tab = ref<'box' | 'container'>('box')
const form = ref({
  geometry: {
    width: null,
    height: null,
    depth: null
  },
  name: null,
  copies: 1,
  props: {
    weight: null,
    rotate_limits: {
      x_rotate: null,
      y_rotate: null,
      z_rotate: null
    }
  }
})
const viewerStore = useViewerStore()
const emit = defineEmits(['close'])
// const validate = computed(() => {
//   return form.value.name && form.value.
// })
const add = () => {
  if (tab.value === 'box') {
    viewerStore.addLooseBox({
      // @ts-ignore
      name: form.value.name,
      // @ts-ignore
      geometry: form.value.geometry,
      // @ts-ignore
      props: form.value.props
    })
    
  }
  emit('close')
}
</script>
<style lang="sass">
.add-object
  display: grid
  grid-template-columns: 100px 1fr 100px
  grid-template-rows: repeat(3, max-content)
  gap: 1px
  width: 400px
  max-width: 100vw

  background: var(--background-color-300)
  &_tab
    cursor: pointer
    font-size: 14px
    font-weight: 400
    color: var(--text-color-200)
    text-decoration: none
    &:hover
      color: var(--text-color-100)
    &__active
      color: var(--text-color-100)
      font-weight: 600
  &_input
    display: flex
    flex-direction: column
    gap: 10px
    padding: 10px
    background: var(--background-color-200)
</style>
