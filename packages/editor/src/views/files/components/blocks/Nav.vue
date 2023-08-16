<template lang="pug">
.files-nav
  .files-nav_links
    w_link(to='/') FILES
    w_link(to='/about') ABOUT
    w_link(to='/guides') GUIDES
    e_icon_button(name='file')
  .files-nav_user
    e_user
  button.files-nav_new
    .files-nav_new_text
      span New file
      span create a new cargo loading file
    w_icon(name='plus')
  .files-nav_search search here ...
</template>
<script lang="ts" setup>

</script>
<style lang="sass">
.files-nav
  display: grid
  grid-template-columns: 300px 1fr 300px
  grid-template-rows: max-content max-content
  &_links
    grid-area: 1 / 1 / 2 / 3
  
    display: flex
    align-items: center
    padding: 0 20px 20px 20px
    gap: 20px
  &_user
    grid-area: 1 / 3 / 2 / 4

    height: 100%
    min-width: 300px
    max-width: 300px
    width: 300px
    background: var(--background-color-200)

  &_new
    grid-area: 2 / 1 / 3 / 2
    cursor: pointer
    display: flex
    border: none
    background: var(--background-color-200)
    padding: 20px
    align-items: center
    justify-content: space-between
    &:hover
      background: var(--interactive-color-100)
      span
        color: var(--text-color-100) !important
      
    &_text
      text-align: left
      display: flex
      flex-direction: column
      gap: 4px
      span:first-child
        font-size: 14px
        font-weight: 500
        color: var(--text-color-100)
      span:last-child
        font-size: 12px
        font-weight: 400
        color: var(--text-color-300)

  &_search
    grid-area: 2 / 2 / 3 / 4
    display: flex
    place-content: center
    place-items: center
    border-top: 1px solid var(--background-color-200)
    color: var(--text-color-300)
    font-size: 10px

@media screen and (max-width: 1200px)
  .files-nav_user
    display: none
  .files-nav_links
    padding: 10px
    gap: 10px
</style>