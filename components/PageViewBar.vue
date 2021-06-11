<style scoped>
.page_view_bar_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%
}
.page_view_bar__thumb {
  background-color: var(--accent);
  height: .4rem;
  width: 100%;
  transform: translateX(-100%)
}
</style>

<template>
  <div class="page_view_bar_wrapper">
    <div id="page_view_bar" class="page_view_bar__thumb" />
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', () => {
      document.getElementById('page_view_bar').style.transform = `translateX(${(window.scrollY / (document.body.offsetHeight - window.innerHeight) - 1) * 100}%)`
    })
  }
}
</script>