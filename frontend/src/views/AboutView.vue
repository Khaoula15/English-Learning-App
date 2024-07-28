<template>
  <div class="about">
    <h1>{{ $t('about.title') }}</h1>
    <div class="content">
      <p>{{ $t('about.description') }}</p>
      <h2>{{ $t('about.features.title') }}</h2>
      <ul>
        <li>{{ $t('about.features.interactive') }}</li>
        <li>{{ $t('about.features.progress') }}</li>
        <li>{{ $t('about.features.premium') }}</li>
        <li>{{ $t('about.features.multilingual') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f0f8ff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
}

.content {
  text-align: left;
}

h1 {
  color: #ff4500;
}

h2 {
  color: #ff6347;
  margin-top: 2rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  color: #4682b4;
}

li::before {
  content: '✓';
  color: #ff1493;
  position: absolute;
  left: 0;
}
</style>

