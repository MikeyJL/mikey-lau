<template>
  <div>
    <economy-project />
  </div>
</template>

<script>
import EconomyProject from '~/components/EconomyProject'

export default {
  components: {
    EconomyProject
  },
  mounted () {
    this.$parent.$parent.initAnimate()
  }
}
</script>