<script setup lang="ts">
import instance from '@/utils/axios'

async function send() {
  const res = await instance.get('/api/getUserInfo')
  console.log(res)
}
// import '@/test/TypeScript学习'
</script>

<template>
  <main>home</main>
  <button @click="send">{{ '点我' }}</button>
</template>
