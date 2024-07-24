<template>
  <div class="lessons">
    <h1>{{ $t('lessons') }}</h1>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <h2>{{ lesson.title }}</h2>
        <p>{{ $t('lessonDescription') }}: {{ lesson.description }}</p>
        <router-link :to="'/lessons/' + lesson._id">{{ $t('startLesson') }}</router-link>
        <span v-if="lesson.isPremium" class="premium-badge">Premium</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LessonsView',
  setup () {
    const store = useStore()
    const { t } = useI18n()
    const lessons = computed(() => store.getters.allLessons)

    onMounted(() => {
      store.dispatch('fetchLessons')
    })

    return { lessons, t }
  }
}
</script>

<style scoped>
.lessons {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #e9e9e9;
}

h2 {
  margin-bottom: 10px;
}

.start-lesson-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.start-lesson-btn:hover {
  background-color: #0056b3;
}

.premium-badge {
  background-color: gold;
  color: black;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left: 10px;
  font-size: 0.8em;
}
</style>
