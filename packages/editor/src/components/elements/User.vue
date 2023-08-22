<template lang="pug">
.user(v-if='userStore.user')
  w_avatar(:name='userStore.user.name', :last_name='userStore.user.last_name' :mode='userStore.user.pro ? "pro" : "basic"')
  .user_info
    .user_fullname {{ userStore.user.name  }} {{ userStore.user.last_name  }}
    .user_username {{ userStore.user.username  }}
  e_icon_button(name='logout' contrast='100')
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>
<style lang="sass">
.user
  display: flex
  align-items: center
  gap: 10px
  padding: 10px
  background: var(--background-color-100)
  outline: 1px solid var(--background-color-200)
  min-width: 300px
  height: max-content
  &_info
    width: 100%
  &_fullname
    font-size: 14px
    color: var(--text-color-100)
    font-weight: 500
  &_username
    font-size: 12px
    color: var(--text-color-300)
    font-weight: 400
</style>
