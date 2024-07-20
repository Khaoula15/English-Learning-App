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
  name: 'LessonsPage',
  setup() {
    const lessons = ref([]);

    onMounted(async () => {
      const response = await axios.get('/lessons'); // Ensure this endpoint is correct
      lessons.value = response.data;
    });

    return { lessons };
  }
};
</script>

<style scoped>
.lessons {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #007bff;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: #e9ecef;
}
</style>

