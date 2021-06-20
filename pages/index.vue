<style scoped>
/* Overlay */
.overlay--v-line {
  position: fixed;
  top: 20vh;
  left: 15vw;
  height: 60vh;
  width: 4px;
  background: var(--accent)
}

/* Introduction */
#introduction {
  display: grid;
  grid-template-columns: 1fr .8fr;
  padding: 1rem 8vw 1rem var(--left-content-padding)
}
.introduction__header {
  width: fit-content;
  height: fit-content;
  margin: auto 3rem auto auto
}
.introduction__header > .social-links {
  justify-content: flex-end
}
#introduction > img {
  filter: contrast(1.1) grayscale(1);
  border-radius: 50%
}

/* Statement */
.statement {
  padding: 1rem 8vw 1rem var(--left-content-padding)
}

/* Techstack */
#techstack {
  background-color: var(--faded-element);
  padding: 6rem 8vw 6rem var(--left-content-padding)
}
.techstack__content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem
}

/* Projects */
#projects {
  display: grid;
  grid-gap: 6rem;
  padding: 1rem 8vw 1rem var(--left-content-padding)
}
.project__header {
  display: flex;
  justify-content: space-between
}
.project__header > svg {
  margin: auto 0
}
.project__links > div {
  width: fit-content
}
</style>

<template>
  <div id="home">
    <span class="overlay--v-line" />
    <div class="spacer--xlarge" />
    <div id="introduction">
      <div class="introduction__header">
        <h1 class="no-margin">
          Meet Mikey
        </h1>
        <div class="social-links not-global">
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
    <p class="text--large statement">
      Who doesn't love minimalism? The internet can be full of clutter. I don't blame you if you get frustrated with slow websites and applications.
    </p>
    <div class="spacer--xlarge" />
    <div id="techstack">
      <div class="techstack__content">
        <div
          v-for="(item, itemIndex) in techStack"
          :key="`techstack_${itemIndex}`"
        >
          <p class="text--large no-margin">
            <b>
              {{ item }}
            </b>
          </p>
        </div>
      </div>
    </div>
    <div class="spacer--large" />
    <div id="projects">
      <div
        v-for="(project, projectIndex) in projects"
        :key="`project_${projectIndex}`"
        class="project"
      >
        <div>
          <div class="project__header">
            <p class="text--small no-margin">
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
</template>

<script>
export default {
  data () {
    return {
      techStack: ['HTML', 'CSS', 'Javascript', 'C#', 'C++', 'Swift', 'Git', 'PHP', 'Vue.js', 'Vuex', 'Nuxt.js', 'Firebase', 'Laravel', 'Docker'],
      projects: [
        {
          developed: true,
          title: 'Train In Blocks',
          desc: 'Using my background in the health and fitness industry, I\'ve built a web application with my business partner to help personal trainers manage their clientele and programmes.',
          skills: 'HTML, CSS, Javascript, Vue.js, Vuex, Nuxt.js, PHP',
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
          title: 'EasyBnB',
          desc: `The focus of this project was to use PHP and Laravel with tools like Docker, S3, and MySQL. Currently, the project has basic functions like creating, editing, and deleting listings — as well as authentication. Future plans includes more styling and functions whilst keeping it simple.`,
          skills: 'HTML, CSS, Javascript, PHP, Laravel, Docker, S3, MySQL',
          internalLink: false,
          links: [
            { site: 'Website', url: 'https://easybnb.herokuapp.com/' },
            { site: 'Repo', url: 'https://github.com/MikeyJL/EasyBnB' }
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
  },
  mounted () {
    window.addEventListener('scroll', this.resolveScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.resolveScroll)
  },
  methods: {
    resolveScroll () {
      const TECHSTACK = document.getElementById('techstack').offsetTop - ((window.innerHeight - document.getElementById('techstack').offsetHeight))
      const PROJECTS = document.getElementById('projects').offsetTop
      const SCROLL = window.scrollY
      if (SCROLL > PROJECTS) {
        this.$parent.$parent.currentView = 'Projects'
      } else if (SCROLL > TECHSTACK) {
        this.$parent.$parent.currentView = 'Techstack'
      } else {
        this.$parent.$parent.currentView = 'Introduction'
      }
    }
  }
}
</script>