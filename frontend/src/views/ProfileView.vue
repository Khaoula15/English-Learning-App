<template>
  <div class="profile">
    <h1>{{ $t('profile') }}</h1>
    <div v-if="user">
      <p><strong>{{ $t('name') }}:</strong> {{ user.name }}</p>
      <p><strong>{{ $t('email') }}:</strong> {{ user.email }}</p>
      <h2>{{ $t('freeLessons') }}</h2>
      <ul>
        <li v-for="lesson in freeLessons" :key="lesson.id">
          <router-link :to="`/lessons/${lesson.id}`">{{ lesson.title }}</router-link>
        </li>
      </ul>
      <h2>{{ $t('premiumLesson') }}</h2>
      <div v-if="premiumLesson">
        <p>{{ premiumLesson.title }}</p>
        <button v-if="!hasPremiumAccess" @click="upgradeToPremium">{{ $t('upgradeToPremium') }}</button>
        <router-link v-else :to="`/lessons/${premiumLesson.id}`">{{ $t('startPremiumLesson') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ProfileView',
  setup () {
    const store = useStore()
    const { t } = useI18n()

    const user = computed(() => store.state.user)
    const freeLessons = computed(() => store.getters.freeLessons)
    const premiumLesson = computed(() => store.getters.premiumLesson)
    const hasPremiumAccess = computed(() => store.getters.hasPremiumAccess)

    const upgradeToPremium = () => {
      // Implement premium upgrade logic here
      console.log('Upgrade to premium')
    }

    return {
      user,
      freeLessons,
      premiumLesson,
      hasPremiumAccess,
      upgradeToPremium,
      t
    }
  }
}
</script>
