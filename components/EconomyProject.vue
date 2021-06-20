<style scoped>
#economy {
  width: 100%
}
table {
  font-size: .8rem;
  width: 100%;
  text-align: left
}
</style>

<template>
  <div class="container--economy_project">
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="economy"
    >
    <g id="locations" />
    <g id="transporters" />
    </svg>
    <p>
      <b>
        Resource ledger
      </b>
    </p>
    <table>
      <thead>
        <tr>
          <th>
            Location
          </th>
          <th>
            Resource
          </th>
          <th>
            Amount
          </th>
          <th>
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, itemIndex) in resourceLedger"
          :key="`info_${itemIndex}`"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.resource }}
          </td>
          <td>
            {{ item.amount }}
          </td>
          <td>
            {{ item.unitPrice }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: null,
      locationAmount: 15,
      resourceLedger: [],
      locations: [],
      transporters: [],
      resources: [
        {
          name: 'materials',
          range: {
            low: 500,
            high: 1000,
          },
          globalUnits: 0
        },
        {
          name: 'water',
          range: {
            low: 3000,
            high: 4000,
          },
          globalUnits: 0
        },
        {
          name: 'food',
          range: {
            low: 7000,
            high: 8000,
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
    window.clearInterval(this.timer)
  },
  methods: {
    __init__ () {
      class Location {
        constructor (id, ledger, resources) {
          this.id = id
          this.ledger = ledger

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

      // Generates location
      for (let id = 0; id < this.locationAmount; id++) {
        this.locations.push(new Location(id, this.resourceLedger, this.resources))
      }

      this.calculatePrices()
      this.timer = setInterval(() => { this.step() }, 10)
    },


    step () {
      class Transporter {
        constructor (parent, targetLocation, originLocation) {
          this.parent = parent
          this.targetLocation = targetLocation
          this.originLocation = originLocation
          this.position = {
            x: originLocation.position.x,
            y: originLocation.position.y
          }
          const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          CIRCLE.setAttributeNS(null, 'cx', this.position.x)
          CIRCLE.setAttributeNS(null, 'cy', this.position.y)
          CIRCLE.setAttributeNS(null, 'r', 3)
          CIRCLE.setAttributeNS(null, 'style', 'fill: var(--accent); opacity: .4')
          document.getElementById('transporters').appendChild(CIRCLE)
          this.circleEl = CIRCLE
        }

        move () {
          this.position.x += this.position.x < this.targetLocation.position.x ? 1 : (this.position.x === this.targetLocation.position.x ? 0 : -1)
          this.position.y += this.position.y < this.targetLocation.position.y ? 1 : (this.position.y === this.targetLocation.position.y ? 0 : -1)
          this.circleEl.setAttributeNS(null, 'cx', this.position.x)
          this.circleEl.setAttributeNS(null, 'cy', this.position.y)

          if (this.position.x === this.targetLocation.position.x && this.position.y === this.targetLocation.position.y) {
            this.targetLocation.amount += 1
            this.targetLocation.ordered = false
            this.circleEl.remove()
            this.parent.transporters.splice(this.parent.transporters.indexOf(this), 1)
            
            // Recalculates prices
            this.parent.calculatePrices()
          }
        }
      }

      // Creates the order and inits the transporters
      this.resources.forEach(resource => {
        const LOCATIONS_WITH_RESOURCE = this.resourceLedger.filter(ledgerInstance => ledgerInstance.resource === resource.name)
        let bestLocation = LOCATIONS_WITH_RESOURCE[0]
        LOCATIONS_WITH_RESOURCE.forEach(newBestLocation => {
          if (newBestLocation.unitPrice < bestLocation.unitPrice) {
            bestLocation = newBestLocation
          }
        })
        LOCATIONS_WITH_RESOURCE.forEach(location => {
          if (location.id !== bestLocation.id && !location.ordered) {
            location.ordered = true
            bestLocation.amount -= 1
            this.transporters.push(new Transporter(this, location, bestLocation))
          }
        })
      })

      // Moves existing transporter by one step
      this.transporters.forEach(transporter => {
        transporter.move()
      })
    },

    // Calcuates price at each location
    calculatePrices () {
      const PRICE_MODIFIER = 10
      this.resourceLedger.forEach(ledgerInstance => {
        const LOCAL_PRICE = (this.resources.find(resourceInstance => resourceInstance.name === ledgerInstance.resource).globalUnits / this.locationAmount) / ledgerInstance.amount * PRICE_MODIFIER
        ledgerInstance.unitPrice = LOCAL_PRICE.toFixed(2)
      })
    }
  }
}
</script>