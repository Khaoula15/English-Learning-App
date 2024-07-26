<template>
  <div class="home">
    <h1>Welcome to the English Learning App</h1>
    <p>Learn English with our interactive lessons and exercises.</p>
    <button @click="startLearning">Start Learning</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startLearning = () => {
  router.push('/lessons')
}
</script>
