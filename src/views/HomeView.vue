<script setup lang="ts">
import instanceAxios from '@/utils/axios'

async function send() {
  const res = await instanceAxios.get('/api/getUserInfo')
  console.log(res)
}
</script>

<template>
  <main>home</main>
  <button @click="send">{{ '点我' }}</button>
</template>
