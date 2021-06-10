export default {
  target: 'static',
  head: {
    title: 'Mikey Lau',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'apple-mobile-web-app-title', content: 'Mikey Lau' },
      { name: 'application-name', content: 'Mikey Lau' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/main.css'
  ],
  plugins: [
    '~/plugins/vue-inline-svg.js'
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    '@nuxt/content',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyCBFUrQhoGsqW9n-D1nqI-HiDokKhzj2GQ",
          authDomain: "mikey-lau.firebaseapp.com",
          projectId: "mikey-lau",
          storageBucket: "mikey-lau.appspot.com",
          messagingSenderId: "981197468331",
          appId: "1:981197468331:web:31a98499a60f9cf8a93dee"
        },
        services: {
          auth: true,
          firestore: true
        }
      }
    ]
  ],
  build: {
  }
}
