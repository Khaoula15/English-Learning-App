<template>
  <div class="contact">
    <h1>{{ $t("contact.title") }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">{{ $t("contact.name") }}</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">{{ $t("contact.email") }}</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="message">{{ $t("contact.message") }}</label>
        <textarea id="message" v-model="message" required></textarea>
      </div>
      <button type="submit">{{ $t("contact.submit") }}</button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'ContactView',
  setup () {
    const name = ref('')
    const email = ref('')
    const message = ref('')
    const successMessage = ref('')
    const errorMessage = ref('')

    const submitForm = async () => {
      try {
        await axios.post('/api/contact', {
          name: name.value,
          email: email.value,
          message: message.value
        })
        successMessage.value = 'Your message has been sent successfully!'
        name.value = ''
        email.value = ''
        message.value = ''
      } catch (error) {
        errorMessage.value = 'An error occurred. Please try again later.'
      }
    }

    return {
      name,
      email,
      message,
      successMessage,
      errorMessage,
      submitForm
    }
  }
}
</script>

<style scoped>
.contact {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
