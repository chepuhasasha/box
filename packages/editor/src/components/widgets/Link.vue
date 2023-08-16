<template lang="pug">
RouterLink.link
  slot
</template>
<script lang="ts" setup>

</script>
<style lang="sass">
.link
  text-decoration: none
  font-size: 14px
  font-weight: 300
  color: var(--text-color-300)
  transition: all ease 0.5s

.router-link-active, .link:hover
  color: var(--text-color-100)
  font-weight: 500
</style>