<style scoped>
/* Introduction */
.introduction {
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--side_padding)
}
.introduction:after {
  content: '';
  height: 10rem;
  width: 40%;
  background-color: var(--faded_element);
  position: absolute;
  transform: translate(3rem, 8rem);
  z-index: -1
}
.introduction > img {
  width: 250px;
  margin-left: 4rem;
  filter: grayscale(100%) contrast(1.1)
}

/* Skills */
:is(.techstack, .frameworks, .projects) {
  display: grid;
  padding: 0 var(--side_padding)
}
:is(.techstack, .frameworks) {
  grid-template-columns: repeat(2, 1fr)
}
:is(.container--techstack, .container--frameworks) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: .8rem 0
}

/* Projects */
.container--projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem
}
.project {
  padding: 2rem;
  border: 3px solid var(--accent)
}
.project__logo {
  padding: 1rem;
  width: 100%;
  max-height: 6rem
}
.project__logo :is(rect, path) {
  fill: var(--accent)
}
.project__links {
  display: flex;
  margin-top: 2rem
}
.project__links > div:not(:last-child) {
  margin-right: 1rem
}

@media (max-width: 1440px) {
  .container--projects {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem
  }
}
@media (max-width: 1024px) {
  .container--projects {
    grid-template-columns: 1fr
  }
}
@media (max-width: 768px) {
  .introduction {
    display: grid
  }
  .introduction:after {
    width: 80%;
    transform: translate(2rem, 18rem)
  }
  .introduction,
  .techstack,
  .frameworks {
    grid-template-columns: 1fr;
    grid-gap: 2rem
  }
}
</style>

<template>
  <div>
    <div class="spacer--small" />
    <div class="introduction fade_on_view">
      <h1>
        Meet Mikey
      </h1>
      <img
        src="~/assets/me.jpg"
        alt="Mikey Lau"
      >
    </div>
    <div class="spacer--xlarge" />
    <div class="techstack">
      <h3 class="no_margin fade_on_view">
        Tech stack
      </h3>
      <div class="container--techstack">
        <div
          v-for="(item, itemIndex) in techStack"
          :key="`techstack_${itemIndex}`"
          class="fade_on_view"
        >
          <p class="no_margin">
            <b>
              {{ item }}
            </b>
          </p>
        </div>
      </div>
    </div>
    <div class="spacer--small" />
    <div class="frameworks">
      <h3 class="no_margin fade_on_view">
        Frameworks
      </h3>
      <div class="container--frameworks">
        <div
          v-for="(item, itemIndex) in frameworks"
          :key="`framework_${itemIndex}`"
          class="fade_on_view"
        >
          <p class="no_margin">
            <b>
              {{ item }}
            </b>
          </p>
        </div>
      </div>
    </div>
    <div class="spacer--large" />
    <div class="projects">
      <h2 class="fade_on_view">
        Projects
      </h2>
      <div class="container--projects">
        <div
          v-for="(project, projectIndex) in projects"
          :key="`project_${projectIndex}`"
          class="project fade_on_view"
        >
          <h3 class="no_margin">
            {{ project.title }}
          </h3>
          <p>
            {{ project.desc }}
          </p>
          <p class="text--tiny">
            {{ project.skills }}
          </p>
          <div class="project__links">
            <div
              v-for="(link, linkIndex) in project.links"
              :key="`link_${projectIndex}_${linkIndex}`"
            >
              <a
                v-if="!project.internalLink"
                :href="link.url"
                target="_blank"
              >
                {{ link.site }}
              </a>
              <nuxt-link
                v-else
                :to="link.url"
              >
                {{ link.site }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      techStack: ['HTML', 'CSS', 'Javascript', 'R', 'Python', 'C#', 'C++', 'C', 'Swift', 'Git'],
      frameworks: [ 'Vue.js', 'Vuex', 'Nuxt.js', 'Tensorflow/Keras', 'Firebase'],
      projects: [
        {
          title: 'Train In Blocks',
          desc: 'Using my background in the health and fitness industry, I\'ve built a web application with my business partner to help personal trainers manage their clientele and programmes.',
          skills: 'HTML, CSS, Javascript, Vue.js, Vuex, Nuxt.js',
          internalLink: false,
          links: [
            { site: 'Landing site', url: 'https://traininblocks.com/' },
            { site: 'App login', url: 'https://app.traininblocks.com/' }
          ]
        },
        {
          title: 'JKPT',
          desc: 'A client wanted a website for his personal training business. I was responsible for the entire branding, design, and the implementation of the website.',
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js',
          internalLink: false,
          links: [
            { site: 'Landing site', url: 'https://jkpt.netlify.app/' }
          ]
        },
        {
          title: 'Basic Economy',
          desc: 'I\'ve converted one of my old python projects (available from my GitHub) into a simpler web version using Javascript and SVGs. This is a basic simulation of an economy where locations will dispatch transporters to trade between them based on global scarcity and local prices.',
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js, Python',
          internalLink: true,
          links: [
            { site: 'Find out more', url: '/projects/basic-economy' }
          ]
        },
        {
          title: 'Code Syntaxer',
          desc: 'I\'ve built a custom syntaxer for this website to help me explain the code behind my projects.',
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js',
          internalLink: true,
          links: [
            { site: 'Find out more', url: '/projects/syntaxer' }
          ]
        }
      ]
    }
  },
  mounted () {
    window.clearInterval()
    this.$parent.$parent.initAnimate()
  }
}
</script>