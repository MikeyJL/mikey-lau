<style scoped>

/* Containers */

#blog_post {
  padding: 0 8%
}
#article {
  padding: 0 10%
}

/* Back */

.back_home_wrapper {
  width: fit-content
}
.back_home {
  position: fixed;
  left: 0;
  top: 50%;
  transform: rotate(-90deg)
}
.back_home:after {
  content: '';
  position: relative;
  display: flex;
  height: .6rem;
  width: 0%;
  background-color: #8B000040;
  transform: translateY(-.6rem);
  transition: .4s all cubic-bezier(.165, .84, .44, 1)
}
.back_home:hover:after {
  width: 100%
}

/* Content */

img {
  width: 300px;
  border-radius: 5px;
  margin: auto;
  display: flex
}

@media (max-width: 772px) {
  .back_home {
    left: -1rem
  }
}
@media (max-width: 567px) {
  .back_home {
    position: relative;
    left: 0
  }
  #article {
    padding: 0
  }
}
</style>

<template>
  <div id="blog_post">
    <div class="spacer--large" />
    <div class="back_home_wrapper">
      <nuxt-link to="/#blog" class="back_home letter_spacing">
        Back to home
      </nuxt-link>
    </div>
    <div class="spacer--small" />
    <img :src="require(`../../assets/${article.img}`)" :alt="article.alt">
    <div class="spacer--small" />
    <article id="article">
      <nuxt-content :document="article" />
    </article>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()
      return { article }
    }
  }
</script>