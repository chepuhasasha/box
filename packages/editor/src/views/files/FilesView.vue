<template lang="pug">
wr_page
  template(v-slot:head)
    e_button(size='s') test
    e_button test
  e_button(size='l' :icons='[null, "right"]') test
  e_button(size='l' mode='ghost' :icons='["sponsor", "right"]') test
  e_button(size='l' disable) test
  e_button(mode='ghost') test
  e_icon_button(name='file')
</template>
<script lang="ts" setup>

</script>
<style lang="sass">
</style>
