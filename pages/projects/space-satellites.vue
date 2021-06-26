<style lang="scss" scoped>
#space-satellite {
  padding: 1rem 8vw 1rem var(--left-content-padding);

  > .project_introduction {
    margin-top: 4rem;
  }
}

@media (max-width: 1024px) {
  #space-satellite {
    > .project_introduction {
      margin-top: 8rem;
    }
  }
}
</style>

<template>
  <div id="space-satellite">
    <cylinder-model />
    <div class="project_introduction">
      <h1>
        Space Satellites
      </h1>
      <p>
        I've considered using D3.js for this mini project; however, I always wanted to invest more time developing my skills in 3D CSS and Javascript. Hence, I've opted for the use of Vue.js and SVGs. Using methods and <code class="code-label">v-for</code> made it simple to display the data and manipulate it. In a future project, I'll develop a more in-depth model with Python or D3.js.
      </p>
    </div>
    <div class="spacer--small" />
    <space-sat />
    <div class="spacer--large" />
    <div class="container--explanation">
      <div
        v-for="(section, sectionIndex) in explanation"
        :key="`section_${sectionIndex}`"
        class="explanation"
      >
        <p class="text--small no-margin">
          <b>
            {{ section.title }}
          </b>
        </p>
        <p v-html="section.desc" />
        <pre v-highlightjs="section.code">
          <code :class="section.lang" />
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import CylinderModel from '~/components/CylinderModel'
import SpaceSat from '~/components/SpaceSat'

export default {
  components: {
    CylinderModel,
    SpaceSat
  },
  data () {
    return {
      explanation: [
        {
          title: 'Creating the model',
          desc: `Taking advantage of the <code class="code-label">v-for</code> directive, the orbit can be displayed easily with the correct degree of inclination using <code class="code-label">transform</code> with the <code class="code-label">:style</code> prop.`,
          lang: 'html',
          code: `<svg viewport="0 0 500 500">
  <circle
    class="planet"
    cx="50%"
    cy="50%"
    r="8%"
  />
  <g class="orbits">
    <circle
      v-for="(orbit, orbitIndex) in orbits"
      :key="\`orbit_\${orbitIndex}\`"
      :style="{ transform: \`rotateX(80deg) rotateY(\${orbit.incline}deg) rotateX(30deg)\` }"
      :class="{ selected: selectedOrbit === orbitIndex }"
      cx="50%"
      cy="50%"
      :r="selectedOrbit === orbitIndex ? '35%' : '30%'"
      @click="show.contractor = orbit.contractor, show.use = orbit.use, show.launch = orbit.launch, selectedOrbit = orbitIndex"
    />
  </g>
</svg>`
        },
        {
          title: 'Loading the data into the model',
          desc: 'Looping though all the data in the JSON file, 50 datasets will be appended to an array to be used inside the Vue SVG to limit the number of <circle> being rendered. ',
          lang: 'javascript',
          code: `loadData () {
      this.orbits = []

      // Gets the data from JSON file
      const DATA = require('../assets/data/space-sat.json')

      // Loops through each JSON only 50 at a time as too many orbital paths can slow down the browser
      for (let index = this.currentDataRange - 50; index < this.currentDataRange; index++) {
        const INCLINE = DATA[index].inclination_degrees || false

        // Appends the data to an array to be used inside the SVG
        if (INCLINE) {
          this.orbits.push({
          'incline': INCLINE,
          'contractor': DATA[index].country_of_contractor,
          'use': \`\${DATA[index].users} | \${DATA[index].purpose}\`,
          'launch': \`\${DATA[index].date_of_launch} | \${DATA[index].launch_site}\`
        })
        }
      }

      // Sets the earliest and latest date of the 50 dataset to display
      this.range.low = DATA[this.currentDataRange - 50].date_of_launch
      this.range.high = DATA[this.currentDataRange - 1].date_of_launch
    },`
        }
      ]
    }
  },
  mounted () {
    this.$parent.$parent.currentView = 'Project'
  }
}
</script>