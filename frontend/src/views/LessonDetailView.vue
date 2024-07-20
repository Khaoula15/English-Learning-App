<template>
  <div class="lesson-detail" v-if="lesson">
    <h1>{{ lesson.title }}</h1>
    <p>{{ lesson.description }}</p>
    <h2>Flashcards</h2>
    <div class="flashcards-container">
      <div 
        v-for="flashcard in flashcards" 
        :key="flashcard.id" 
        class="flashcard" 
        :class="{ flipped: flashcard.isFlipped }"
        @click="flipCard(flashcard)"
      >
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <h3>{{ flashcard.word }}</h3>
          </div>
          <div class="flashcard-back">
            <p>{{ flashcard.definition }}</p>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/lessons">Back to Lessons</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'LessonDetailView',
  setup() {
    const lesson = ref(null);
    const flashcards = ref([]);
    const route = useRoute();

    const flipCard = (flashcard) => {
      flashcard.isFlipped = !flashcard.isFlipped;
    };

    onMounted(async () => {
      const lessonId = route.params.id;

      try {
        // Fetch lesson details
        const lessonResponse = await axios.get(`/lessons/${lessonId}`);
        lesson.value = lessonResponse.data;

        // Fetch flashcards for the specific lesson
        const flashcardResponse = await axios.get(`/lessons/${lessonId}/flashcards`);
        flashcards.value = flashcardResponse.data.map(card => ({
          ...card,
          isFlipped: false
        }));
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        // Handle error (e.g., show error message to user)
      }
    });

    return { lesson, flashcards, flipCard };
  }
};
</script>

<style scoped>
.lesson-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.flashcards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.flashcard {
  width: 200px;
  height: 120px;
  perspective: 1000px;
  cursor: pointer;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.flashcard-front {
  background-color: #f8f8f8;
}

.flashcard-back {
  background-color: #e8e8e8;
  transform: rotateY(180deg);
}

h3, p {
  margin: 0;
}
</style>
