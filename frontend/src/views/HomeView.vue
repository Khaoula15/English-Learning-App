<template>
  <div class="home">
    <h1>Welcome to the English Learning App</h1>
    <p>Learn English with our interactive lessons and exercises.</p>
    <button @click="startLearning">Start Learning</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HomePage',
  setup () {
    const router = useRouter()

    const startLearning = () => {
      router.push('/lessonDetailView')
    }

    return { startLearning }
  }
}
</script>

<style scoped>
/* Add your home page styles here */
</style>
