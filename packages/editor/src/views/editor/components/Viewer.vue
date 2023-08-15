<template lang="pug">
.viewer(ref='viewerContainer')
</template>
<script lang="ts" setup>
import { Viewer, Grid } from '@/engine'
import { onMounted, ref, type PropType } from 'vue'
import { Types } from '@box/adapter'

const viewerContainer = ref<HTMLDivElement | null>(null)
const VIEWER = new Viewer()
const GRID = new Grid()

VIEWER.use(GRID)

const props = defineProps({
  boxes: { type: Array as PropType<Types.Box[]>, default: () => [] }
})

props.boxes.forEach((doc) => {
  VIEWER.addBox(doc)
})

onMounted(() => {
  if (viewerContainer.value) {
    VIEWER.mount(viewerContainer.value)
    if (VIEWER.camera) {
      VIEWER.setCameraPosition(0, 0, 100)
    }
  }
})
</script>
<style lang="sass">
.viewer
  width: 100%
  height: 100%
</style>
