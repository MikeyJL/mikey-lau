<style lang="scss">
.toggle_wrapper {
  display: flex;
  margin: 0 auto;

  // Mode icons
  .mode_icon {
    width: 20px;
    height: 20px;
    margin: auto;
    margin-right: .6rem;

    :is(.sun, .moon) {
      transition: .6s all cubic-bezier(.165, .84, .44, 1);
    }

    .moon {
      opacity: 0;
    }
  }
  .darkmode .sun {
    opacity: 0;
  }
  .darkmode .moon {
    opacity: 1;
  }

  // Toggle
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
    margin: auto;

    input {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .slider {
        background-color: var(--accent);
      }

      &:focus + .slider {
        box-shadow: 0 0 1px var(--accent);
      }

      &:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--accent);
      -webkit-transition: .4s;
      border-radius: 34px;
      transition: .4s;

      &:before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 4px;
        background-color: var(--foreground);
        -webkit-transition: .4s;
        border-radius: 50%;
        transition: .4s;
      }
    }
  }
}

@media (max-width: 425px) {
  .toggle_wrapper {
    margin: 0 2rem;
  }
}
</style>

<template>
  <div class="toggle_wrapper">
    <inline-svg :src="require('../assets/svg/darkmode.svg')" :class="{ darkmode: darkmodeOn }" class="mode_icon" />
    <label class="switch">
      <input
        v-model="darkmodeOn"
        type="checkbox"
        aria-label="Darkmode"
      >
      <span :class="{ darkmode: darkmodeOn }" class="slider" />
    </label>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
  components: {
    InlineSvg
  },
  watch: {
    darkmodeOn (state) {
      if (state) {
        localStorage.setItem('darkmode', true)
      } else {
        localStorage.removeItem('darkmode')
      }
      this.darkmode()
    }
  },
  data () {
    return {
      darkmodeOn: false
    }
  },
  mounted () {
    if (localStorage.getItem('darkmode')) {
      this.darkmodeOn = true
    }
  },
  methods: {
    darkmode () {
      if (this.darkmodeOn) {
        document.documentElement.style.setProperty('--accent', '#F4F4F4')
        document.documentElement.style.setProperty('--background', '#050505')
        document.documentElement.style.setProperty('--foreground', '#383838')
        document.documentElement.style.setProperty('--faded-element', '#FFFFFF40')
      } else {
        document.documentElement.style.setProperty('--accent', '#050505')
        document.documentElement.style.setProperty('--background', '#F4F4F4')
        document.documentElement.style.setProperty('--foreground', 'white')
        document.documentElement.style.setProperty('--faded-element', '#05050510')
      }
    }
  }
}
</script>
