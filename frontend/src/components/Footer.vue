<!-- src/components/Footer.vue -->
<template>
  <footer class="English-Learning-App-footer">
    <div class="language-selector">
      <label for="language-select">{{ $t('language') }}:</label>
      <select id="language-select" v-model="$i18n.locale">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ch">中文</option>
        <option value="ar">العربية</option>
        <option value="ko">한국어</option>
        <option value="ja">日本語</option>
      </select>
    </div>
    <p>{{ $t('footerText') }}</p>
    <ChatbotPopup />
  </footer>
</template>

<script>
import { useI18n } from 'vue-i18n'
import ChatbotPopup from './ChatbotPopup.vue'

export default {
  name: 'Footer',
  components: {
    ChatbotPopup
  },
  setup () {
    const { t } = useI18n()
    return { t }
  }
}
</script>


<style scoped>
.app-footer {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
}

.language-selector {
  margin-bottom: 1rem;
}

select {
  margin-left: 0.5rem;
  padding: 0.25rem;
}
</style>
