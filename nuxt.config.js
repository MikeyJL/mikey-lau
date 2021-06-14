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
      { hid: 'description', name: 'description', content: 'Professional, modern, and fast web and native development made easy. Get in touch and see how I can help you create more value with your digital products.' },
      { name: 'apple-mobile-web-app-title', content: 'Mikey Lau' },
      { name: 'application-name', content: 'Mikey Lau' },
      { name: 'msapplication-TileColor', content: '#F4F4F4' },
      { name: 'theme-color', content: '#F4F4F4' }
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
  ],
  build: {
  }
}
