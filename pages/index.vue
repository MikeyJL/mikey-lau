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

/* Content */

.contact_details {
  display: flex;
  justify-content: center
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
.blog_link, .contact_details a {
  width: fit-content
}
.blog_link:after, .contact_details a:after {
  content: '';
  position: relative;
  display: flex;
  height: .6rem;
  width: 0%;
  background-color: #8B000040;
  transform: translateY(-.6rem);
  transition: .4s all cubic-bezier(.165, .84, .44, 1)
}
.blog_link:hover:after, .contact_details a:hover:after {
  width: 100%
}
.date {
  margin-bottom: 2rem
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
      <p class="text--large no_margin text_center fade_in">
        Mikey Lau
      </p>
      <p class="text_center fade_in letter_spacing">
        Level 4 Advanced Personal Training<br>
        Level 3 Strength and Conditioning<br>
        Level 3 Sports Massage (pending)<br>
        Level 3 Exercise Referral<br>
        Level 3 Personal Trainer<br>
        Level 2 Gym Instructor<br>
      </p>
      <div class="spacer--small" />
      <div class="contact_details">
        <a href="javascript:void(0)" @click="send_email()">
          ml-fitness@outlook.com
        </a>
      </div>
      <div class="contact_details">
        <a href="https://www.linkedin.com/in/mikey-lau" target="_blank">
          LinkedIn
        </a>
      </div>
      <div class="spacer--large" />
      <p class="text--small text_center fade_in">
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
            <p class="letter_spacing">{{ article.description }}</p>
            <p class="date letter_spacing">{{ article.created }}</p>
            <nuxt-link :to="`/blog/${article.slug}`" class="blog_link letter_spacing">
              Read
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
        return b.id - a.id
      })
      return { articles }
    },
    beforeCreate () {
      this.$parent.$parent.metaHelper.title = 'Mikey Lau'
      this.$parent.$parent.metaHelper.description = ''
      this.$parent.$parent.metaHelper.url = 'https://mikeylau.uk/'
    },
    methods: {
      send_email () {
        window.open('mailto:ml-fitness@outlook.com?subject=Reaching out&body=Hi Mikey,')
      }
    }
  }
</script>