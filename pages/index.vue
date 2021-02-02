<style scoped>

/* Header */

.backdrop {
  height: 20rem;
  background-color: #F2F2F2
}
.profile_img {
  filter: grayscale(100%);
  width: 15%;
  border-radius: 50%;
  display: flex;
  margin: auto;
  transform: translateY(-5rem);
  transition: 1s all cubic-bezier(.165, .84, .44, 1)
}
.profile_img:hover {
  filter: grayscale(0%)
}

/* Blog */

.article_container {
  display: grid;
  grid-gap: 4rem
}
.article {
  display: grid;
  grid-template-columns: .4fr 1fr;
  grid-gap: 2rem
}
.article img {
  width: 100%;
  filter: grayscale(100%);
  border-radius: 5px;
  transition: 1s all cubic-bezier(.165, .84, .44, 1)
}
.article:hover img {
  filter: grayscale(0%)
}
.article_text {
  display: flex;
  flex-direction: column;
  justify-content: center
}
.article_text a {
  margin-top: 1rem
}

@media (max-width: 992px) {
  .profile_img {
    width: 25%
  }

}
@media (max-width: 576px) {
  .profile_img {
    width: 40%
  }
  .article {
    grid-template-columns: 1fr
  }
}
</style>

<template>
  <div id="home">
    <div class="top_bar">
      <div class="backdrop" />
      <img class="profile_img fade_in" src="../assets/profile.jpg">
    </div>
    <div class="body_padding">
      <p class="text--large no_margin text_center fade_in delay_1">
        Mikey Lau
      </p>
      <p class="text--small grey no_margin text_center fade_in delay_2">
        Personal trainer
      </p>
      <div class="spacer--large" />
      <p class="text--small text_center fade_in delay_2">
        #personaltraining<br>#onlinecoaching<br>#strengthandconditioning<br>#functionaltraining<br>#movementfocused<br>#therapybased
      </p>
      <div class="spacer--large" />
      <a id="blog" />
      <p class="text--large">
        Blog
      </p>
      <div class="spacer--small" />
      <div class="article_container">
        <div
          class="article"
          v-for="(article, index) in articles"
          :key="`article_${index}`"
          v-show="article.show"
        >
          <img :src="require(`../assets/${article.img}`)" :alt="article.alt">
          <div class="article_text">
            <p class="text--small no_margin">{{ article.title }}</p>
            <p class="text--small grey no_margin">{{ article.description }}</p>
            <p class="grey letter_spacing">{{ article.created }}</p>
            <nuxt-link :to="`/blog/${article.slug}`">
              Continue reading
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const articles = await $content('articles').fetch()
      articles.sort((b, a) => {
        return new Date(b.id) - new Date(a.id)
      })
      return { articles }
    },
    methods: {
      format_date(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
      }
    }
  }
</script>