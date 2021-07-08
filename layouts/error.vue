<style lang="scss" scoped>
#error {
  padding: 0 8%;

  .error_link {
    width: fit-content;

    &:after {
      content: '';
      position: relative;
      display: flex;
      height: .6rem;
      width: 0%;
      background-color: #8B000040;
      transform: translateY(-.6rem);
      transition: .4s all cubic-bezier(.165, .84, .44, 1);
    }
    &:hover:after {
      width: 100%;
    }
  }
  .link_wrapper {
    width: fit-content;
  }
}
</style>

<template>
  <div id="error">
    <div class="spacer--large" />
    <p class="text--large">Error 404</p>
    <p class="text--large grey">Page not found</p>
    <div class="spacer--small" />
    <div class="link_wrapper">
      <nuxt-link to="/" class="error_link text--small grey">
        Go back
      </nuxt-link>
    </div>
  </div>
</template>
