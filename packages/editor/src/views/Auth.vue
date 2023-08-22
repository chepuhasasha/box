<template lang="pug">
.auth
  //- img.auth_logo(src='@/assets/logo.svg')
  .auth_form
    .auth_form_head {{ isLogin ? "Log in" : "Sign Up" }}
    .auth_form_body(v-show='isLogin')
      e_input(label='email' placeholder='example@example.com')
      e_input(label='password' placeholder='password' type='password')
    .auth_form_body(v-show='!isLogin')
      e_input(label='First name' placeholder='John')
      e_input(label='Last name' placeholder='Dou')
      e_input(label='Email' placeholder='example@example.com')
      e_input(label='password' placeholder='password' type='password')
      e_input(label='confirm password' placeholder='repeat password' type='password')
    .auth_form_btns
      e_button(size='l' fill mode='trans' @click='isLogin = !isLogin') {{ !isLogin ? "Log in" : "Sign Up" }}
      e_button(size='l' fill :icons='[null, "right"]') Log in
</template>
<script lang="ts" setup>
import { ref } from 'vue';


const isLogin = ref(true)
</script>
<style lang="sass">
.auth
  width: 100vw
  height: 100vh
  display: grid
  grid-template-columns: 1fr max-content 1fr
  grid-template-rows: 1fr max-content 1fr
  &_logo
    align-self: center
    justify-self: center
    grid-area: 1/2/2/3
    width: 100px
    height: 100px
  &_form
    grid-area: 2/2/3/3
    display: flex
    flex-direction: column
    min-width: 320px
    border: 1px solid var(--background-color-200)
    &_head
      padding: 20px
      font-size: 20px
      font-weight: 600
      border-bottom: 1px solid var(--background-color-200)
    &_body
      display: flex
      flex-direction: column
      gap: 10px
      padding: 20px
      border-bottom: 1px solid var(--background-color-200)
    &_btns
      display: flex
</style>