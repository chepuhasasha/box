<template lang="pug">
.avatar {{ name[0].toUpperCase() + last_name[0].toUpperCase()  }}
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  url: { type: String as PropType<string | null>, default: null },
  name: { type: String as PropType<string>, default: 'Sergei' },
  last_name: { type: String as PropType<string>, default: 'Batukov' }
})
</script>
<style lang="sass">
.avatar
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  min-width: 40px
  max-width: 40px
  height: 40px
  min-height: 40px
  max-height: 40px
  border-radius: 4px
  background: var(--interactive-color-100)
  border: 1px solid var(--background-color-400)
</style>
