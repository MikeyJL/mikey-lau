<style scoped>
.syntaxer_demo {
  padding: 2rem var(--side_padding)
}
textarea {
  resize: vertical;
  width: 100%;
  background-color: transparent;
  border: 3px solid var(--accent);
  color: var(--accent);
  font-size: 1rem;
  padding: .6rem
}
</style>

<template>
  <div>
    <div class="syntaxer_demo">
      <h1>
        Code syntaxer
      </h1>
      <textarea
        v-model="codeData"
        rows="10"
      />
      <h3>
        Output
      </h3>
      <syntaxer :code="codeData" :language="'javascript'" />
    </div>
  </div>
</template>

<script>
import Syntaxer from '~/components/Syntaxer'

export default {
  components: {
    Syntaxer
  },
  data () {
    return {
      codeData: `const randPos = () => {
  let value = Math.random() * 1000
  value += value < 10 ? 10 : (value > 990 ? -10 : 0)
  return Math.floor(value)
}
this.position = { x: randPos() , y: randPos() }

const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
CIRCLE.setAttributeNS(null, 'cx', this.position.x)
CIRCLE.setAttributeNS(null, 'cy', this.position.y)
CIRCLE.setAttributeNS(null, 'r', 5)
CIRCLE.setAttributeNS(null, 'style', 'fill: var(--accent)')
document.getElementById('locations').appendChild(CIRCLE)`
    }
  }
}
</script>