<style lang="scss" scoped>
#space {
  display: flex;
  flex-direction: column;

  > svg {
    height: 40vw;
    width: 100%;

    > .orbits circle {
      cursor: pointer;
      transform-origin: center;
      fill: transparent;
      stroke: var(--accent);
      opacity: .1;
      stroke-width: 5;
      transition: .6s all cubic-bezier(.165, .84, .44, 1);

      &:hover {
        stroke-width: 10;
        opacity: 1;
      }

      &.selected {
        stroke: red;
        stroke-width: 10;
        opacity: 1;
      }
    }

    > .planet {
      fill: var(--accent);
      stroke: var(--accent);
      stroke-width: 3;
    }
  }

  > .data-dates {
    display: flex;
    justify-content: space-between;

    > p {
      margin: 0;
    }
  }
}

input[type='range'] {
  margin: 1rem 0;
}

.desc {
  padding: 1rem;
  position: absolute;
  box-shadow: var(--low-shadow);
  background-color: var(--foreground);
  border-radius: 10px;

  > p {
    font-size: .8rem;
    margin: 0;
  }
}
</style>

<template>
  <div id="space">
    <svg viewport="0 0 500 500">
      <circle
        class="planet"
        cx="50%"
        cy="50%"
        r="8%"
      />
      <g class="orbits">
        <circle
          v-for="(orbit, orbitIndex) in orbits"
          :key="`orbit_${orbitIndex}`"
          :style="{ transform: `rotateX(80deg) rotateY(${orbit.incline}deg) rotateX(30deg)` }"
          :class="{ selected: selectedOrbit === orbitIndex }"
          cx="50%"
          cy="50%"
          :r="selectedOrbit === orbitIndex ? '35%' : '30%'"
          @click="show.contractor = orbit.contractor, show.use = orbit.use, show.launch = orbit.launch, selectedOrbit = orbitIndex"
        />
      </g>
    </svg>
    <div
      v-if="range.low"
      class="data-dates"
    >
      <p>
        <b>
          {{ range.low }}
        </b>
      </p>
      <p>
        <b>
          {{ range.high }}
        </b>
      </p>
    </div>
    <input
      v-model="currentDataRange"
      id="data-range"
      type="range"
      min="50"
      max="1000"
      @input="show.contractor = null, show.use = null, show.launch = null, selectedOrbit = null"
    />
    <div
      v-if="show.contractor"
      class="desc"
    >
      <p>
        <b>
          {{ show.contractor }}
        </b>
      </p>
      <p>
        {{ show.use }}
      </p>
      <p>
        {{ show.launch }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Orbit {
  incline: number,
  contractor: string,
  use: string,
  launch: string
}
export default Vue.extend({
  data () {
    return {
      selectedOrbit: null,
      currentDataRange: 50,
      orbits: [] as Array<Orbit>,
      show: {
        contractor: null,
        use: null,
        launch: null
      },
      range: {
        low: null,
        high: null
      }
    }
  },
  mounted () {
    this.loadData()
  },
  watch: {
    currentDataRange () {
      this.loadData()
    }
  },
  methods: {
    loadData () {
      this.orbits = []
      const DATA = require('../assets/data/space-sat.json')
      for (let index = this.currentDataRange - 50; index < this.currentDataRange; index++) {
        const INCLINE = DATA[index].inclination_degrees || false
        if (INCLINE) {
          this.orbits.push({
            incline: INCLINE,
            contractor: DATA[index].country_of_contractor,
            use: `${DATA[index].users} | ${DATA[index].purpose}`,
            launch: `${DATA[index].date_of_launch} | ${DATA[index].launch_site}`
          })
        }
      }
      this.range.low = DATA[this.currentDataRange - 50].date_of_launch
      this.range.high = DATA[this.currentDataRange - 1].date_of_launch
    }
  }
})
</script>
