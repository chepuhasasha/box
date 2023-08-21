<template lang="pug">
wr_modal(@close='$emit("close")')
  template(v-slot:head)
    span.add-object_tab(:class='{"add-object_tab__active": tab === "box"}' @click='tab = "box"') Box
    span.add-object_tab(:class='{"add-object_tab__active": tab === "container"}' @click='tab = "container"') Container
    a.add-object_tab(href='http://google.com' target='_blank') How it works?
  .add-object
    //- NAME 
    .add-object_input(:style='{gridArea: tab === "box" ? "1/1/2/3" : "1/1/2/4"}')
      e_input(
        type='text'
        v-model='form.name'
        label='Name'
        contrast='200'
        :placeholder='`${tab} name`'
        :error='validate.name.$errors[0]?.$message')
    
    //- WEIGHT
    .add-object_input(v-show='tab === "box"' :style='{gridArea: "1/3/2/4"}')
      e_input(
        type='number'
        v-model='form.props.weight'
        label='Weigh'
        contrast='200'
        placeholder='kg'
        :error='validate.props.weight.$errors[0]?.$message')

    //- GEOMETRY
    .add-object_input(:style='{gridArea: "2/1/3/2"}')
      e_input(
        type='number'
        v-model='form.geometry.width'
        label='width' contrast='200'
        placeholder='mm'
        :error='validate.geometry.width.$errors[0]?.$message')
      e_input(
        type='number'
        v-model='form.geometry.height'
        label='height' contrast='200'
        placeholder='mm'
        :error='validate.geometry.height.$errors[0]?.$message')
      e_input(
        type='number'
        v-model='form.geometry.depth' 
        label='depth' contrast='200'
        placeholder='mm'
        :error='validate.geometry.depth.$errors[0]?.$message')

    //- ROTATE LIMITS 
    .add-object_input(v-show='tab === "box"' :style='{gridArea: "2/3/3/4"}')
      e_input(
        type='number'
        v-model='form.props.rotate_limits.x_rotate'
        label='x rotate'
        contrast='200' placeholder='deg'
        :error='validate.props.rotate_limits.x_rotate.$errors[0]?.$message')
      e_input(
        type='number'
        v-model='form.props.rotate_limits.y_rotate'
        label='y rotate'
        contrast='200' placeholder='deg'
        :error='validate.props.rotate_limits.y_rotate.$errors[0]?.$message')
      e_input(
        type='number'
        v-model='form.props.rotate_limits.z_rotate'
        label='z rotate'
        contrast='200' placeholder='deg'
        :error='validate.props.rotate_limits.z_rotate.$errors[0]?.$message')
    
    //- COPIES
    .add-object_input(:style='{gridArea: "3/1/4/2"}')
      e_input(
        type='number'
        v-model='form.copies'
        label='copies'
        contrast='200'
        placeholder='1'
        min='1'
        :error='validate.copies.$errors[0]?.$message')
  
    e_button(
      :style='{gridArea: "3/2/4/4"}'
      @click="add"
      fill size='l' :icons='[null, "plus"]') ADD {{ tab.toUpperCase()  }}
</template>
<script lang="ts" setup>
import { watch, ref, reactive } from 'vue'
import { useViewerStore } from '@/viewer'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minValue } from '@vuelidate/validators'
import type { Types } from '@box/adapter'

const tab = ref<'box' | 'container'>('box')
const emit = defineEmits(['close'])
const viewerStore = useViewerStore()
const form = reactive({
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
const boxProp = helpers.withMessage('The title is already taken', (value: string) => {
  if (tab.value === 'box' && !value) {
    return false
  }
  return true
})
const validate = useVuelidate(
  {
    geometry: {
      width: { required },
      height: { required },
      depth: { required }
    },
    name: { required },
    copies: { required, minValueValue: minValue(1) },
    props: {
      weight: { boxProp },
      rotate_limits: {
        x_rotate: { boxProp },
        y_rotate: { boxProp },
        z_rotate: { boxProp }
      }
    }
  },
  form
)

const add = async () => {
  const valid = await validate.value.$validate()
  if (valid) {
    if (tab.value === 'box') {
      viewerStore.addLooseBox(form as unknown as Types.Box)
      emit('close')
    } else if (tab.value === 'container') {
      viewerStore.addEmptyContainer(form as unknown as Types.Container)
      emit('close')
    }
  }
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
