<template>
  <div class="lessons">
    <h1>{{ $t('lessons') }}</h1>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <h2>{{ $t('lessonTitle', { number: lesson.id }) }}</h2>
        <p>{{ $t('lessonDescription') }}: {{ lesson.description }}</p>
        <router-link :to="'/lessons/' + lesson.id">{{ $t('startLesson') }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LessonsView',
  setup () {
    const lessons = ref([])
    const { t } = useI18n()

    onMounted(async () => {
      try {
        const response = await axios.get('/lessons')
        lessons.value = response.data
      } catch (error) {
        console.error('Error fetching lessons:', error)
      }
    })

    return { lessons, t }
  }
}
</script>

<style scoped>
.lessons ul {
  list-style-type: none;
  padding: 0;
}

.lessons li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
