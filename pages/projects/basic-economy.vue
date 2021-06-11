<style scoped>
.container--explanation {
  margin-top: 4rem;
  display: grid;
  grid-gap: 4rem
}
.explanation {
  padding: 2rem;
  border: 3px solid var(--accent);
  margin: 0 var(--side_padding);
  overflow-x: auto
}
</style>

<template>
  <div>
    <economy-project />
    <div class="container--explanation">
      <div
        v-for="(section, sectionIndex) in explanation"
        :key="`section_${sectionIndex}`"
        class="explanation"
      >
        <h3 class="no_margin">
          {{ section.title }}
        </h3>
        <p>
          {{ section.desc }}
        </p>
        <syntaxer :code="section.code" :language="'javascript'" />
      </div>
    </div>
  </div>
</template>

<script>
import EconomyProject from '~/components/EconomyProject'
import Syntaxer from '~/components/Syntaxer'

export default {
  components: {
    EconomyProject,
    Syntaxer
  },
  data () {
    return {
      explanation: [
        {
          title: 'Creating the location',
          desc: 'Using a class, I passed in the index of each location in the root array, the ledger which contains all instances each location and resource, and the global resources to initiate the location.',
          code: `
class Location {
  // 'id' is from the parent 'for' loop
  // 'ledger' is from the parent Vue component
  // 'resources' is from the parent Vue component
  constructor (id, ledger, resources) {
    this.id = id
    this.ledger = ledger

    ...
          `
        },
        {
          title: 'Initialising the position',
          desc: '',
          code: `
    ...

    const randPos = () => {
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
    document.getElementById('locations').appendChild(CIRCLE)

    ...
          `
        },
        {
          title: 'Generating resources at each location',
          desc: '',
          code: `
    ...
    
    for (const RESOURCE of resources) {
      const STARTING_AMOUNT = Math.floor(Math.random() * (RESOURCE.range.high - RESOURCE.range.low)) + RESOURCE.range.low
      this.ledger.push({
        id: id,
        resource: RESOURCE.name,
        amount: STARTING_AMOUNT,
        position: this.position,
        ordered: false
      })
      RESOURCE.globalUnits += STARTING_AMOUNT
    }
  }
}
          `
        }
      ]
    }
  },
  mounted () {
    this.$parent.$parent.initAnimate()
  }
}
</script>