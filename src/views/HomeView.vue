<script setup lang="ts">
import instance from '@/utils/axios'

async function send() {
  const res = await instance.get('/api/getUserInfo')
  console.log(res)
  //const res = await axios.get('/api/getUserInfo', {})
}
</script>

<template>
  <main>home</main>
  <button @click="send">{{ '点我' }}</button>
</template>
