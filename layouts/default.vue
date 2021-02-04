<style>

/* Wrapper */

html {
  font-family: Helvetica, sans-serif, Arial;
  font-size: 16px;
  line-height: 1.4;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased
}
* {
  box-sizing: border-box
}
body {
  margin: 0;
  background-color: #F8F8F8
}
footer {
  height: 8rem
}
.body_padding {
  padding: 0 8%;
}
.spacer--large {
  height: 8rem
}
.spacer--small {
  height: 4rem
}

/* Text */

.text--large, h1 {
  font-size: 2.6rem;
  letter-spacing: .2rem
}
.text--small, h2 {
  font-size: 1.6rem;
  letter-spacing: .2rem
}
h1, h2 {
  margin: 2rem 0
}
p {
  margin: 1rem 0
}
a {
  color: black;
  text-decoration: none
}

/* Tailwinds */

.no_margin {
  margin: 0
}
.bold {
  font-weight: bold
}
.grey {
  color: grey
}
.text_center {
  text-align: center
}
.letter_spacing {
  letter-spacing: .2rem
}

/* Anim */

.fade_in {
  animation: 1s fadeIn cubic-bezier(.165, .84, .44, 1)
}
@keyframes fadeIn {
  from  {
    opacity: 0
  }
  to {
    opacity: 1
  }
}

@media (max-width: 576px) {
  .text--large, h1 {
    font-size: 2.2rem;
    letter-spacing: .2rem
  }
  .text--small, h2 {
    font-size: 1.2rem;
    letter-spacing: .2rem
  }
}
</style>

<template>
  <div>
    <Nuxt />
    <footer></footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      metaHelper: {
        title: 'Mikey Lau',
        description: '',
        url: 'https://mikeylau.uk'
      }
    }
  },
  head () {
    return {
      title: this.metaHelper.title,
      meta: [
        { hid: 'description', name: 'description', content: this.metaHelper.description },
        { hid: 'og:title', name: 'og:title', content: this.metaHelper.title },
        { hid: 'og:description', name: 'og:description', content: this.metaHelper.description },
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: this.metaHelper.url }
      ]
    }
  }
}
</script>