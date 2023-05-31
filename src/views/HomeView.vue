<script setup lang="ts">
import instance from '@/utils/axios'
import '@/test/my'

async function send() {
  const res = await instance.get('/api/getUserInfo')
  console.log(res)
}
</script>

<template>
  <main>home</main>
  <button @click="send">{{ '点我' }}</button>
</template>
