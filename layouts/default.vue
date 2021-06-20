<style src='highlight.js/styles/default.css'></style>
<style>
/* Code block */
.hljs {
  background-color: var(--background);
  color: var(--accent)
}
pre code.hljs {
  font-size: .8rem
}

/* Root */
:root {
  --faded-element: #05050510;
  --background: #F4F4F4;
  --foreground: white;
  --accent: #050505;
  --side_padding: 8%;
  --left-content-padding: 25vw
}

/* Animate on view */
.fade_in {
  opacity: 0;
  animation: 1s fadeIn cubic-bezier(.165, .84, .44, 1) forwards
}
.delay {
  animation-delay: .6s
}
@keyframes fadeIn {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
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
  text-align: right;
  margin: 8rem 0 0 var(--left-content-padding);
  padding: 2rem;
  border-top: 2px solid var(--accent)
}
img {
  width: 100%
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
  transition: .6s opacity, .6s width, .1s transform cubic-bezier(.165, .84, .44, 1)
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
h1, h2, .text--large {
  font-size: 2.6rem
}
.text--small {
  font-size: 1.6rem
}
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
.no-margin {
  margin: 0
}

/* Navigation */
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  widows: 15vw;
  padding: 4rem 0;
  position: fixed
}
#logo {
  margin: 0 2rem;
  width: 80px
}
#logo :is(rect, path) {
  fill: var(--accent)
}
.toggle_wrapper {
  margin: 0 2rem
}
.current-view {
  text-align: center;
  font-size: .8rem;
  letter-spacing: 2px
}

/* Social links */
.social-links {
  display: flex
}
.social-links:not(.not-global) > a {
  margin: auto
}
.social-links > a:not(:last-child) {
  margin-right: 1rem
}
.social-links > a > svg path {
  fill: var(--accent)
}

/* Location */
.location > .city {
  font-weight: bold;
  margin-right: .2rem
}

/* Global repo */
.repo_link {
  display: flex;
  margin: 4rem var(--side_padding) 1rem auto
}
.repo_link > svg {
  margin-left: .6rem
}
.repo_link > svg > path {
  fill: var(--accent)
}

/* Global Explanation */
.container--explanation {
  display: grid;
  grid-gap: 4rem
}
.explanation {
  padding: 2rem;
  border: 3px solid var(--accent);
  margin: 0 var(--side_padding);
  overflow-x: auto
}

@media (max-width: 425px) {
  .explanation {
    border: none;
    padding: 0
  }
  .explanation:not(:last-child) {
    border-bottom: 3px solid var(--faded-element)
  }

  /* Footer */
  .location {
    text-align: right;
    display: grid;
    grid-gap: .2rem
  }
  .location > .city {
    margin-right: 0
  }
  .social-links > a {
    margin: 0
  }
}
</style>

<template>
  <div>
    <nav>
      <nuxt-link to="/" class="no_highlight">
        <inline-svg
          id="logo"
          :src="require('~/assets/svg/logo.svg')"
          aria-label="Mikey Lau logo"
        />
      </nuxt-link>
      <span class="current-view">
        {{ currentView }}
      </span>
      <darkmode-toggle />
    </nav>
    <main>
      <Nuxt />
      <footer>
        <div class="location">
          <span class="city">
            Wallingford
          </span>
          <span class="country">
            United Kingdom
          </span>
        </div>
      </footer>
    </main>
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
      currentView: 'Introduction',
      socials: [
        { svg: 'github', link: 'https://github.com/MikeyJL' },
        { svg: 'linkedin', link: 'https://www.linkedin.com/in/mikey-lau' },
        { svg: 'indeed', link: 'https://my.indeed.com/p/xjp92s2' }
      ]
    }
  }
}
</script>
