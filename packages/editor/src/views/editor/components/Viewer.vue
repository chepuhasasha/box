<template lang="pug">
.viewer(ref='viewerContainer')
</template>
<script lang="ts" setup>
import { Viewer, BoxEntity, Grid } from '@/engine'
import { onMounted, ref, type PropType, watch } from 'vue'
import { Types } from '@box/adapter'

const viewerContainer = ref<HTMLDivElement | null>(null)
const VIEWER = new Viewer()
const GRID = new Grid()

VIEWER.use(GRID)

const props = defineProps({
  boxes: { type: Array as PropType<Types.Box[]>, default: () => [] },
  selected: { type: Object as PropType<Types.Box>, default: null }
})

props.boxes.forEach((doc) => {
  VIEWER.addBox(doc)
})

watch(
  () => ({
    doc: props.selected,
    x: props.selected.position.x,
    y: props.selected.position.y,
    z: props.selected.position.z
  }),
  (n, o) => {
    if (n) {
      VIEWER.updateBox(n.doc)
    }
  }
)

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
