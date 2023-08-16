<template lang="pug">
.viewer(ref='viewerContainer')
</template>
<script lang="ts" setup>
import { Viewer, Grid, Mover } from '@/engine'
import { onMounted, ref, type PropType } from 'vue'
import { Types } from '@box/adapter'

const viewerContainer = ref<HTMLDivElement | null>(null)
const props = defineProps({
  boxes: { type: Array as PropType<Types.Box[]>, default: () => [] }
})

const VIEWER = new Viewer()
VIEWER.watch(props)
const MOVER = new Mover()
VIEWER.use(MOVER)
const GRID = new Grid()
VIEWER.use(GRID)

onMounted(() => {
  if (viewerContainer.value) {
    VIEWER.mount(viewerContainer.value)
    VIEWER.setCameraPosition(0, 0, 100)
  }
})
</script>
<style lang="sass">
.viewer
  width: 100%
  height: 100%
</style>
