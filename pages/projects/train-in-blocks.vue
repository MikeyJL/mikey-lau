<style lang="scss" scoped>
#tib-app {
  padding: 1rem 8vw 1rem var(--left-content-padding);

  > .project_introduction {
    margin-top: 4rem;
  }

  .images {
    display: grid;
    grid-gap: 1rem;
    margin: 4rem 0;

    > img {
      border-radius: 10px;
      box-shadow: var(--low-shadow);
      width: 90%;
      margin: auto;
    }
  }
}

@media (max-width: 1024px) {
  #tib-app {
    > .project_introduction {
      margin-top: 8rem;
    }
  }
}
@media (max-width: 425px) {
  #tib-app .images > img {
    width: 100%;
  }
}
</style>

<template>
  <div id="tib-app">
    <cylinder-model />
    <div class="project_introduction">
      <h1>
        Train In Blocks
      </h1>
      <p>
        Due to non-disclosure, my repository for Train In Blocks must remain on private. However, I can show you some snippets of implementations.
      </p>
    </div>
    <div class="spacer--small" />
    <div class="container--explanation">
      <div>
        <h3>
          App version 4.0
        </h3>
        <p>
          In our next update, we will be launching a range of new features like Stripe payments, an improved API, and Cypress for E2E testing.
        </p>
        <div class="images">
          <img :src="require(`../../assets/projects/tib/plan-1.png`)" alt="Plan page">
          <img :src="require(`../../assets/projects/tib/plan-2.png`)" alt="Plan page">
          <img :src="require(`../../assets/projects/tib/stripe.png`)" alt="Stripe integration">
        </div>
      </div>
      <div>
        <h3>
          Website version 3.0
        </h3>
        <p>
          Along with the release of v4 for the app. We've revamped the website to include observers for SVG animations when the user scrolls into view.
        </p>
        <div class="images">
          <img :src="require(`../../assets/projects/tib/home.png`)" alt="Home page">
          <img :src="require(`../../assets/projects/tib/blog.png`)" alt="Blog page">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CylinderModel from '~/components/CylinderModel.vue'

export default Vue.extend({
  components: {
    CylinderModel
  },
  mounted () {
    // @ts-ignore
    this.$parent.$parent.currentView = 'Project'
  }
})
</script>
