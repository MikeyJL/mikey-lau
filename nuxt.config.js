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
      { hid: 'og:title', name: 'og:title', content: 'Mikey Lau' },
      { hid: 'og:description', name: 'og:description', content: 'Professional, modern, and fast web and native development made easy. Get in touch and see how I can help you create more value with your digital products.' },
      { name: 'apple-mobile-web-app-title', content: 'Mikey Lau' },
      { name: 'application-name', content: 'Mikey Lau' },
      { name: 'msapplication-TileColor', content: '#F4F4F4' },
      { name: 'theme-color', content: '#F4F4F4' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'canonical', rel: 'canonical', href: 'https://mikeylau.uk' }
    ]
  },
  css: [
    '~/assets/main.scss'
  ],
  plugins: [
    '~/plugins/vue-highlight.ts',
    '~/plugins/vue-inline-svg.ts'
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
  ],
  build: {
  }
}
