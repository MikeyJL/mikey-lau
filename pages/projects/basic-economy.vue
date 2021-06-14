<style scoped>
.project_introduction {
  margin: 0 var(--side_padding)
}
.container--explanation {
  display: grid;
  grid-gap: 4rem
}
.explanation {
  padding: 2rem;
  border: 3px solid var(--accent);
  margin: 0 var(--side_padding);
  overflow-x: auto
}

@media (max-width: 425px) {
  .explanation {
    border: none;
    padding: 0
  }
}
</style>

<template>
  <div>
    <div class="project_introduction">
      <h1>
        Basic economy
      </h1>
      <p>
        This is a web adaptation of my previous Python project where I designed a simulation of a trading economy.
      </p>
    </div>
    <economy-project class="project_example" />
    <a
      href="https://github.com/MikeyJL/artificial-economy"
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
        <p class="no_margin">
          <b>
            {{ section.title }}
          </b>
        </p>
        <p>
          {{ section.desc }}
        </p>
        <pre v-highlightjs="section.code">
          <code class="javascript" />
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import EconomyProject from '~/components/EconomyProject'

export default {
  components: {
    EconomyProject
  },
  data () {
    return {
      explanation: [
        {
          title: 'Creating the location',
          desc: 'Using a class, I passed in the index of each location in the root array. The ledger contains all the instances of each resource at their respective locations and the global resources variable was used to initiate the location.',
          code: `
class Location {
  // 'id' is from the parent 'for' loop
  // 'ledger' is from the parent Vue component
  // 'resources' is from the parent Vue component
  constructor (id, ledger, resources) {
    this.id = id
    this.ledger = ledger

    ...`
        },
        {
          title: 'Initialising the position',
          desc: `The position of each location is random determined through the use of 'Math.random()'. This was saved to the class instance as 'position' where it can be accessed later. An SVG circle element was also created to represent the location inside the viewbox.`,
          code: `
    ...

    // Generates a random postion value
    // Re-usable for both x and y coords
    const randPos = () => {
      let value = Math.random() * 1000
      value += value < 10 ? 10 : (value > 990 ? -10 : 0)
      return Math.floor(value)
    }
    this.position = { x: randPos() , y: randPos() }

    // Creates the circle SVG elements
    const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    CIRCLE.setAttributeNS(null, 'cx', this.position.x)
    CIRCLE.setAttributeNS(null, 'cy', this.position.y)
    CIRCLE.setAttributeNS(null, 'r', 5)
    CIRCLE.setAttributeNS(null, 'style', 'fill: var(--accent)')
    document.getElementById('locations').appendChild(CIRCLE)

    ...`
        },
        {
          title: 'Generating resources at each location',
          desc: `Each location will have a random starting amount for all the resources using 'Math.random()'. Once created, a dictionary consisting of the id, resource (name), amount, position (location), and whether it has been ordered will be appended to the 'resourceLedger' on the Vue instance. At the end of this block, it will also add its allocated resource amount to a global variable. This will later be used to calculate the level of scarcity at each location to determine the local unit price.`,
          code: `
    ...
    
    for (const RESOURCE of resources) {

      // Randomly generates the amount of resources
      const STARTING_AMOUNT = Math.floor(Math.random() * (RESOURCE.range.high - RESOURCE.range.low)) + RESOURCE.range.low
      
      // Appends it to the global 'resourceLedger'
      this.ledger.push({
        id: id,
        resource: RESOURCE.name,
        amount: STARTING_AMOUNT,
        position: this.position,
        ordered: false
      })

      // Sums up the total unit of this particular resource
      RESOURCE.globalUnits += STARTING_AMOUNT
    }
  }
}`
        }
      ]
    }
  }
}
</script>