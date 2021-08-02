<style src='highlight.js/styles/default.css'></style>
<style lang="scss">
/* Code block */
.hljs {
  background-color: var(--background);
  color: var(--accent);
}
pre code.hljs {
  font-size: .8rem;
}

/* Root */
:root {
  --faded-element: #05050510;
  --background: #F4F4F4;
  --foreground: white;
  --accent: #050505;
  --left-content-padding: 25vw;
  --low-shadow: 0 0 20px 10px var(--faded-element);
}

/* Animate on view */
.fade-on-view {
  opacity: 0;
  transition: .6s all cubic-bezier(.165, .84, .44, 1);
}
.fade-in {
  opacity: 0;
  animation: 1s fadeIn cubic-bezier(.165, .84, .44, 1) forwards;
}
.delay {
  animation-delay: .6s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Overlay */
@media (min-width: 1025px) {
  .overlay--v-line {
    position: fixed;
    top: 20vh;
    left: 15vw;
    height: 60vh;
    width: 3px;
    background: var(--accent);
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
  -webkit-font-smoothing: antialiased;
}
* {
  box-sizing: border-box;
}
body {
  background-color: var(--background);
  margin: 0;
}
footer {
  text-align: right;
  margin: 8rem 0 0 var(--left-content-padding);
  padding: 2rem;
  border-top: 2px solid var(--accent);
}
img {
  width: 100%;
}
a {
  width: fit-content;
  text-decoration: none;
  color: var(--accent);
  font-weight: bold;
  transition: .6s all cubic-bezier(.165, .84, .44, 1);

  &:not(.no_highlight):after {
    content: '';
    position: relative;
    display: flex;
    height: .6rem;
    width: 0%;
    opacity: .2;
    background-color: var(--accent);
    transform: translateY(-.6rem);
    transition: .6s opacity, .6s width, .1s transform cubic-bezier(.165, .84, .44, 1);
  }
  &:hover {
    opacity: .6;
  }
  &:not(.no_highlight):hover:after {
    width: 100%;
  }
  &.no_highlight:active {
    transform: scale(.9);
  }
}
code.code-label {
  background-color: var(--faded-element);
}

/* Text */
h1, h2, .text--large {
  letter-spacing: 1px;
  font-size: calc(30px + (36 - 30) * ((100vw - 300px) / (1600 - 300)));
}
.text--small {
  font-size: calc(20px + (26 - 20) * ((100vw - 300px) / (1600 - 300)));
}
p {
  font-size: calc(14px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text--tiny {
  font-family: monospace;
  letter-spacing: 1px;
  font-size: calc(12px + (14 - 12) * ((100vw - 300px) / (1600 - 300)));
}

/* Spacers */
.spacer--xlarge {
  height: 12rem;
}
.spacer--large {
  height: 8rem;
}
.spacer--small {
  height: 4rem;
}

/* Tailwind */
.no-margin {
  margin: 0;
}

/* Navigation */
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 15vw;
  max-width: 200px;
  padding: 4rem 0;
  z-index: 1;
  position: fixed;

  > a:first-child {
    margin: 0 auto;
  }
  .current-view {
    width: fit-content;
    margin: 0 auto;
    text-align: center;
  }
}
#logo {
  margin: 0 2rem;
  width: 80px;

  :is(rect, path) {
    fill: var(--accent);
  }
}

/* Social links */
.social-links {
  display: flex;

  &:not(.not-global) > a {
    margin: auto;
  }
  > a:not(:last-child) {
    margin-right: 1rem;
  }
  > a > svg path {
    fill: var(--accent);
  }
}

/* Location */
.location > .city {
  font-weight: bold;
  margin-right: .2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  :root {
    --left-content-padding: 8vw;
  }
  nav {
    flex-direction: row;
    height: fit-content;
    padding: 2rem 0;
    width: 100vw;
    max-width: 100%;
    background-color: var(--background);
    box-shadow: 0 0 20px 10px rgb(0, 0, 0, .03);

    .current-view {
      margin: auto;
    }
  }
}
@media (max-width: 768px) {
  /* Nav */
  nav {
    display: flex;
    flex-direction: row;

    #logo {
      margin: 0 auto 0 8vw;
    }

    > a:first-child {
      margin: 0;
    }
  }
  .current-view {
    display: none;
  }
}
@media (max-width: 425px) {
  /* Footer */
  .location {
    text-align: right;
    display: grid;
    grid-gap: .2rem;

    > .city {
      margin-right: 0;
    }
  }
  .social-links > a {
    margin: 0;
  }
}
</style>

<template>
  <div>
    <span class="overlay--v-line" />
    <nav class="fade-in">
      <nuxt-link to="/" class="no_highlight">
        <inline-svg
          id="logo"
          :src="require('~/assets/svg/logo.svg')"
          aria-label="Mikey Lau logo"
        />
      </nuxt-link>
      <span class="current-view text--tiny">
        {{ currentView }}
      </span>
      <darkmode-toggle />
    </nav>
    <main class="fade-in delay">
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

<script lang="ts">
import Vue from 'vue'
import DarkmodeToggle from '~/components/DarkmodeToggle.vue'

export default Vue.extend({
  components: {
    DarkmodeToggle
  },
  data () {
    return {
      currentView: 'Introduction'
    }
  }
})
</script>
