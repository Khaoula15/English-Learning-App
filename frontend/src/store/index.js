import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    lessons: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    setUser (state, user) {
      state.user = user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },
    setLessons (state, lessons) {
      state.lessons = lessons
    }
  },
  actions: {
    async login ({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials)
        const { token, user } = response.data
        commit('setToken', token)
        commit('setUser', user)
        axios.defaults.headers.common['x-auth-token'] = token
        await dispatch('fetchLessons')
        router.push('/profile')
        return user
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async register ({ commit }, credentials) {
      try {
        await axios.post('/auth/register', credentials)
        router.push('/login')
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    async fetchLessons ({ commit }) {
      try {
        const response = await axios.get('/lessons')
        commit('setLessons', response.data)
      } catch (error) {
        console.error('Failed to fetch lessons:', error)
      }
    },
    logout ({ commit }) {
      commit('setToken', null)
      commit('setUser', null)
      delete axios.defaults.headers.common['x-auth-token']
      router.push('/login')
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    hasPremiumAccess: state => state.user ? state.user.hasPremiumAccess : false,
    allLessons: state => state.lessons,
    freeLessons: state => state.lessons.filter(lesson => !lesson.isPremium),
    premiumLessons: state => state.lessons.filter(lesson => lesson.isPremium)
  }
})
