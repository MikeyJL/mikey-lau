<style lang="scss" scoped>
/* Cog */
.cog {
  animation: 6s cogSpin linear infinite;
}
@keyframes cogSpin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Horizontal */
hr {
  border: 1px solid var(--faded-element);
  margin-left: var(--left-content-padding);
}

/* Introduction */
#introduction {
  display: grid;
  grid-template-columns: 1fr .8fr;
  padding: 1rem 8vw 1rem var(--left-content-padding);

  > .introduction__header {
    width: fit-content;
    height: fit-content;
    margin: auto 3rem auto auto;
    display: grid;
    grid-gap: .6rem;

    > .social-links {
      justify-content: flex-end;
    }
  }

  img {
    height: 300px;
    width: 300px;
    filter: contrast(1.1) grayscale(1);
    border-radius: 50%;
  }
}

/* Statement */
.statement {
  padding: 1rem 8vw 1rem var(--left-content-padding);
}

/* Techstack */
#techstack {
  background-color: var(--faded-element);
  padding: 6rem 8vw 6rem var(--left-content-padding);
}
.techstack__content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

/* Projects */
#projects {
  display: grid;
  grid-gap: 6rem;
  padding: 1rem 8vw 1rem var(--left-content-padding);

  .project__header {
    display: flex;
    justify-content: space-between;
  }

  > svg {
    margin: auto 0;
  }

  .project__links {
    display: flex;
    > div {
      width: fit-content;
    }
    > div:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

/* Education */
#education {
  display: grid;
  grid-gap: 4rem;
  padding: 1rem 8vw 1rem var(--left-content-padding);
}
#education > div > h3 {
  margin: .8rem 0;
}
#education > div > p {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  #introduction {
    display: flex;
    flex-direction: column-reverse;

    > .introduction__header {
      display: flex;
      flex-direction: column;
      margin: auto;

      > .social-links {
        margin: 1rem auto auto auto;
      }
    }

    img {
      display: flex;
      margin: auto;
      padding: 2rem;
    }
  }

  .techstack__content {
    grid-template-columns: repeat(2, 1fr);

    p {
      text-align: center;
      font-size: 2rem;
    }
  }
}
@media (max-width: 576px) {
  .techstack__content p {
    font-size: 1.8rem;
  }
}
</style>

<template>
  <div id="home">
    <div class="spacer--xlarge" />
    <div id="introduction" class="fade-on-view">
      <div class="introduction__header">
        <h1 class="no-margin">
          Meet Mikey
        </h1>
        <div class="social-links not-global">
          <a
            v-for="(social, socialIndex) in socials"
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
      <div>
        <img
          src="~/assets/me.jpg"
          alt="Mikey Lau"
        >
        <cube-model />
      </div>
    </div>
    <div class="spacer--xlarge" />
    <p class="text--large statement fade-on-view">
      Who doesn't love minimalism? The internet can be cluttered with information. I'm a full-stack developer with a passion for websites, applications, and data. My philosopy is to focus on speed, functionality, and simplicity — creating value through one line of code at a time.
    </p>
    <div class="spacer--xlarge" />
    <div id="techstack" class="fade-on-view">
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
    <div id="projects" class="fade-on-view">
      <div
        v-for="(project, projectIndex) in projects"
        :key="`project_${projectIndex}`"
        class="project"
      >
        <div class="project__content">
          <div class="project__header">
            <p class="text--small no-margin">
              <b>
                {{ project.title }}
              </b>
            </p>
            <inline-svg
              :src="require(`~/assets/svg/${project.developed ? 'tick' : 'cog'}.svg`)"
              :class="{ cog: !project.developed }"
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
    <div class="spacer--small" />
    <hr>
    <div class="spacer--small" />
    <div id="education">
      <div
        v-for="(item, itemIndex) in education"
        :key="`education_${itemIndex}`"
      >
        <p class="text--tiny">
          {{ item.time }}
        </p>
        <h3>
          {{ item.degree }}
        </h3>
        <p>
          {{ item.grade }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CubeModel from '~/components/CubeModel.vue'

export default {
  components: {
    CubeModel
  },
  data () {
    return {
      socials: [
        { svg: 'github', link: 'https://github.com/MikeyJL' },
        { svg: 'linkedin', link: 'https://www.linkedin.com/in/mikey-lau' },
        { svg: 'indeed', link: 'https://my.indeed.com/p/xjp92s2' }
      ],
      techStack: ['HTML', 'CSS', 'Javascript', 'C#', 'C++', 'Python', 'R', 'Swift', 'Git', 'PHP', 'Vue.js', 'Vuex', 'Nuxt.js', 'Firebase', 'Laravel', 'Docker'],
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
            // { site: 'Website', url: 'https://easybnb.herokuapp.com/' },
            // { site: 'Repo', url: 'https://github.com/MikeyJL/EasyBnB' }
          ]
        },
        {
          developed: true,
          title: 'Space Satellites',
          desc: `After discovering a cool dataset of satellites launched globally, I've decided to create a quick visualisation of each orbit adjusted with its degree of inclination from the near-equatorial orbit.`,
          skills: 'HTML, CSS, Javascript, Vue.js, Nuxt.js',
          internalLink: true,
          links: [
            { site: 'Example', url: '/projects/space-satellites' }
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
      ],
      education: [
        {
          degree: 'MSc Applied AI and Data Science',
          grade: 'Pending',
          time: 'Sep 21 — Jun 22'
        },
        {
          degree: 'BSc (Hons) Fitness and Personal Training',
          grade: '1st class',
          time: 'Sep 18 — Jun 21'
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.resolveScroll)
    this.resolveScroll()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.resolveScroll)
  },
  methods: {
    resolveScroll () {
      const TECHSTACK = document.getElementById('techstack').offsetTop - ((window.innerHeight - document.getElementById('techstack').offsetHeight))
      const PROJECTS = document.getElementById('projects').offsetTop
      const SCROLL = window.scrollY

      // Current view
      if (SCROLL > PROJECTS) {
        this.$parent.$parent.currentView = 'Projects'
      } else if (SCROLL > TECHSTACK) {
        this.$parent.$parent.currentView = 'Techstack'
      } else {
        this.$parent.$parent.currentView = 'Introduction'
      }

      // Fade on view
      const THRESHOLD = .6
      const TO_SHOW = document.querySelectorAll('.fade-on-view')
      TO_SHOW.forEach(element => {
        if (element.offsetTop - window.innerHeight * THRESHOLD < SCROLL) {
          element.style.opacity = 1
        }
      })
    }
  }
}
</script>