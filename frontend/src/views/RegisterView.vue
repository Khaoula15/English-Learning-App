<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const register = async () => {
      try {
        await axios.post('/auth/register', {
          name: name.value,
          email: email.value,
          password: password.value
        });
        this.$router.push('/login');
      } catch (err) {
        error.value = err.response.data.message;
      }
    };

    return { name, email, password, error, register };
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
}
</style>
