import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    updatePremiumAccess(state) {
      if (state.user) {
        state.user.hasPremiumAccess = true;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
        // After successful login, fetch additional user data if needed
        await dispatch('fetchUserData');
        return user;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
    },
    async updatePremiumAccess({ commit }) {
      try {
        await axios.post('/payments/update-premium-access');
        commit('updatePremiumAccess');
      } catch (error) {
        console.error('Failed to update premium access:', error);
        throw error;
      }
    },
    async fetchUserData({ commit }) {
      try {
        const response = await axios.get('/auth/user');
        commit('setUser', response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        commit('setUser', null);
        commit('setToken', null);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    hasPremiumAccess: (state) => (state.user ? state.user.hasPremiumAccess : false),
  },
});

