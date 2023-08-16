<template lang="pug">
.user
  w_avatar(:name='user.name', :last_name='user.last_name')
  .user_info
    .user_fullname {{ user.name  }} {{ user.last_name  }}
    .user_username {{ user.username  }}
  w_tag(v-if="user.pro" mode='pro') PRO
  e_icon_button(name='logout' contrast='200')
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

interface User {
  username: string
  name: string
  last_name: string
  pro: boolean
}

defineProps({
  user: {
    type: Object as PropType<User>,
    default: () => ({
      username: 'sergeybatukov',
      name: 'Sergey',
      last_name: 'Batukov',
      pro: true
    })
  }
})
</script>
<style lang="sass">
.user
  display: flex
  align-items: center
  gap: 10px
  padding: 10px
  background: var(--background-color-200)
  min-width: 300px
  height: max-content
  &_info
    width: 100%
  &_fullname
    font-size: 14px
    color: var(--text-color-100)
  &_username
    font-size: 12px
    color: var(--text-color-300)
    font-weight: 600
</style>
