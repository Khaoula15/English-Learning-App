<template>
  <div class="lesson-detail" v-if="lesson">
    <h1>{{ $t('lessonTitle', { number: lesson.id }) }}</h1>
    <p>{{ lesson.description }}</p>
    <h2>{{ $t('flashcards') }}</h2>
    <div class="flashcards-container">
      <div
        v-for="flashcard in flashcards"
        :key="flashcard.id"
        class="flashcard"
        :class="{ flipped: flashcard.isFlipped }"
      >
        <div class="flashcard-inner">
          <div class="flashcard-front" @click="flipCard(flashcard)">
            <h3>{{ flashcard.word }}</h3>
            <p>{{ flashcard.definition }}</p>
          </div>
          <div class="flashcard-back">
            <div class="flashcard-content" @click="flipCard(flashcard)">
              <h3>{{ flashcard.question }}</h3>
            </div>
            <div class="input-area" @click.stop>
              <input
                v-model="flashcard.userDefinition"
                @keyup.enter="checkDefinition(flashcard)"
                :placeholder="$t('typeAnswer')"
                :disabled="flashcard.isChecked"
              >
              <button @click.stop="checkDefinition(flashcard)" :disabled="flashcard.isChecked" class="submit-btn">
                {{ $t('submit') }}
              </button>
              <p v-if="flashcard.isChecked" :class="{ 'correct': flashcard.isCorrect, 'incorrect': !flashcard.isCorrect }">
                {{ flashcard.isCorrect ? $t('correct') : $t('incorrect') }}
              </p>
              <button v-if="flashcard.isChecked" @click.stop="resetFlashcard(flashcard)" class="reset-btn">
                {{ $t('tryAgain') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/lessons" class="back-link">{{ $t('backToLessons') }}</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'LessonDetailView',
  setup () {
    const lesson = ref(null)
    const flashcards = ref([])
    const route = useRoute()
    const router = useRouter()

    const flipCard = (flashcard) => {
      flashcard.isFlipped = !flashcard.isFlipped
    }

    const checkDefinition = async (flashcard) => {
      if (!flashcard.userDefinition) return

      try {
        const response = await axios.post(`/lessons/${route.params.id}/flashcards/${flashcard.id}/check`, {
          userDefinition: flashcard.userDefinition
        })
        flashcard.isCorrect = response.data.isCorrect
        flashcard.isChecked = true
      } catch (error) {
        console.error('Error checking definition:', error)
      }
    }

    const resetFlashcard = (flashcard) => {
      flashcard.userDefinition = ''
      flashcard.isChecked = false
      flashcard.isCorrect = null
    }

    onMounted(async () => {
      const lessonId = route.params.id
      try {
        const lessonResponse = await axios.get(`/lessons/${lessonId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        })
        lesson.value = lessonResponse.data
        const flashcardResponse = await axios.get(`/lessons/${lessonId}/flashcards`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        })
        flashcards.value = flashcardResponse.data.map(card => ({
          ...card,
          isFlipped: false,
          userDefinition: '',
          isChecked: false,
          isCorrect: null
        }))
      } catch (error) {
        if (error.response && error.response.status === 403) {
          router.push('/payment')
        } else {
          console.error('Error fetching lesson data:', error)
        }
      }
    })

    return { lesson, flashcards, flipCard, checkDefinition, resetFlashcard }
  }
}
</script>

<style scoped>
.lesson-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.flashcards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.flashcard {
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  cursor: pointer;
}

.flashcard:hover .flashcard-inner {
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.flashcard-front {
  background-color: #f0f8ff;
  color: #333;
}

.flashcard-back {
  background-color: #e6f3ff;
  color: #333;
  transform: rotateY(180deg);
}

.flashcard-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.input-area {
  width: 100%;
}

h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}

button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.submit-btn:hover {
  background-color: #45a049;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}

.reset-btn:hover {
  background-color: #da190b;
}

.correct {
  color: #4CAF50;
  font-weight: bold;
}

.incorrect {
  color: #f44336;
  font-weight: bold;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #008CBA;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #007B9A;
}
</style>
