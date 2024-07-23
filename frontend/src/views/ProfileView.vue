<template>
  <div class="profile">
    <h1>{{ $t('profile') }}</h1>
    <div v-if="user">
      <p>{{ $t('name') }}: {{ user.name }}</p>
      <p>{{ $t('email') }}: {{ user.email }}</p>
      <h2>{{ $t('progress') }}</h2>
      <ul>
        <li v-for="(progress, lessonId) in user.progress" :key="lessonId">
          {{ $t('lessonTitle', { number: lessonId }) }}: 
          {{ progress.completed ? $t('completed') : $t('inProgress') }}
          ({{ $t('score') }}: {{ progress.score }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'ProfileView',
  setup() {
    const user = ref(null)

    onMounted(async () => {
      try {
        const response = await axios.get('/users/profile', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        })
        user.value = response.data
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    })

    return { user }
  }
}
</script>

