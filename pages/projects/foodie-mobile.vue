<style lang="scss" scoped>
#foodie {
  padding: 1rem 8vw 1rem var(--left-content-padding);
}
.project_example {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  > *:first-child {
    margin-left: 10%;
    text-align: right;
  }

  .project_introduction {
    margin: auto 0;
  }
}

/* Phone */
.phone {
  display: flex;
  width: 300px;
  height: 600px;
  background-color: var(--accent);
  border-radius: 30px;
  margin: 4rem auto;

  > #screen {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background-color: var(--foreground);
    border-radius: 20px;
    margin: auto;
    overflow: hidden;

    > .top_speaker {
      position: sticky;
      top: 0;
      height: 15px;
      width: 60%;
      background-color: var(--accent);
      border-radius: 0 0 20px 20px;
      margin: auto;
    }
  }
}

/* Login view */
#login_view {
  margin: auto;
  padding: 1rem;

  .login_view__inputs {
    display: grid;
    grid-gap: .4rem;

    input {
      border: none;
      border-radius: 5px;
      padding: .6rem;
      background-color: var(--background);
    }
    button {
      font-weight: bold;
      padding: .6rem;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: var(--accent);
      color: var(--foreground);
      margin-top: 1rem;
      transition: .6s all cubic-bezier(.165, .84, .44, 1);
    }
    :is(input, button):disabled {
      cursor: default;
    }
  }
}

/* Feed view */
.post {
  margin-top: 1rem;
  border-top: 3px solid var(--background);
  border-bottom: 3px solid var(--background);

  > img {
    width: 100%;
  }

  > .desc {
    padding: .4rem;

    > p {
      font-size: .8rem;
    }
  }
  > .meta {
    display: flex;
    justify-content: space-between;
    padding: .4rem;

    > .user {
      font-size: .8rem;
    }
    > .time {
      font-size: .6rem;
      margin: auto 0;
    }
  }
}

@media (max-width: 1024px) {
  .project_example {
    margin-top: 8rem;
  }
}
@media (max-width: 768px) {
  .project_example {
    grid-template-columns: 1fr;

    > *:first-child {
      text-align: left;
    }
  }
}
</style>

<template>
  <div id="foodie">
    <cylinder-model />
    <div class="project_example">
      <div class="project_introduction">
        <h1>
          Foodie IOS app
        </h1>
        <p>
          When I bought my first MacBook and had access to Xcode, I started playing around to familiarise myself with it. Here, I've combined my love for food and my passion to share it. Using <b>Firebase</b>, the app authenticates the user and stores their details in a no-SQL realtime database.
        </p>
      </div>
      <div class="phone">
        <div id="screen">
          <div class="top_speaker" />
          <div v-if="!loggedIn" id="login_view">
            <p class="text--small">
              <b>
                Hello foodies
              </b>
            </p>
            <div class="login_view__inputs">
              <input
                v-model="loginEmail"
                type="text"
                placeholder="Email"
                aria-label="Email"
                disabled
              >
              <input
                v-model="loginPassword"
                type="password"
                placeholder="Password"
                aria-label="Password"
                disabled
              >
              <button id="login_button" disabled>
                Log in
              </button>
            </div>
          </div>
          <div v-else id="main_view">
            <div id="feed_view">
              <div
                v-for="(post, postIndex) in posts"
                :key="`post_${postIndex}`"
                class="post"
              >
                <div class="meta">
                  <p class="no-margin user">
                    <b>
                      @{{ post.user }}
                    </b>
                  </p>
                  <p class="no-margin time">
                    {{ post.timeUploaded }} ago
                  </p>
                </div>
                <img :src="post.url" :alt="post.title">
                <div class="desc">
                  <p class="no-margin">
                    <b>
                      {{ post.title }}
                    </b>
                  </p>
                  <p class="no-margin">
                    {{ post.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      href="https://github.com/MikeyJL/Foodie"
      target="_blank"
      class="repo_link no_highlight"
    >
      Repository
      <inline-svg :src="require('~/assets/svg/social/github.svg')" />
    </a>
    <div class="container--explanation">
      <div
        v-for="(section, sectionIndex) in explanation"
        :key="`section_${sectionIndex}`"
        class="explanation"
      >
        <p class="text--small no-margin">
          <b>
            {{ section.title }}
          </b>
        </p>
        <p>
          {{ section.desc }}
        </p>
        <pre v-highlightjs="section.code">
          <code class="swift" />
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CylinderModel from '../../components/CylinderModel.vue'

export default Vue.extend({
  components: {
    CylinderModel
  },
  data () {
    return {
      // Login view
      loginEmail: '',
      loginPassword: '',
      loggedIn: false,

      // Feed view
      posts: [
        {
          title: 'Salmon and garlic pasta',
          desc: 'Yum yum ❤️❤️',
          user: 'carol.hire',
          timeUploaded: '22 min',
          url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/salmonpasta-7845868.jpg?webp=true&quality=90&resize=500%2C454'
        },
        {
          title: 'Fajita-style pasta',
          desc: 'TASTES SO GOOD!!',
          user: 'esther.clark',
          timeUploaded: '6 hours',
          url: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/05/Fajita-pasta-e6e5b93.jpg?quality=90&webp=true&resize=600,545'
        },
        {
          title: 'Meatball & garlic bread traybake',
          desc: 'You have to try this',
          user: 'cassie.best',
          timeUploaded: '7 hours',
          url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/meatballsgarlic-bread-9245ad6.jpg?quality=90&webp=true&resize=440,400'
        }
      ],

      // Explain
      explanation: [
        {
          title: 'Securing the app',
          desc: 'Work in progress...',
          code: `
import SwiftUI
import Firebase
import KeychainSwift

...`
        }
      ]
    }
  },
  mounted () {
    this.animatePhone()
    // @ts-ignore
    this.$parent.$parent.currentView = 'Project'
  },
  methods: {
    animatePhone () {
      const EMAIL = 'mikey.lau@mail.com'
      const PASSWORD = 'aasdfagbbwnsdflngk'

      // Type Email
      for (let i = 0; i <= EMAIL.length; i++) {
        setTimeout(() => {
          this.loginEmail = EMAIL.substr(0, i)
        }, 50 * i)
      }

      // Type password
      setTimeout(() => {
        for (let i = 0; i <= PASSWORD.length; i++) {
          setTimeout(() => {
            this.loginPassword = PASSWORD.substr(0, i)
          }, 50 * i)
        }
      }, 50 * EMAIL.length)

      // Button click
      setTimeout(() => {
        const LOGIN_BTN: HTMLElement | boolean = document.getElementById('login_button') || false
        if (LOGIN_BTN) {
          LOGIN_BTN.style.opacity = '0.8'
          LOGIN_BTN.style.transform = 'scale(.95)'
          setTimeout(() => {
            LOGIN_BTN.style.opacity = '1'
            LOGIN_BTN.style.transform = 'scale(1)'
            this.loggedIn = true
          }, 100)
        }
      }, 50 * EMAIL.length + 50 * PASSWORD.length)

      // Scroll feed
      setTimeout(() => {
        const SCREEN: HTMLElement | boolean = document.getElementById('screen') || false
        if (SCREEN) {
          SCREEN.scroll({
            top: 1000,
            behavior: 'smooth'
          })
        }
      }, 50 * EMAIL.length + 50 * PASSWORD.length + 1000)
    }
  }
})
</script>
