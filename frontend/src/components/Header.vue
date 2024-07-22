<template>
  <header>
    <nav>
      <div class="logo">
        <img src="@/assets/logo.png" alt="English Learning App" />
      </div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/lessons">Lessons</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/Payment">Payment</router-link></li>
        <li><router-link to="/Portfolio">Badr</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  background-color: #333;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 40px;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-left: 1rem;
}

a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: #555;
}

a.router-link-active {
  background-color: #007bff;
}
</style>
