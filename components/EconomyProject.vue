<style scoped>
#economy {
  width: 100%
}
</style>

<template>
  <div>
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="economy"
    >
    <g id="locations" />
    <g id="transporters" />
    </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resourceLedger: [],
      transporters: [],
      resources: [
        {
          name: 'metal',
          range: {
            low: 500,
            high: 1000,
          },
          globalUnits: 0
        },
        {
          name: 'wood',
          range: {
            low: 3000,
            high: 4000,
          },
          globalUnits: 0
        },
        {
          name: 'water',
          range: {
            low: 7000,
            high: 8000,
          },
          globalUnits: 0
        },
        {
          name: 'fabric',
          range: {
            low: 1500,
            high: 2000,
          },
          globalUnits: 0
        }
      ]
    }
  },
  async mounted () {
    await this.__init__(15)
  },
  methods: {
    __init__ (locationAmount) {
      class Location {
        constructor (id, ledger, resources) {
          this.id = id
          this.ledger = ledger

          // Inits resources
          for (const RESOURCE of resources) {
            const STARTING_AMOUNT = Math.floor(Math.random() * (RESOURCE.range.high - RESOURCE.range.low)) + RESOURCE.range.low
            this.ledger.push({
              id: id,
              resource: RESOURCE.name,
              amount: STARTING_AMOUNT
            })
            resources.globalUnits += STARTING_AMOUNT
          }

          // Inits position
          const randPos = () => {
            let value = Math.random() * 1000
            value += value < 10 ? 10 : (value > 990 ? -10 : 0)
            return value
          }
          this.position = { x: randPos() , y: randPos() }
          const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          CIRCLE.setAttributeNS(null, 'cx', this.position.x)
          CIRCLE.setAttributeNS(null, 'cy', this.position.y)
          CIRCLE.setAttributeNS(null, 'r', 5)
          CIRCLE.setAttributeNS(null, 'style', 'fill: #050505' )
          document.getElementById('locations').appendChild(CIRCLE)
        }

        randomChoice (array, picks) {
          const RETURN_DATA = []
          for (let index = 0; index < picks; index++) {
            RETURN_DATA.push(array[Math.floor(Math.random() * array.length)])
          }
          return RETURN_DATA
        }
      }

      // Generates location
      for (let id = 0; id < locationAmount; id++) {
        new Location(id, this.resourceLedger, this.resources)
      }

      /* Calcuates price at each location
      this.resourceLedger.forEach(instance => {
        
      })
      */
    }
  }
}
</script>