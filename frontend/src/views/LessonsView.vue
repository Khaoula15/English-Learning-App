<template>
  <div class="lessons">
    <h1>Lessons</h1>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <router-link :to="`/lessons/${lesson.id}`">{{ lesson.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'LessonsPage', // Corresponds to the router name
  setup() {
    const lessons = ref([]);

    onMounted(async () => {
      const response = await axios.get('/lessons');
      lessons.value = response.data;
    });

    return { lessons };
  }
};
</script>

<style scoped>
/* Add your lessons page styles here */
</style>
