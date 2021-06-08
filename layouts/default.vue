<style>
:root {
  --faded_element: #05050510;
  --background: #F4F4F4;
  --foreground: white;
  --accent: #050505;
  --side_padding: 8%
}

/* HTML Elements */

html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--accent);
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased
}
* {
  box-sizing: border-box
}
body {
  background-color: var(--background);
  margin: 0
}
footer {
  display: flex;
  justify-content: space-between;
  margin: 8rem var(--side_padding) 0 var(--side_padding);
  padding: 2rem 0;
  border-top: 2px solid var(--accent);
}
h1, h2 {
  font-size: 2.6rem;
  letter-spacing: .2rem;
}
h3 {
  font-size: 1.6rem;
  letter-spacing: .2rem;
}
p, a {
  letter-spacing: 1px
}
a {
  width: fit-content;
  text-decoration: none;
  color: var(--accent);
  font-weight: bold;
  transition: .6s all cubic-bezier(.165, .84, .44, 1)
}
a:after {
  content: '';
  position: relative;
  display: flex;
  height: .6rem;
  width: 0%;
  opacity: .2;
  background-color: var(--accent);
  transform: translateY(-.6rem);
  transition: .4s all cubic-bezier(.165, .84, .44, 1)
}
a:hover {
  opacity: .6
}
a:hover:after {
  width: 100%
}

/* Text */
.text--tiny {
  font-size: .8rem
}

/* Spacers */
.spacer--xlarge {
  height: 12rem
}
.spacer--large {
  height: 8rem
}
.spacer--small {
  height: 4rem
}

/* Tailwind */
.no_margin {
  margin: 0
}

/* Navigation */
nav {
  display: flex;
  justify-content: space-between;
  padding: 4rem var(--side_padding)
}
#logo {
  width: 100px
}
#logo :is(rect, path) {
  fill: var(--accent);
}
</style>

<template>
  <div>
    <nav>
      <inline-svg id="logo" :src="require('~/assets/svg/logo.svg')" />
      <darkmode-toggle />
    </nav>
    <Nuxt />
    <footer>
      <p>
        <b>
          Mikey Lau
        </b>
      </p>
      <p>
        <b>Southampton</b>, United Kingdom
      </p>
    </footer>
  </div>
</template>

<script>
import DarkmodeToggle from '~/components/DarkmodeToggle'

export default {
  components: {
    DarkmodeToggle
  },
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
