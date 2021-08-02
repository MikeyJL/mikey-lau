<style scoped>
#economy {
  width: 100%;
}
table {
  font-size: .8rem;
  width: 100%;
  text-align: left;
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

<script lang="ts">
import Vue from 'vue'

interface Resource {
  name: string,
  range: {
    low: number,
    high: number
  },
  globalUnits: number
}

interface Ledger {
  id: number,
  resource: string,
  amount: number,
  unitPrice?: number,
  position: { x: number, y: number },
  ordered: boolean
}

interface LocationType {
  position: {
    x: number,
    y: number
  },
  amount: number,
  ordered: boolean
}

interface MoveFunc {
  (): void
}

interface Transporter {
  move: MoveFunc
}

export default Vue.extend({
  data () {
    return {
      timer: 0 as number,
      locationAmount: 15,
      resourceLedger: [] as Array<Ledger>,
      locations: [] as Array<any>,
      transporters: [] as Array<Transporter>,
      resources: [
        {
          name: 'materials',
          range: {
            low: 500,
            high: 1000
          },
          globalUnits: 0
        },
        {
          name: 'water',
          range: {
            low: 3000,
            high: 4000
          },
          globalUnits: 0
        },
        {
          name: 'food',
          range: {
            low: 7000,
            high: 8000
          },
          globalUnits: 0
        }
      ] as Array<Resource>
    }
  },
  async mounted () {
    await this.__init__()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  methods: {
    __init__ () {
      class Location {
        private position: { x: number, y: number }
        constructor (private id: number, private ledger: Array<Ledger>, resources: Array<Resource>) {
          this.id = id
          this.ledger = ledger

          const randPos = () => {
            let value = Math.random() * 1000
            value += value < 10 ? 10 : (value > 990 ? -10 : 0)
            return Math.floor(value)
          }
          this.position = { x: randPos(), y: randPos() }
          const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          CIRCLE.setAttributeNS(null, 'cx', String(this.position.x))
          CIRCLE.setAttributeNS(null, 'cy', String(this.position.y))
          CIRCLE.setAttributeNS(null, 'r', '5')
          CIRCLE.setAttributeNS(null, 'style', 'fill: var(--accent)')
          const LOCATIONS: Element | boolean = document.getElementById('locations') || false
          if (LOCATIONS) {
            LOCATIONS.appendChild(CIRCLE)
          }

          for (const RESOURCE of resources) {
            const STARTING_AMOUNT = Math.floor(Math.random() * (RESOURCE.range.high - RESOURCE.range.low)) + RESOURCE.range.low
            this.ledger.push({
              id,
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
      this.timer = window.setInterval(() => { this.step() }, 10)
    },

    step () {
      class Transporter {
        private position: { x: number, y: number }
        private circleEl: Element
        constructor (private parent: Vue, private targetLocation: LocationType, private originLocation: LocationType) {
          this.parent = parent
          this.targetLocation = targetLocation
          this.originLocation = originLocation
          this.position = {
            x: originLocation.position.x,
            y: originLocation.position.y
          }
          const CIRCLE = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          CIRCLE.setAttributeNS(null, 'cx', String(this.position.x))
          CIRCLE.setAttributeNS(null, 'cy', String(this.position.y))
          CIRCLE.setAttributeNS(null, 'r', '3')
          CIRCLE.setAttributeNS(null, 'style', 'fill: var(--accent); opacity: .4')
          const TRANSPORTERS: Element | boolean = document.getElementById('transporters') || false
          if (TRANSPORTERS) {
            TRANSPORTERS.appendChild(CIRCLE)
          }
          this.circleEl = CIRCLE
        }

        move () {
          this.position.x += this.position.x < this.targetLocation.position.x ? 1 : (this.position.x === this.targetLocation.position.x ? 0 : -1)
          this.position.y += this.position.y < this.targetLocation.position.y ? 1 : (this.position.y === this.targetLocation.position.y ? 0 : -1)
          this.circleEl.setAttributeNS(null, 'cx', String(this.position.x))
          this.circleEl.setAttributeNS(null, 'cy', String(this.position.y))

          if (this.position.x === this.targetLocation.position.x && this.position.y === this.targetLocation.position.y) {
            this.targetLocation.amount += 1
            this.targetLocation.ordered = false
            this.circleEl.remove()
            // @ts-ignore
            this.parent.transporters.splice(this.parent.transporters.indexOf(this), 1)
            // @ts-ignore
            this.parent.calculatePrices()
          }
        }
      }

      // Creates the order and inits the transporters
      this.resources.forEach(resource => {
        const LOCATIONS_WITH_RESOURCE = this.resourceLedger.filter(ledgerInstance => ledgerInstance.resource === resource.name) || []
        if (LOCATIONS_WITH_RESOURCE) {
          let bestLocation: Ledger = LOCATIONS_WITH_RESOURCE[0]
          LOCATIONS_WITH_RESOURCE.forEach((newBestLocation: Ledger) => {
            if (newBestLocation.unitPrice! < bestLocation.unitPrice!) {
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
        }
      })

      // Moves existing transporter by one step
      this.transporters.forEach(transporter => {
        transporter.move()
      })
    },

    // Calcuates price at each location
    calculatePrices () {
      const PRICE_MODIFIER = 10
      this.resourceLedger.forEach((ledgerInstance: Ledger) => {
        const RESOURCE: Resource | boolean = this.resources.find((resourceInstance: Resource) => resourceInstance.name === ledgerInstance.resource) || false
        if (RESOURCE) {
          const LOCAL_PRICE = (RESOURCE.globalUnits / this.locationAmount) / ledgerInstance.amount * PRICE_MODIFIER
          ledgerInstance.unitPrice = Number(LOCAL_PRICE.toFixed(2))
        }
      })
    }
  }
})
</script>
