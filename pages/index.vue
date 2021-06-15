<style>
.animate_cog {
  -webkit-animation: 6s spin infinite linear;
  -moz-animation: 6s spin infinite linear;
  -ms-animation: 6s spin infinite linear;
  -o-animation: 6s spin infinite linear;
  animation: 6s spin infinite linear
}
@keyframes spin {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0)
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg)
  }
}
</style>

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
.introduction > div:first-child > h1 {
  margin-bottom: .6rem
}
.introduction > div:first-child > .social_links {
  justify-content: flex-end
}
.introduction > img {
  width: 250px;
  height: 250px;
  margin-left: 4rem;
  filter: grayscale(100%) contrast(1.2)
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
  display: grid;
  padding: 2rem;
  border: 3px solid var(--accent)
}
.project__header {
  display: flex;
  justify-content: space-between
}
.project__header > svg {
  margin: auto 0
}
.project__links {
  display: flex;
  margin-top: auto
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
  .introduction > div:first-child > .social_links {
    margin: auto 0
  }
}
@media (min-width: 425px) and (max-width: 768px) {
  .introduction > div:first-child {
    display: flex;
    justify-content: space-between
  }
}
@media (max-width: 425px) {
  .introduction > div:first-child > .social_links {
    justify-content: left
  }
  .projects > h2 {
    margin: 0
  }
  .container--projects {
    grid-gap: 0
  }
  .project {
    padding: 2rem 0;
    border: none
  }
  .project:not(:last-child) {
    border-bottom: 3px solid var(--faded_element)
  }
}
</style>

<template>
  <div>
    <div class="spacer--small" />
    <div class="introduction">
      <div>
        <h1 class="no_margin">
          Meet Mikey
        </h1>
        <div class="social_links not_global">
          <a
            v-for="(social, socialIndex) in $parent.$parent.socials"
            :key="`social${socialIndex}`"
            :href="social.link"
            :aria-label="social.svg"
            target="_blank"
            class="no_highlight"
            rel="noopener"
          >
            <inline-svg :src="require(`~/assets/svg/social/${social.svg}.svg`)" />
          </a>
        </div>
      </div>
      <img
        src="~/assets/me.jpg"
        alt="Mikey Lau"
      >
    </div>
    <div class="spacer--xlarge" />
    <div class="techstack">
      <p class="text--small no_margin">
        <b>
          Tech stack
        </b>
      </p>
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
      <p class="text--small no_margin">
        <b>
          Frameworks
        </b>
      </p>
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
          <div>
            <div class="project__header">
              <p class="text--small no_margin">
                <b>
                  {{ project.title }}
                </b>
              </p>
              <inline-svg
                :src="require(`~/assets/svg/${project.developed ? 'tick' : 'cog'}.svg`)"
                :class="{ animate_cog: !project.developed }"
              />
            </div>
            <p>
              {{ project.desc }}
            </p>
            <p class="text--tiny">
              {{ project.skills }}
            </p>
          </div>
          <div class="project__links">
            <div
              v-for="(link, linkIndex) in project.links"
              :key="`link_${projectIndex}_${linkIndex}`"
            >
              <a
                v-if="!project.internalLink"
                :href="link.url"
                target="_blank"
                rel="noopener"
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
      techStack: ['HTML', 'CSS', 'Javascript', 'R', 'Python', 'C#', 'C++', 'Swift', 'Git'],
      frameworks: [ 'Vue.js', 'Vuex', 'Nuxt.js', 'Tensorflow/Keras', 'Firebase', 'Unity'],
      projects: [
        {
          developed: true,
          title: 'Train In Blocks',
          desc: 'Using my background in the health and fitness industry, I\'ve built a web application with my business partner to help personal trainers manage their clientele and programmes.',
          skills: 'HTML, CSS, Javascript, Vue.js, Vuex, Nuxt.js',
          internalLink: false,
          links: [
            { site: 'Website', url: 'https://traininblocks.com/' },
            { site: 'App login', url: 'https://app.traininblocks.com/' }
          ]
        },
        {
          developed: true,
          title: 'Basic Economy',
          desc: 'I\'ve converted one of my old Python projects into a simpler web version using Javascript and SVGs. This is a basic simulation of an economy where locations will dispatch transporters to trade between them based on global scarcity and local prices.',
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js, Python',
          internalLink: true,
          links: [
            { site: 'Example', url: '/projects/basic-economy' }
          ]
        },
        {
          developed: false,
          title: 'Foodie social media',
          desc: `In this project, I've explored the Swift programming language to create a social media platform for foodies. I've integrated Firebase Auth and its Realtime Database using CocoaPod to serve as a user management system.`,
          skills: 'Swift, Firebase',
          internalLink: true,
          links: [
            { site: 'IOS example', url: '/projects/foodie-mobile' }
          ]
        },
        {
          developed: true,
          title: 'JKPT',
          desc: 'A client wanted a website for his personal training business. I was responsible for the entire branding, design, and the implementation of the website.',
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js',
          internalLink: false,
          links: [
            { site: 'Website', url: 'https://jkpt.netlify.app/' }
          ]
        }
      ]
    }
  }
}
</script>