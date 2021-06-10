<style scoped>
#economy {
  width: 100%
}
</style>

<template>
  <div>
    <p id="trans" />
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
      locationAmount: 15,
      resourceLedger: [],
      locations: [],
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
  beforeDestroy () {
    window.clearInterval()
  },
  methods: {
    __init__ () {
      class Location {
        constructor (id, ledger, resources) {
          this.id = id
          this.ledger = ledger
          this.globalResources = resources
          this.orders = []
          this.activeTransporters = 0

          // Inits position
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
          CIRCLE.setAttributeNS(null, 'style', 'fill: #050505' )
          document.getElementById('locations').appendChild(CIRCLE)

          // Inits resources
          for (const RESOURCE of resources) {
            const STARTING_AMOUNT = Math.floor(Math.random() * (RESOURCE.range.high - RESOURCE.range.low)) + RESOURCE.range.low
            this.ledger.push({
              id: id,
              resource: RESOURCE.name,
              amount: STARTING_AMOUNT,
              position: this.position,
              activeTransporters: this.activeTransporters
            })
            resources.globalUnits += STARTING_AMOUNT
          }
        }

        randomChoice (array, picks) {
          const RETURN_DATA = []
          for (let index = 0; index < picks; index++) {
            RETURN_DATA.push(array[Math.floor(Math.random() * array.length)])
          }
          return RETURN_DATA
        }

        createOrder () {
          this.globalResources.forEach(resourceInstance => {
            const LOCATIONS_WITH_RESOURCE = this.ledger.filter(ledgerInstance => ledgerInstance.resource === resourceInstance.name)
            let bestLocation = LOCATIONS_WITH_RESOURCE[0]
            LOCATIONS_WITH_RESOURCE.forEach(newBestLocation => {
              if (newBestLocation.unitPrice < bestLocation.unitPrice) {
                bestLocation = newBestLocation
              }
            })
            this.orders.push({
              targetLocation: this,
              originLocation: bestLocation,
              resourceToTransport: resourceInstance.name,
              amount: 1
            })
          })
        }
      }

      // Generates location
      for (let id = 0; id < this.locationAmount; id++) {
        this.locations.push(new Location(id, this.resourceLedger, this.resources))
      }

      this.calculatePrices()
      setInterval(() => { this.step() }, 10)
    },


    step () {
      class Transporter {
        constructor (order, parent) {
          this.order = order
          this.parent = parent
          this.position = {
            x: order.originLocation.position.x,
            y: order.originLocation.position.y
          }
          const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          CIRCLE.setAttributeNS(null, 'cx', this.position.x)
          CIRCLE.setAttributeNS(null, 'cy', this.position.y)
          CIRCLE.setAttributeNS(null, 'r', 3)
          CIRCLE.setAttributeNS(null, 'style', 'fill: red' )
          document.getElementById('transporters').appendChild(CIRCLE)
          this.circleEl = CIRCLE
        }

        move () {
          this.position.x += this.position.x < this.order.targetLocation.position.x ? 1 : (this.position.x === this.order.targetLocation.position.x ? 0 : -1)
          this.position.y += this.position.y < this.order.targetLocation.position.y ? 1 : (this.position.y === this.order.targetLocation.position.y ? 0 : -1)
          this.circleEl.setAttributeNS(null, 'cx', this.position.x)
          this.circleEl.setAttributeNS(null, 'cy', this.position.y)

          if (this.position.x === this.order.targetLocation.position.x && this.position.y === this.order.targetLocation.position.y) {
            this.order.targetLocation.amount += this.order.amount
            this.parent.locations.find(locationInstance => locationInstance.id === this.order.originLocation.id).activeTransporters -= 1
            this.circleEl.remove()
            this.parent.transporters.splice(this.parent.transporters.indexOf(this), 1)
            
            // Recalculates prices
            this.parent.calculatePrices()
          }
        }
      }

      // Creates the order and inits the transporters
      let text = ''
      this.locations.forEach(location => {
        text = `${text} ${location.activeTransporters}`
        if (location.activeTransporters < 8) {
          location.createOrder()
          this.transporters.push(new Transporter(location.orders[0], this))
          location.activeTransporters += 1
          location.orders[0].originLocation.amount -= location.orders[0].amount
          location.orders.splice(0, 1)
        }
      })
      document.getElementById('trans').innerText = text

      // Moves existing transporter by one step
      this.transporters.forEach(transporter => {
        transporter.move()
      })
    },

    // Calcuates price at each location
    calculatePrices () {
      const PRICE_MODIFIER = 10
      this.resourceLedger.forEach(instance => {
        instance.unitPrice = (this.resources.find(resourceInstance => resourceInstance.name === instance.resource).globalUnits / this.locationAmount) / instance.amount * PRICE_MODIFIER
      })
    }
  }
}
</script>