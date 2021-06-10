<style>
:root {
  --faded_element: #05050510;
  --background: #F4F4F4;
  --foreground: white;
  --accent: #050505;
  --side_padding: 8%
}

/* Animate on view */
.fade_on_view {
  opacity: 0;
  transition: 1s all cubic-bezier(.165, .84, .44, 1)
}
.fade_on_view.active {
  opacity: 1
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
  border-top: 2px solid var(--accent)
}
h1, h2 {
  font-size: 2.6rem
}
h3 {
  font-size: 1.6rem
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
a:not(.no_highlight):after {
  content: '';
  position: relative;
  display: flex;
  height: .6rem;
  width: 0%;
  opacity: .2;
  background-color: var(--accent);
  transform: translateY(-.6rem);
  transition: .6s opacity, .1s transform cubic-bezier(.165, .84, .44, 1)
}
a:hover {
  opacity: .6
}
a:not(.no_highlight):hover:after {
  width: 100%
}
a.no_highlight:active {
  transform: scale(.9)
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
  fill: var(--accent)
}

/* Social links */
.social_links {
  display: flex
}
.social_links > a {
  margin: auto
}
</style>

<template>
  <div>
    <page-view-bar />
    <nav>
      <nuxt-link to="/" class="no_highlight">
        <inline-svg
          id="logo"
          class="fade_on_view"
          :src="require('~/assets/svg/logo.svg')"
        />
      </nuxt-link>
      <darkmode-toggle class="fade_on_view" />
    </nav>
    <Nuxt />
    <footer>
      <div class="social_links fade_on_view">
        <a
          v-for="(social, socialIndex) in socials"
          :key="`social${socialIndex}`"
          :href="social.link"
          target="_blank"
          class="no_highlight"
        >
          <inline-svg :src="require(`~/assets/svg/social/${social.svg}.svg`)" />
        </a>
      </div>
      <p class="fade_on_view">
        <b>Southampton</b>, United Kingdom
      </p>
    </footer>
  </div>
</template>

<script>
import DarkmodeToggle from '~/components/DarkmodeToggle'
import PageViewBar from '../components/PageViewBar.vue'

export default {
  components: {
    DarkmodeToggle,
    PageViewBar
  },
  data () {
    return {
      metaHelper: {
        title: 'Mikey Lau',
        description: '',
        url: 'https://mikeylau.uk'
      },
      socials: [
        { svg: 'github', link: 'https://github.com/MikeyJL' }
      ]
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
  },
  mounted () {
    setTimeout(() => {
      const OBSERVER = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      }, { threshold: .9 })
      document.querySelectorAll('.fade_on_view').forEach((svgItem) => {
        OBSERVER.observe(svgItem)
      })
    }, 1000)
  }
}
</script>
