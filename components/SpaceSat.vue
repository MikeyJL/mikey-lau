<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

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
      stroke: $accent;
      opacity: .4;
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
      fill: transparent;
      stroke: $accent;
      stroke-width: 3;
    }
  }
}

@mixin track() {
  width: 100%;
  height: 100%;
  background-color: grey;
}

@mixin thumb() {
  border: none;
  width: 20%;
  height: 1rem;
  border-radius: 0;
  background-color: $accent;
  pointer-events: auto;
}

input[type='range'] {
  margin: 2rem 0;
  pointer-events: none;

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb, & {
    -webkit-appearance: none;
  }

  &::-webkit-slider-runnable-track {
    @include track;
  }
  &::-moz-range-track {
    @include track;
  }

  &::-webkit-slider-thumb {
    @include thumb;
  }
  &::-moz-range-thumb {
    @include thumb;
  }
}

.desc {
  padding: 1rem;
  position: absolute;
  box-shadow: $low-shadow;
  background-color: $foreground;
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
        r="25%"
      />
      <g class="orbits">
        <circle
          v-for="(orbit, orbitIndex) in orbits"
          :key="`orbit_${orbitIndex}`"
          :style="{ transform: `rotateX(80deg) rotateY(${orbit.incline}deg)` }"
          :class="{ selected: selectedOrbit === orbitIndex }"
          cx="50%"
          cy="50%"
          :r="selectedOrbit === orbitIndex ? '35%' : '30%'"
          @click="show.contractor = orbit.contractor, show.use = orbit.use, show.launch = orbit.launch, selectedOrbit = orbitIndex"
        />
      </g>
    </svg>
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

<script>
export default {
  data () {
    return {
      selectedOrbit: null,
      currentDataRange: 50,
      orbits: [],
      show: {
        contractor: null,
        use: null,
        launch: null
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
          'incline': INCLINE,
          'contractor': DATA[index].country_of_contractor,
          'use': `${DATA[index].users} | ${DATA[index].purpose}`,
          'launch': `${DATA[index].date_of_launch} | ${DATA[index].launch_site}`
        })
        }
      }
    },
  }
}
</script>