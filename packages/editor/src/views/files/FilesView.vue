<template lang="pug">
wr_page
  template(v-slot:head)
    Nav
  FileListItem
  FileListItem
  FileListItem
  FileListItem



</template>
<script lang="ts" setup>
import Nav from './components/blocks/Nav.vue'
import FileListItem from './components/elements/FileListItem.vue'

</script>
<style lang="sass">
</style>
