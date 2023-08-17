<template lang="pug">
.viewer 
  e_input(label='SECRET KEY' v-model='key')
  e_button(@click='DECRYPT' size='l' fill :icons='[null, "right"]') DECRYPT
  pre {{ file }}
  span {{ code }}
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { decrypt } from '@/engine'
import { Types } from '@box/adapter'; 

const code = ref<string | null>(null)
const file = ref<Types.File | null>(null)
const route = useRoute()
const key = ref<string>('')

const DECRYPT = () => {
  code.value = route.params.config as string
  file.value = decrypt(code.value, key.value)
}

onMounted(() => {
  code.value = route.params.config as string
})
</script>
<style lang="sass">
.viewer
  display: flex
  flex-direction: column
  gap: 20px
  padding: 20px
  width: 100vw
  overflow: hidden
  span
    word-wrap: break-word
  pre
    white-space: pre-wrap
  color: white !important
  *
    color: white !important
</style>