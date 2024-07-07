// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
  vite: {
    ssr: {
      noExternal: ['@fortawesome/vue-fontawesome', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons'],
    },
  },
  pwa: {
    manifest: {
      name: 'My Nuxt App',
      short_name: 'NuxtApp',
      lang: 'en',
    },
  },
})
