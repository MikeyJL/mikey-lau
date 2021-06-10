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
  padding: 0 var(--side_padding);
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
.project__links > a:not(:last-child) {
  margin-right: 1rem
}

@media (max-width: 1440px) {
  .container--projects {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem
  }
}
</style>

<template>
  <div>
    <div class="spacer--small" />
    <div class="introduction">
      <h1>Meet Mikey</h1>
      <img src="~/assets/me.jpg" alt="Mikey Lau">
    </div>
    <div class="spacer--xlarge" />
    <div class="techstack">
      <h3 class="no_margin">
        Tech stack
      </h3>
      <div class="container--techstack">
        <div
          v-for="(item, itemIndex) in techStack"
          :key="`techstack_${itemIndex}`"
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
      <h3 class="no_margin">
        Frameworks
      </h3>
      <div class="container--frameworks">
        <div
          v-for="(item, itemIndex) in frameworks"
          :key="`framework_${itemIndex}`"
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
      <h2>
        Projects
      </h2>
      <div class="container--projects">
        <div
          v-for="(project, projectIndex) in projects"
          :key="`project_${projectIndex}`"
          class="project"
        >
          <inline-svg
            :src="require(`~/assets/svg/${project.svg}.svg`)"
            class="project__logo"
          />
          <p>
            {{ project.desc }}
          </p>
          <p class="text--tiny">
            {{ project.skills }}
          </p>
          <div class="project__links">
            <a
              v-for="(link, linkIndex) in project.links"
              :key="`link_${projectIndex}_${linkIndex}`"
              :href="link.url"
              target="_blank"
            >
              {{ link.site }}
            </a>
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
      techStack: ['HTML', 'CSS', 'Javascript', 'R', 'Python', 'C#', 'C++', 'C', 'Swift' ],
      frameworks: [ 'Vue.js', 'Vuex', 'Nuxt.js', 'Tensorflow/Keras'],
      projects: [
        {
          svg: 'traininblocks',
          desc: 'Using my background in the health and fitness industry, ...',
          skills: 'HTML, CSS, Javascript, Vue.js, Vuex, Nuxt.js',
          links: [
            { site: 'Landing site', url: 'https://traininblocks.com/' },
            { site: 'App login', url: 'https://app.traininblocks.com/' }
          ]
        },
        {
          svg: 'jkpt',
          desc: 'Just a website',
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js',
          links: [
            { site: 'Landing site', url: 'https://jkpt.netlify.app/' }
          ]
        }
      ]
    }
  }
}
</script>