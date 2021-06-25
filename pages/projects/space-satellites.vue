<style scoped>
#space-satellite {
  padding: 1rem 8vw 1rem var(--left-content-padding);
}
</style>

<template>
  <div id="space-satellite">
    <div class="spacer--xlarge" />
    <div class="project_introduction">
      <h1>
        Space Satellite
      </h1>
      <p>
        TEXT
      </p>
    </div>
    <space-sat />
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
        <p class="text--small no-margin">
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
import SpaceSat from '~/components/SpaceSat'

export default {
  components: {
    SpaceSat
  },
  data () {
    return {
      explanation: [
        {
          title: 'Creating the location',
          desc: 'Using a class, I passed in the index of each location in the root array. The ledger contains all the instances of each resource at their respective locations and the global resources variable was used to initiate the location.',
          code: ``
        },
        {
          title: 'Initialising the position',
          desc: `The position of each location is random determined through the use of 'Math.random()'. This was saved to the class instance as 'position' where it can be accessed later. An SVG circle element was also created to represent the location inside the viewbox.`,
          code: ``
        },
        {
          title: 'Generating resources at each location',
          desc: `Each location will have a random starting amount for all the resources using 'Math.random()'. Once created, a dictionary consisting of the id, resource (name), amount, position (location), and whether it has been ordered will be appended to the 'resourceLedger' on the Vue instance. At the end of this block, it will also add its allocated resource amount to a global variable. This will later be used to calculate the level of scarcity at each location to determine the local unit price.`,
          code: ``
        }
      ]
    }
  },
  mounted () {
    this.$parent.$parent.currentView = 'Project'
  }
}
</script>